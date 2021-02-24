import React, { createContext, useReducer } from "react";
import { cartItemsReducer } from "../reducers/reducers";
export const CartContext = createContext();
const intState = [];
const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartItemsReducer, intState);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
