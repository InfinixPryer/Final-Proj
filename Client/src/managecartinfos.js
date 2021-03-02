import React, { useEffect, useState, useCallback } from "react";
import { api } from "./App.js";

const ManageCartInfo = () => {
  const [carts, setCart] = useState([]);
  const [cartsToDisplay, setCartsToDisplay] = useState([]);
  const adminToken = localStorage.getItem("token");
  const [statFilter, setStatFilter] = useState("All");
  const [totalTransactions, setTransactions] = useState({
    total: 0,
    number: 0,
  });

  const totalTrans = (allCarts) => {
    const allCompleted = allCarts.filter((cart) => cart.status === "Completed");
    if (allCompleted.length !== 0) {
      const totalValue = allCompleted
        .map((completed) => completed.totalPrice)
        .reduce((acc, curr) => {
          return acc + curr;
        });
      setTransactions({
        total: totalValue,
        number: allCompleted.length,
      });
    }
  };

  const getCarts = useCallback(async () => {
    try {
      await api
        .get("/carts", {
          headers: {
            Authorization: adminToken,
          },
        })
        .then((res) => {
          setCart(res.data.carts);
          totalTrans(res.data.carts);
        });
    } catch (err) {
      console.error(err);
    }
  }, [adminToken]);

  useEffect(() => {
    getCarts();
    return () => {
      setCart([]);
    };
  }, [getCarts]);

  const handleFilter = (e) => {
    setStatFilter(e.target.value);
  };

  useEffect(() => {
    //   console.log(cartsToDisplay);
    const filter = (stat) => {
      const filtered = carts.filter((cart) => cart.status === stat);
      //    console.log(stat);
      if (stat === "All") {
        setCartsToDisplay(carts);
      } else setCartsToDisplay(filtered);
    };

    filter(statFilter);
  }, [statFilter, carts]);

  return (
    <>
      <div className="p-5 rounded bg-white m-2 shadow">
        <h1 className="">ORDERS</h1>{" "}
        <div className="font-source float-right p-2">
          <span className="block">
            completed orders:{` ${totalTransactions.number}`}
          </span>
          total sold:{` ${totalTransactions.total}`}
        </div>
        <select
          value={statFilter}
          onChange={(e) => handleFilter(e)}
          className="border p-2 my-2"
        >
          <option>{`All`}</option>
          <option>{`Awaiting Confirmation`}</option>
          <option>{`Confirmed by Seller`}</option>
          <option>{`Packaged`}</option>
          <option>{`On Delivery`}</option>
          <option>{`Delivered`}</option>
          <option>{`Completed`}</option>
          <option>{`Cancelled`}</option>
        </select>
        <table className="w-full">
          <thead>
            <tr className="text-xs bottom top-0 h-8 bg-black z-10 text-white shadow-lg">
              <th>STATUS</th>
              <th>ORDERS</th>
              <th>MOP</th>
              <th>DATE</th>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>CONTACT</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <Carts carts={cartsToDisplay} adminToken={adminToken} />
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </>
  );
};
const Carts = ({ carts, adminToken }) => {
  return carts.map((cart) => {
    return <CartRow cart={cart} adminToken={adminToken} key={cart.cartId} />;
  });
};

const CartRow = ({ cart, adminToken }) => {
  const {
    orderIds,
    cartId,
    cusName,
    cusAddress,
    cusPhone,
    cusEmail,
    status,
    orderDate,
    totalPrice,
  } = cart;
  const [ordStat, setStat] = useState({
    status: status,
  });
  const ChangeOrdStatus = (id) => {
    api.patch(`/carts/${id}/feedback`, ordStat, {
      headers: {
        Authorization: adminToken,
      },
    });
  };
  const handleChange = (e) => {
    setStat({ status: e.target.value });
  };

  return (
    <tr key={cartId} className="font-source text-sm">
      <td className="">
        <label>
          <select value={ordStat.status} onChange={(e) => handleChange(e)}>
            <option>{`Awaiting Confirmation`}</option>
            <option>{`Confirmed by Seller`}</option>
            <option>{`Packaged`}</option>
            <option>{`On Delivery`}</option>
            <option>{`Delivered`}</option>
            <option>{`Completed`}</option>
            <option>{`Cancelled`}</option>
          </select>
          <button onClick={() => ChangeOrdStatus(cartId)}>update</button>
        </label>
      </td>
      <td>
        <Orders orderIds={orderIds} adminToken={adminToken} />
      </td>
      <td>COD</td>
      <td>{orderDate.slice(0, 9)}</td>
      <td>{cusName}</td>
      <td>{cusAddress}</td>
      <td>
        <span className="block">{cusPhone}</span>
        <span>{cusEmail}</span>
      </td>
      <td>{totalPrice}</td>
    </tr>
  );
};

const Orders = ({ orderIds, adminToken }) => {
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
  }, [orderIds, adminToken]);

  return (
    <>
      {ordArr.map((ord) => {
        return (
          <span key={ord.orderId}>
            <span className="block">{`${ord.quantity} x ${ord.productId}`}</span>
            <span className="block">{`${ord.selectedOption} ${ord.selectedPreference}`}</span>
          </span>
        );
      })}
    </>
  );
};
export default ManageCartInfo;
