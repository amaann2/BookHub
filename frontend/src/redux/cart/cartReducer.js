import { cartActionTypes } from "./cartActionTypes";

const initialState = {
  cart: [],
  quantity: 0,
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActionTypes.GET_USER_CART_REQUEST:
    case cartActionTypes.GET_USER_CART_QUANTITY_REQUEST:
      return {
        loading: true,
        error: null,
        cart: null,
      };
    case cartActionTypes.GET_USER_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        cart: action.payload,
      };
    case cartActionTypes.GET_USER_CART_QUANTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        quantity: action.payload,
      };
    case cartActionTypes.GET_USER_CART_FAIL:
    case cartActionTypes.GET_USER_CART_QUANTITY_FAIL:
      return {
        loading: false,
        error: action.payload,
        cart: null,
      };

    default:
      return state;
  }
};
