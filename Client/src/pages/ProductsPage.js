import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductViewer from "../productsviewer.js";
import { ProductContext } from "../context/ProductContext";
import { api } from "../App.js";
import products from "../products";

const ProductPage = () => {
  const { itemList, dispatch } = useContext(ProductContext);
  const [toFindItems, settoFindItems] = useState(itemList);
  const [failedToFind, setFailed] = useState(false);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();

  /*   useEffect(() => {
    api.get("/photos/1").then((res) => {
      console.log(res.data);
      dispatch({ type: "SET_ITEMS", payload: res.data });
    });
  }, []); */

  const ProductFinder = () => {
    const [toFind, settofind] = useState("");
    const tagArray = ["Single Origins", "Feelippine Coffee", "baz"];

    const handleChange = (e) => {
      settofind(e.target.value);
    };
    const handleTagSearch = (tag) => {
      let arr = [];
      itemList.filter((obj) => {
        for (let i of obj.tags) {
          if (i === tag) {
            arr.push(obj);
          }
        }
      });
      settoFindItems(arr);
      setFailed(false);
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
      <section className=" sm:w-60 pt-7 p-1 font-source flex-col float-left text-sm">
        <span className="mb-4 mx-auto">
          <input
            type="text"
            value={toFind}
            placeholder="Find an item.."
            className="rounded-md w-9/12 border border-gray-200 ml-2"
            onChange={(e) => handleChange(e)}
          />
          <button
            className="border-none shadow hover:bg-gray-100"
            onClick={handleSearch}
          >
            s
          </button>
        </span>
        {tagArray.map((tag) => (
          <Link key={tag} to={`/Products/search?tag=:${tag}`}>
            <span
              className="p-2 border my-1 w-full rounded opacity-70 hover:border-darkbrown block"
              onClick={() => handleTagSearch(tag)}
            >
              {tag}
            </span>
          </Link>
        ))}
      </section>
    );
  };

  return (
    <div className=" flex w-full bg-palebg">
      <ProductFinder />
      <ProductViewer
        tag={query.get("tag")}
        toFindItems={toFindItems}
        failedToFind={failedToFind}
      />
    </div>
  );
};
export default ProductPage;
