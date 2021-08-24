import "core-js/stable";
import "regenerator-runtime/runtime";


import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.less";
import { Provider } from "react-redux";
import store from "./store/store";

const app = (
  <Provider store={store}>
    <BrowserRouter basename="/effect-covid-learner-survey">
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
