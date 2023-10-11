import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  applyMiddleware,
  legacy_createStore as createStore,
  combineReducers,
} from "redux";
import { userReducer } from "./User/userReducer";
import { cartReducer } from "./cart/cartReducer";
import {
  bookReducer,
  singleBookReducer,
  topFeatBook,
} from "./Book/bookReducer";
import { categoryReducer } from "./category/categoryReducer";
import { reveiwReducer } from "./Review/reviewReducer";
import { orderReducer } from "./order/orderReducer";
import { blogReducer, singleBlogReducer } from "./Blogs/blogReducer";

const reducer = combineReducers({
  books: bookReducer,
  user: userReducer,
  cart: cartReducer,
  featBook: topFeatBook,
  category: categoryReducer,
  singleBook: singleBookReducer,
  reviews: reveiwReducer,
  myOrder: orderReducer,
  blogs: blogReducer,
  singleBlog: singleBlogReducer,
});
const initialState = {};
const middleware = [thunk];
export const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
