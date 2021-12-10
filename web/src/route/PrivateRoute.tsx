import React from "react";
import { Redirect, Route } from "react-router";
import { useContext } from "react";
import { StoreContext } from "../context/Store";

interface IPrivateRoute {
  Component: React.FC;
  path: string;
  exact: boolean;
}

const PrivateRoute = ({ Component, path, exact }: IPrivateRoute) => {
  const { store } = useContext(StoreContext);
  const { isAuth } = store;
  return (
    <Route
      path={path}
      exact={exact}
      render={() => (!isAuth ? <Redirect to="/signin" /> : <Component />)}
    />
  );
};

export default PrivateRoute;
