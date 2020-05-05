import * as actions from "../actions/gameList";
import { actionTypes as types } from "../constants";

const socketMiddleware = () => {
  let socket = null;

  const onOpen = (store) => (event) => {
    store.dispatch({ type: types.RESPONSE_WS_GAMELIST_OPENED });
    store.dispatch(actions.retrieveGameList());
  };

  const onClose = (store) => () => {
    store.dispatch({ type: types.RECEIVED_WS_GAMELIST_CLOSED });
  };

  const onMessage = (store) => (event) => {
    const payload = JSON.parse(event.data);
    store.dispatch({
      type: types.RECEIVED_MESSAGE_FROM_WS_GAMELIST,
      data: payload,
    });

    if (payload.response_status === 403) {
      store.dispatch({ type: types.RESPONSE_GAMELIST_FAIL });
    }
    switch (payload.action) {
      case "list":
        store.dispatch({
          type: types.RESPONSE_GAMELIST_SUCCESS,
          data: payload.data,
        });
        break;
      case "create":
        store.dispatch({
          type: types.RECEIVED_NEW_GAME,
          data: payload.data,
        });
        if (payload.response_status === 200) {
          store.dispatch({
            type: types.RESPONSE_NEW_GAME_CREATE,
            data: payload.data,
          });
        }
        break;
      case "update":
        store.dispatch({
          type: types.RECEIVED_GAMELIST_UPDATE,
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
      case types.REQUEST_WS_GAMELIST_OPEN:
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = new WebSocket(action.data);

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        return next(action);
      case types.REQUEST_WS_GAMELIST_CLOSE:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        return next(action);
      case types.REQUEST_GAMELIST:
      case types.REQUEST_CREATE_NEW_GAME:
        socket.send(JSON.stringify(action.data));
        return next(action);
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
