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
    <>
      <img src={h1} alt="" />
      <p>{data}</p>
    </>
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
