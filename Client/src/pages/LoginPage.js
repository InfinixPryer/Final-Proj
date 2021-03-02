import React, { useState, useRef, useEffect } from "react";
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

  useEffect(() => {
    if (localStorage.getItem("token")) {
      toAdmin.push("/Admin");
    }
  }, [toAdmin]);

  const Login = (e) => {
    e.preventDefault();
    if (userLogin.username && userLogin.password) {
      try {
        api
          .post("/admin/login", userLogin)
          .then((res) => {
            const mes = res.data.message;
            if (mes === "Login successful") {
              setAuth({ ...auth, mess: mes });
              localStorage.setItem("token", res.data.token);
              toAdmin.push("/Admin");
            }
          })
          .then((errspan.current.hidden = false));
      } catch (err) {
        console.error(err);
      } finally {
        setUserLogin({ username: "", password: "" });
        setAuth({ status: false, mess: "Incorrect username or password" });
        errspan.current.hidden = false;
      }
    }
  };

  return (
    <form onSubmit={(e) => Login(e)}>
      <div className=" m-auto mt-20 flex shadow-lg relative border rounded-lg p-5 flex-col w-2/12 h-72">
        <span>Welcome Admin!</span>

        <label className="w-24 mt-4 text-xs">
          Username:
          <input
            value={userLogin.username}
            required
            autoComplete="cc-csc"
            onChange={(e) => handleUserChange(e)}
          />
        </label>
        <label className="mt-4 mb-20 text-xs w-24">
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
        <span
          ref={errspan}
          hidden
          className="p-2 -left-8 -bottom-20 min-w-max absolute bg-gray-700 text-white rounded"
        >
          {auth.mess}
        </span>
      </div>
    </form>
  );
};

export default Login;
