import { actionTypes as types } from "../constants";

const initialState = {
  gameList: [],
  createdGameId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_WS_GAMELIST_OPEN:
    case types.REDIRECT_TO_GAME:
      return {
        ...state,
        createdGameId: null,
      };
    case types.REQUEST_GAMELIST:
      return {
        ...state,
      };
    case types.RESPONSE_GAMELIST_SUCCESS:
      return {
        ...state,
        gameList: action.data,
      };
    case types.RESPONSE_NEW_GAME_CREATE:
      return {
        ...state,
        createdGameId: action.data.id,
      };
    case types.RECEIVED_NEW_GAME:
    case types.RECEIVED_GAMELIST_UPDATE:
      return {
        ...state,
        gameList: [
          action.data,
          ...state.gameList.filter((e) => e.id !== action.data.id),
        ],
      };
    default:
      return state;
  }
}
