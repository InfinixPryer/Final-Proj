import React, { useState } from "react";
const Login = () => {
  const [auth, setAuth] = useState("");

  return (
    <div className=" w-6/12 h-64">
      <label>
        Username:
        <input />
      </label>
      <label>
        Password:
        <input type="password" />
      </label>
    </div>
  );
};
