import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Header from "../../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useNotificationStore } from "./store/notificationStore";
import { formatDateStr } from "../../hooks/useDateFormatting";

export default function PushList() {
  const navigate = useNavigate();
  const { notificationList, getNotificationList, markAllAsRead } =
    useNotificationStore();

  useEffect(() => {
    getNotificationList();
  }, [getNotificationList]);

  function handleBackBtn() {
    markAllAsRead();
    navigate(-1);
  }

  return (
    <motion.div
      className="pushlist-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
    >
      <div className="content-scroll">
        <Header
          leftContent={
            <button
              type="button"
              className="btn btn-icon"
              onClick={handleBackBtn}
            >
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
          }
          title={<span>알람</span>}
        />
        <section className="container">
          <div className="push-wrap">
            <div className="top">총 알람 {notificationList.length}개</div>

            <ul className="push-list-wrap">
              {notificationList.map((noti) => (
                <li
                  className={`list ${noti.isRead ? "read" : ""}`}
                  key={noti.id}
                >
                  <div className="state">
                    {noti.type === "EQUIPMENT_AVAILABLE" && (
                      <span className="badge push-res">예약</span>
                    )}
                    {noti.type === "WAITING_COUNT" && (
                      <span className="badge push-reser">대기</span>
                    )}
                    {noti.type === "QUEUE_EXPIRED" && (
                      <span className="badge push-break">만료</span>
                    )}
                    <span className="time">
                      {formatDateStr(noti.createdAt)}
                    </span>
                  </div>
                  <div className="msg">{noti.message}</div>
                </li>
              ))}
            </ul>

            <p className="bottom-notice">
              최근 30일간의 알림내역을 제공합니다.
            </p>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
