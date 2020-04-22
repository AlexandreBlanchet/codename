import { actionTypes as types } from "../constants";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  errorMsg: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_LOGIN:
    case types.REQUEST_REGISTER:
    case types.REQUEST_USER:
    case types.REQUEST_LOGOUT:
      return {
        ...state,
        isLoading: true,
      };
    case types.RESPONSE_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.data,
      };
    case types.RESPONSE_LOGIN_SUCCESS:
    case types.RESPONSE_REGISTER_SUCCESS:
      localStorage.setItem("token", action.data.token);
      return {
        ...state,
        ...action.data,
        isAuthenticated: true,
        isLoading: false,
        errorMsg: {},
      };
    case types.RESPONSE_LOGIN_FAIL:
    case types.RESPONSE_REGISTER_FAIL:
    case types.RESPONSE_USER_FAIL:
    case types.RESPONSE_LOGOUT_FAIL:
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
