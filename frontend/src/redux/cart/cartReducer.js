import { cartActionTypes } from "./cartActionTypes";

const initialState = {
  cart: [],
};
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActionTypes.GET_USER_CART_REQUEST:
      return {
        loading: true,
        error: null,
        cart: null,
      };
    case cartActionTypes.GET_USER_CART_SUCCESS:
      return {
        loading: false,
        error: null,
        cart: action.payload,
      };
    case cartActionTypes.GET_USER_CART_FAIL:
      return {
        loading: false,
        error: action.payload,
        cart: null,
      };

    default:
      return state;
  }
};
