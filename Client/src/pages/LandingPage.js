import React, { useEffect, useState } from "react";
import h1 from "../h1.jpg";
const HomePage = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    setData("p");
    return () => {};
  }, []);

  if (!data) {
    return <Loading />;
  }
  return (
    <div className="mb-96">
      <span className="text-7xl p-4 font-bold bg-clip-text bg-gradient-to-r text-transparent from-blue-700 to-color1 font-poppins">
        {"HELLO!"}
      </span>
      <img src={h1} alt="" />
      <p>{data}</p>
    </div>
  );
};

export const Loading = () => {
  const messageArray = [
    "Grinding some fresh beans...",
    "Packing gifts...",
    "Please wait, drinking my coffee...",
  ];
  const randGen = Math.floor(Math.random() * messageArray.length);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center absolute z-50 ">
      <h1 className="mb-10">{messageArray[randGen]}</h1>
      <span className="flex w-24 justify-around relative">
        <span className="p-2 rounded-full absolute left-0 animate-bounce bg-gray-400"></span>
        <span className="p-2 rounded-full absolute  animate-bounce  bg-gray-400"></span>
        <span className="p-2 rounded-full absolute right-0 animate-bounce bg-gray-400"></span>
      </span>
    </div>
  );
};

export default HomePage;
