import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as express from "express";

import { _getFullDataForIds, db_getTopStoryIds } from "./database";
import { TopStoriesParams } from "./interfaces";

export class Server {
  static start() {
    const app = express();

    app.use(bodyParser.json());
    app.use(compression());

    app.get("/topstories/:type", (req, res) => {
      // return a set of 30 stories with the titel, comment count, and URL
      // add those to the DB and set some flag saying that they need full details loaded
      // load the first layer and note that more could be loaded
      // store those top stories for some period of time

      let params: TopStoriesParams = req.params;
      let reqType = params.type;

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

    var port = process.env.PORT || 3000;
    app.listen(port);

    console.log("server is running on port: " + port);
  }
}
