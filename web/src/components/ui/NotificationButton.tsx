import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotificationStore } from "../../features/notification/store/notificationStore";
import { useEffect } from "react";

export default function NotificationButton() {
  const navigate = useNavigate();
  const { unreadNotiCount, getUnreadNotiCount } = useNotificationStore();

  useEffect(() => {
    getUnreadNotiCount();
  }, []);

  return (
    <button
      className={`icon-bell ${unreadNotiCount && "dot"}`}
      onClick={() => navigate("/pushlist")}
      aria-label="푸시알림 목록"
      type="button"
    >
      <Bell size={24} strokeWidth="1.5" />
    </button>
  );
}
