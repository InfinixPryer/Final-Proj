import React, { useState, useEffect } from "react";
import { api } from "../App";

const Login = () => {
  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });
  const handleUserChange = (e) => {
    setAuth({ ...auth, username: e.target.value });
  };
  const handlePassChange = (e) => {
    setAuth({ ...auth, password: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (auth.username && auth.password) {
      try {
        api.post("/admin", auth).then((res) => {
          console.log(res);
        });
      } catch {}
    }
  };
  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className=" w-6/12 h-64">
        <label>
          Username:
          <input
            value={auth.username}
            required
            autoComplete="cc-csc"
            onChange={(e) => handleUserChange(e)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={auth.password}
            required
            autoComplete="cc-csc"
            onChange={(e) => handlePassChange(e)}
          />
        </label>
        <button type="submit">Login</button>
      </div>
    </form>
  );
};

export default Login;
