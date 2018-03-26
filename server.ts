import { HackerNewsApi } from "./api";
import * as nedb from "nedb";
import { Item } from "./item";

import * as express from "express";
import { Response } from "express";

import * as bodyParser from "body-parser";

const app = express();

const db = new nedb({ filename: "./data.db", autoload: true });
let hn = new HackerNewsApi();

app.use(bodyParser.json());
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

console.log("server is running on port 80");
