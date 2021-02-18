import React, { useEffect, useState } from "react";
import ProductCard from "./productcard.js";
import { Link } from "react-router-dom";

const ProductViewer = ({ toFindItems, failedToFind }) => {
  if (!toFindItems) {
    return (
      <div className="flex w-32 justify-around relative">
        <span className="p-3 rounded-full absolute left-0 animate-bounce bg-gray-400"></span>
        <span className="p-3 rounded-full absolute  animate-bounce  bg-gray-400"></span>
        <span className="p-3 rounded-full absolute right-0 animate-bounce bg-gray-400"></span>
      </div>
    );
  }
  if (failedToFind) {
    return (
      <section className="w-full h-page flex overflow-auto float-right px-4">
        <h1 className="m-auto w-52 h-5">Sorry that item doesn't exist</h1>
      </section>
    );
  }

  return (
    <section className="w-full h-page overflow-auto float-right px-4">
      <div className="grid grid-container md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-x-4 gap-y-6 font-type">
        {toFindItems.map((item) => {
          return (
            <div key={item.productId}>
              <Link to={`/Product=${item.productName}`}>
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
