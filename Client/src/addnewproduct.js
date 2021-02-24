import { useState, useEffect, useRef } from "react";
//import { api } from "./App.js";
import axios from "axios";
const PatchItem = ({ item }) => {
  const [newItem, setNewItem] = useState({
    productId: "",
    productName: "",
    availability: false,
    productImage: [],
    type: "",
    details: "",
    options: [],
    preferences: [],
    tags: [],
  });
  const [tag, setTag] = useState("");
  const [pref, setPref] = useState("");
  const [image, setImage] = useState("");
  const [newOption, setOption] = useState({
    name: "",
    price: "",
  });

  useEffect(() => {
    if (item) {
      setNewItem(item);
    }
    console.log(newItem);
  }, []);

  const {
    productName,
    productId,
    productImage,
    type,
    details,
    options,
    preferences,
    tags,
  } = newItem;

  const handleChange = (e) => {
    const data = e.target.value;
    switch (e.target.id) {
      case "product_id":
        setNewItem({ ...newItem, productId: data });
        break;
      case "details":
        setNewItem({ ...newItem, details: data });
        break;
      case "name":
        setNewItem({ ...newItem, productName: data });
        break;
      case "type":
        setNewItem({ ...newItem, type: data });
        break;
      case "imgs":
        const reader = new FileReader();
        const imgToUp = e.target.files[0];

        if (imgToUp) {
          reader.addEventListener("loadend", () => {
            setImage(reader.result);
          });
          reader.readAsDataURL(imgToUp);
        }
        break;
      case "option":
        setOption({ ...newOption, name: data });
        break;
      case "option-price":
        setOption({ ...newOption, price: data });
        break;
      case "tags":
        setTag(data);
        break;
      case "prefs":
        setPref(data);
      default:
        break;
    }
  };
  const handleAddOption = () => {
    setNewItem({ ...newItem, options: options.concat(newOption) });
    setOption({
      name: "",
      price: "",
    });
  };
  const handleAddTag = () => {
    if (tag) {
      setNewItem({ ...newItem, tags: tags.concat(tag) });
      setTag("");
    }
  };
  const handleAddPref = () => {
    if (pref) {
      setNewItem({ ...newItem, preferences: preferences.concat(pref) });
      setPref("");
    }
  };

  const handleAddImg = () => {
    if (image) {
      setNewItem({ ...newItem, productImage: productImage.concat(image) });
      setImage("");
    }
  };

  const handleDel = (val, name, prop) => {
    const nVal = prop.filter((i) => i !== val);
    setNewItem({ ...newItem, [name]: nVal });
  };

  const handleDelOpt = (opt) => {
    const nOpts = options.filter((o) => o.name !== opt);
    setNewItem({ ...newItem, options: nOpts });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post("http://localhost:9000/products", newItem).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  return (
    <>
      <div className="flex h-40 w-full">
        {productImage.map((im) => {
          return (
            <span key={im} className="h-40 w-40">
              <img src={im} alt="preview" />
              <span
                onClick={() => handleDel(im, `productImage`, productImage)}
                className="rounded-full cursor-pointer bg-gray-200 ml-1 hover:bg-gray-400 hover:text-white w-4 text-center text-xs inline-block"
              >
                {`\u2715`}
              </span>{" "}
            </span>
          );
        })}
      </div>
      <div className="flex items-center h-14">
        Tags:
        {tags.map((tag) => {
          return (
            <span
              className="mr-1 inline-block /border shadow-sm hover:bg-gray-200 /border-gray-300 p-1 my-2 rounded"
              key={tag}
            >
              {tag}
              <span
                onClick={() => handleDel(tag, `tags`, tags)}
                className="rounded-full cursor-pointer bg-gray-200 ml-1 hover:bg-gray-400 hover:text-white w-4 text-center text-xs inline-block"
              >
                {`\u2715`}
              </span>
            </span>
          );
        })}
      </div>
      <div className="flex items-center h-14">
        Preferences:
        {preferences.map((pref) => {
          return (
            <span
              className="mr-1 inline-block /border shadow-sm hover:bg-gray-200 /border-gray-300 p-1 my-2 rounded"
              key={pref}
            >
              {pref}
              <span
                onClick={() => handleDel(pref, `preferences`, preferences)}
                className="rounded-full cursor-pointer bg-gray-200 ml-1 hover:bg-gray-400 hover:text-white w-4 text-center text-xs inline-block"
              >
                {`\u2715`}
              </span>
            </span>
          );
        })}
      </div>
      <div className="flex items-center h-14">
        Options:
        {options.map((opt) => {
          const { name, price } = opt;
          return (
            <span
              className="mr-1 inline-block /border shadow-sm hover:bg-gray-200 /border-gray-300 p-1 my-2 rounded"
              key={name}
            >
              {`${name} : ${price}`}
              <span
                onClick={() => handleDelOpt(name)}
                className="rounded-full cursor-pointer bg-gray-200 ml-1 hover:bg-gray-400 hover:text-white w-4 text-center text-xs inline-block"
              >
                {`\u2715`}
              </span>
            </span>
          );
        })}
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="addnew ">
          <label>
            Id:
            <input
              type="text"
              id="product_id"
              value={productId}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              id="name"
              value={productName}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label>
            Type:
            <input
              type="text"
              id="type"
              value={type}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label>
            Option:
            <input
              type="text"
              id="option"
              value={newOption.name}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            Price:
            <input
              type="number"
              id="option-price"
              value={newOption.price}
              min="1"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <button type="button" onClick={() => handleAddOption()}>
              ADD
            </button>
          </label>
          <label>
            Tags:
            <input
              type="text"
              id="tags"
              value={tag}
              onChange={(e) => handleChange(e)}
            />
            <button type="button" onClick={() => handleAddTag()}>
              ADD
            </button>
          </label>
          <label>
            Preferences:
            <input
              type="text"
              id="prefs"
              value={pref}
              onChange={(e) => handleChange(e)}
            />
            <button type="button" onClick={() => handleAddPref()}>
              ADD
            </button>
          </label>

          <label className="flex">details</label>
          <textarea
            type="text"
            className="border w-3/6 h-32"
            id="details"
            value={details}
            onChange={(e) => handleChange(e)}
          />
          <label className="flex">
            Images:
            <input type="file" id="imgs" onChange={(e) => handleChange(e)} />
            <button type="button" onClick={() => handleAddImg()}>
              ADD
            </button>
          </label>
        </div>
        <button type="submit">ADD</button>
      </form>
    </>
  );
};

export default PatchItem;
