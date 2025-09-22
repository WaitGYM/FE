import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import Switch from "@mui/material/Switch";
import Header from "../../../../components/layout/Header";
import { BottomButtonWrapper } from "../../../../components/ui/Button";
import type { EquipmentType } from "../../types";
import Equipment from "../../../../components/layout/Equipment";
import { useUIStore } from "../../../../stores/UIStore";
import { usePlanStore } from "../../../../stores/planStore";

export default function EquipmentListPage() {
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState<EquipmentType[]>([]);
  const { planId } = useUIStore();
  const { planDetail, planLoading, getPlanDetail } = usePlanStore();
  const label = { inputProps: { "aria-label": "자동제안" } }; //자동제안 토글

  ///////////// 루틴 정보 가져오기
  if (planId) {
    useEffect(() => {
      getPlanDetail(planId);
    }, [getPlanDetail]);
  } else {
    alert("루틴 정보가 없습니다.");
  }

  function handleEquipmentToggle(selectEquip: EquipmentType) {
    setSelectedList([selectEquip]);
  }

  function handleNextBtnClick() {
    console.log(selectedList);
    // 루틴운동일때
    // 대기 있으면 예약화면으로
    if (selectedList[0].waitingTime) {
      navigate("/workout/Booking");
    } else {
      // 없으면 운동화면으로
      navigate("/workout/exercising");
    }
  }

  return (
    <div className="content-scroll">
      <Header
        leftContent={
          <button className="btn btn-icon" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} strokeWidth="2" />
          </button>
        }
        title={<h2>{planDetail?.name}</h2>}
      />

      <section className="container">
        <div className="equipment-wrap">
          <div className="top">
            <div className="auto-suggest">
              <span>자동제안</span>
              <Switch {...label} defaultChecked size="small" color="warning" />
            </div>
          </div>
          <ul className="equipment-list">
            {planDetail?.equipmentList.map((equipment: EquipmentType) => (
              <li
                key={equipment.id}
                onClick={() => handleEquipmentToggle(equipment)}
                className={selectedList.includes(equipment) ? "selected" : ""}
              >
                <Equipment {...equipment} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
