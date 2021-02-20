import React, { useState, useEffect } from "react";
import ProductViewer from "../productsviewer.js";
import axios from "axios";
//const api = axios.create("http://localhost:9000/products");

const ProductPage = () => {
  const [findthis, setFind] = useState("");
  const [tags, setTags] = useState(null);

  useEffect(() => {
    const getTags = async () => {
      const data = await axios.get("http://localhost:9000/products/tags");
      console.log(data);
    };
    getTags();
  }, []);

  return (
    <div className="flex w-full flex-col">
      <FinderBar setFind={setFind} />
      <ProductViewer find={findthis} />
    </div>
  );
};
export default ProductPage;

const FinderBar = ({ setFind }) => {
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState(["single origin"]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSearch = () => {
    setFind(query);
  };
  return (
    <div className="flex w-full">
      <div className=""></div>
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e)}
      ></input>
      <button onClick={() => handleSearch()}>search</button>
    </div>
  );
};
