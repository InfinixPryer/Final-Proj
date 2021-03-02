import React from "react";
import { useHistory } from "react-router-dom";

const Footer = () => {
  const toLogin = useHistory();

  return (
    <footer className="w-full h-36 relative text-sm font-work flex flex-col flex-shrink-0 text-white bottom-0 bg-espresso">
      <span className="pl-16 pt-3">CONTACT US</span>
      <div className="flex flex-col text-xs px-16 pt-3">
        <span className="">+63912323231</span>
        <span className="">coffeemonkeyPh@gmail.com</span>
      </div>
      <span
        onClick={() => {
          toLogin.push("./Admin");
        }}
        className="absolute right-1 pr-16 p-3 cursor-pointer"
      >
        Admin login
      </span>
      <span className="absolute w-full p-3 bg-black bg-opacity-50 text-center bottom-0 z-10">
        All rights reserved © 2020 Coffee Monkey Ph
      </span>
    </footer>
  );
};

export default Footer;
