import React, { createContext, useReducer } from "react";
import products from "../products.js";
import { productsReducer } from "../reducers/reducers";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [itemList, dispatch] = useReducer(productsReducer, products);

  return (
    <ProductContext.Provider value={{ itemList, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
