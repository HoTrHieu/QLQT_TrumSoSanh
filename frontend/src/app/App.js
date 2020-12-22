import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouting from "./AppRouting";

const App = (props) => {
  const render = () => {
    return(
      <BrowserRouter>
        <AppRouting/>
      </BrowserRouter>
    )
  }

  return render();
}

export default App;
