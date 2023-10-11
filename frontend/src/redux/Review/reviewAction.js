import axios from "axios";
import { reviewActionTypes } from "./reviewActionTypes";

export const getReiviewOfBook = (id) => async (dispatch) => {
  try {
    dispatch({
      type: reviewActionTypes.GET_REVIEW_REQUEST,
    });
    const { data } = await axios.get(`/api/v1/review/${id}`);

    dispatch({
      type: reviewActionTypes.GET_REVIEW_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    dispatch({
      type: reviewActionTypes.GET_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
