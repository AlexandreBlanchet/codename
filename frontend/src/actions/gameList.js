import { actionTypes as types } from "../constants";

// For now we directly pass the token value as the query_string -> should be cleaned
export const wsConnect = () => (dispatch, getState) => {
  const token = getState().auth.token;
  const url = `wss://${window.location.host}/ws/games?${token}`;

  dispatch({ type: types.REQUEST_WS_GAMELIST_OPEN, data: url });
};

export const retrieveGameList = () => (dispatch) => {
  dispatch({
    type: types.REQUEST_GAMELIST,
    data: { action: "list", request_id: 1 },
  });
};

export const createNewGame = () => (dispatch) => {
  dispatch({
    type: types.REQUEST_CREATE_NEW_GAME,
    data: { action: "create", data: {}, request_id: 1 },
  });
};
