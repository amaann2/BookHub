import { reviewActionTypes } from "./reviewActionTypes";

export const reveiwReducer = (state = { reveiws: [] }, action) => {
  switch (action.type) {
    case reviewActionTypes.GET_REVIEW_REQUEST:
      return {
        loading: true,
        reviews: [],
        error: null,
      };
    case reviewActionTypes.GET_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
        error: null,
      };
    case reviewActionTypes.GET_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
