import React, { useEffect, useState } from "react";
import h1 from "../h1.jpg";

const HomePage = () => {
  const [data, setData] = useState("");

  const callApi = async () => {
    try {
      const res = await fetch('http://localhost:9000/products');
      const text = await res.text();
      setData(text);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    callApi();
  })
  

  return (
    <>
      <img src={h1} alt="" />
      <p>{data}</p>
    </>
  );
};

export default HomePage;
