import { actionTypes as types } from "../constants";

const initialState = {
  gameList: [{ pk: 1, status: "P" }],
  isLoading: false,
  gamesRetrieved: false,
  socketOpened: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_GAMES:
      return {
        ...state,
        isLoading: true,
      };
    case types.RESPONSE_GAMES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        gameList: action.data,
      };
    case types.RECEIVE_NEW_GAME:
      return {
        ...state,
        gameList: [...gameList, action.data],
      };
    case types.RESPONSE_LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        errorMsg: { ...action.data, type: action.type },
      };
    case types.REMOVE_ERROR_MESSAGE:
      return {
        ...state,
        errorMsg: {},
      };

    default:
      return state;
  }
}
