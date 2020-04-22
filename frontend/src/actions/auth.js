import axios from "axios";
import { actionTypes as types } from "../constants";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: types.REQUEST_USER });

  axios
    .get("../auth/user", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: types.RESPONSE_USER_SUCCESS,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.RESPONSE_USER_FAIL,
      });
    });
};

export const login = (username, password) => (dispatch) => {
  dispatch({ type: types.REQUEST_LOGIN });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, password });

  axios
    .post("../auth/login", body, config)
    .then((res) => {
      dispatch({
        type: types.RESPONSE_LOGIN_SUCCESS,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.RESPONSE_LOGIN_FAIL,
        data: err.response,
      });
    });
};

export const register = (username, password) => (dispatch) => {
  dispatch({ type: types.REQUEST_REGISTER });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });

  axios
    .post("../auth/register", body, config)
    .then((res) => {
      dispatch({
        type: types.RESPONSE_REGISTER_SUCCESS,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.RESPONSE_REGISTER_FAIL,
        data: err.response,
      });
    });
};

export const logout = () => (dispatch, getState) => {
  dispatch({ type: types.REQUEST_LOGOUT });

  axios
    .post("../auth/logout", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: types.RESPONSE_LOGOUT_SUCCESS,
        data: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.RESPONSE_LOGOUT_FAIL,
      });
    });
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
