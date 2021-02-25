import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../context/CartContext.js";

const CartPage = () => {
  const { cart, dispatch } = useContext(CartContext);
  const checkout = useRef();
  const chkPage = useHistory();

  useEffect(() => {
    console.log(cart);
    cart.length !== 0
      ? (checkout.current.disabled = false)
      : (checkout.current.disabled = true);
  }, [cart]);

  return (
    <>
      <CartContainer cart={cart} dispatch={dispatch} />
      <span
        disabled
        ref={checkout}
        className="rounded-md float-right py-2 px-5 cursor-pointer text-white bg-coffee"
        onClick={() => {
          chkPage.push("/Checkout");
        }}
      >
        Checkout
      </span>
    </>
  );
};

export const CartContainer = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const handleDelete = (key) => {
    dispatch({ type: "DELETE_CART_ITEM", payload: key });
  };
  useEffect(() => {
    if (cart.length !== 0) {
      setTotal(cart.map((i) => i.totalPrice).reduce((p, t) => p + t));
    }
  }, [cart]);
  return (
    <>
      <h1 className="font-work text-xl"></h1>
      {cart.length !== 0 ? (
        <article className="p-5">
          {cart.map((item) => {
            const {
              key,
              name,
              selectedOption,
              selectedPreference,
              totalPrice,
              quantity,
            } = item;
            return (
              <div
                className=" text-base font-light my-2 font-type border rounded-md max-w-max hover:border-espresso shadow-sm p-3 border-gray-100"
                key={key}
              >
                {`${quantity} 
                ${name} 
                ${selectedOption} 
                ${selectedPreference} 
                \u20b1
                ${totalPrice}`}
                <span
                  className="p-2 cursor-pointer"
                  onClick={() => handleDelete(key)}
                >
                  x
                </span>
              </div>
            );
          })}
          <h3>{`Total: \u20b1${total}`}</h3>
        </article>
      ) : (
        <span className=" w-32 m-auto text-center leading-8">No Items</span>
      )}
    </>
  );
};

export default CartPage;
