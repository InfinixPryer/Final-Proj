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
      console.log(item_name);
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
      <section className="w-full h-page flex overflow-auto float-right px-4">
        <h1 className="m-auto w-52 h-5">Sorry that item doesn't exist</h1>
      </section>
    );
  }

  return (
    <section className="w-full h-page overflow-auto float-right p-4">
      <div className="grid grid-container md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-x-4 gap-y-6 font-type">
        {items.map((item) => {
          return (
            <div key={item.productId}>
              <Link to={`/Product/${item.productName}`}>
                <ProductCard {...item} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductViewer;
