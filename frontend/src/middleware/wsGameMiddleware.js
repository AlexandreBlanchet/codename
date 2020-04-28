import * as actions from "../actions/game";
import { actionTypes as types } from "../constants";

const socketMiddleware = () => {
  let socket = null;
  let game_id = null;

  const onOpen = (store) => (event) => {
    store.dispatch({ type: types.RESPONSE_WS_GAME_OPENED });
    store.dispatch(actions.retrieveGame(game_id));
    store.dispatch(actions.suscribeGame(game_id));
  };

  const onClose = (store) => () => {
    store.dispatch({ type: types.RECEIVED_WS_GAMELIST_CLOSED });
  };

  const onMessage = (store) => (event) => {
    const payload = JSON.parse(event.data);
    if (payload.response_status === 403 || payload.response_status === 404) {
      store.dispatch({ type: types.RESPONSE_GAME_FAIL });
      return;
    }
    switch (payload.action) {
      case "retrieve":
        store.dispatch({
          type: types.RESPONSE_GAME_SUCCESS,
          data: payload.data,
        });
        break;
      case "subscribe_instance":
        store.dispatch({
          type: types.RESPONSE_SUSCRIBE_GAME_SUCCESS,
          data: payload.data,
        });
        break;
      case "create":
        store.dispatch({
          type: types.RECEIVED_NEW_GAME,
          data: payload.data,
        });
        break;
      case "update":
        store.dispatch({
          type: types.RECEIVED_GAME_UPDATE,
          data: payload.data,
        });
        break;
      default:
        break;
    }
  };

  // the middleware part of this function
  // return next(action); is use only to display the action in the log because this action isn't handle anywhere else
  return (store) => (next) => (action) => {
    switch (action.type) {
      case types.REQUEST_WS_GAME_OPEN:
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = new WebSocket(action.data.url);
        game_id = action.data.pk;

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        return next(action);
      case types.REQUEST_WS_GAME_CLOSE:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        return next(action);
      case types.REQUEST_GAME:
      case types.REQUEST_SUSCRIBE_GAME:
        socket.send(JSON.stringify(action.data));
        return next(action);
      case types.REQUEST_JOIN_TEAM:
      case types.REQUEST_START_GAME:
      case types.REQUEST_SUBMIT_WORD:
      case types.REQUEST_SELECT_CELL:
      case types.REQUEST_SUBMIT_CELL:
        socket.send(JSON.stringify({ ...action.data, pk: game_id }));
        return next(action);
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
