import React, { createContext, useReducer } from "react";
import products from "../products.js";
import { productsReducer } from "../reducers/reducers";
import axios from "axios";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [itemList, dispatch] = useReducer(productsReducer, null);

  const getItems = async () => {
    try {
      let response = await axios.get("http://localhost:9000/Products");
      let data = response.data.products;
      dispatch({ type: "GET_ITEMS", payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  const getItemInfo = async (productName) => {
    await getItems();
    dispatch({ type: "FIND_ITEM", payload: productName });
  };

  return (
    <ProductContext.Provider value={{ itemList, getItems, getItemInfo }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
