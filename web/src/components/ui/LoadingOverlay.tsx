import { useLoadingStore } from "../../stores/loadingStore";

import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingOverlay() {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      {/* // <div className="spinner">로딩 중...</div> */}
      <CircularProgress color="inherit" />
    </div>
  );
}
