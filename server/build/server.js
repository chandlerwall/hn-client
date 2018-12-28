"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var compression = require("compression");
var express = require("express");
var path = require("path");
var database_1 = require("./database");
var Server = /** @class */ (function () {
    function Server() {
    }
    Server.start = function () {
        var app = express();
        app.use(bodyParser.json());
        app.use(compression());
        // this assumes that the app is running in server/build
        app.use(express.static(path.join(__dirname, "../../client/build")));
        app.set("etag", false);
        app.get("/topstories/:type", function (req, res) {
            // return a set of 30 stories with the title, comment count, and URL
            // add those to the DB and set some flag saying that they need full details loaded
            // load the first layer and note that more could be loaded
            // store those top stories for some period of time
            var params = req.params;
            var reqType = params.type;
            console.log(reqType);
            database_1.db_getTopStoryIds(reqType).then(function (ids) {
                console.log("ids to search", ids);
                database_1._getFullDataForIds(ids).then(function (results) {
                    console.log("response ready... sending back");
                    res.json(results);
                });
            });
            // find that type...
        });
        app.get("*", function (req, res) {
            res.sendFile(path.join(__dirname, "../../client/build/index.html"));
        });
        var port = process.env.PORT || 3001;
        app.listen(port);
        console.log("server is running on port: " + port);
    };
    return Server;
}());
exports.Server = Server;
