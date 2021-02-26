import React, { useEffect, useRef, useState, useContext } from "react";
import { ProductContext } from "./context/ProductContext";
import { api } from "./App.js";

const ManageProducts = ({ handleAdd, handleEdit }) => {
  const { itemList } = useContext(ProductContext);
  const [tableSelectList, setList] = useState([]);
  const [deleteNotif, setDeleted] = useState({
    display: false,
    message: "",
  });
  const delSelBtn = useRef();
  const adminToken = localStorage.getItem("token");

  useEffect(() => {
    return () => {
      setDeleted({
        display: false,
        message: "",
      });
    };
  }, []);

  const handleDelItems = () => {
    if (tableSelectList.length !== 0) {
      tableSelectList.forEach((item) => {
        api
          .delete(`Products/${item}`, {
            headers: {
              Authorization: adminToken,
            },
          })
          .then(() => {
            setDeleted({ display: true, message: "Deleted selection" });
            window.location.reload();
          });
      });
    } else {
      setDeleted({ display: true, message: "No item selected" });
    }
  };

  const handleSelect = (e) => {
    const sel = e.target;
    if (sel.checked) {
      setList((prev) => prev.concat(sel.value));
    } else setList((prev) => prev.filter((index) => index !== sel.value));
  };

  useEffect(() => {
    tableSelectList.length !== 0
      ? (delSelBtn.current.disabled = false)
      : (delSelBtn.current.disabled = true);
  }, [tableSelectList]);

  return (
    <div className="p-5 rounded flex flex-col bg-white m-2 shadow">
      <h1 className="">MANAGE PRODUCTS</h1>{" "}
      {deleteNotif.display && (
        <div className="w-full">{deleteNotif.message}</div>
      )}
      <span className="ml-auto my-2">
        <button
          onClick={() => handleDelItems()}
          ref={delSelBtn}
          className="text-white w-52 border border-red-500  disabled:bg-red-100 disabled:border-red-100 bg-red-500"
        >
          DELETE SELECTED
          {tableSelectList.length !== 0 ? (
            <h1 className="inline-block">: {tableSelectList.length}</h1>
          ) : null}
        </button>

        <button onClick={() => handleAdd()}>ADD ITEM</button>
      </span>
      <AdminItemTable
        itemList={itemList}
        handleEdit={handleEdit}
        handleSelect={handleSelect}
      />
    </div>
  );
};

const AdminItemTable = ({ itemList, handleSelect, handleEdit }) => {
  const [tableItems, setItems] = useState([]);

  useEffect(() => {
    setItems(itemList);
  }, [itemList]);

  return (
    <table className="w-full">
      <thead>
        <tr className="text-xs bottom top-0 h-8 bg-black z-10 text-white shadow-lg">
          <th>{`\u2713`}</th>
          <th>ID</th>
          <th className="w-40">ITEM NAME</th>
          <th>OPTIONS</th>
          <th>TAGS</th>
          <th>IMAGES</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {tableItems.map((item) => {
          return (
            <TableRow
              item={item}
              key={item.productId}
              handleSelect={handleSelect}
              handleEdit={handleEdit}
            />
          );
        })}
      </tbody>
      <tfoot></tfoot>
    </table>
  );
};

const TableRow = ({ item, handleSelect, handleEdit }) => {
  return (
    <tr className="border font-source text-sm bg-white" key={item.productId}>
      <td className="m-auto">
        <label className="w-10 h-20 flex">
          <input
            type="checkbox"
            className="m-auto"
            value={item.productId}
            onChange={(e) => handleSelect(e)}
          />
        </label>
      </td>
      <td className="p-2">{item.productId}</td>
      <td className="w-2/12 p-2">{item.productName}</td>
      <td className="w-3/12">
        {item.options.map((opt) => {
          return (
            <span key={item.productId + opt.name}>
              <h1>{`name: ${opt.name}`}</h1>
              <h1>{`price: ${opt.price}`}</h1>
            </span>
          );
        })}
      </td>
      <td className="w-2/12">
        {item.tags.map((tag) => {
          return (
            <span key={item.productId + tag}>
              <h1>{tag}</h1>
            </span>
          );
        })}
      </td>
      <td className="w-5/12">
        <span className="flex w-full h-20">
          {item.productImage.map((img) => {
            return (
              <img
                src={img}
                key={img}
                className="p-1 w-20"
                alt={item.productName}
              />
            );
          })}
        </span>
      </td>
      <td className="">
        <button
          onClick={() => handleEdit(item)}
          className="bg-gray-300 text-white border-none text-sm hover:bg-black ml-1 mr-3 rounded-sm"
        >
          EDIT
        </button>
      </td>
    </tr>
  );
};

export default ManageProducts;
