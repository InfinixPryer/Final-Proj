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
      <section className="w-full h-full flex overflow-auto float-right px-4">
        <h1 className="m-auto w-52 h-5">Sorry that item doesn't exist</h1>
      </section>
    );
  }

  return (
    <>
      <div className="w-full my-8 mb-48 flex flex-col cursor-default justify-center">
        <h1 className="text-7xl p-4 font-bold font-poppins">{tag}</h1>
        <p className="p-5 w-4/6 font-bold text-lg">
          Our products range from not just coffee beans, we also have bundles
          and coffee press. There's a lot you can choose from and we recommend
          you try them out!
        </p>
      </div>

      <div></div>
      <section className="grid grid-container p-5 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 mb-24 gap-6 font-type">
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
    </>
  );
};

export default CategoryViewer;
