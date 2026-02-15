import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { TreasureHunt } from "./scene";
import "./index.css";

const TreasureHuntPaths = [
  "/treasure-hunt/kzqpt9",
  "/treasure-hunt/mrvxa7",
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {TreasureHuntPaths?.map((path) => <Route key={path} path={path} element={<TreasureHunt />} />)}
      </Routes>
    </Router>
  </StrictMode>,
);
