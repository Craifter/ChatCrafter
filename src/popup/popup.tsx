import React from "react";
import ReactDOM from "react-dom/client";
import "./popup.css";
import { App } from "../components/App";

const container = document.getElementById("chatcrafter-popup")
if (!container) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(container);
root.render(<App num={1234} />);
