import React, { useState, useEffect } from "react";

const ProductCard = (props) => {
  const { imgs, type, name, options } = props;
  const optionsEntries = Object.keys(options).map((key) => [key, options[key]]);
  const low = optionsEntries.map((a) => a[1]).reduce((a, b) => Math.min(a, b));
  const high = optionsEntries.map((a) => a[1]).reduce((a, b) => Math.max(a, b));
  const optionsrange = `\u20b1 ${low}  - \u20b1 ${high}`;

  const [img, setImg] = useState(0);
  const [hover, sethover] = useState(false);

  const checkTitleLength = (name) => {
    if (name.length > 45) {
      return name.slice(0, 45) + "...";
    } else return name;
  };
  const handleHover = () => {};

  return (
    <article
      onMouseEnter={() => {
        sethover(true);
      }}
      onMouseOver={() => handleHover()}
      onMouseLeave={() => {
        sethover(false);
        setImg(0);
      }}
      className="product-box shadow-clean cursor-pointer font-work rounded group transform hover:-translate-y-1 hover:shadow-light w-full relative pb-2 bg-white"
    >
      <div className="w-full overflow-hidden rounded-t">
        <img src={imgs[img]} alt={name} className="m-auto" />
      </div>
      <div className="pl-3 pr-4  flex flex-col py-1 md:py-2 mb-10 max-h-32">
        <h3 className="sm:text-norm leading-snug text-sm">
          {checkTitleLength(name)}
        </h3>
        <p className=" text-xs md:text-sm text-coffee">{type}</p>
        <p className="text-coffee left-3 font-poppins text-xs sm:text-base mt-3">
          {optionsrange}
        </p>
      </div>

      <div className="w-full flex justify-center">
        <button className="w-11/12 m-auto absolute bottom-2 py-1 sm:py-2 text-coffee bg-white rounded-sm sm:rounded border-coffee text-xs border btn-focus group-hover:py-1 sm:group-hover:py-1.5 group-hover:text-white sm:group-hover:text-sm group-hover:text-xs group-hover:bg-darkbrown group-hover:border-darkbrown group-hover:w-full group-hover:rounded-none">
          View Details
        </button>
      </div>
    </article>
  );
};

export default React.memo(ProductCard);
