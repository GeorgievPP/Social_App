import React from "react";
import ReactDOM from "react-dom/client";
// REDUX Dep ...
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// REDUCERS
import reducers from "./reducers";

import App from "./App";
import "./index.css";

// configStore?
const store = createStore(reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
