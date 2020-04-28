import { combineReducers } from "redux";
import auth from "./auth";
import gameList from "./gamelist";
import game from "./game";

export default combineReducers({
  auth,
  gameList,
  game,
});
