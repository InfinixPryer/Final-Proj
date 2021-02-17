import React, { useState, useRef, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import products from "./products";
import { CartContext } from "./context/CartContext";

export const ProductInfo = ({ match }) => {
  const { product_name } = useParams(); // change to match when api is available
  const _item = products.find((item) => item.name === product_name);

  const { imgs, type, name, options, preferences, details } = _item;
  const optionsEntries = Object.keys(options).map((key) => [key, options[key]]);
  const prefEntries = Object.keys(preferences).map((pref) => [
    pref,
    preferences[pref],
  ]);
  const low = optionsEntries.map((a) => a[1]).reduce((a, b) => Math.min(a, b));
  const high = optionsEntries.map((a) => a[1]).reduce((a, b) => Math.max(a, b));
  const optionsrange = `${low} - \u20b1${high}`;
  const qtyInp = useRef();

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
      price: choices.selected_option * qty,
    });
  };

  const handleOptionsSelect = (option, weight) => {
    qtyInp.current.disabled = false;
    setChoice({
      ...choices,
      selected: name + " " + weight,
      price: option * choices.quantity,
      selected_option: option,
    });
  };

  const handlePrefSelect = (pref) => {
    setChoice({
      ...choices,
      selected_preference: pref,
    });
  };
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
      <div className="absolute font-work /text-white text-sm py-1 rounded-br-md pl-6 pr-4 bg-white /bg-darkbrown">
        <Link to="/Products">{`< PRODUCTS / `}</Link>
        {`${name.toUpperCase()}`}
      </div>
      <div className=" w-6/12 flex flex-wrap  float-left mt-10 ml-10">
        <div className="block h-96 w-full relative">
          <button className="p-3 top-40 absolute left-0">{"<"}</button>
          <img src={imgs[0]} alt={name} className="block m-auto h-96 w-96" />
          <button className="p-3 absolute bottom-44 right-0">{">"}</button>
        </div>

        <div className=" bg-gray-500 w-full">
          {imgs.map((img) => {
            return (
              <img
                src={img}
                alt={name}
                key={name + img}
                className="w-24 mt-3 mr-3 inline-block"
              />
            );
          })}
        </div>
      </div>
      <div className="float-right w-5/12 absolute pr-5 h-page right-12 flex .shadow-lg font-work flex-col bg-white p-6">
        <h1 className=" text-2xl font-medium font-poppins pb-1">
          {name.toUpperCase()}
        </h1>
        <p>{type.toUpperCase()}</p>

        <p className="my-5 font-light w-96 text-sm ">{details}</p>

        <span className="my-2 flex-col font-semibold font-poppins flex justify-between">
          <p className="font-normal my-2">OPTIONS: </p>
          <Radiospan
            name={name}
            grpname="optionsOpt"
            handleSelect={handleOptionsSelect}
            entries={optionsEntries}
          />
          <p className="font-normal my-2">BEANS: </p>
          <Radiospan
            name={name}
            grpname="prefOpt"
            handleSelect={handlePrefSelect}
            entries={prefEntries}
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

const Radiospan = ({ name, grpname, handleSelect, entries }) => {
  return (
    <span className="w-full">
      {entries.map((entry) => {
        const value = entry[1];
        let key = entry[0];

        return (
          <label className="radcon" key={name + key}>
            <input
              type="radio"
              name={name + grpname}
              value={value}
              onChange={() => {
                grpname === "optionsOpt"
                  ? handleSelect(value, key)
                  : handleSelect(value);
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
        name: choices.selected,
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
        className=" w-11/12 mt-3 m-auto  active:bg-gray-800 flex text-sm justify-center bg-white rounded-md border-darkbrown border py-3 font-poppins btn-focus hover:text-white hover:bg-darkbrown hover:btn-focus-hover "
      >
        ADD TO BAG
      </button>
    </span>
  );
};

export default ProductInfo;
