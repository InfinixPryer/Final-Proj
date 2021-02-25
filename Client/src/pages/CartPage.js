import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.js";

const CartPage = () => {
  const { cart, dispatch } = useContext(CartContext);
  const checkout = useRef();

  useEffect(() => {
    cart.length !== 0
      ? (checkout.current.disabled = false)
      : (checkout.current.disabled = true);
  }, [cart]);

  return (
    <>
      <CartContainer cart={cart} dispatch={dispatch} />
      <div>
        <Link to="/Checkout">
          <span
            disabled
            ref={checkout}
            className="rounded-md float-right py-2 px-5 text-white bg-coffee"
          >
            Checkout
          </span>
        </Link>
      </div>
    </>
  );
};

const CartContainer = ({ cart, dispatch }) => {
  const [total, setTotal] = useState(0);
  const handleDelete = (cart_item) => {
    dispatch({ type: "DELETE_CART_ITEM", payload: cart_item });
  };
  useEffect(() => {
    if (cart.length !== 0) {
      setTotal(cart.map((i) => i.price).reduce((p, t) => p + t));
    }
  }, [cart]);
  return (
    <>
      <h1 className="font-work text-xl"></h1>
      {cart.length !== 0 ? (
        <article className="p-5">
          {cart.map((item) => {
            const { id, name, preference, price, quantity } = item;
            return (
              <div
                className=" text-base font-light my-2 font-type border rounded-md max-w-max hover:border-espresso shadow-sm p-3 border-gray-100"
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
          <h3>{`Total: \u20b1${total}`}</h3>
        </article>
      ) : (
        <span className=" w-32 m-auto text-center leading-8">No Items</span>
      )}
    </>
  );
};

export default CartPage;
