import { categoryActionTypes } from "./categoryActionTypes";

const INITIAL_STATE = {
  category: [],
};
export const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case categoryActionTypes.ALL_CATEGORY_REQUEST:
      return {
        loading: true,
        category: [],
        error: null,
      };
    case categoryActionTypes.ALL_CATEGORY_SUCCESS:
      return {
        loading: false,
        category: action.payload,
        error: null,
      };
    case categoryActionTypes.ALL_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
