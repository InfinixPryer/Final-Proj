import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Footer from "../footer";
import lp1 from "../assets/lp1.jpg";
import lp2 from "../assets/lp2.jpg";
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.jpg";
import h3 from "../assets/h3.jpg";
import h4 from "../assets/h4.jpg";
import star from "../assets/star.png";
import { api } from "../App";
import OrderTracker from "./TrackOrderPage";

const HomePage = () => {
  const [display, setDisplay] = useState(0);
  const headArr = [h2, h3, h4];
  const toProd = useHistory();
  const [reviews, setReviews] = useState([]);
  const [isChecking, setCheck] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      const res = await api.get("/carts");
      const intres = res.data.carts;
      const revArr = intres.filter((cart) => "cusReview" in cart);
      setReviews(revArr);
    };
    getReviews();
    return () => {
      setReviews([]);
    };
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

  return (
    <>
      {isChecking ? (
        <OrderTracker setCheck={setCheck} />
      ) : (
        <span
          onClick={() => {
            setCheck(true);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }}
          className="fixed cursor-pointer font-source bg-gradient-to-tr text-sm from-espresso to-coffee text-white flex items-center justify-center z-50 rounded-full w-40  h-10 transform transition-all hover:scale-110 shadow bottom-10 right-14"
        >
          Track my order
        </span>
      )}
      <div className="mb-40 flex overflow-hidden z-0 mt-10 relative h-page items-center">
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
      <div className="w-4/6 shadow-lg rounded-lg p-5 bg-white transform -translate-y-44 text-center my-20 m-auto">
        <p className="italic">
          ”Welcome to Coffee Monkey PH! We provide a variety of coffee products
          coming from all corners of the Philippines supporting local farmers
          and suppliers that we guarantee you will like"
        </p>
      </div>
      {reviews.length !== 0 && <RevSpan reviews={reviews} />}
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

const RevSpan = ({ reviews }) => {
  return (
    <div className="w-4/6 m-auto overflow-x-scroll mb-36">
      {reviews.map((rev) => {
        const rate = rev.cusReview.rating;
        const stars = [];
        const neg = [];
        console.log(typeof rev.cusReview);
        for (let i = rate; i > 0; i--) {
          stars.push(
            <img
              className="h-6 p-1 w-6 inline-block"
              key={i}
              alt="star"
              src={star}
            />
          );
        }
        const pos = 10 - stars.length;
        for (let i = pos; i > 0; i--) {
          neg.push(
            <img
              className="h-6 p-1 opacity-10 w-6 inline-block"
              alt="null-star"
              src={star}
              key={20 - i}
            />
          );
        }

        const allStars = [...stars, ...neg];

        return (
          <div
            key={rev.cartId}
            className="p-5 w-80 rounded border m-4 flex flex-col shadow-md"
          >
            <span className="block text-2xl text-gray-600">{`${rev.cusReview.rating} / 10`}</span>
            <span>{allStars}</span>
            <span className="py-4 px-2 ">{rev.cusReview.review}</span>
          </div>
        );
      })}
    </div>
  );
};
