import * as types from "../types";

const INITIAL_STATE = {
  loading: false,
  error: {},
  pedidos: [],
  pedido: {},
};

const pedidoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_PEDIDO:
      return {
        ...state,
        pedido: action.payload,
      };

    case types.PEDIDO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.PEDIDO_SUCCESS:
      return {
        ...state,
        loading: false,
        pedidos: action.payload,
        error: {},
      };
    case types.PEDIDO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.SAVE_PEDIDO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.SAVE_PEDIDO_SUCCESS:
      return {
        ...state,
        loading: false,
        pedidos: action.payload,
        error: {},
      };
    case types.SAVE_PEDIDO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default pedidoReducer;
