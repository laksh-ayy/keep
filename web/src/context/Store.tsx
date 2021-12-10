import React, { createContext, useState } from "react";

interface IContext {
  store: {
    isAuth: boolean;
  };
  setStore: (isAuth: boolean) => void;
}

const defaultValues: IContext = {
  store: {
    isAuth: false,
  },
  setStore: () => {},
};

export const StoreContext = createContext<IContext>(defaultValues);

const StoreProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<{ isAuth: boolean }>(defaultValues.store);

  const setStore = (isAuth: boolean) => {
    setState({ ...state, isAuth });
  };

  return (
    <StoreContext.Provider value={{ store: state, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
