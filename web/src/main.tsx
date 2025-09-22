import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes/AppRoutes.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import "./styles/sass/main.scss";
import LoadingOverlay from "./components/ui/LoadingOverlay.tsx";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Pretendard",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <LoadingOverlay />
      <AppRoutes />
    </ThemeProvider>
  </StrictMode>
);
