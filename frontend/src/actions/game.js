import { actionTypes as types } from "../constants";

// For now we directly pass the token value as the query_string -> should be cleaned
export const wsConnect = (pk) => (dispatch, getState) => {
  const token = getState().auth.token;
  const url = `wss://${window.location.host}/ws/game?${token}`;

  dispatch({ type: types.REQUEST_WS_GAME_OPEN, data: { url, pk } });
};

export const retrieveGame = (pk) => (dispatch) => {
  dispatch({
    type: types.REQUEST_GAME,
    data: { action: "retrieve", pk, request_id: 1 },
  });
};

export const suscribeGame = (pk) => (dispatch) => {
  dispatch({
    type: types.REQUEST_SUSCRIBE_GAME,
    data: { action: "subscribe_instance", pk, request_id: 1 },
  });
};

export const joinTeam = (team) => (dispatch) => {
  dispatch({
    type: types.REQUEST_JOIN_TEAM,
    data: { action: "join_team", team, request_id: 1 },
  });
};

export const removePlayer = (player_id) => (dispatch) => {
  dispatch({
    type: types.REQUEST_REMOVE_PLAYER,
    data: { action: "remove_player", player_id, request_id: 1 },
  });
};

export const selectLeader = (player_id) => (dispatch) => {
  dispatch({
    type: types.REQUEST_SELECT_LEADER,
    data: { action: "select_leader", player_id, request_id: 1 },
  });
};

export const startGame = () => (dispatch) => {
  dispatch({
    type: types.REQUEST_START_GAME,
    data: { action: "start_game", request_id: 1 },
  });
};

export const submitWord = (word, number) => (dispatch) => {
  dispatch({
    type: types.REQUEST_SUBMIT_WORD,
    data: { action: "submit_word", word, number, request_id: 1 },
  });
};

export const selectCell = (cellId) => (dispatch) => {
  dispatch({
    type: types.REQUEST_SELECT_CELL,
    data: { action: "select_cell", cell_id: cellId, request_id: 1 },
  });
};

export const submitCell = () => (dispatch) => {
  dispatch({
    type: types.REQUEST_SUBMIT_CELL,
    data: { action: "submit_cell", request_id: 1 },
  });
};

export const stopRound = () => (dispatch) => {
  dispatch({
    type: types.REQUEST_STOP_ROUND,
    data: { action: "stop_round", request_id: 1 },
  });
};
