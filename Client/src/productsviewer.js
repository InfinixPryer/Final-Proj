import React, { useEffect, useState, useContext } from "react";
import ProductCard from "./productcard.js";
import { Link } from "react-router-dom";
import { Loading } from "./pages/LandingPage.js";
import { ProductContext } from "./context/ProductContext";

const ProductViewer = ({ find }) => {
  const [items, setItems] = useState("");
  const { itemList } = useContext(ProductContext);

  useEffect(() => {
    const filterList = (item, item_name) => {
      if (
        item.productName.toLowerCase().includes(item_name) ||
        item.type.toLowerCase().includes(item_name)
      ) {
        return item;
      }
    };

    if (!find) {
      setItems(itemList);
    } else {
      const item_name = find.toLowerCase();
      const search_array = itemList.filter((item) =>
        filterList(item, item_name)
      );

      setItems(search_array);
    }
  }, [itemList, find]);

  if (!items) {
    return <Loading />;
  }
  if (items.length === 0) {
    return (
      <span className="text-center p-20 h-full w-full absolute">
        <h1>{"Sorry that item doesn't exist"}</h1>
      </span>
    );
  }

  return (
    <span className="">
      <section className="grid grid-container p-5 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-6 mb-14 font-type">
        {items.map((item) => {
          return (
            <div key={item.productId}>
              <Link to={`/Products/${item.productName}`}>
                <ProductCard {...item} />
              </Link>
            </div>
          );
        })}
      </section>
    </span>
  );
};

export default ProductViewer;
