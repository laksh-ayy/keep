import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Navigation from "../components/Navigation";
import NotFound from "../pages/NotFound";
import SignUp from "../pages/SignUp";
import { useContext } from "react";
import { StoreContext } from "../context/Store";

const Routes: React.FC = () => {
  const { store } = useContext(StoreContext);
  const { isAuth } = store;
  return (
    <Router>
      <Switch>
        {isAuth ? (
          <Route exact path="/" component={Navigation} />
        ) : (
          <Route exact path="/" component={SignIn} />
        )}
        {/* <Route exact path="/signin" component={SignIn} /> */}
        <Route exact path="/signup" component={SignUp} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
