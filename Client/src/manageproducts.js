import React, { useEffect, useRef, useState } from "react";
import { AddNewItem } from "./addnewproduct.js";
import axios from "axios";
import api from "./App.js";

const ManageProducts = ({ itemList }) => {
  const [adding, setadding] = useState(false);
  const [tableSelectList, setList] = useState([]);
  const [deleteNotif, setDeleted] = useState({
    display: false,
    message: "",
  });
  const delSelBtn = useRef();

  useEffect(() => {
    return () => {
      setDeleted({
        display: false,
        message: "",
      });
    };
  }, []);

  const handleAdd = () => {
    setadding((state) => !state);
  };

  const handleDelItems = async () => {
    /*   if (tableSelectList.length !== 0) {
      tableSelectList.forEach((item) => {
        await api.delete(`/Products/${item.productId}`);
      });
      setDeleted({ display: true, message: "Deleted selection" });
    } else {
      setDeleted({ display: true, message: "No item selected" });
    } */
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

  if (adding) {
    return (
      <section className="w-full m-0 h-page absolute bg-gray-100">
        <div className="p-5 rounded-lg bg-white m-2 shadow-md">
          <AddNewItem />
        </div>
      </section>
    );
  }
  return (
    <section className="w-full h-page m-0 absolute bg-gray-100">
      <div className="p-5 rounded bg-white m-2 shadow-clean">
        <h1 className="">MANAGE PRODUCTS</h1>
        {deleteNotif.display && (
          <div className="w-full">{deleteNotif.message}</div>
        )}
        <span className="float-right font-poppins my-2 text-md">
          <button
            onClick={() => handleDelItems()}
            ref={delSelBtn}
            className="text-white w-52  rounded border border-red-500  disabled:bg-red-100 disabled:border-red-100 bg-red-500"
          >
            DELETE SELECTED
            {tableSelectList.length !== 0 ? (
              <h1 className="inline-block">: {tableSelectList.length}</h1>
            ) : null}
          </button>

          <button onClick={() => handleAdd()}>ADD ITEM</button>
        </span>
        <AdminItemTable itemList={itemList} handleSelect={handleSelect} />
      </div>
    </section>
  );
};

const AdminItemTable = ({ itemList, handleSelect }) => {
  return (
    <div className="w-full h-smpage overflow-scroll border border-gray-100 text-sm ">
      <table>
        <thead>
          <tr className=" font-poppins text-xs bottom top-0 h-8 bg-black z-10 text-white shadow-lg">
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
          {itemList.map((item) => {
            return (
              <TableRow
                item={item}
                key={item.productId}
                handleSelect={handleSelect}
              />
            );
          })}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

const TableRow = ({ item, handleSelect }) => {
  return (
    <tr className="border-1 bg-white" key={item.productId}>
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
      <td className="w-3/12"></td>
      <td className="w-2/12"></td>
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
        <button className="bg-gray-300 text-white border-none text-sm hover:bg-black font-semibold ml-1 mr-3 rounded-sm">
          EDIT
        </button>
      </td>
    </tr>
  );
};

export default ManageProducts;
