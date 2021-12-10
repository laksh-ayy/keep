import React, { useContext, useEffect } from "react";
import { MuiThemeProvider } from "./theme";
import Routes from "./route/Routes";
import { StoreContext } from "./context/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const { setStore } = useContext(StoreContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setStore(true);
    } else {
      setStore(false);
    }
  }, []);
  return (
    <div className="App" data-testid="test">
      <MuiThemeProvider>
        <ToastContainer position="bottom-center" autoClose={3000} />
        <Routes />
      </MuiThemeProvider>
    </div>
  );
};

export default App;
