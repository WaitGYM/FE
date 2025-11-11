import { useNavigate } from "react-router-dom";
import { ChevronLeft, UsersRound } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useReservationStore } from "./stores/reservationStore";
import { useEffect } from "react";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export default function WaitRequest() {
  const navigate = useNavigate();
  const {
    selectedEquipment,
    reservationError,
    equipmentReservationStatus,
    getEquipmentReservationStatus,
    createReservation,
  } = useReservationStore();

  // 이전 단계에서 조회했는데 페이지 바꼈다고 또 조회해야할지??
  // useEffect(() => {
  //   getEquipmentReservationStatus();
  // }, [getEquipmentReservationStatus]);

  async function handleReqBtnClick() {
    await createReservation();
    // 예약 생성 성공하면 기구목록으로 이동
    if (!reservationError)
      navigate("/reservation/select-equipment", { replace: true });
  }

  return (
    <div className="workout-page" id="booking">
      <Header
        className="header--booking"
        leftContent={
          <button className="btn btn-icon" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} strokeWidth="2" />
          </button>
        }
      />

      <section className="container">
        <div className="text-wrap">
          <h6>{selectedEquipment.name}</h6>
          <h1>{selectedEquipment.status?.estimatedWaitMinutes || 0}분 대기</h1>
          <p>
            <UsersRound size={18} strokeWidth="2" />
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
            </>
          }
          open={true}
          slotProps={{
            popper: {
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
                fontSize: "13px",
                padding: "12px 16px",
                borderRadius: "4px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                lineHeight: "1.4",
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
