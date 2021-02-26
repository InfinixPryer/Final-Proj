import React, { useEffect, useState, useRef } from "react";
import { api } from "./App.js";

const ManageOrders = () => {
  const [ordArr, setArr] = useState([]);
  const [tableSelectList, setList] = useState([]);
  const adminToken = localStorage.getItem("token");
  const delSelBtn = useRef();

  const getOrders = async () => {
    try {
      const res = await api.get("/orders");
      setArr(res.data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleDelItems = () => {
    if (tableSelectList.length !== 0) {
      tableSelectList.forEach((id) => {
        api.delete(`/orders/${id}`, {
          headers: {
            Authorization: adminToken,
          },
        });
        getOrders();
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
        <h1 className="">ORDER ITEMS</h1>{" "}
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
              <th>ID</th>
              <th>PRODUCT ID</th>
              <th>QUANTITY</th>
              <th>OPTION</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {ordArr.map(
              ({
                orderId,
                productId,
                quantity,
                selectedOption,
                selectedPreference,
                totalPrice,
              }) => {
                return (
                  <tr key={orderId} className="font-source text-sm">
                    <td className="">
                      <label className="w-8 mx-auto h-10 flex">
                        <input
                          type="checkbox"
                          className="m-auto"
                          value={orderId}
                          onChange={(e) => handleSelect(e)}
                        />
                      </label>
                    </td>
                    <td>{orderId}</td>
                    <td>{productId}</td>
                    <td>{quantity}</td>
                    <td>
                      <span>{selectedOption}</span>
                      <span>{selectedPreference}</span>
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
export default ManageOrders;
