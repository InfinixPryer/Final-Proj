import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext.js";

const CartPage = () => {
  const { cart } = useContext(CartContext);
  console.log(cart);
  return (
    <>
      <CartContainer cart={cart} />
    </>
  );
};

const CartContainer = ({ cart }) => {
  return (
    <>
      {" "}
      <div className="flex border-gray-300 border-b-2 shadow w-full bg-gray-100 ">
        <h1 className="font-work leading-9 ml-2.5">CART</h1>
      </div>
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
              </div>
            );
          })}
        </article>
      ) : (
        <span className=" w-32 m-auto text-center leading-8">No Items</span>
      )}
      <div>
        <button className="border rounded-md float-right py-2 px-5 text-white bg-coffee">
          <Link to="/Checkout">Checkout</Link>
        </button>
      </div>
      <div></div>
    </>
  );
};

export default CartPage;
