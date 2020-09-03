import { combineReducers } from "redux";

import loginReducer from "./reducers/login.reducer";
import pedidoReducer from "./reducers/pedido.reducer";

const rootReducer = combineReducers({
  loginReducer,
  pedidoReducer,
});

export default rootReducer;
