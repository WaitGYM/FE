import { useLoadingStore } from "../../stores/loadingStore";

import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingOverlay() {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="loading-overlay" role="status" aria-live="assertive">
      <span className="visually-hidden">화면 로딩중</span>
      <CircularProgress color="inherit" />
    </div>
  );
}
