import Axios from "../../services";
import * as types from "../types";
import allActions from "./index";

const loginRequest = () => {
  return {
    type: types.LOGIN_REQUEST,
  };
};

const loginSuccess = (data) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data,
  };
};

const loginFailure = (error) => {
  return {
    type: types.LOGIN_FAILURE,
    payload: error,
  };
};

const login = () => {
  console.log("Fetchiing user data through login...");

  return (dispatch) => {
    dispatch(loginRequest());

    Axios.post("/login")
      .then(async (response) => {
        dispatch(loginSuccess(response.data));
        console.log("responseee", response);
      })
      .catch((error) => {
        if (error.response) {
          dispatch(loginFailure(error.response));
        }
      });
  };
};
export default {
  login,
};
