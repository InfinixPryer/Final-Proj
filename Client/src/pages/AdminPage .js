import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import ManageProducts from "../manageproducts.js";
import { Loading } from "./LandingPage.js";

const Admin = () => {
  const { itemList } = useContext(ProductContext);
  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(itemList);
  }, [itemList]);
  if (items === null) {
    return <Loading />;
  }
  return <ManageProducts itemList={items} />;
};

export default Admin;
