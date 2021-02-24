import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { cart } = useContext(CartContext);
  useEffect(() => {
    //console.log(cart);
  }, []);
  return <div>{}</div>;
};

export default Checkout;
