import { bookActionTypes } from "./bookActionTypes";

const INITIAL_STATE = {
  books: [],
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case bookActionTypes.ALL_BOOK_REQUEST:
      return {
        loading: true,
        books: [],
        error: null,
      };
    case bookActionTypes.ALL_BOOK_SUCCESS:
      return {
        loading: false,
        books: action.payload,
        error: null,
      };
    case bookActionTypes.ALL_BOOK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export const singleBookReducer = (state = { book: [] }, action) => {
  switch (action.type) {
    case bookActionTypes.BOOK_REQUEST:
      return {
        loading: true,
        book: [],
      };
    case bookActionTypes.BOOK_SUCCESS:
      return {
        loading: false,
        book: action.payload,
      };
    case bookActionTypes.BOOK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
