import React from "react";

//Replacement of ReactDOM for React v18
import {createRoot} from "react-dom/client"

import "./index.css";
import Routes from "./Routes";

//Importing Redux Modules
import { Provider } from "react-redux";
import store from "./store";

//Getting root file
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

//Interfacing with customised routes
root.render(
  <Provider store={store}>
    <Routes />
  </Provider>
);
