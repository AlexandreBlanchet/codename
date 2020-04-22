import keymirror from "keymirror";

export var actionTypes = keymirror({
  REQUEST_LOGIN: null,
  RESPONSE_LOGIN_SUCCESS: null,
  RESPONSE_LOGIN_FAIL: null,
  REQUEST_REGISTER: null,
  RESPONSE_REGISTER_SUCCESS: null,
  RESPONSE_REGISTER_FAIL: null,
  REQUEST_USER: null,
  RESPONSE_USER_SUCCESS: null,
  RESPONSE_USER_FAIL: null,
  REQUEST_LOGOUT: null,
  RESPONSE_LOGOUT_SUCCESS: null,
  RESPONSE_LOGOUT_FAIL: null,
  REMOVE_ERROR_MESSAGE: null,

  // Game list messages
  REQUEST_GAMELIST: null,
  RESPONSE_GAMELIST_SUCCESS: null,
  RESPONSE_GAMELIST_FAIL: null,
  RECEIVED_NEW_GAME: null,

  // Web Socket Game List
  REQUEST_WS_GAMELIST_OPEN: null,
  REQUEST_WS_GAMELIST_CLOSE: null,
  RESPONSE_WS_GAMELIST_OPENED: null,
  RECEIVED_WS_GAMELIST_CLOSED: null,
  RECEIVED_MESSAGE_FROM_WS_GAMELIST: null,
  SEND_MESSAGE_TO_WS_GAMELIST: null,
});
