import React, { useEffect, useState, useRef } from "react";
import { api } from "./App.js";

const ManageCartInfo = () => {
  const [carts, setCart] = useState([]);
  const [tableSelectList, setList] = useState([]);
  const adminToken = localStorage.getItem("token");
  const delSelBtn = useRef();

  const getCarts = async () => {
    try {
      const res = await api.get("/carts", {
        headers: {
          Authorization: adminToken,
        },
      });
      setCart(res.data.carts);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(getCarts, [adminToken]);

  const handleDelItems = () => {
    if (tableSelectList.length !== 0) {
      tableSelectList.forEach((id) => {
        fetch(`/carts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: adminToken,
          },
        });
      });
    }
    setList([]);
    getCarts();
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
              <th>ORDERS</th>
              <th>DATE</th>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>CONTACT</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <Carts
              carts={carts}
              adminToken={adminToken}
              handleSelect={handleSelect}
            />
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </>
  );
};
const Carts = ({ carts, adminToken, handleSelect }) => {
  return carts.map(
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
            <Orders orderIds={orderIds} adminToken={adminToken} carts={carts} />
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
  );
};

const Orders = ({ orderIds, adminToken, carts }) => {
  const [ordArr, setOrds] = useState([]);

  useEffect(() => {
    const getOrder = async (id) => {
      try {
        const res = await api.get(`/orders/${id}`, {
          headers: {
            Authorization: adminToken,
          },
        });
        const data = res.data.order;
        setOrds((prev) => prev.concat(data));
      } catch (err) {
        console.error(err);
      }
    };

    orderIds.forEach((id) => getOrder(id));
    return () => {
      setOrds([]);
    };
  }, [orderIds, adminToken, carts]);

  return (
    <>
      {ordArr.map((ord) => {
        return (
          <span key={ord.orderId}>
            <span className="">{ord.quantity}</span>
            <span className="block">{ord.productId}</span>
            <span className="block">{`${ord.selectedOption} ${ord.selectedPreference}`}</span>
          </span>
        );
      })}
    </>
  );
};
export default ManageCartInfo;
