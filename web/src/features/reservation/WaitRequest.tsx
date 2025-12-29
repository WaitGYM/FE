import { useNavigate } from "react-router-dom";
import { ChevronLeft, UsersRound, X } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useReservationStore } from "./stores/reservationStore";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { useUIStore } from "../../stores/UIStore";
import { useState, useEffect } from "react";
import { usePreferenceStore } from "../../stores/preferenceStore";

export default function WaitRequest() {
  const navigate = useNavigate();
  const { selectedEquipment, reservationError, createReservation } =
    useReservationStore();
  const { routineId } = useUIStore();

  // 툴팁
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { hasSeenWaitRequestTooltip, setHasSeenWaitRequestTooltip } =
    usePreferenceStore();
  useEffect(() => {
    if (hasSeenWaitRequestTooltip) return;
    setTimeout(() => setIsTooltipOpen(true), 1000);
    setHasSeenWaitRequestTooltip(true);
  }, [hasSeenWaitRequestTooltip, setHasSeenWaitRequestTooltip]);

  async function handleReqBtnClick() {
    await createReservation();
    if (!reservationError)
      navigate(`/reservation/select-equipment${routineId ? "/routine" : ""}`, {
        replace: true,
      });
  }

  return (
    <div className="workout-page" id="booking">
      <Header
        className="header--booking"
        leftContent={
          <button
            className="btn btn-icon"
            onClick={() => navigate(-1)}
            aria-label="뒤로 가기"
          >
            <ChevronLeft size={24} strokeWidth="2" />
          </button>
        }
      />

      <section className="container">
        <div className="text-wrap">
          <h1>{selectedEquipment.name}</h1>
          <h2 className="timer-text">
            {selectedEquipment.status?.estimatedWaitMinutes || 0}분 대기
          </h2>
          <p>
            <UsersRound size={20} strokeWidth="2" />
            <span className="waiting-user">
              {selectedEquipment.status?.waitingCount || 0}명
            </span>
            <span>기다리는중</span>
          </p>
        </div>
      </section>

      <BottomButtonWrapper>
        <Tooltip
          title={
            <>
              기구 사용이 필요하다면
              <br />
              '사용 요청'을 보내 알림을 전달하세요!
              <X size={20} color="#9498A0" />
            </>
          }
          open={isTooltipOpen}
          slotProps={{
            popper: {
              onClick: () => setIsTooltipOpen(false),
              sx: {
                [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
                  {
                    marginBottom: "1.3rem",
                  },
              },
            },
            tooltip: {
              sx: {
                bgcolor: "#fff",
                color: "#293241",
                fontSize: "15px",
                padding: "12px 12px",
                borderRadius: "4px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                textAlign: "left",
                lineHeight: "1.5",
                maxWidth: "300px",
                minWidth: "160px",
                display: "grid",
                gridTemplateColumns: "1fr 20px",
                wordBreak: "keep-all",
              },
            },
            arrow: {
              sx: {
                color: "#fff",
              },
            },
          }}
          arrow
        >
          <button className="btn btn-orange" onClick={handleReqBtnClick}>
            사용 요청 보내기
          </button>
        </Tooltip>
      </BottomButtonWrapper>
    </div>
  );
}
