import React, { useState, useRef, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import { ProductContext } from "./context/ProductContext";
import axios from "axios";
import { GET_ITEMS } from "./types";
import products from "./products.js";

export const ProductInfo = ({ match }) => {
  useEffect(() => {
    fetchProduct();
  }, []);
  const [_item, setItem] = useState({});

  const fetchProduct = async () => {
    const product = await axios.get(
      `http://localhost:9000/products/${match.params.productName}`
    );
    setItem(product);
    console.log(product);
  };

  const {
    productImage,
    type,
    productName,
    options,
    preferences,
    details,
  } = _item;

  const high = options.reduce((obj, curr) => Math.max(obj.price, curr.price));
  const low = options.reduce((obj, curr) => Math.min(obj.price, curr.price));
  const optionsrange = `${low} - \u20b1${high}`;
  const qtyInp = useRef();

  const [display, setDisplay] = useState(0);

  const [choices, setChoice] = useState({
    selected: "",
    quantity: 1,
    price: optionsrange,
    selected_option: 0,
    selected_preference: "",
  });

  const handleQtySelect = (e) => {
    const qty = e.target.value;
    console.log(qty);
    setChoice({
      ...choices,
      quantity: qty,
      price: choices.selected_option.price * qty,
    });
  };

  const handleOptionsSelect = (option) => {
    qtyInp.current.disabled = false;
    setChoice({
      ...choices,
      selected: productName + " " + option.name,
      price: option.price * choices.quantity,
      selected_option: option,
    });
  };

  const handlePrefSelect = (e) => {
    setChoice({
      ...choices,
      selected_preference: e.target.value,
    });
  };

  const handleDisplayState = (state) => {
    if (display < productImage.length - 1 && state === "next") {
      setDisplay((prev) => prev + 1);
    }
    if (display > 0 && state === "prev") {
      setDisplay((prev) => prev - 1);
    } else return null;
  };
  useEffect(() => {
    console.log(choices);
  }, [choices]);
  /* 
  if (!product) {
    return (
      <section className="flex w-full h-page overflow-hidden bg-white ">
        <h1>Sorry that item does not exist!</h1>
      </section>
    );
  } */

  return (
    <section className="flex w-full h-page overflow-hidden bg-white ">
      <div className="absolute font-source text-sm py-1 rounded-br-md pl-12 bg-white /bg-darkbrown">
        <Link to="/Products/search=all">{`< Products / `}</Link>
        {`${productName}`}
      </div>
      <div className=" w-6/12 flex flex-wrap  float-left mt-10 ml-10">
        <div className="block h-96 w-full relative">
          <span
            className="p-3 top-40 absolute left-0 cursor-pointer"
            onClick={() => handleDisplayState("prev")}
          >
            {"<"}
          </span>
          <img
            src={productImage[display]}
            alt={productName}
            className="block m-auto h-96 w-96"
          />
          <span
            className="p-3 absolute bottom-44 right-0 cursor-pointer"
            onClick={() => handleDisplayState("next")}
          >
            {">"}
          </span>
        </div>

        <div className=" w-96 mx-auto">
          {productImage.map((img, index) => {
            return (
              <div
                className="w-24 mt-1 mr-1 inline-block cursor-pointer border-2 border-white hover:border-darkbrown"
                onClick={() => setDisplay(index)}
                key={img + productName}
              >
                <img src={img} alt={productName} key={productName + img} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="float-right w-5/12 absolute pr-5 h-page right-12 flex .shadow-lg font-work flex-col bg-white p-4">
        <h1 className=" text-2xl font-medium font-poppins pb-1">
          {productName.toUpperCase()}
        </h1>
        <p>{type.toUpperCase()}</p>

        <p className="my-5 font-light w-96 text-sm ">{details}</p>

        <span className="my-2 flex-col font-semibold font-poppins flex justify-between">
          <p className="font-normal my-2">OPTIONS: </p>
          <OptionsSpan
            productName={productName}
            handleSelect={handleOptionsSelect}
            entries={options}
          />
          <p className="font-normal my-2">BEANS: </p>
          <PreferenceSpan
            productName={productName}
            handleSelect={handlePrefSelect}
            entries={preferences}
          />
        </span>
        <span className=" flex h-12 justify-between mx-5  border-b">
          <input
            disabled
            ref={qtyInp}
            type="number"
            placeholder="1"
            min="1"
            max="50"
            onChange={(e) => handleQtySelect(e)}
            className="w-20 h-10 "
          />
          <p className=" text-coffee text-2xl my-auto ">
            {"\u20b1" + choices.price}
          </p>
        </span>

        <div className="relative bottom-1">
          <AddtoCartBtn choices={choices} />
        </div>
      </div>
    </section>
  );
};

const PreferenceSpan = ({ productName, handleSelect, entries }) => {
  return (
    <span className="w-full">
      {entries.map((entry) => {
        return (
          <label className="radcon" key={productName + entry}>
            <input
              type="radio"
              name={productName + "-bean"}
              value={entry}
              onChange={(e) => {
                handleSelect(e);
              }}
            />
            <span className="border inline-block mb-1 min-w-1/4 text-center border-darkbrown font-normal font-work text-sm rounded px-3 py-2 mx-1 transition-colors">
              {entry}
            </span>
          </label>
        );
      })}
    </span>
  );
};

const OptionsSpan = ({ productName, handleSelect, entries }) => {
  return (
    <span className="w-full">
      {entries.map((entry) => {
        const key = entry.name;
        const value = entry.price;

        return (
          <label className="radcon" key={productName + key}>
            <input
              type="radio"
              name={productName + "-option"}
              value={value}
              onChange={() => {
                handleSelect(entry);
              }}
            />
            <span className="border inline-block mb-1 min-w-1/4 text-center border-darkbrown font-normal font-work text-sm rounded px-3 py-2 mx-1 transition-colors">
              {key}
            </span>
          </label>
        );
      })}
    </span>
  );
};

const AddtoCartBtn = ({ choices }) => {
  const { dispatch } = useContext(CartContext);

  const handleAdd = (e) => {
    e.preventDefault();
    if (choices.selected && choices.selected_preference) {
      const selectedItem = {
        id: new Date().getTime().toString(),
        ProductName: choices.selected,
        quantity: choices.quantity,
        price: choices.price,
        preference: choices.selected_preference,
      };
      console.log(selectedItem);
      dispatch({ type: "ADD_TO_CART", payload: selectedItem });
    }
  };

  return (
    <span className="flex justify-center h-10">
      <button
        onClick={(e) => {
          handleAdd(e);
        }}
        className=" w-11/12 mt-3 m-auto text-darkbrown  active:bg-gray-800 flex text-sm justify-center bg-white rounded-md border-darkbrown border py-3 font-poppins btn-focus hover:text-white hover:bg-darkbrown hover:btn-focus-hover "
      >
        ADD TO BAG
      </button>
    </span>
  );
};

export default ProductInfo;
