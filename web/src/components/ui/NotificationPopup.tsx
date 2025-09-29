import React, { useEffect } from "react";
import { Snackbar, Alert, Slide } from "@mui/material";
import type { SlideProps } from "@mui/material/Slide";
import { useNotificationStore } from "../../stores/notificationStore";
import { AnimatePresence, motion } from "framer-motion";

// interface CustomNotificationProps {
//   message: string;
//   onClose: (event?: React.SyntheticEvent | Event) => void;
// }

// const CustomNotificationContent = React.forwardRef<
//   HTMLDivElement,
//   CustomNotificationProps
// >(({ message, onClose }, ref) => {
//   return (
//     <div ref={ref} className="push-msg">
//       <div className="msg">{message}</div>
//     </div>
//   );
// });

export default function NotificationPopup() {
  const { popupMessage, clearPopupMessage } = useNotificationStore();

  // const handleClose = (
  //   event?: React.SyntheticEvent | Event,
  //   reason?: string
  // ) => {
  //   // 사용자가 'x' 버튼 외의 다른 곳을 클릭해서 닫히는 것을 방지
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   clearPopupMessage();
  // };

  // function SlideTransition(props: SlideProps) {
  //   return <Slide {...props} direction="down" />;
  // }

  useEffect(() => {
    const timer = setTimeout(() => {
      clearPopupMessage();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {popupMessage && (
          <motion.div
            className="push-msg"
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {/* <div> */}
            <div className="msg">{popupMessage.message}</div>
            {/* </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
