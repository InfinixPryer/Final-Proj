import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { CartContainer } from "./CartPage";
import { CLEAR_CART } from "../types";
import { api } from "../App.js";
import { useHistory } from "react-router-dom";

const Checkout = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [isSuccess, setSuccess] = useState(false);
  const [correctIn, setcorr] = useState(false);
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
  const toHome = useHistory();
  const [cusId, setCusId] = useState("");

  useEffect(() => {
    setOrder((ord) => ({
      ...ord,
      cusName: `${fullname.fname} ${fullname.lname}`,
    }));
  }, [fullname]);

  useEffect(() => {
    if (cart.length !== 0) {
      const total = cart.map((i) => i.totalPrice).reduce((p, t) => p + t);
      setOrder((ord) => ({ ...ord, totalPrice: total }));
    } else setOrder((ord) => ({ ...ord, totalPrice: 0 }));
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
        break;
      default:
        break;
    }
  };
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (
      cart.length !== 0 &&
      orderInfo.cusAddress.length > 10 &&
      orderInfo.cusPhone.length === 11
    ) {
      try {
        api.post("/carts", orderInfo).then((res) => {
          setCusId(res.data.cusCheckId);
        });
      } catch (err) {
        console.error(err);
      } finally {
        setSuccess(true);
        setcorr(false);
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
    } else setcorr(true);
  };
  return (
    <>
      <div className="w-full mt-10">
        <div className="w-7/12 h-96 rounded relative bg-white border shadow-lg m-auto p-5">
          <form onSubmit={(e) => handlePlaceOrder(e)}>
            <CartContainer />
            {isSuccess && (
              <span className="rounded absolute -top-2 z-20 p-5 w-full left-0 bg-coffee text-white text-center ">
                Your order has been placed! thank you for supporting us. You can
                go back to our home page and check your current order status
                <span className="block">Your order id is {cusId}</span>
                <span
                  className="underline cursor-pointer"
                  onClick={() => toHome.push("/")}
                >
                  Back to Home
                </span>
              </span>
            )}
            {correctIn && (
              <span className="rounded absolute -top-2 w-full h-8 left-0 text-white bg-red-500 p-1 text-center ">
                {`An input may be incorrectly filled.`}
              </span>
            )}
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
                Mobile No:
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
              <span className="p-2 my-2 rounded text-center bg-black text-white">
                Cash on delivery
              </span>
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
