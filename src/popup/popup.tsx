import React from "react";
import ReactDOM from "react-dom/client";
import "./popup.css";
import Popup from "../components/Popup";

const container = document.getElementById('chatcrafter-popup')
if (container == null) {
  throw new Error('Root element not found')
}
const root = ReactDOM.createRoot(container);
root.render(<Popup num={12334} />);
