import React, { useEffect, useState, useContext, useRef } from "react";
import ProductCard from "./productcard.js";
import { Link } from "react-router-dom";
import { Loading } from "./pages/LandingPage.js";
import { ProductContext } from "./context/ProductContext";
import h1 from "./h1.jpg";

const CategoryViewer = ({ tag }) => {
  const [items, setItems] = useState("");
  const { itemList } = useContext(ProductContext);
  const [header, setHeader] = useState(h1);
  const headEl = useRef();

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
        <p className="p-5">
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas commodo venenatis neque eu tincidupiscing elit. Maecenas commodo venenatis neque eu tincidupiscing elit. Maecenas commodo venenatis neque eu tincidupiscing elit. Maecenas commodo venenatis neque eu tincidunt. Morbi eget ornare nisl, ne"
          }
        </p>
      </div>
      {header && (
        <img src={header} alt={header} ref={headEl} className="rounded-xl" />
      )}
      <div></div>
      <section className="grid grid-container p-5 md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-6 font-type">
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
