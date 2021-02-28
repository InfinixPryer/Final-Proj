import { useState, useEffect, useRef } from "react";
import { api } from "./App.js";
const PatchItem = ({ item }) => {
  const [patchedProps, setPatch] = useState({});
  const [newItem, setNewItem] = useState({
    productId: "",
    productName: "",
    availability: false,
    type: "",
    details: "",
    options: [],
    preferences: [],
    tags: [],
  });
  const [urlId, setUrl] = useState("");
  const [tag, setTag] = useState("");
  const [pref, setPref] = useState("");
  const [imgHolder, setImg] = useState([]);
  const [newOption, setOption] = useState({
    name: "",
    price: "",
  });
  const [message, setMes] = useState("");
  const messpan = useRef();
  const imgFile = useRef();
  const adminToken = localStorage.getItem("token");

  useEffect(() => {
    if (item) {
      setNewItem(item);
      setUrl(item.productId);
      item.productImage.forEach((i) => {
        setImg((prev) => prev.concat({ src: i }));
      });
    }
  }, [item]);

  const {
    productName,
    productId,
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
      /*   case "imgs":
        const reader = new FileReader();
        const imgToUp = e.target.files[0];
        reader.addEventListener("loadend", () => {
          setImage(reader.result);
          UpdateProductData.append("productImage", imgToUp);
        });
        reader.readAsDataURL(imgToUp);
        break; */
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
    const reader = new FileReader();
    const imgToUp = imgFile.current.files[0];

    reader.addEventListener("loadend", () => {
      setImg((prev) =>
        prev.concat({
          file: imgToUp,
          src: reader.result,
        })
      );
      //setNewItem({...newItem,productImage: [...productImage, reader.result],});
      //UpdateProductData.append("productImage", imgToUp);
    });
    reader.readAsDataURL(imgToUp);
  };

  const handleDel = (val, name, prop) => {
    const nVal = prop.filter((i) => i !== val);
    setNewItem({ ...newItem, [name]: nVal });
  };
  const handleDelImg = (val) => {
    const nArr = imgHolder.filter((i) => i.src !== val);
    setImg(nArr);
  };

  const handleDelOpt = (opt) => {
    const nOpts = options.filter((o) => o.name !== opt);
    setNewItem({ ...newItem, options: nOpts });
  };

  const config = {
    headers: {
      Authorization: adminToken,
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const UpdateProductData = new FormData();
    UpdateProductData.append(`options`, JSON.stringify(options));
    UpdateProductData.append(`tags`, JSON.stringify(tags));
    UpdateProductData.append(`preferences`, JSON.stringify(preferences));
    UpdateProductData.append(`productName`, productName);
    UpdateProductData.append(`productId`, productId);
    UpdateProductData.append(`type`, type);
    UpdateProductData.append(`details`, details);

    imgHolder.forEach((i) => {
      UpdateProductData.append(`productImage`, i.file);
    });
    if (newItem.options.length > 0) {
      try {
        await api.post("products", UpdateProductData, config).then((res) => {
          setMes("Added!");
          console.log(newItem);
          window.location.reload();
          messpan.current.hidden = false;
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
    const patchedFile = new FormData();

    event.preventDefault();
    if (item && newItem !== item) {
      for (const key in newItem) {
        if (
          newItem.hasOwnProperty(key) &&
          item[key] !== newItem[key] &&
          key !== `productImage`
        ) {
          const patch = Object.assign(patchedProps, {
            [key]: newItem[key],
          });
          setPatch(patch);
        }
      }
      for (const key in patchedProps) {
        if (Object.hasOwnProperty.call(patchedProps, key)) {
          switch (key) {
            case `productImage`:
              patchedFile.append(key, imgHolder);
              break;
            case `preference`:
              patchedFile.append(key, JSON.stringify(patchedProps[key]));
              break;
            case `options`:
              patchedFile.append(key, JSON.stringify(patchedProps[key]));
              break;
            case `tags`:
              patchedFile.append(key, JSON.stringify(patchedProps[key]));
              break;
            default:
              patchedFile.append(key, patchedProps[key]);
              break;
          }
        }
      }
    }

    try {
      await api
        .patch(`products/${urlId}`, patchedFile, config)
        .then(() => window.location.reload());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full h-page absolute bg-gray-100">
      <div className="p-5 rounded-lg bg-white w-5/6 mx-auto my-3 shadow-md">
        <div className="grid grid-cols-2 overflow-y-scroll px-4 float-right w-3/6">
          {imgHolder.map((img) => {
            const im = img.src;
            return (
              <span key={im} className=" max-h-64 overflow-auto relative">
                <img src={im} alt="preview" />
                <span
                  onClick={() => handleDelImg(im)}
                  className="rounded-full cursor-pointer bg-gray-200 ml-1 hover:bg-gray-400 hover:text-white w-4 text-center text-xs inline-block"
                >
                  {`\u2715`}
                </span>
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
              <input type="file" ref={imgFile} />
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
