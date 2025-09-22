import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./routes/AppRoutes.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import "./styles/sass/main.scss";
import LoadingOverlay from "./components/ui/LoadingOverlay.tsx";
import CircularTimer from "./components/ui/CircularTimer.tsx";
import { useUIStore } from "./stores/UIStore.ts";

const { isRestTimerMiniView, setRestTimerMiniView } = useUIStore.getState();

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
      {isRestTimerMiniView && (
        <CircularTimer
          thickness={2}
          showSetIcons={false}
          className={`miniview ${isRestTimerMiniView && "zoom-out"}`}
        />
      )}
      <AppRoutes />
    </ThemeProvider>
  </StrictMode>
);
