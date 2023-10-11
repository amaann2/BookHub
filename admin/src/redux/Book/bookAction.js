import { bookActionTypes } from "./bookActionTypes";
import axios from "axios";
export const getAllBook = () => async (dispatch) => {
  try {
    dispatch({
      type: bookActionTypes.ALL_BOOK_REQUEST,
    });
    const data = await axios.get(`/api/v1/books/adminbook/all`);

    dispatch({
      type: bookActionTypes.ALL_BOOK_SUCCESS,
      payload: data.data.book,
    });
  } catch (error) {
    dispatch({
      type: bookActionTypes.ALL_BOOK_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSingleBook = (id) => async (dispatch) => {
  try {
    dispatch({
      type: bookActionTypes.BOOK_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/books/${id}`);

    dispatch({
      type: bookActionTypes.BOOK_SUCCESS,
      payload: data.book,
    });
  } catch (error) {
    dispatch({
      type: bookActionTypes.BOOK_FAIL,
      payload: error.response.data.message,
    });
  }
};
