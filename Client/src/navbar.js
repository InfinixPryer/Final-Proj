import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import bag from "./images/bag.png";
import logo from "./images/logo.jpg";
import { CartContext } from "./context/CartContext";
import { DeviceContext } from "./context/DeviceContext";

const Navbar = () => {
  const { device, dispatch } = useContext(DeviceContext);

  useEffect(() => {
    const screensize = window.innerWidth;
    if (screensize < 450) {
      dispatch({ type: "MOBILE" });
    } else {
      dispatch({ type: "DESKTOP" });
    }
  }, [device, dispatch]);

  return (
    <nav className="flex z-50 top-0 h-10 m-5 bg-white justify-between">
      <img
        src={logo}
        alt="logo"
        id="my-logo"
        className="sm:pl-5 pl-2 my-auto h-2/6 sm:h-3/6"
      />
      <NavbarMenu />
    </nav>
  );
};
const NavbarMenu = () => {
  const { cart } = useContext(CartContext);
  useEffect(() => {
    console.table(cart);
  }, [cart]);
  return (
    <div className=" w-3/12 justify-end text-base flex-row flex">
      <NavLink to="/" exact className="m-auto active:text-coffee">
        Home
      </NavLink>

      <NavLink to="/Products" exact className="m-auto active:text-coffee">
        Products
      </NavLink>
      <span className="m-auto flex-row flex justify-between">
        <NavLink to="/My-Cart">
          <div className="w-full relative">
            <span className="absolute w-5 text-sm text-center ml-3 mt-0 rounded-full bg-coffee text-white">
              {cart.length ? cart.length : null}
            </span>
            <img src={bag} alt="cart" width="20px" className="w-6" />
          </div>
        </NavLink>
      </span>
    </div>
  );
};

export default Navbar;
