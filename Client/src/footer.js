import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  //console.log(1);
  return (
    <footer className="w-full h-32 flex flex-shrink-0 text-white bottom-0 bg-espresso">
      <NavLink to="/Admin">Admin</NavLink>
    </footer>
  );
};

export default Footer;
