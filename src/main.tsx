import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Settings from "./Settings";

if (document.getElementById("JsonSettings")) {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
      <Settings />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
