import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootSelector = document.getElementById("root");

ReactDOM.createRoot(rootSelector).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
