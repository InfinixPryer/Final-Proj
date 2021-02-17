import React, { createContext, useReducer } from "react";
import { cartItemsReducer } from "../reducers/reducers";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartItemsReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
