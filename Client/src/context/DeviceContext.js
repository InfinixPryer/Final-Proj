import React, { createContext, useReducer } from "react";
import { screenReducer } from "../reducers/reducers.js";
export const DeviceContext = createContext();

const DeviceProvider = ({ children }) => {
  const [device, dispatch] = useReducer(screenReducer, null);
  return (
    <DeviceContext.Provider value={{ device, dispatch }}>
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceProvider;
