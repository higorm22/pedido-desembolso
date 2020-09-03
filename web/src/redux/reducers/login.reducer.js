import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import * as types from "../types";

const INITIAL_STATE = {
  loading: false,
  error: {},
  token: "",
  user: { matricula: "", prefixo: "", nome: "" },
  authenticated: false,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authenticated: true,
        user: { ...state.user, ...action.payload.user },
        token: action.payload.token,
        error: {},
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        token: "",
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "token", "authenticated"],
};

export default persistReducer(persistConfig, loginReducer);
