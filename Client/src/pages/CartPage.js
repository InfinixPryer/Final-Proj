import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { DELETE_CART_ITEM } from "../types";

const CartPage = () => {
  const { cart, dispatch } = useContext(CartContext);
  const chkPage = useHistory();

  return (
    <>
      <div className="w-3/6 h-96 mt-10 overflow-scroll rounded-lg relative border shadow-md m-auto p-5">
        <CartContainer cart={cart} dispatch={dispatch} />
        <button
          className="my-5 absolute bottom-0 right-5 transform transition-all hover:scale-105 px-4 py-3"
          onClick={() => {
            if (cart.length !== 0) {
              chkPage.push("/Checkout");
            }
          }}
        >
          Checkout
        </button>
      </div>
    </>
  );
};

export const CartContainer = () => {
  const { cart, dispatch } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const handleDelete = (key) => {
    dispatch({ type: DELETE_CART_ITEM, payload: key });
  };
  useEffect(() => {
    if (cart.length !== 0) {
      setTotal(cart.map((i) => i.totalPrice).reduce((p, t) => p + t));
    }
  }, [cart]);
  return (
    <div className="h-60 overflow-scroll">
      <span className="py-2">Your cart:</span>
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
                className="text-base font-light my-2 font-type border rounded-md max-w-max transform transition-all hover:scale-105 hover:shadow-md shadow-sm p-3 border-gray-100"
                key={key}
              >
                {`${quantity} 
                ${name} 
                ${selectedOption} 
                ${selectedPreference} 
                \u20b1
                ${totalPrice}`}
                <span
                  className="p-2 cursor-pointer rounded ml-10"
                  onClick={() => handleDelete(key)}
                >
                  Remove
                </span>
              </div>
            );
          })}
          <h3>{`Total: \u20b1${total}`}</h3>
        </article>
      ) : (
        <span className=" w-32 m-auto text-center leading-8">{`  No Items`}</span>
      )}
    </div>
  );
};

export default CartPage;
