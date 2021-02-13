import {
  adminLoggedReducer,
  productUpdateReducer,
  tableSelectReducer,
  cartItemsReducer,
} from "./reducers.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  cartItems: cartItemsReducer,
  adminLogged: adminLoggedReducer,
  itemList: productUpdateReducer,
  tableSelectList: tableSelectReducer,
});

export default rootReducer;
