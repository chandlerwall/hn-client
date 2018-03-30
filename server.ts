import { HackerNewsApi } from "./api";
import * as nedb from "nedb";
import { Item } from "./item";

import * as express from "express";
import { Response } from "express";

import * as bodyParser from "body-parser";

const app = express();

const db = new nedb({ filename: "./data.db", autoload: true });
let hn = new HackerNewsApi();

db.ensureIndex({ fieldName: "id", unique: true }, function(err) {
  console.log("nedb unique error", err);
});

app.use(bodyParser.json());

interface TopStories {
  items: number[];
  id: "topstories";
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
            console.log("item is here!", item);
            let itemExt = item as ItemExt;
            itemExt.firstLayerOnly = true;

            // TODO: fully implement the callback here
            console.log("adding obj to DB");
            db.insert(itemExt, (err, doc) => {
              if (err != null) {
                reject(err);
              } else {
                resolve(doc);
              }
            });
          });
        } else {
          console.log("obj was in DB");
          resolve(doc);
        }
      });
    });
    promises.push(reqProm);
  });

  console.log("waiting for all requests to come through");
  return await Promise.all(promises);

  // return a obj with all of the first layer info for these?
}

app.get("/topstories", (req, res) => {
  // return a set of 30 stories with the titel, comment count, and URL
  // add those to the DB and set some flag saying that they need full details loaded
  // load the first layer and note that more could be loaded
  // store those top stories for some period of time

  db.findOne<TopStories>({ id: "topstories" }, (err, doc) => {
    console.log("err", err, "doc", doc);

    if (doc === null || _isTimePastThreshold(doc.lastUpdated)) {
      // go load top stories
      console.log("updating the top stories");
      let topIds = _getTopStories().then(ids => {
        let topstories: TopStories = {
          id: "topstories",
          items: ids,
          lastUpdated: _getUnixTimestamp()
        };
        db.insert(topstories);

        // process first layer and then return that obj

        // TODO: split ths out so it works on a second call

        // TODO: load the first layer of info for those stories
        _loadFirstLayerOfInfo(ids.slice(0, 30)).then(allObj => {
          console.log("all objects loaded...");
          res.json(allObj);
        });
      });
    } else {
      // do a check here to see how recent the topstories are

      // return those top stories as a clean object
      _loadFirstLayerOfInfo(doc.items.slice(0, 30)).then(allObj => {
        console.log("all objects loaded...");
        res.json(allObj);
      });
    }
  });
});

interface ItemParams {
  id: number;
}

function _isTimePastThreshold(timestamp: number) {
  // set to 10 minutes = 600 seconds for now
  return _getUnixTimestamp() - timestamp > 600;
}

function _getUnixTimestamp() {
  return Math.floor(new Date().valueOf() / 1000);
}

app.get("/item/:id", (req, res) => {
  // this will return a fully loaded object to be parsed by the app
  console.log(req.query);
  console.log(req.params);

  let params: ItemParams = req.params;

  let testId = params.id;
  // check if the database contains the items
  db.findOne({ id: testId }, (err, doc) => {
    console.log("error", err, "doc", doc);

    if (doc === null) {
      console.log("none was found");

      // go get the document loaded
    }
  });

  // if not, go fetch the full item from HN API

  // return the result
  res.send("it went through");
});

app.get("/*", (req, res) => {
  console.log("site is running");

  var results = doWork().then(results => {
    res.send(results);
  });
});

function outputItem(item: Item, indent: number) {
  console.log("\t".repeat(indent) + item.text);

  if (item.kidsObj !== undefined) {
    item.kidsObj.forEach(kid => outputItem(kid, indent + 1));
  }
}

async function _getTopStories() {
  return await hn.fetchItemIds("topstories");
}

async function doWork() {
  // gets the front page of HN
  let itemIDs = await hn.fetchItemIds("topstories");

  // this slice just avoid extra calls for now
  itemIDs = itemIDs.slice(0, 2);

  // takes those items and grab the details for it
  let items = await hn.fetchItems(itemIDs);
  await addAllChildren(items);

  for (let item of items) {
    await addItemToDb(item);
  }

  return items;
}

async function addAllChildren(items: Item[]) {
  console.log("starting addAllChildren");
  var newItems: Item[] = [];

  for (let item of items) {
    // this now needs to go grab comments if they are desired
    // TODO: consider building a giant normalized list and then doing a final denorm step... that final obj coudl be saved too as a cache.

    let freshItems = await addChildrenToItem(item);

    newItems = newItems.concat(freshItems);

    // all of the kids were added... check if more kids to do
  }

  console.log("new items", newItems.map(item => item.id));

  if (newItems.length == 0) {
    console.log("ending addAllChildren");
    return true;
  } else {
    return addAllChildren(newItems);
  }
}

async function addChildrenToItem(item: Item): Promise<Item[]> {
  console.log("entering addChildren");

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
  outputItem(item, 0);

  return new Promise((resolve, reject) => {
    db.insert({ item }, (err, newDoc) => {
      if (err) {
        reject(err);
      } else {
        resolve(newDoc);
      }
    });
  });
}

var port = process.env.PORT || 3000;
app.listen(port);

console.log("server is running on port: " + port);
