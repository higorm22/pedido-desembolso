import Axios from "../../services";
import * as types from "../types";

const setPedido = (object) => {
  return {
    type: types.SET_PEDIDO,
    payload: object,
  };
};

const pedidosRequest = () => {
  return {
    type: types.PEDIDO_REQUEST,
  };
};

const pedidosSuccess = (data) => {
  return {
    type: types.PEDIDO_SUCCESS,
    payload: data,
  };
};

const pedidosFailure = (error) => {
  return {
    type: types.PEDIDO_FAILURE,
    payload: error,
  };
};

const listPedidos = (token) => {
  console.log("Fetching pedidos...", token);
  return (dispatch) => {
    dispatch(pedidosRequest());

    const headers = { Authorization: "Bearer " + token };

    Axios.get("/pedidos", { headers })
      .then(async (response) => {
        console.log("PEDIDOS SUCCESS", response.data);
        dispatch(pedidosSuccess(response.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(pedidosFailure(error.response));
        }
      });
  };
};

const savePedidoRequest = () => {
  return {
    type: types.SAVE_PEDIDO_REQUEST,
  };
};

const savePedidoSuccess = (data) => {
  return {
    type: types.SAVE_PEDIDO_SUCCESS,
    payload: data,
  };
};

const savePedidoFailure = (error) => {
  return {
    type: types.SAVE_PEDIDO_FAILURE,
    payload: error,
  };
};

const savePedido = (token, pedido, user) => {
  pedido.prefixo = user.prefixo;

  
  return (dispatch) => {
    dispatch(savePedidoRequest());

    const headers = { Authorization: "Bearer " + token };

    Axios.post("/pedidos", pedido, { headers })
      .then(async (response) => {
        dispatch(savePedidoSuccess(response.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(savePedidoFailure(error.response));
        }
      });
  };
};
export default {
  setPedido,
  listPedidos,
  savePedido,
};
