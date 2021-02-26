import React, { useEffect, useState, useRef } from "react";
import { api } from "./App.js";

const ManageCartInfo = () => {
  const [carts, setCart] = useState([]);
  const [tableSelectList, setList] = useState([]);
  const adminToken = localStorage.getItem("token");
  const delSelBtn = useRef();

  const getCarts = async () => {
    try {
      const res = await api.get("/carts");
      setCart(res.data.carts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  const handleDelItems = () => {
    if (tableSelectList.length !== 0) {
      tableSelectList.forEach((id) => {
        api.delete(`/carts/${id}`, {
          headers: {
            Authorization: adminToken,
          },
        });
        getCarts();
      });
    }
    setList([]);
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
    <>
      <div className="p-5 rounded bg-white m-2 shadow">
        <h1 className="">ORDERS</h1>{" "}
        <button
          onClick={() => handleDelItems()}
          ref={delSelBtn}
          className="text-white w-52 float-right my-2 rounded border border-red-500  disabled:bg-red-100 disabled:border-red-100 bg-red-500"
        >
          DELETE SELECTED
          {tableSelectList.length !== 0 ? (
            <h1 className="inline-block">: {tableSelectList.length}</h1>
          ) : null}
        </button>
        <table className="w-full">
          <thead>
            <tr className="text-xs bottom top-0 h-8 bg-black z-10 text-white shadow-lg">
              <th>{`\u2713`}</th>
              <th>ORDER IDS</th>
              <th>DATE</th>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>CONTACT</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {carts.map(
              ({
                orderIds,
                cartId,
                cusName,
                cusAddress,
                cusPhone,
                cusEmail,
                orderDate,
                totalPrice,
              }) => {
                return (
                  <tr key={cartId} className="font-source text-sm">
                    <td className="">
                      <label className="w-8 mx-auto h-10 flex">
                        <input
                          type="checkbox"
                          className="m-auto"
                          value={cartId}
                          onChange={(e) => handleSelect(e)}
                        />
                      </label>
                    </td>
                    <td>
                      {orderIds.map((id) => (
                        <span key={id}>{id}</span>
                      ))}
                    </td>
                    <td>{orderDate}</td>
                    <td>{cusName}</td>
                    <td>{cusAddress}</td>
                    <td>
                      <span className="block">{cusPhone}</span>
                      <span>{cusEmail}</span>
                    </td>
                    <td>{totalPrice}</td>
                  </tr>
                );
              }
            )}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </>
  );
};
export default ManageCartInfo;
