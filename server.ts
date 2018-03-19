import { HackerNewsApi } from "./api";
import * as nedb from "nedb";

const db = new nedb({ filename: "./data.db", autoload: true });

let hn = new HackerNewsApi();

// gets the front page of HN
var items = hn.fetchItemIds("topstories").then(itemIDs => {
  // this slice just avoid extra calls for now
  itemIDs = itemIDs.slice(0, 1);

  // takes those items and grab the details for it
  hn.fetchItems(itemIDs).then(items => {
    items.forEach(item => {
      // this now needs to go grab comments if they are desired
      console.log(item);

      if (item.kids !== undefined) {
        if (item.kids.length > 0) {
          var chain = [];

          Promise.all(item.kids.map(kid => hn.fetchItem(kid))).then(result => {
            // result contains all of the comments loaded, run them back into the parent

            // run again on those kids if desired

            console.log(result);

            // TODO: need to push this data back into the parent and use promises to sync tasks
          });
        }
      }

      db.insert({ item }, (err, newDoc) => {
        if (err) {
          console.log("insert error", err);
        } else {
          console.log("insert result", newDoc);
        }
      });
    });
  });
});
