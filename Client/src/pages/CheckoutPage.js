import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { CartContainer } from "./CartPage";
import { CLEAR_CART } from "../types";
import { api } from "../App.js";

const Checkout = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [isSuccess, setSuccess] = useState(false);
  const [fullname, setName] = useState({
    fname: "",
    lname: "",
  });
  const orderArr = cart.map((item) => {
    const order = {
      productId: item.productId,
      selectedOption: item.selectedOption,
      selectedPreference: item.selectedPreference,
      quantity: item.quantity,
      totalPrice: item.totalPrice,
    };
    return order;
  });
  const [orderInfo, setOrder] = useState({
    orderItems: orderArr,
    totalPrice: 0,
    cusName: ``,
    cusAddress: "",
    cusPhone: "",
    cusEmail: "",
  });

  useEffect(() => {
    setOrder({ ...orderInfo, cusName: `${fullname.fname} ${fullname.lname}` });
  }, [fullname]);

  useEffect(() => {
    if (cart.length !== 0) {
      const total = cart.map((i) => i.totalPrice).reduce((p, t) => p + t);
      setOrder({ ...orderInfo, totalPrice: total });
    } else setOrder({ ...orderInfo, totalPrice: 0 });
  }, [cart]);

  const { cusAddress, cusPhone, cusEmail } = orderInfo;

  const handleChange = (e) => {
    const data = e.target.value;
    switch (e.target.id) {
      case "fname":
        setName({ ...fullname, fname: data });
        break;
      case "lname":
        setName({ ...fullname, lname: data });
        break;
      case "address":
        setOrder({ ...orderInfo, cusAddress: data });
        break;
      case "contact":
        setOrder({ ...orderInfo, cusPhone: data });
        break;
      case "email":
        setOrder({ ...orderInfo, cusEmail: data });
      default:
        break;
    }
  };
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (
      cart.length !== 0 &&
      orderInfo.cusAddress.length > 10 &&
      orderInfo.cusPhone.length > 9 &&
      orderInfo.cusPhone.length < 14
    ) {
      try {
        api.post("/carts", orderInfo).then(() => {
          setSuccess(true);
        });
      } catch (err) {
        console.error(err);
      } finally {
        dispatch({ type: CLEAR_CART });
        setOrder({
          orderItems: orderArr,
          totalPrice: 0,
          cusName: ``,
          cusAddress: "",
          cusPhone: "",
          cusEmail: "",
        });
        setName({
          fname: "",
          lname: "",
        });
      }
    }
  };
  return (
    <>
      <div className="w-full">
        {isSuccess && (
          <span className="absolute z-50 bg-gray-300 m-auto w-1/2 h-72">
            {`Success! your order has been placed.`}
          </span>
        )}
        <div className="w-7/12 h-96 overflow-scroll rounded-lg relative border shadow-lg m-auto p-5">
          <form onSubmit={(e) => handlePlaceOrder(e)}>
            <CartContainer />
            <div className="flex checkout justify-center p-5 absolute text-sm h-full top-0 right-0 flex-col w-4/12 ">
              <label>
                First Name:
                <input
                  type="text"
                  value={fullname.fname}
                  id="fname"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  value={fullname.lname}
                  id="lname"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={cusAddress}
                  id="address"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
              <label>
                Contact No:
                <input
                  type="text"
                  value={cusPhone}
                  id="contact"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={cusEmail}
                  id="email"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
              <span className="p-2 border my-2 ">Cash on delivery</span>
              <button
                type="submit"
                className="m-0 transform transition-all hover:scale-105"
              >
                PLACE ORDER
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
