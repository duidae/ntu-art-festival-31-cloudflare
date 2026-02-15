import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { TreasureHunt, NotFound } from "./scene";
import "./index.css";

const TreasureHuntPaths = ['kzqpt9', 'mrvxa7'].map(siteId => `/treasure-hunt/${siteId}`);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {TreasureHuntPaths?.map((path) => <Route key={path} path={path} element={<TreasureHunt />} />)}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </StrictMode>,
);
