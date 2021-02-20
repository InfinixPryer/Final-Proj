import { useState, useEffect } from "react";

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(event.target.value);
};

export const AddNewItem = () => {
  const [newItem, setNewItem] = useState({
    productId: "",
    availability: false,
    productName: "",
    ProductImage: [],
    type: "",
    details: "",
    options: [],
    preferences: [],
    tags: [],
  });
  const [tag, setTag] = useState("");
  const [newOption, setOption] = useState({
    name: "",
    price: "",
  });
  const {
    name,
    product_id,
    imgs,
    type,
    details,
    options,
    /*  preferences, */
    tags,
  } = newItem;

  const handleChange = (e) => {
    const data = e.target.value;
    switch (e.target.id) {
      case "product_id":
        setNewItem({ ...newItem, product_id: data });
        break;
      case "details":
        setNewItem({ ...newItem, details: data });
        break;
      case "name":
        setNewItem({ ...newItem, name: data });
        break;
      case "imgs":
        setNewItem({ ...newItem, imgs: imgs.concat(data) });
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

  useEffect(() => {
    console.log(newItem);
  }, [newItem]);

  return (
    <>
      <div>
        <h1>Product id: {product_id}</h1>
        <h1>Name: {name}</h1>
        <h1>Type: {type}</h1>
        Tags:
        <span className="flex">
          {tags.map((tag) => {
            return (
              <h3 className="mr-1" key={tag}>
                {tag}
              </h3>
            );
          })}
        </span>
        <h1>Details: {details}</h1>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="addnew flex flex-col">
          <label>
            Id:
            <input
              type="text"
              id="product_id"
              value={newItem.product_id}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              id="name"
              value={newItem.name}
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
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <button type="button" onClick={() => handleAddOption()}>
              ADD OPTION
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
              ADD TAG
            </button>
          </label>

          <label className="flex">details</label>
          <textarea
            type="text"
            className="border w-3/6 h-32"
            id="details"
            value={newItem.details}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="file"
            id="imgs"
            value={newItem.imgs}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">ADD</button>
      </form>
    </>
  );
};
