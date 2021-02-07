import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouting from "./AppRouting";
import { ToastContainer } from "react-toastify";

import './styles/tailwind.css';
import './styles/main.css';
import "react-toastify/dist/ReactToastify.css";

const App = (props) => {
  const render = () => {
    return (
      <BrowserRouter>
        <AppRouting />
        <ToastContainer />
      </BrowserRouter>
    );
  };

  return render();
};

export default App;
