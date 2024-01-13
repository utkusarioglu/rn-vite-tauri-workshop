import "package--elements/css-reset";
import "#styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { SpApp } from "./SpApp.tsx";
import { Navigation } from "package--xp-navigation";

Navigation.setLogger(console.log);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SpApp />
  </React.StrictMode>,
);
