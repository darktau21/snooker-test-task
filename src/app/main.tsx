import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "../pages/home-page";
import { MainLayout } from "../shared/layouts";
import "./index.css";
import { ColorMenuProvider } from "@/features/change-ball-color";
import { DeskStoreProvider } from "@/entities/desk";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainLayout>
      <ColorMenuProvider>
        <DeskStoreProvider>
          <HomePage />
        </DeskStoreProvider>
      </ColorMenuProvider>
    </MainLayout>
  </React.StrictMode>
);
