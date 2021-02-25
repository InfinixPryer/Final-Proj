import React, { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../context/CartContext";
import { api } from "../App.js";

const Checkout = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [fullname, setName] = useState({
    fname: "",
    lname: "",
  });
  const [orderInfo, setOrder] = useState({
    orderItems: cart,
    totalPrice: 0,
    cusName: ``,
    cusAddress: "",
    cusPhone: "",
    cusEmail: "",
  });

  useEffect(() => {
    setOrder({ ...orderInfo, cusName: `${fullname.fname} ${fullname.lname}` });
  }, [fullname]);

  const { cusAddress, cusPhone, cusEmail } = orderInfo;

  useEffect(() => {
    if (cart.length !== 0) {
      const total = cart.map((i) => i.price).reduce((p, t) => p + t);
      console.log(total);
      setOrder({ ...orderInfo, totalPrice: total });
    }
  }, [cart]);

  const handleDelete = (cart_item) => {
    dispatch({ type: "DELETE_CART_ITEM", payload: cart_item });
  };

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
      }
    }
  };
  return (
    <>
      <form onSubmit={(e) => handlePlaceOrder(e)}>
        {cart.map((item) => {
          const { id, name, preference, price, quantity } = item;

          return (
            <div
              className="text-sm font-type m-2 font-light border rounded-md max-w-max hover:border-espresso shadow p-3 border-gray-100"
              key={id}
            >
              {`${quantity} 
                  ${name} 
                  ${preference} 
                  \u20b1
                  ${price}`}
              <span
                className="p-2 cursor-pointer"
                onClick={() => handleDelete(id)}
              >
                x
              </span>
            </div>
          );
        })}
        <div className="flex justify-center p-5 shadow-clean rounded text-sm h-full m-auto flex-col w-56 ">
          <h3>{`\u20b1${orderInfo.totalPrice}`}</h3>
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
