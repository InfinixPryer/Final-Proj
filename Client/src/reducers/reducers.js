import { GET_ITEMS, DELETE_ITEMS } from "../types.js";

export const adminLoggedReducer = (state = false, action) => {
  switch (action.type) {
    case "ADMIN_LOGGED":
      return !state;
    default:
      return state;
  }
};

export const productsReducer = (state, action) => {
  switch (action.type) {
    case GET_ITEMS:
      if (!action.payload) {
        console.log(state);
        return state;
      }
      return action.payload;
    case DELETE_ITEMS:
      return state.filter((obj) => obj.productId !== action.payload);
    default:
      return state;
  }
};

export const cartItemsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "DELETE_CART_ITEM":
      return (state = state.filter((a) => a.key !== action.payload));
    case "CLEAR_CART":
      const clr = [];
      return clr;
    default:
      return state;
  }
};

export const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TAG":
      return state.concat(action.payload);
    case "DELETE_TAG":
      return state.concat(action.payload);
    default:
      return state.splice(0, state.length);
  }
};

export const sortItemsReducer = (state = "", action) => {
  switch (action.type) {
    case "FIND_BY_TAG":
      return state.concat(action.payload); //on tag click requests all matching objects
    case "FIND_BY_NAME":
      return action.payload.toLowerCase(); //on search click requests all the matching objects
    default:
      return state;
  }
};

export const screenReducer = (state = "", action) => {
  switch (action.type) {
    case "MOBILE":
      return (state = "md");
    case "DESKTOP":
      return (state = "sm");
    default:
      return state;
  }
};
