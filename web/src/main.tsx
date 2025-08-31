import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes/AppRoutes.tsx";
import "./styles/sass/main.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
