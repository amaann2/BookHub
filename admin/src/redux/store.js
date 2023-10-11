import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  applyMiddleware,
  legacy_createStore as createStore,
  combineReducers,
} from "redux";
import bookReducer, { singleBookReducer } from "./Book/bookReducer";
import { getAllUser, userReducer } from "./User/userReducer";
import { orderReducer } from "./Order/orderReducer";
import { categoryReducer } from "./category/categoryReducer";
import { blogReducer, singleBlogReducer } from "./Blogs/blogReducer";

const reducer = combineReducers({
  books: bookReducer,
  user: userReducer,
  allUser: getAllUser,
  orders: orderReducer,
  category: categoryReducer,
  singleBook: singleBookReducer,
  blogs: blogReducer,
  singleBlog: singleBlogReducer,
});
const initialState = {};
const middleware = [thunk, logger];
export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
