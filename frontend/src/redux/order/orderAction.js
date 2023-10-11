import axios from "axios";
import { orderActionTypes } from "./orderActionTypes";
export const getMyOrder = () => async (dispatch) => {
  try {
    dispatch({
      type: orderActionTypes.MY_ORDER_REQUEST,
    });
    const { data } = await axios.get("/api/v1/order/myOrder", {
      withCredentials: true,
    });
    dispatch({
      type: orderActionTypes.MY_ORDER_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: orderActionTypes.MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
