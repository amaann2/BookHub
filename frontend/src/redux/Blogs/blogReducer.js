import { blogActionTypes } from "./blogActionTypes";

export const blogReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case blogActionTypes.ALL_BLOG_REQUEST:
      return {
        loading: true,
        error: null,
      };
    case blogActionTypes.ALL_BLOG_SUCCESS:
      return {
        loading: false,
        blogs: action.payload,
        error: null,
      };
    case blogActionTypes.ALL_BLOG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const singleBlogReducer = (state = { blog: [] }, action) => {
  switch (action.type) {
    case blogActionTypes.BLOG_REQUEST:
      return {
        loading: true,
        blog: [],
      };
    case blogActionTypes.BLOG_SUCCESS:
      return {
        loading: false,
        blog: action.payload,
      };
    case blogActionTypes.BLOG_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
