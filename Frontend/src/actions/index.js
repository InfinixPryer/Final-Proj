export const addItemToCart = (item) => {
  return {
    type: "ADD_TO_CART",
    payload: item,
  };
};

export const deleteItem = (item) => {
  return {
    type: "DELETE_ITEM",
    payload: item,
  };
};

export const deselectTableItem = (targetVal) => {
  return {
    type: "DESELECT",
    payload: targetVal,
  };
};

export const selectTableItem = (targetVal) => {
  return {
    type: "SELECT",
    payload: targetVal,
  };
};

export const clearTableItems = () => {
  return {
    type: "CLEAR",
  };
};
