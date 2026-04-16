import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";


const el = document.getElementById("root");


if (!el) {
throw new Error("root element missing");
}


const root = ReactDOM.createRoot(el);


root.render(
<React.StrictMode> <App />
</React.StrictMode>
);


