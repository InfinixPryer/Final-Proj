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
    console.log(device);
  }, [device, dispatch]);

  return (
    <nav className="flex z-50 top-0 h-20 mx-10 bg-white justify-between">
      <img
        src={logo}
        alt="logo"
        id="my-logo"
        className="sm:pl-5 pl-2 my-auto h-2/6 sm:h-3/6"
      />
      {device === "sm" ? (
        <NavbarMenu />
      ) : (
        <div className="flex flex-col justify-center float-right h-full bg-darkbrown">
          <span className="w-7 m-1 block bg-white h-1  rounded-md"></span>
          <span className="w-7 m-1 bg-white h-1 block rounded-md"></span>
          <span className="w-7 m-1 bg-white h-1 block rounded-md"></span>
        </div>
      )}
    </nav>
  );
};
const NavbarMenu = () => {
  const { cart } = useContext(CartContext);
  useEffect(() => {
    console.table(cart);
    console.log(typeof cart);
  }, [cart]);
  return (
    <div className=" w-5/12 justify-between font-bold text-base flex-row flex">
      <NavLink to="/" exact className="m-auto active:text-coffee">
        Home
      </NavLink>

      <NavLink to="/Products" exact className="m-auto active:text-coffee">
        Products
      </NavLink>
      <NavLink to="/About" exact className="m-auto active:text-coffee">
        About us
      </NavLink>
      <span className="m-auto flex-row flex w-2/12 justify-between">
        <NavLink to="/My-Cart">
          <div className="w-full relative">
            <span className="absolute w-5 text-sm text-center ml-3 mt-0 rounded-full bg-coffee text-white">
              {cart.length ? cart.length : null}
            </span>
            <img src={bag} alt="cart" width="20px" className=" w-6" />
          </div>
        </NavLink>
      </span>
    </div>
  );
};

export default Navbar;
