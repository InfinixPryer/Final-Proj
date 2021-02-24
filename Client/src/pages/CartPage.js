import React, { useContext, useEffect, useRef } from "react";
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
  const handleDelete = (cart_item) => {
    dispatch({ type: "DELETE_CART_ITEM", payload: cart_item });
  };
  return (
    <>
      <h1 className="font-work leading-9 ml-2.5">CART</h1>
      {cart.length !== 0 ? (
        <article className="p-5">
          {cart.map((item) => {
            return (
              <div
                className="text-sm font-type font-extralight border-b-2 w-full border-gray-200"
                key={item.id}
              >
                {item.quantity +
                  "" +
                  item.name +
                  " " +
                  item.preference +
                  " " +
                  "\u20b1" +
                  item.price}
                <span
                  className="p-2 cursor-pointer"
                  onClick={() => handleDelete(item.id)}
                >
                  x
                </span>
              </div>
            );
          })}
        </article>
      ) : (
        <span className=" w-32 m-auto text-center leading-8">No Items</span>
      )}
    </>
  );
};

export default CartPage;
