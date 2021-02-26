import React, { useEffect, useState } from "react";
import ManageProducts from "../manageproducts.js";
import ManageOrders from "../manageorders.js";
import PatchItem from "../addnewproduct.js";
import { api } from "../App.js";

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState({ state: false, item: "" });

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
    setOrders(orders);
  }, []);

  if (adding) {
    return <PatchItem item={null} handleAdd={handleAdd} />;
  } else if (editing.state) {
    return <PatchItem item={editing.item} />;
  }
  return (
    <>
      <ManageProducts handleEdit={handleEdit} handleAdd={handleAdd} />
      <ManageOrders orders={orders} />
    </>
  );
};

export default Admin;
