import "bootstrap/dist/css/bootstrap-theme.css";
import "bootstrap/dist/css/bootstrap.css";

import "@blueprintjs/core/lib/css/blueprint.css"

import * as Sentry from "@sentry/browser";
import localForage from "localforage";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import smoothscroll from "smoothscroll-polyfill";

import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

// kick off the polyfill!
smoothscroll.polyfill();

// TODO: get rid of this call eventually
Sentry.init({
  dsn: "https://d8e8092157294c86b5014343cede60e6@sentry.io/1362584"
});

window.onerror = function(msg, url, lineNo, columnNo, error) {
  // ... handle error ...
  console.error("major error", msg);
  localForage.clear();

  Sentry.captureException(error);

  document.body.innerHTML =
    "<h1>major error occurred.  local storage cleared to avoid corruption. please refresh</h1>";
};

ReactDOM.render(
  <BrowserRouter>
    <Route path={"/:page?"}>
      <App />
    </Route>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
