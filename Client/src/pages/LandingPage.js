import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../footer";
import lp1 from "../assets/lp1.jpg";
import lp2 from "../assets/lp2.jpg";
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.jpg";
import h3 from "../assets/h3.jpg";
import h4 from "../assets/h4.jpg";
import fb from "../assets/fblogo.png";
import ig from "../assets/instalogo.png";
import tk from "../assets/tiktok.png";

const HomePage = () => {
  const [data, setData] = useState("");
  const [display, setDisplay] = useState(0);
  const headArr = [h2, h3, h4];
  const toProd = useHistory();

  useEffect(() => {
    setData("p");
    return () => {};
  }, []);

  const handleClick = () => {
    toProd.push("/products");
  };

  const handleDisplayState = (state) => {
    if (display < headArr.length - 1 && state === "next") {
      setDisplay((prev) => prev + 1);
    }
    if (display > 0 && state === "prev") {
      setDisplay((prev) => prev - 1);
    } else return null;
  };

  if (!data) {
    return <Loading />;
  }
  return (
    <>
      <div className="mb-40 flex overflow-hidden rounded-xl mx-3 relative h-page items-center">
        <span
          className="py-20 rounded-full z-50 px-4 absolute transition-all hover:rounded-none transform hover:bg-opacity-50 hover:py-32 text-white bg-black bg-opacity-10"
          onClick={() => handleDisplayState("prev")}
        >{`\u140A`}</span>
        <img
          src={headArr[display]}
          alt="hero"
          className="transform transition-all"
        />
        <span
          className="py-20 rounded-full z-50 px-4 absolute transition-all hover:rounded-none right-0 transform hover:bg-opacity-50 hover:py-32 text-white bg-black bg-opacity-10"
          onClick={() => handleDisplayState("next")}
        >{`\u1405`}</span>
      </div>
      <div className=" h-smpage">
        <img
          src={lp1}
          alt="card1"
          onClick={() => handleClick()}
          className="w-3/12 p-3 shadow-md absolute left-32 hover:scale-105 transition-all bg-white transform -rotate-12"
        />
        <img
          src={lp2}
          alt="card2"
          onClick={() => handleClick()}
          className="w-3/12 p-3 shadow-md absolute right-40 hover:scale-105 transition-all bg-white transform rotate-6"
        />
      </div>
      <div className="w-4/6 shadow-lg rounded-lg p-5 bg-white transform -translate-y-44 text-center my-40 m-auto">
        <p>
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat."
        </p>
      </div>
      <span className="w-full h-80">
        <div className="w-4/6 overflow-hidden m-auto  mb-56 rounded-2xl">
          <img src={h1} alt="base" />
        </div>
      </span>
      <Footer />
    </>
  );
};

export const Loading = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div>
        <span className="flex w-24 m-auto justify-around relative">
          <span className="p-2 rounded-full absolute left-0 animate-bounce bg-gray-400"></span>
          <span className="p-2 rounded-full absolute  animate-bounce  bg-gray-400"></span>
          <span className="p-2 rounded-full absolute right-0 animate-bounce bg-gray-400"></span>
        </span>
      </div>
    </div>
  );
};

export default HomePage;
