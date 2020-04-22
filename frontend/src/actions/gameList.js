import { actionTypes as types } from "../constants";

// For now we directly pass the token value as the query_string -> should be cleaned
export const wsConnect = (path) => (dispatch, getState) => {
  const token = getState().auth.token;
  const url = `ws://localhost:8000/ws/${path}?${token}`;

  dispatch({ type: types.REQUEST_WS_GAMELIST_OPEN, data: url });
};

export const retrieveGameList = () => (dispatch) => {
  dispatch({
    type: types.REQUEST_GAMELIST,
    data: { action: "list", request_id: 1 },
  });
};
