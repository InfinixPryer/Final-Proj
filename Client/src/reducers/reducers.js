import {
  GET_ITEMS,
  CLEAR_CART,
  DELETE_CART_ITEM,
  ADD_TO_CART,
} from "../types.js";

export const productsReducer = (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      if (!action.payload) {
        return state;
      }
      return action.payload;
    default:
      return state;
  }
};

export const cartItemsReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.payload];
    case DELETE_CART_ITEM:
      return (state = state.filter((a) => a.key !== action.payload));
    case CLEAR_CART:
      const clr = [];
      return clr;
    default:
      return state;
  }
};
