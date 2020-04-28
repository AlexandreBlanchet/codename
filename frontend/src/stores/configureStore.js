import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "../reducers/index";
import wsGameListMiddleware from "../middleware/wsGameListMiddleware";
import wsGameMiddleware from "../middleware/wsGameMiddleware";

var logger = createLogger({
  collapsed: true,
});

var store = createStore(
  rootReducer,
  applyMiddleware(thunk, wsGameListMiddleware, wsGameMiddleware, logger)
);

export default store;
