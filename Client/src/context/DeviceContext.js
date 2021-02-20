import React, { createContext, useReducer } from "react";
import { screenReducer } from "../reducers/reducers.js";

export const DeviceContext = createContext();

const DeviceProvider = ({ children }) => {
  const initialState = "sm";
  const [device, dispatch] = useReducer(screenReducer, initialState);
  return (
    <DeviceContext.Provider value={{ device, dispatch }}>
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceProvider;
