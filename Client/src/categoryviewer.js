import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./productcard.js";
import { Link } from "react-router-dom";
import { Loading } from "./pages/LandingPage.js";
import { ProductContext } from "./context/ProductContext";

const CategoryViewer = ({ tag }) => {
  const [items, setItems] = useState("");
  const { itemList } = useContext(ProductContext);

  useEffect(() => {
    const filterList = (item) => {
      if (item.tags.includes(tag)) {
        return item;
      }
    };
    if (!tag) {
      setItems(itemList);
    } else {
      const items_array = itemList.filter((item) => filterList(item));

      setItems(items_array);
    }
  }, [itemList, tag]);

  if (!items) {
    return <Loading />;
  }
  if (items.length === 0) {
    return (
      <section className="w-full h-page flex overflow-auto float-right px-4">
        <h1 className="m-auto w-52 h-5">Sorry that item doesn't exist</h1>
      </section>
    );
  }

  return (
    <>
      {items.map((item) => {
        return (
          <div key={item.productId}>
            <Link to={`/Products/${item.productName}`}>
              <ProductCard {...item} />
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default CategoryViewer;
