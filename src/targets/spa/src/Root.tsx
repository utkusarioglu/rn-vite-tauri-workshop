import "package--elements/css-reset";
import "#styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { SpApp } from "./SpApp.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SpApp />
  </React.StrictMode>,
);
