import { orderActionTypes } from "./orderActionTypes";
import axios from "axios";
export const getAllOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: orderActionTypes.ALL_ORDER_REQUEST,
    });
    const { data } = await axios.get("/api/v1/order", {
      withCredentials: true,
    });

    dispatch({
      type: orderActionTypes.ALL_ORDER_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.ALL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
