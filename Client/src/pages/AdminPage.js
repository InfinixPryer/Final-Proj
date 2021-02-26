import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import ManageProducts from "../manageproducts.js";
import ManageOrders from "../manageorders.js";
import PatchItem from "../addnewproduct.js";
import { api } from "../App.js";

const Admin = () => {
  const { itemList, getItems } = useContext(ProductContext);
  const [orders, setOrders] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState({ state: false, item: "" });

  const getOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    }
  };
  const handleAdd = () => {
    setAdding((state) => !state);
  };
  const handleEdit = (item) => {
    setEditing((last) => {
      return {
        state: !last.state,
        item: item,
      };
    });
  };
  useEffect(() => {
    getOrders();
    setOrders(orders);
  }, []);

  if (adding) {
    return <PatchItem item={null} />;
  } else if (editing.state) {
    return <PatchItem item={editing.item} />;
  }
  return (
    <>
      <ManageProducts
        itemList={itemList}
        getItems={getItems}
        handleEdit={handleEdit}
        handleAdd={handleAdd}
      />
      <ManageOrders orders={orders} getOrders={getOrders} />
    </>
  );
};

export default Admin;
