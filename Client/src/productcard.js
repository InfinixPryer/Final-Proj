import React, { useEffect, useState } from "react";

const ProductCard = (props) => {
  const { productImage, type, productName, options } = props;
  const high = options.reduce((obj, curr) => Math.max(obj.price, curr.price));
  const low = options.reduce((obj, curr) => Math.min(obj.price, curr.price));
  const optionsrange = `\u20b1${low} - \u20b1${high}`;
  const [img, setImg] = useState(0);
  const [slide, setSlide] = useState(null);

  const checkTitleLength = (productName) => {
    if (productName.length > 45) {
      return productName.slice(0, 45) + "...";
    } else return productName;
  };

  const handleHover = () => {
    setSlide(
      setInterval(() => {
        setImg((prev) => (prev < productImage.length - 1 ? prev + 1 : 0));
      }, 850)
    );
  };

  const handleLeave = () => {
    clearInterval(slide);
    setImg(0);
  };

  useEffect(() => {
    return () => {
      setSlide(null);
      setImg(0);
    };
  }, []);

  return (
    <article
      onMouseEnter={() => {
        handleHover();
      }}
      onMouseLeave={() => {
        handleLeave();
      }}
      className="product-box shadow-clean cursor-pointer font-work rounded-sm group transform hover:-translate-y-1 hover:shadow-light w-full relative bg-white"
    >
      <div className="w-full overflow-hidden rounded-t-sm">
        <img src={productImage[img]} alt={productName} className="m-auto" />
      </div>
      <div className="pl-3 pr-4  flex flex-col py-1 md:py-2 mb-10 max-h-32">
        <h3 className="sm:text-norm text-sm font">
          {checkTitleLength(productName)}
        </h3>
        <p className=" text-xs md:text-sm text-coffee">{type}</p>
        <p className="text-coffee left-3 font-poppins text-xs sm:text-base mt-2">
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
