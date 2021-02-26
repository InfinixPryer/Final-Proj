import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { CartContainer } from "./CartPage";
import { api } from "../App.js";

const Checkout = () => {
  const { cart, dispatch } = useContext(CartContext);
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
    console.log(orderInfo);

    if (
      cart.length !== 0 &&
      orderInfo.cusAddress.length > 10 &&
      orderInfo.cusPhone.length > 9 &&
      orderInfo.cusPhone.length < 14
    ) {
      try {
        api.post("carts", orderInfo).then((res) => {
          console.log(res);
        });
      } catch (err) {
        console.error(err);
      } finally {
        dispatch({ type: "CLEAR_CART" });
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
      <form onSubmit={(e) => handlePlaceOrder(e)}>
        <CartContainer />
        <div className="flex justify-center p-5 shadow-clean rounded text-sm h-full m-auto flex-col w-56 ">
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
          <button type="submit" className="p-2">
            PLACE ORDER
          </button>
        </div>
      </form>
    </>
  );
};

export default Checkout;
