import React from "react";
import { useHistory } from "react-router-dom";

const Footer = () => {
  const toLogin = useHistory();

  return (
    <footer className="w-full h-32 flex flex-shrink-0 text-white bottom-0 bg-espresso">
      <span
        onClick={() => {
          toLogin.push("./Admin");
        }}
        className="p-5 cursor-pointer"
      >
        Admin
      </span>
    </footer>
  );
};

export default Footer;
