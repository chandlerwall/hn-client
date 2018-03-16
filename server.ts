import { HackerNewsApi } from "./api";

let hn = new HackerNewsApi();

// gets the front page of HN
var items = hn.fetchItemIds("topstories").then(itemIDs => {
  itemIDs = itemIDs.slice(0, 1);

  // takes those items and grab the details for it
  hn.fetchItems(itemIDs).then(items => {
    items.forEach(item => {
      // this now needs to go grab comments if they are desired
      console.log(item);

      // TODO: push all of this into a database
    });
  });
});
