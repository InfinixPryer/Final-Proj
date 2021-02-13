import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Page from "./App";

const App = () => {
  return (
    <React.StrictMode>
      <Page />
    </React.StrictMode>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
