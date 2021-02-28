import React, { useState, useEffect } from "react";
import ManageProducts from "../manageproducts.js";
import ManageCartInfo from "../managecartinfos.js";
import PatchItem from "../addnewproduct.js";

const Admin = () => {
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

  if (adding) {
    return <PatchItem item={null} handleAdd={handleAdd} />;
  } else if (editing.state) {
    return <PatchItem item={editing.item} />;
  }
  return (
    <>
      <ManageProducts handleEdit={handleEdit} handleAdd={handleAdd} />
      <ManageCartInfo />
    </>
  );
};

export default Admin;
