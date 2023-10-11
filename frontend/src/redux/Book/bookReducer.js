import { bookActionTypes } from "./bookActionTypes";

const INITIAL_STATE = {
  books: [],
  totalBook: "",
  result: "",
};
export const bookReducer = (state = INITIAL_STATE, action) => {
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
        books: action.payload.book,
        totalBook: action.payload.Total,
        result: action.payload.result,
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
};

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

export const topFeatBook = (
  state = { featBook: [], categoryBook: [] },
  action
) => {
  switch (action.type) {
    case bookActionTypes.TOP_BOOK_REQUEST:
    case bookActionTypes.CATEGORY_BOOK_REQUEST:
      return {
        loading: true,
        featBook: [],
        categoryBook: [],
      };
    case bookActionTypes.TOP_BOOK_SUCCESS:
      return {
        loading: false,
        featBook: action.payload,
      };
    case bookActionTypes.CATEGORY_BOOK_SUCCESS:
      return {
        loading: false,
        categoryBook: action.payload,
      };
    case bookActionTypes.TOP_BOOK_FAIL:
    case bookActionTypes.CATEGORY_BOOK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
