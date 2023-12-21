import "elements/css-reset";
import React from "react";
import ReactDOM from "react-dom/client";
import { SpApp } from "./SpApp";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SpApp />
  </React.StrictMode>,
);
