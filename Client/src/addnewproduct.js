import { useState, useEffect, useRef } from "react";
import { api } from "./App.js";
const PatchItem = ({ item }) => {
  const [patchedProps, setPatch] = useState({});
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
  const [urlId, setUrl] = useState("");
  const [tag, setTag] = useState("");
  const [pref, setPref] = useState("");
  const [image, setImage] = useState({
    src: "",
    file: "",
  });
  const [newOption, setOption] = useState({
    name: "",
    price: "",
  });
  const [message, setMes] = useState("");
  const messpan = useRef();

  useEffect(() => {
    if (item) {
      setNewItem(item);
      setUrl(item.productId);
    }
  }, [item]);

  useEffect(() => {
    console.log(patchedProps);
  }, [patchedProps]);

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

  const adminToken = localStorage.getItem("token");
  useEffect(() => {
    console.log(newItem);
  }, [productImage]);

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
        const fd = new FormData();
        const reader = new FileReader();
        const imgToUp = e.target.files[0];
        fd.append("file", imgToUp);

        reader.addEventListener("loadend", () => {
          setImage({ file: fd, src: reader.result });
        });
        reader.readAsDataURL(imgToUp);
        //console.log(imgToUp);
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
        break;
      default:
        break;
    }
  };
  const handleAddOption = () => {
    if (newOption.name !== "" && newOption.price > 10) {
      setNewItem({ ...newItem, options: options.concat(newOption) });
      setOption({
        name: "",
        price: "",
      });
    }
  };
  const handleAddTag = () => {
    if (tag !== "" && !tags.includes(tag)) {
      setNewItem({ ...newItem, tags: tags.concat(tag) });
      setTag("");
    }
  };
  const handleAddPref = () => {
    if (pref !== "") {
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

  const handleDelImg = (im) => {
    const nVal = productImage.filter((i) => i.src !== im);
    setNewItem({ ...newItem, productImage: nVal });
  };

  const handleDelOpt = (opt) => {
    const nOpts = options.filter((o) => o.name !== opt);
    setNewItem({ ...newItem, options: nOpts });
  };

  const handleSubmit = (event) => {
    const images = productImage.map((i) => i.file);
    setNewItem({ ...newItem, productImage: images });

    event.preventDefault();
    const config = {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        Authorization: adminToken,
      },
    };
    if (newItem.options.length > 0) {
      try {
        fetch("products", config).then(() => {
          setMes("Added!");
          messpan.current.hidden = false;
          window.location.reload();
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      setMes("Lacking value for input fields");
      messpan.current.hidden = false;
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const images = productImage.map((i) => i.file);
    setNewItem({ ...newItem, productImage: images });

    const config = {
      method: "PATCH",
      body: JSON.stringify(newItem),
      headers: {
        Authorization: adminToken,
      },
    };
    if (item && newItem !== item) {
      for (const key in newItem) {
        if (newItem.hasOwnProperty(key) && item[key] !== newItem[key]) {
          const patch = Object.assign(patchedProps, {
            [key]: newItem[key],
          });
          console.log(patch);
          setPatch(patch);
        }
      }

      try {
        await fetch(`products/${urlId}`, config).then(() =>
          window.location.reload()
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="w-full h-page absolute bg-gray-100">
      <div className="p-5 rounded-lg bg-white w-5/6 mx-auto my-3 shadow-md">
        <div className="grid grid-cols-2 overflow-y-scroll px-4 float-right w-3/6">
          {productImage.map((im) => {
            let img;
            if (typeof im === "string") {
              img = im;
            } else img = im.src;
            return (
              <span key={img} className=" max-h-64 overflow-auto relative">
                <img src={img} alt="preview" />
                <span
                  onClick={() => handleDelImg(img)}
                  className="rounded-full absolute bottom-3 cursor-pointer bg-gray-200 ml-1 hover:bg-gray-400 hover:text-white w-4 text-center text-xs inline-block"
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
        <form
          onSubmit={(e) => {
            if (item) {
              handleSave(e);
            } else {
              handleSubmit(e);
            }
          }}
        >
          <div className="addnew ">
            <label>
              Id:
              <input
                type="text"
                id="product_id"
                value={productId}
                onChange={(e) => handleChange(e)}
                required
              />
            </label>
            <label>
              Name:
              <input
                type="text"
                id="name"
                value={productName}
                onChange={(e) => handleChange(e)}
                required
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
                min="10"
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
              required
            />
            <label className="flex">
              Images:
              <input type="file" id="imgs" onChange={(e) => handleChange(e)} />
              <button type="button" onClick={() => handleAddImg()}>
                ADD
              </button>
            </label>
          </div>
          {item ? (
            <button type="submit">SAVE</button>
          ) : (
            <button type="submit">ADD</button>
          )}
          <span
            ref={messpan}
            hidden
            className="p-2 bg-gray-400 text-white rounded mx-3"
          >
            {message}
          </span>
        </form>
      </div>
    </section>
  );
};

export default PatchItem;
