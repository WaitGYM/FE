import { useEffect } from "react";
import { useNotificationStore } from "../../stores/notificationStore";
import { AnimatePresence, motion } from "framer-motion";

export default function NotificationPopup() {
  const { popupMessage, clearPopupMessage } = useNotificationStore();
  const parts = popupMessage?.message.split(/(\d+명)/);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (popupMessage) {
      timer = setTimeout(() => {
        clearPopupMessage();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [popupMessage, clearPopupMessage]);

  return (
    <>
      <AnimatePresence>
        {popupMessage && (
          <motion.div
            className="push-msg"
            role="alert"
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {popupMessage?.waitingCount ? (
              <div className="msg">
                <span>내 뒤에 기다리는 사람이</span>
                <span className="waiting-user">
                  {" "}
                  {popupMessage?.waitingCount}명{" "}
                </span>
                <span>있어요</span>
              </div>
            ) : (
              <div className="msg">{popupMessage?.message}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
