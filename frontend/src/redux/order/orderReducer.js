import { orderActionTypes } from "./orderActionTypes";
export const orderReducer = (state = { myOrder: [] }, action) => {
  switch (action.type) {
    case orderActionTypes.MY_ORDER_REQUEST:
      return {
        loading: true,
        error: null,
        myOrder: [],
      };
    case orderActionTypes.MY_ORDER_SUCCESS:
      return {
        loading: false,
        error: null,
        myOrder: action.payload,
      };
    case orderActionTypes.MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
