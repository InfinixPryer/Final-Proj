import React, { useContext, useState, useEffect } from "react";
import ProductViewer from "../productsviewer.js";
import { ProductContext } from "../context/ProductContext";
import { api } from "../App.js";
import products from "../products";

const ProductPage = () => {
  const { itemList, dispatch } = useContext(ProductContext);

  /*   useEffect(() => {
    api.get("/photos/1").then((res) => {
      console.log(res.data);
      dispatch({ type: "SET_ITEMS", payload: res.data });
    });
  }, []); */

  const [toFindItems, settoFindItems] = useState(itemList);
  const [failedToFind, setFailed] = useState(false);

  const ProductFinder = () => {
    const [toFind, settofind] = useState("");
    const tagArray = ["foo", "bar", "baz"];

    const handleChange = (e) => {
      settofind(e.target.value);
    };
    const handleTagSearch = (tag) => {
      console.log(tag);
    };
    const handleSearch = () => {
      const findName = (obj) => {
        return obj.name.toLowerCase().includes(toFind.toLowerCase());
      };
      const findthis = products.filter(findName);
      if (findthis.length === 0) {
        setFailed(true);
      } else {
        settoFindItems(findthis);
        setFailed(false);
      }
    };

    return (
      <section className=" sm:w-52 pt-7 p-3 flex-col float-left text-sm">
        <span className="mb-4">
          <input
            type="text"
            value={toFind}
            placeholder="Find an item.."
            className="rounded-md w-9/12 border border-gray-200 p-1"
            onChange={(e) => handleChange(e)}
          />
          <button className="p-1 shadow-md w-6 ml-1" onClick={handleSearch}>
            s
          </button>
        </span>
        {tagArray.map((tag) => (
          <button
            className="border-b p-2 w-full block"
            key={tag}
            onClick={() => handleTagSearch(tag)}
          >
            {tag}
          </button>
        ))}
      </section>
    );
  };

  return (
    <div className=" flex w-full bg-palebg">
      <ProductFinder />
      <ProductViewer toFindItems={toFindItems} failedToFind={failedToFind} />
    </div>
  );
};
export default ProductPage;
