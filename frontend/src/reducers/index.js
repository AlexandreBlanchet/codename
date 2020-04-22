import { combineReducers } from "redux";
import auth from "./auth";
import gameList from "./gamelist";

export default combineReducers({
  auth,
  gameList,
});
