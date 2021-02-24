import React, { useState, useEffect, useRef } from "react";
import ProductViewer from "../productsviewer.js";
import CategoryViewer from "../categoryviewer.js";
import Footer from "../footer.js";
import { api } from "../App.js";

const ProductPage = () => {
  const int_state = "All Products";
  const [findthis, setFind] = useState("");
  const [tag, setCateg] = useState(int_state);

  return (
    <>
      <section className="mx-1 sm:mx-12 flex-1 relative">
        <FinderBar
          setFind={setFind}
          setCateg={setCateg}
          int_state={int_state}
        />
        {tag === int_state ? (
          <ProductViewer find={findthis} />
        ) : (
          <CategoryViewer tag={tag} />
        )}
      </section>
      <Footer />
    </>
  );
};
export default ProductPage;

const FinderBar = ({ setFind, setCateg, int_state }) => {
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState([int_state]);
  const [hidden, setHide] = useState(true);
  const int_btn = useRef();

  useEffect(() => {
    const getTags = async () => {
      try {
        const res = await api.get("/products/tags");
        setTags((prev) => {
          let arr = [];
          res.data.some((tag) => {
            if (!prev.includes(tag)) {
              arr.push(tag);
            }
          });
          return prev.concat(arr);
        });
      } catch (error) {
        console.error(error);
      }
    };
    getTags();
    int_btn.current.checked = true;
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleTagSel = (e) => {
    const tag = e.target.value;
    if (tag !== "All Products") {
      setHide(false);
    } else {
      setFind("");
      setHide(true);
    }
    setCateg(tag);
  };

  return (
    <>
      {hidden && (
        <>
          <div className="w-8/12 p-5 my-10 text-center hover:scale-150 m-auto">
            <img src="" className="w-48 h-48 mb-10 mx-auto" />
            <h1>
              {
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas commodo venenatis neque eu tincidunt. Morbi eget ornare nisl, nec auctor velit. Sed fringilla at enim luctus pellentesque. Suspendisse suscipit neque maximus, laoreet velit quis, congue magna. Sed volutpat fermentum nulla, vel ultricies turpis ullamcorper sit amet."
              }
            </h1>
          </div>
        </>
      )}
      <span className="category-bar px-5 z-10 py-3 m-auto block overflow-x-scroll w-9/12">
        <span className="w-full h-12 flex">
          {tags.map((tag) => {
            if (tag === int_state) {
              return (
                <label className="radcon" key={tag}>
                  <input
                    ref={int_btn}
                    type="radio"
                    name={"Categories"}
                    value={tag}
                    onChange={(e) => {
                      handleTagSel(e);
                    }}
                  />
                  <span className="min-w-max  text-coffee border-gray-50 block rounded-full cursor-pointer shadow-clean text-center font-normal font-work text-sm py-2 px-6 mx-2">
                    {tag}
                  </span>
                </label>
              );
            }
            return (
              <label className="radcon" key={tag}>
                <input
                  type="radio"
                  name={"Categories"}
                  value={tag}
                  onChange={(e) => {
                    handleTagSel(e);
                  }}
                />
                <span className="min-w-max block text-coffee  border-gray-50 rounded-full cursor-pointer shadow-clean text-center font-normal font-work text-sm  py-2 px-6 mx-2">
                  {tag}
                </span>
              </label>
            );
          })}
        </span>
      </span>
      {hidden && (
        <span className="flex w-7/12 relative justify-center pb-2 m-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => handleChange(e)}
            className="rounded-full focus:shadow-md w-3/6 p-2 px-4 text-norm"
            onKeyUp={() => setFind(query)}
            placeholder={"Looking for something?"}
          />
          <span
            onClick={() => setFind(query)}
            className="rounded-full bg-gray-100 cursor-pointer text-center w-10 mx-2"
          >
            {"p"}
          </span>
        </span>
      )}
    </>
  );
};
