import { ChevronLeft, UsersRound } from "lucide-react";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";
import { useReservationStore } from "./stores/reservationStore";
import { useEffect } from "react";

export default function WaitRequest() {
  const {
    selectedEquipment,
    equipmentReservationStatus,
    getEquipmentReservationStatus,
    createReservation,
  } = useReservationStore();

  // 이전 단계에서 조회했는데 페이지 바꼈다고 또 조회해야할지??
  // useEffect(() => {
  //   getEquipmentReservationStatus();
  // }, [getEquipmentReservationStatus]);

  function handleReqBtnClick() {
    createReservation();
  }

  return (
    <div className="workout-page" id="booking">
      <Header
        className="header--booking"
        leftContent={
          <button className="btn btn-icon">
            <ChevronLeft size={24} strokeWidth="2" />
          </button>
        }
        rightContent={
          <div className="btn-side">
            <span>대기취소</span>
          </div>
        }
      />

      <section className="container">
        <div className="text-wrap">
          <h6>{selectedEquipment.name}</h6>
          {/* <h1>20분 대기</h1> */}
          <h1>{selectedEquipment.reservationCount}분 대기</h1>
          <p>
            <UsersRound size={18} strokeWidth="2" />
            <span className="waiting-user">
              {selectedEquipment.reservationCount}명
            </span>
            <span>기다리는중</span>
          </p>
        </div>
      </section>

      <BottomButtonWrapper>
        <button className="btn btn-orange" onClick={handleReqBtnClick}>
          사용 요청 보내기
        </button>
      </BottomButtonWrapper>
    </div>
  );
}
