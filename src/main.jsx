import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
// Eager-import gallery image util so vite includes it in the build graph.
// The manifest JSON is parsed at module load — if it changes shape, the build fails fast.
import "./utils/galleryImage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

