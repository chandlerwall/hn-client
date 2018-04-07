import { HackerNewsApi } from "./api";
import * as nedb from "nedb";
import { Item } from "./item";

import * as express from "express";
import { Response } from "express";

import * as bodyParser from "body-parser";
import * as compression from "compression";

const app = express();

const db = new nedb({ filename: "./data.db", autoload: true });

let hn = new HackerNewsApi();

db.ensureIndex({ fieldName: "id", unique: true }, function(err) {
  console.log("nedb unique error", err);
});

app.use(bodyParser.json());
app.use(compression());

interface TopStories {
  items: number[];
  id: TopStoriesType;
  lastUpdated: number; // UNIX timestamp in seconds
}

interface ItemExt extends Item {
  firstLayerOnly?: boolean;
}

async function _loadFirstLayerOfInfo(ids: number[]) {
  // have a list of ids that shoudl not be in the database yet

  // iterate through those ids,

  let promises = [];

  let results: ItemExt[] = [];

  ids.forEach(id => {
    let reqProm = new Promise<ItemExt>((resolve, reject) => {
      db.findOne<ItemExt>({ id: id }, (err, doc) => {
        if (doc === null) {
          // need to load that object

          let newItem = hn.fetchItem(id).then(item => {
            let itemExt = item as ItemExt;
            itemExt.firstLayerOnly = true;

            // TODO: fully implement the callback here

            db.insert(itemExt, (err, doc) => {
              if (err != null) {
                return reject(err);
              } else {
                return resolve(doc);
              }
            });
          });
        } else {
          return resolve(doc);
        }
      });
    });
    promises.push(reqProm);
  });

  return await Promise.all(promises);

  // return a obj with all of the first layer info for these?
}

async function _getTopStoriesOffline() {
  // this will return a single array of stories, with all comments fully populated
  // will start with 3 stories for simplicity
}

interface TopStoriesParams {
  type: TopStoriesType;
}

type TopStoriesType = "topstories" | "day" | "week" | "month" | "";

app.get("/topstories/:type", (req, res) => {
  // return a set of 30 stories with the titel, comment count, and URL
  // add those to the DB and set some flag saying that they need full details loaded
  // load the first layer and note that more could be loaded
  // store those top stories for some period of time

  let params: TopStoriesParams = req.params;
  let reqType = params.type === "" ? "topstories" : params.type;

  console.log(reqType);

  db_getTopStoryIds(reqType).then(ids => {
    console.log("ids to search", ids);
    _getFullDataForIds(ids).then(results => {
      console.log("repsonse ready... sending back");
      res.json(results);
    });
  });

  // find that type...
});

async function db_getTopStoryIds(reqType: TopStoriesType) {
  return new Promise<number[]>((resolve, reject) => {
    db.findOne<TopStories>({ id: reqType }, (err, doc) => {
      if (err !== null) {
        return reject(err);
      }

      console.log("group earch", doc);

      if (doc !== null) {
        console.log("doc exists");
        if (!_isTimePastThreshold(doc.lastUpdated)) {
          console.log("time is good");
          return resolve(doc.items);
        }
      }

      console.log("updating the top stories");

      _getTopStories(reqType).then(ids => {
        let topstories: TopStories = {
          id: reqType,
          items: ids,
          lastUpdated: _getUnixTimestamp()
        };

        console.log("new top stories", topstories);

        // this will update or insert the new topstories
        db.update(
          { id: topstories.id },
          topstories,
          { upsert: true },
          (err, numUpdated, upsert) => {
            console.log("topstories upsert", err, numUpdated, upsert);
            return resolve(ids);
          }
        );
      });
    });
  });
}

interface ItemParams {
  id: number;
}

function _isTimePastThreshold(timestamp: number) {
  // set to 10 minutes = 600 seconds for now
  // TODO: turn this into a constant
  return _getUnixTimestamp() - timestamp > 600;
}

function _getUnixTimestamp() {
  return Math.floor(new Date().valueOf() / 1000);
}

async function _getTopStories(type: TopStoriesType) {
  switch (type) {
    case "topstories":
      return await hn.fetchItemIds("topstories");
    case "day":
      return await AlgoliaApi.getDay();
    case "month":
      return await AlgoliaApi.getMonth();
    case "week":
      return await AlgoliaApi.getWeek();
    default:
      console.log("error missing type");
      break;
  }
}

async function getItemFromDb(itemId: number): Promise<ItemExt> {
  return new Promise<ItemExt>((resolve, reject) => {
    console.log("find one: ", itemId);
    db.findOne<ItemExt>({ id: itemId }, (err, doc) => {
      if (err !== null) {
        console.log("error, find one: ", err);
        return reject(err);
      } else {
        return resolve(doc);
      }
    });
  });
}

async function doWork(count: number) {
  // gets the front page of HN
  let itemIDs = await hn.fetchItemIds("topstories");

  // this slice just avoid extra calls for now
  // TODO: add bounds on count
  itemIDs = itemIDs.slice(0, count);

  // get the IDs, some of which are null
  let itemObjs = _getFullDataForIds(itemIDs);

  return itemObjs;
}

async function _getFullDataForIds(itemIDs: number[]) {
  let itemObjs = await Promise.all(itemIDs.map(getItemFromDb));

  for (var i = 0; i < itemObjs.length; i++) {
    let obj = itemObjs[i];

    /// TODO: add a check to the data updated
    if (obj === null) {
      console.log("id was null, going for an update", itemIDs[i]);

      let item = await hn.fetchItem(itemIDs[i]);
      await addChildrenToItemRecurse(item);
      await addItemToDb(item);

      itemObjs[i] = item;
    }
  }

  return itemObjs;
}

async function addChildrenToItemRecurse(item: Item) {
  var newItems: Item[] = [];

  // this now needs to go grab comments if they are desired
  // TODO: consider building a giant normalized list and then doing a final denorm step... that final obj coudl be saved too as a cache.

  let freshItems = await addChildrenToItem(item);

  newItems = newItems.concat(freshItems);

  // all of the kids were added... check if more kids to do

  // console.log("new items", newItems.map(item => item.id));

  if (newItems.length == 0) {
    return true;
  } else {
    return addAllChildren(newItems);
  }
}

async function addAllChildren(items: Item[]) {
  var newItems: Item[] = [];

  for (let item of items) {
    // this now needs to go grab comments if they are desired
    // TODO: consider building a giant normalized list and then doing a final denorm step... that final obj coudl be saved too as a cache.

    if (item !== null) {
      let freshItems = await addChildrenToItem(item);
      freshItems = freshItems.filter(item => item !== null);
      newItems = newItems.concat(freshItems);
    }

    // all of the kids were added... check if more kids to do
  }

  // console.log("new items", newItems.map(item => item.id));

  if (newItems.length == 0) {
    return true;
  } else {
    return addAllChildren(newItems);
  }
}

async function addChildrenToItem(item: Item): Promise<Item[]> {
  if (item.kids !== undefined && item.kids.length > 0) {
    return Promise.all(item.kids.map(kid => hn.fetchItem(kid))).then(result => {
      // result contains all of the comments loaded, run them back into the parent
      item.kidsObj = result;
      delete item.kids;

      return item.kidsObj;
    });
  } else {
    /// just send  back empty array
    return Promise.resolve([]);
  }
}

async function addItemToDb(item: Item) {
  // outputItem(item, 0);

  return new Promise((resolve, reject) => {
    db.update({ id: item.id }, item, { upsert: true }, (err, numCount) => {
      if (err) {
        return reject(err);
      } else {
        console.log("item added to DB: ", item.id);
        return resolve(true);
      }
    });
  });
}

var port = process.env.PORT || 3000;
app.listen(port);

console.log("server is running on port: " + port);

import * as rp from "request-promise";

class AlgoliaApi {
  static async getDay() {
    let timestamp = _getUnixTimestamp() - 60 * 60 * 24;

    var options = {
      uri:
        "https://hn.algolia.com/api/v1/search?tags=story&numericFilters=created_at_i>" +
        timestamp,

      json: true
    };

    let results = await rp(options);

    // these will be strings not numbers at first
    // note the object is .hits for the main data
    return results.hits.map(result => Number.parseInt(result.objectID));
  }

  static async getWeek() {
    let timestamp = _getUnixTimestamp() - 60 * 60 * 24 * 7;

    var options = {
      uri:
        "https://hn.algolia.com/api/v1/search?tags=story&numericFilters=created_at_i>" +
        timestamp,

      json: true
    };

    let results = await rp(options);

    // these will be strings not numbers at first
    // note the object is .hits for the main data
    return results.hits.map(result => Number.parseInt(result.objectID));
  }

  static async getMonth() {
    let timestamp = _getUnixTimestamp() - 60 * 60 * 24 * 7 * 30;

    var options = {
      uri:
        "https://hn.algolia.com/api/v1/search?tags=story&numericFilters=created_at_i>" +
        timestamp,

      json: true
    };

    let results = await rp(options);

    // these will be strings not numbers at first
    // note the object is .hits for the main data
    return results.hits.map(result => Number.parseInt(result.objectID));
  }
}
