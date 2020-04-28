import { actionTypes as types } from "../constants";

const initialState = {
  gameList: [{ pk: 1, status: "P" }],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_GAMELIST:
      return {
        ...state,
        isLoading: true,
      };
    case types.RESPONSE_GAMELIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        gameList: action.data,
      };
    case types.RECEIVED_NEW_GAME:
      return {
        ...state,
        gameList: [action.data, ...state.gameList],
      };
    case types.RECEIVED_GAME_UPDATE:
      return {
        ...state,
        gameList: [
          action.data,
          ...state.gameList.filter((e) => e.pk !== action.data.pk),
        ],
      };

    default:
      return state;
  }
}
