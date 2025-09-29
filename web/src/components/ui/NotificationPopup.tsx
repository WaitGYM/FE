import React from "react";
import { Snackbar, Alert, Slide } from "@mui/material";
import type { SlideProps } from "@mui/material/Slide";
import { useNotificationStore } from "../../stores/notificationStore";

interface CustomNotificationProps {
  message: string;
  onClose: (event?: React.SyntheticEvent | Event) => void;
}

const CustomNotificationContent = React.forwardRef<
  HTMLDivElement,
  CustomNotificationProps
>(({ message, onClose }, ref) => {
  return (
    <div ref={ref} className="push-msg">
      <div className="msg">{message}</div>
    </div>
  );
});

export default function NotificationPopup() {
  const { popupMessage, clearPopupMessage } = useNotificationStore();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    // 사용자가 'x' 버튼 외의 다른 곳을 클릭해서 닫히는 것을 방지
    if (reason === "clickaway") {
      return;
    }
    clearPopupMessage();
  };

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }

  return (
    <Snackbar
      open={!!popupMessage}
      autoHideDuration={5000}
      onClose={handleClose}
      slots={{ transition: SlideTransition }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{
        top: "50px",
        "& .MuiSnackbarContent-root": {
          backgroundColor: "transparent",
          boxShadow: "none",
          padding: 0,
        },
      }}
    >
      <CustomNotificationContent
        message={popupMessage?.message}
        onClose={handleClose}
      />
    </Snackbar>
  );
}
