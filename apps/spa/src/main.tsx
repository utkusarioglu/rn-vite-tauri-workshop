import React from "react";
import ReactDOM from "react-dom/client";
import { XpApp } from "xp-app";
import { TamaguiProvider } from "@tamagui/core";
import spaTamaguiConfig from "../tamagui.config";
import "@tamagui/core/reset.css";
// import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TamaguiProvider config={spaTamaguiConfig}>
      <XpApp />
    </TamaguiProvider>
  </React.StrictMode>,
);
