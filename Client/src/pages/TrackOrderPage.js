import { useState, useEffect } from "react";
import { api } from "../App";

const OrderTracker = ({ setCheck }) => {
  const [cusCheckId, setId] = useState("");
  const [ordStat, setStat] = useState("");
  const [isComplete, setComplete] = useState(false);
  const [cusRating, setRating] = useState({
    name: "",
    rating: "",
    review: "",
  });

  const getOrderStatus = async () => {
    const res = await api.get(`/carts/${cusCheckId}`);
    const status = res.data.status;
    setStat(status);
    if (status === "Completed") {
      setComplete(true);
    }
  };
  const handleChange = (e) => {
    setId(e.target.value);
  };

  const handleRating = (e) => {
    setRating({ ...cusRating, rating: parseInt(e.target.value) });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="w-full h-full z-50 top-0 overflow-x-hidden bg-black bg-opacity-40 absolute">
      <div className=" w-5/12 mt-24 flex flex-col bg-white relative justify-center p-7 rounded shadow-lg border m-auto">
        <button
          onClick={() => setCheck(false)}
          className="absolute top-2 -left-10 bg-white border-none rounded-full px-2 p-1"
        >
          {`\u2715`}
        </button>
        <span className="block m-auto font-source pb-5">
          Please enter your Order Id:
          <input
            type="text"
            value={cusCheckId}
            onChange={(e) => handleChange(e)}
            className="mx-2"
          />
          <button
            onClick={() => getOrderStatus()}
            className="px-6 py-1 bg-gradient-to-tr border-none text-white text-sm from-espresso to-coffee"
          >
            Check!
          </button>
        </span>
        {ordStat ? (
          <span className="p-2 border my-3 rounded bg-black text-white text-center">
            {ordStat}
          </span>
        ) : (
          <span className="p-2 border my-3 rounded text-white text-center">
            {ordStat}
          </span>
        )}
        {isComplete ? (
          <div className="mt-5">
            <span>Please give our service a rating!</span>
            <label className="mx-2 flex w-32 my-auto h-6 items-center float-right justify-between">
              <input
                type="radio"
                name="stars"
                value="1"
                onChange={(e) => handleRating(e)}
              />
              <input
                type="radio"
                name="stars"
                value="2"
                onChange={(e) => handleRating(e)}
              />
              <input
                type="radio"
                name="stars"
                value="3"
                onChange={(e) => handleRating(e)}
              />
              <input
                type="radio"
                name="stars"
                value="4"
                onChange={(e) => handleRating(e)}
              />
              <input
                type="radio"
                name="stars"
                value="5"
                onChange={(e) => handleRating(e)}
              />
              <input
                type="radio"
                name="stars"
                value="6"
                onChange={(e) => handleRating(e)}
              />
              <input
                type="radio"
                name="stars"
                value="7"
                onChange={(e) => handleRating(e)}
              />
              <input
                type="radio"
                name="stars"
                value="8"
                onChange={(e) => handleRating(e)}
              />
              <input
                type="radio"
                name="stars"
                value="9"
                onChange={(e) => handleRating(e)}
              />
              <input
                type="radio"
                name="stars"
                value="10"
                onChange={(e) => handleRating(e)}
              />
            </label>
            <span className="block pb-2 pt-5">
              <textarea
                type="text"
                value={cusRating.review}
                className="w-full border-coffee border p-2 rounded"
              />
            </span>
          </div>
        ) : (
          <div className="mt-5 text-sm m-auto text-gray-700">
            Is your order taking too long? Please contact us +63912323231
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracker;
