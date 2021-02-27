import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "./context/CartContext";
import { ProductContext } from "./context/ProductContext";
import { ADD_TO_CART } from "./types";
import { Loading } from "./pages/LandingPage.js";
import { api } from "./App.js";

export const ProductInfo = () => {
  const { product_name } = useParams();
  const { itemList } = useContext(ProductContext);
  const [item, setItem] = useState();
  const adminToken = localStorage.getItem("token");
  const [loading, setload] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await api
          .get(`/products/${product_name}`, {
            headers: {
              Authorization: adminToken,
            },
          })
          .then((res) => {
            setItem(res.data.product[0]);
            console.log(res);
          });
      } catch (err) {
        console.error(err);
      } finally {
        setload(false);
      }
    };

    if (itemList.length !== 0) {
      const pageItem = itemList.find(
        (item) => item.productName === product_name
      );
      setItem(pageItem);
      setload(false);
    } else {
      fetchProduct();
    }
    return () => {
      setItem({});
    };
  }, [itemList, product_name, adminToken]);

  return <>{loading ? <Loading /> : <ItemPage {...item} />}</>;
};
const ItemPage = ({
  productId,
  productImage,
  type,
  productName,
  options,
  preferences,
  details,
}) => {
  const [display, setDisplay] = useState(0);
  const [choices, setChoice] = useState({
    quantity: 1,
    price: ``,
    selected_option: "",
    selected_preference: "",
    single_item_price: ``,
  });
  const qtyInp = useRef();

  useEffect(() => {
    const update = () => {
      let optionsrange = Number;
      if (options.length === 1) {
        optionsrange = options[0].price;
      } else {
        const arr = options.map((op) => op.price);
        const high = Math.max(...arr);
        const low = Math.min(...arr);
        if (low === high) {
          optionsrange = high;
        } else optionsrange = `${low} - \u20b1${high}`;
      }
      setChoice((prev) => {
        return { ...prev, price: optionsrange };
      });
    };
    update();
    return () => {
      setChoice({});
    };
  }, [options]);

  const handleQtySelect = (e) => {
    const qty = e.target.value;
    if (qty > 50) {
      qtyInp.current.value = 50;
      setChoice({
        ...choices,
        quantity: qty,
        price: choices.selected_option.price * 50,
      });
    } else
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
      price: option.price * choices.quantity,
      selected_option: option,
      single_item_price: option.price,
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
  return (
    <section className="flex w-full mx-10 h-page overflow-hidden bg-white ">
      <div className="absolute font-source text-sm py-1 rounded-br-md pl-12 bg-white /bg-darkbrown">
        <Link to="/Products">{`< Products / `}</Link>
        {`${productName}`}
      </div>
      <div className=" w-6/12 flex flex-wrap  float-left m-10">
        <div className="flex items-center h-96 w-full relative">
          <span
            className="p-5 absolute left-0 text-gray-400 rounded shadow-md cursor-pointer"
            onClick={() => handleDisplayState("prev")}
          >
            {`\u140A`}
          </span>
          <img
            src={productImage[display]}
            alt={productName}
            className="block m-auto h-96"
          />
          <span
            className="p-5 absolute right-0 text-gray-400 rounded shadow-md transition-colors cursor-pointer"
            onClick={() => handleDisplayState("next")}
          >
            {`\u1405`}
          </span>
        </div>

        <div className=" w-10/12 mb-16 overflow-x-scroll p-5 mx-auto">
          {productImage.map((img, index) => {
            return (
              <div
                className="w-3/12 mt-1 mr-3 transition-transform transform hover:scale-110 inline-block cursor-pointer hover:border-2 hover:border-darkbrown"
                onClick={() => setDisplay(index)}
                key={img + productName}
              >
                <img src={img} alt={productName} key={productName + img} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="float-right w-4/12 absolute h-page right-12 mx-5 flex font-work flex-col bg-white p-4">
        <h1 className=" text-3xl font-medium font-poppins pb-1">
          {productName.toUpperCase()}
        </h1>
        <p>{type.toUpperCase()}</p>

        <p className="my-5 font-light text-sm ">{details}</p>

        <span className="my-2 flex-col font-semibold font-poppins flex justify-between">
          <p className="font-normal my-2">OPTIONS: </p>
          <OptionsSpan
            productName={productName}
            handleSelect={handleOptionsSelect}
            entries={options}
          />
          <PreferenceSpan
            productName={productName}
            handleSelect={handlePrefSelect}
            entries={preferences}
          />
        </span>
        <span className="flex h-12 justify-between mx-1 ">
          <input
            disabled
            ref={qtyInp}
            type="number"
            placeholder="1"
            min="1"
            max="50"
            onChange={(e) => handleQtySelect(e)}
            className="w-24 h-10 "
          />
          <p className=" text-coffee text-4xl my-auto ">
            {"\u20b1" + choices.price}
          </p>
        </span>

        <div className="relative bottom-1">
          <AddtoCartBtn
            choices={choices}
            productId={productId}
            productName={productName}
            options={options}
            preferences={preferences}
          />
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
            <span className="inline-block mb-1 min-w-1/4 text-center border font-normal font-work text-sm rounded px-4 py-3 mx-1 transition-colors">
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
    <span className="w-full mb-6">
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
            <span className=" inline-block mb-1 min-w-1/4 text-center border font-normal font-work text-sm rounded px-4 py-3 mx-1 transition-colors">
              {key}
            </span>
          </label>
        );
      })}
    </span>
  );
};

const AddtoCartBtn = ({ choices, productId, productName, preferences }) => {
  const { dispatch } = useContext(CartContext);
  const [current, setCurrent] = useState([]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (
      (choices.selected_option && preferences.length === 0) ||
      (choices.selected_option && choices.selected_preference)
    ) {
      const selectedItem = {
        key: `${productId}${choices.selected_option.name}${choices.selected_preference}`,
        productId: productId,
        selectedOption: choices.selected_option.name,
        selectedPreference: choices.selected_preference,
        name: productName,
        quantity: parseInt(choices.quantity),
        totalPrice: choices.price,
      };
      if (!current.includes(selectedItem.key)) {
        setCurrent(current.concat(selectedItem.key));
        dispatch({ type: ADD_TO_CART, payload: selectedItem });
      }
    }
  };

  return (
    <span className="flex justify-center h-10">
      <button
        onClick={(e) => {
          handleAdd(e);
        }}
        className=" w-11/12 mt-3 m-auto text-espresso  flex text-sm justify-center bg-white rounded-md border-espresso border py-3 font-poppins btn-focus hover:text-white hover:bg-espresso hover:btn-focus-hover "
      >
        ADD TO BAG
      </button>
    </span>
  );
};

export default ProductInfo;
