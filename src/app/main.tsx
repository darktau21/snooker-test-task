import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "../pages/home-page";
import { MainLayout } from "../shared/layouts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainLayout>
      <HomePage />
    </MainLayout>
  </React.StrictMode>
);
