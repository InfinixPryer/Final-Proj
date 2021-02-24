import React, { createContext, useReducer, useEffect } from "react";
import { productsReducer } from "../reducers/reducers";
import { api } from "../App";
import { GET_ITEMS } from "../types.js";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const initialState = [
    {
      productId: "",
      productName: "a",
      productImage: [],
      typr: "",
      options: [
        {
          name: "",
          price: null,
        },
      ],
      preferences: [],
      tags: [],
    },
  ];
  const [itemList, dispatch] = useReducer(productsReducer, initialState);

  const getItems = async () => {
    try {
      const response = await api.get("/products");
      const data = response.data.products;
      dispatch({ type: GET_ITEMS, payload: data });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <ProductContext.Provider value={{ itemList, dispatch, getItems }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
