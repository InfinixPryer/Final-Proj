import React from "react";
import { Link } from "react-router-dom";
import bag from "./images/bag.png";
import logo from "./images/logo.jpg";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cart = useSelector((state) => state.cartItems);

  return (
    <nav className="flex sticky z-50 top-0 h-10 w-full justify-between font-poppins shadow-sm">
      <img src={logo} alt="logo" id="my-logo" className="pl-5 my-auto h-3/6" />
      <div className=" w-5/12 justify-between flex-row flex text-darkbrown">
        <Link to="/" className="m-auto">
          Home
        </Link>
        <Link to="/Products" className="m-auto">
          Products
        </Link>
        <Link to="/About" className="m-auto">
          About us
        </Link>
        <span className="m-auto flex-row flex w-2/12 justify-between">
          <Link to="/My-Cart">
            <div className="w-full relative">
              <span className="absolute w-5 text-sm text-center ml-3 mt-0 rounded-full bg-coffee text-white">
                {cart.length ? cart.length : null}
              </span>
              <img src={bag} alt="cart" width="20px" className=" w-6" />
            </div>
          </Link>
          <a href="#" className="m-auto">
            <img src="./as" alt="" width="20px" className=" w-6" />
          </a>
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
