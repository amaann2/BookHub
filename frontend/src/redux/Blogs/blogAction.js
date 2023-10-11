import { blogActionTypes } from "./blogActionTypes";
import axios from "axios";
export const getAllBlog = () => async (dispatch) => {
  try {
    dispatch({
      type: blogActionTypes.ALL_BLOG_REQUEST,
    });
    const { data } = await axios.get("/api/v1/blogs");
    dispatch({
      type: blogActionTypes.ALL_BLOG_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: blogActionTypes.ALL_BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSingleBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: blogActionTypes.BLOG_REQUEST,
    });

    const { data } = await axios.get(`/api/v1/blogs/${id}`);

    dispatch({
      type: blogActionTypes.BLOG_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: blogActionTypes.BLOG_FAIL,
      payload: error.response.data.message,
    });
  }
};
