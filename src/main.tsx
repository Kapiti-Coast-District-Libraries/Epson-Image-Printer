import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./App.tsx";
import UploadPage from "./UploadPage";
import AdminPage from "./AdminPage"; // 1. Add this import

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/admin" element={<AdminPage />} /> {/* 2. Add this route */}
      </Routes>
    </HashRouter>
  </StrictMode>
);
