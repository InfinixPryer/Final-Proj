import React, { useState } from "react";
import ManageProducts from "../manageproducts.js";
import ManageCartInfo from "../managecartinfos.js";
import PatchItem from "../addnewproduct.js";

const Admin = () => {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState({ state: false, item: "" });
  const [manageProdsPage, setMP] = useState(false);

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

  if (adding && manageProdsPage) {
    return <PatchItem item={null} handleAdd={handleAdd} />;
  } else if (editing.state && manageProdsPage) {
    return <PatchItem item={editing.item} />;
  }
  return (
    <>
      <div className="w-4/12 flex justify-between m-auto mt-8 /absolute /right-7 pt-2">
        <button
          onClick={() => setMP(true)}
          className=" w-52 hover:from-espresso hover:to-coffee bg-gradient-to-tr border-none shadow text-center py-2 "
        >
          View Products
        </button>
        <button
          onClick={() => setMP(false)}
          className="w-52 hover:from-espresso hover:to-coffee bg-gradient-to-tr border border-none shadow text-center py-2"
        >
          View Orders
        </button>
      </div>
      {manageProdsPage ? (
        <ManageProducts handleEdit={handleEdit} handleAdd={handleAdd} />
      ) : (
        <ManageCartInfo />
      )}
    </>
  );
};

export default Admin;
