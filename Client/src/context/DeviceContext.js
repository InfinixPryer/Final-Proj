import React, { createContext, useReducer } from "react";
export const DeviceContext = createContext();

const DeviceProvider = ({ children }) => {
  const [device, dispatch] = useReducer(DeviceContext, null);
  return (
    <DeviceContext.Provider value={{ device, dispatch }}>
      {children}
    </DeviceContext.Provider>
  );
};

export default DeviceProvider;
