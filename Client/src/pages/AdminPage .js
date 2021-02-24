import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import ManageProducts from "../manageproducts.js";
import { Loading } from "./LandingPage.js";

const Admin = () => {
  const { itemList, getItems } = useContext(ProductContext);
  const [items, setItems] = useState(null);

  useEffect(() => {
    getItems();
    setItems(itemList);
  }, []);

  const reloader = () => {
    getItems();
    setItems(itemList);
  };

  if (items === null) {
    return <Loading />;
  }
  return <ManageProducts itemList={itemList} reloader={reloader} />;
};

export default Admin;
