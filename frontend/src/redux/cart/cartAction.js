import axios from "axios";
import { cartActionTypes } from "./cartActionTypes";

export const getUserCart = () => async (dispatch) => {
  try {
    dispatch({
      type: cartActionTypes.GET_USER_CART_REQUEST,
    });
    const data = await axios.get("/api/v1/cart", { withCredentials: true });
    dispatch({
      type: cartActionTypes.GET_USER_CART_SUCCESS,
      payload: data.data.userCart,
    });
  } catch (error) {
    dispatch({
      type: cartActionTypes.GET_USER_CART_FAIL,
      payload: error.response.data.message,
    });
  }
};

