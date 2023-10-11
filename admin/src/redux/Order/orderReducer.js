import { orderActionTypes } from "./orderActionTypes";

const INITIAL_STATE = {
  orders: [],
};
export const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderActionTypes.ALL_ORDER_REQUEST:
      return {
        loading: true,
        orders: [],
        error: null,
      };
    case orderActionTypes.ALL_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
        error: null,
      };
    case orderActionTypes.ALL_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
