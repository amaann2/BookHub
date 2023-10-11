import { userActionType } from "./userActionTypes";

const INITIAL_STATE = {
  currentUser: null,
  isAuthentication: false,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionType.set_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuthentication: true,
        error: null,
      };
    case userActionType.LOAD_USER_REQUEST:
      return {
        isAuthentication: false,
        currentUser: null,
      };
    case userActionType.LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthentication: true,
        currentUser: action.payload,
      };
    case userActionType.LOAD_USER_FAIL:
      return {
        isAuthentication: false,
        currentUser: null,
        error: action.payload,
      };
    case userActionType.LOGOUT_SUCCESS:
      return {
        isAuthentication: false,
        currentUser: null,
      };
    case userActionType.LOGOUT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getAllUser = (state = { users: [] }, action) => {
  switch (action.type) {
    case userActionType.GET_ALL_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userActionType.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case userActionType.GET_ALL_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
