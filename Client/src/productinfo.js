import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { addItemToCart } from "./actions";
import products from "./products";

export const ProductInfo = ({ match }) => {
  const { product_name } = useParams(); // change to match when api is available
  //const product = useSelector(state => state.itemlist.find(item=>item.name===product_name))
  const _item = products.find((item) => item.name === product_name);

  const { imgs, type, name, options, preferences, details } = _item;
  const optionsEntries = Object.keys(options).map((key) => [key, options[key]]);
  const prefEntries = Object.keys(preferences).map((pref) => [
    pref,
    preferences[pref],
  ]);

  const low = optionsEntries.map((a) => a[1]).reduce((a, b) => Math.min(a, b));
  const high = optionsEntries.map((a) => a[1]).reduce((a, b) => Math.max(a, b));
  const optionsrange = `${low}  - \u20b1${high}`;
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
      <div className=" w-5/12 my-auto  float-left ml-10">
        <img src={imgs[0]} alt={name} />
      </div>

      <div className="float-right w-5/12  absolute pr-5 h-page right-12 flex shadow-lg font-work flex-col bg-white p-6">
        <h1 className=" text-2xl font-medium font-poppins pb-1">
          {name.toUpperCase()}
        </h1>
        <p>{type.toUpperCase()}</p>

        <p className="my-5 font-light w-96 text-sm ">{details}</p>

        <span className="my-2 flex-col font-semibold font-poppins flex justify-between">
          <p className="font-normal pt-1">OPTIONS: </p>
          <Radiospan
            name={name}
            grpname="optionsOpt"
            handleSelect={handleOptionsSelect}
            entries={optionsEntries}
          />
          <p className="font-normal pt-1">BEANS: </p>
          <Radiospan
            name={name}
            grpname="prefOpt"
            handleSelect={handlePrefSelect}
            entries={prefEntries}
          />
        </span>
        <span className="w-full flex h-12  border-b">
          <input
            disabled
            ref={qtyInp}
            type="number"
            placeholder="1"
            min="1"
            max="50"
            onChange={(e) => handleQtySelect(e)}
            className="w-10 mx-auto"
          />
          <p className=" text-coffee text-2xl mt-2 mr-6 ">
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
            <span className="border inline-block mt-1 border-darkbrown font-normal font-work text-sm rounded px-3 py-2 mx-1 transition-colors">
              {key}
            </span>
          </label>
        );
      })}
    </span>
  );
};

const AddtoCartBtn = ({ choices }) => {
  const dispatch = useDispatch();
  const handleAdd = (e) => {
    e.preventDefault();
    if (choices.selected && choices.selected_preference) {
      const selecteditem = {
        id: new Date().getTime().toString(),
        name: choices.selected,
        quantity: choices.quantity,
        price: choices.price,
        preference: choices.selected_preference,
      };
      dispatch(addItemToCart(selecteditem));
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
