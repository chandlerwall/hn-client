import "bootstrap/dist/css/bootstrap-theme.css";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import { App } from "./App";
import * as serviceWorker from "./serviceWorker";

import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://d8e8092157294c86b5014343cede60e6@sentry.io/1362584"
});

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
