import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as path from "path";

import { _getFullDataForIds, db_getTopStoryIds } from "./database";
import { ItemExt, TopStoriesParams, TopStoriesType } from "./interfaces";

const cachedData: { [key: string]: ItemExt[] } = {};

export class Server {
  static start() {
    const app = express();

    app.use(bodyParser.json());
    app.use(compression());

    // this assumes that the app is running in server/build
    app.use(express.static(path.join(__dirname, "../../client/build")));

    app.get("/topstories/:type", (req, res) => {
      // return a set of 30 stories with the title, comment count, and URL
      // add those to the DB and set some flag saying that they need full details loaded
      // load the first layer and note that more could be loaded
      // store those top stories for some period of time

      let params: TopStoriesParams = req.params;
      let reqType = params.type;

      console.log(new Date(), reqType);
      res.json(cachedData[reqType]);

      // find that type...
    });

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../client/build/index.html"));
    });

    var port = process.env.PORT || 3001;
    app.listen(port);

    // set up the auto download

    setInterval(updateData, 10 * 60 * 1000);
    updateData();

    console.log("server is running on port: " + port);
  }
}

let index = 0;
async function updateData() {
  const updateList: TopStoriesType[] = ["topstories"];
  if (index % 6 === 0) {
    // every hour
    updateList.push("day");
  }
  if (index % (6 * 6) === 0) {
    // every 6 hours
    updateList.push("week");
  }
  if (index % (6 * 24) === 0) {
    // every 3 days
    updateList.push("month");
    index = 1;
  }
  console.log(new Date(), "refresh interval hit");

  updateList.forEach(async storyType => {
    console.log(new Date(), "calling for update to", storyType);

    // get the data
    const results = await db_getTopStoryIds(storyType).then(ids => {
      return _getFullDataForIds(ids);
    });

    // save result to local cache... will be served
    cachedData[storyType] = results;

    console.log(new Date(), "update complete", storyType);
  });
  index++;
}
