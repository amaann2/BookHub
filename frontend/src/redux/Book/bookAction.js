import { bookActionTypes } from "./bookActionTypes";
import axios from "axios";
export const getAllBook =
  (currentPage = 1, sort, selectedCategory, search) =>
  async (dispatch) => {
    try {
      dispatch({
        type: bookActionTypes.ALL_BOOK_REQUEST,
      });
      const categoryParam = selectedCategory ? selectedCategory : null;
      const params = {
        page: currentPage,
        limit: 12,
        sort: sort,
        category: categoryParam,
        keyword: search,
      };
      const data = await axios.get(`/api/v1/books/`, {
        params,
      });

      dispatch({
        type: bookActionTypes.ALL_BOOK_SUCCESS,
        payload: data.data,
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

export const getFeatureBook = () => async (dispatch) => {
  try {
    dispatch({
      type: bookActionTypes.TOP_BOOK_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/books/featbooks/feat`);

    dispatch({
      type: bookActionTypes.TOP_BOOK_SUCCESS,
      payload: data.book,
    });
  } catch (error) {
    dispatch({
      type: bookActionTypes.TOP_BOOOK_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getBookByCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: bookActionTypes.CATEGORY_BOOK_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/books/bookByCat/${id}`);

    dispatch({
      type: bookActionTypes.CATEGORY_BOOK_SUCCESS,
      payload: data.book,
    });
  } catch (error) {
    dispatch({
      type: bookActionTypes.CATEGORY_BOOK_FAIL,
      payload: error.response.data.message,
    });
  }
};
