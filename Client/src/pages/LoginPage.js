import React, { useState, useEffect, useRef } from "react";
import { api } from "../App";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [auth, setAuth] = useState({ status: false, mess: "" });
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });
  const errspan = useRef();
  const toAdmin = useHistory();

  const handleUserChange = (e) => {
    setUserLogin({ ...userLogin, username: e.target.value });
  };
  const handlePassChange = (e) => {
    setUserLogin({ ...userLogin, password: e.target.value });
  };

  const Login = (e) => {
    e.preventDefault();
    if (userLogin.username && userLogin.password) {
      try {
        api
          .post("/admin/login", userLogin)
          .then((res) => {
            if (res.data.message === "Login successful") {
              setUserLogin({ username: "", password: "" });
              localStorage.setItem("token", res.data.token);
              toAdmin.push("/Admin");
            }
          })
          .then((errspan.current.hidden = false));
      } catch (err) {
        console.error(err);
      }
    }
    setAuth({ status: false, mess: "Incorrect username or password" });
  };

  return (
    <form onSubmit={(e) => Login(e)}>
      <div className=" w-6/12 h-64">
        <label>
          Username:
          <input
            value={userLogin.username}
            required
            autoComplete="cc-csc"
            onChange={(e) => handleUserChange(e)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={userLogin.password}
            required
            autoComplete="cc-csc"
            onChange={(e) => handlePassChange(e)}
          />
        </label>
        <button type="submit">Login</button>
      </div>
      <span
        ref={errspan}
        hidden
        className="p-2  bg-gray-500 text-white rounded mx-3"
      >
        {auth.mess}
      </span>
    </form>
  );
};

export default Login;
