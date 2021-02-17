import { useState, useEffect } from "react";

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(event.target.value);
};

export const AddNewItem = () => {
  const [newItem, setNewItem] = useState({
    product_id: "",
    available: false,
    name: "",
    imgs: [],
    type: "",
    details: "",
    options: {},
    preferences: {},
    tags: [],
  });
  const { imgs, type, details, options, preferences, tags } = newItem;

  const handleChange = (e) => {
    const data = e.target.value;
    switch (e.target.id) {
      case "product_id":
        setNewItem({ ...newItem, product_id: data });
        break;
      case "details":
        setNewItem({ ...newItem, available: data });
        break;
      case "name":
        setNewItem({ ...newItem, name: data });
        break;
      case "imgs":
        setNewItem({ ...newItem, imgs: imgs.concat(data) });
        break;
      default:
        break;
    }
  };
  const handleAddOption = (option) => {
    const obj = {};
    obj[`${option.propName}`] = option.propVal;
    const newOption = Object.assign(options, obj);
    setNewItem({ ...newItem, options: newOption });
  };

  useEffect(() => {
    console.log(options);
  }, [newItem]);

  return (
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
        <input
          type="text"
          id="name"
          value={newItem.name}
          onChange={(e) => handleChange(e)}
        />
        <OptionAdder obj={options} handleAddOption={handleAddOption} />
        <label className="flex">details</label>
        <textarea
          type="text"
          className="border w-3/6 h-32"
          value={newItem.details}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="file"
          value={newItem.imgs}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button type="submit">ADD</button>
    </form>
  );
};

const OptionAdder = ({ handleAddOption }) => {
  const [option, setOption] = useState({
    propName: "",
    propVal: "",
  });
  const handleChange = (e) => {
    const prop = e.target;
    switch (prop.name) {
      case "option":
        setOption({ ...option, propName: prop.value });
        break;
      case "option-value":
        setOption({ ...option, propVal: prop.value });
        break;
      default:
        break;
    }
  };
  const handleClick = () => {
    handleAddOption(option);
    setOption({
      propName: "",
      propVal: "",
    });
  };

  return (
    <div>
      OPTION:
      <input
        type="text"
        name="option"
        value={option.propName}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      VALUE:
      <input
        type="number"
        name="option-value"
        value={option.propVal}
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <button type="button" onClick={() => handleClick()}>
        Add option
      </button>
    </div>
  );
};
