import React, { useEffect, useState } from "react";
import h1 from "../h1.jpg";
const HomePage = () => {
  const [data, setData] = useState("");
  const callApi = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/1`)
      .then((res) => res.text())
      .then((res) => setData(res));
  };

  useEffect(() => {
    callApi();
  }, []);
  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <img src={h1} alt="" />
      <p>{data}</p>
    </>
  );
};

export const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center absolute z-50 ">
      <span className="flex w-24 m-auto justify-around relative">
        <span className="p-2 rounded-full absolute left-0 animate-bounce bg-gray-400"></span>
        <span className="p-2 rounded-full absolute  animate-bounce  bg-gray-400"></span>
        <span className="p-2 rounded-full absolute right-0 animate-bounce bg-gray-400"></span>
      </span>
    </div>
  );
};

export default HomePage;
