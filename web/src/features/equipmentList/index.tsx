import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useEquipmentStore } from "../../stores/equipmentStore";
import type { EquipmentType } from "../../types";
import Equipment from "../../components/layout/Equipment";
import { useUIStore } from "../../stores/UIStore";
import { usePlanStore } from "../../stores/planStore";
import Switch from "@mui/material/Switch";

export default function EquipmentListPage() {
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState<EquipmentType[]>([]);
  const { equipmentList, loading, error, getEquipments, clearError } =
    useEquipmentStore();
  const { workoutMode, planId } = useUIStore();
  const { planDetail, planLoading, getPlanDetail } = usePlanStore();
  const label = { inputProps: { "aria-label": "자동제안" } }; //자동제안 토글

  useEffect(() => {
    getEquipments();
  }, [getEquipments]);

  useEffect(() => {
    if (workoutMode === "plan" && planId) {
      getPlanDetail(planId);
    }
  }, [getPlanDetail]);

  function handleEquipmentToggle(selectEquip: EquipmentType) {
    if (workoutMode === "addPlan") {
      setSelectedList((prevSelected) =>
        prevSelected.includes(selectEquip)
          ? prevSelected.filter((v) => v !== selectEquip)
          : [...prevSelected, selectEquip]
      );
    } else {
      setSelectedList([selectEquip]);
    }
  }

  function handleNextBtnClick() {
    console.log(selectedList);
    // 루틴선택일때
    if (workoutMode === "plan") {
      // 대기 있으면 예약화면으로
      if (selectedList[0].waitingTime) {
        navigate("/workout/Booking");
      } else {
        // 없으면 운동화면으로
        navigate("/workout/exercising");
      }
    } else {
      // 루틴등록 or 바로운동이면 세트설정으로
    }
  }

  return (
    <div className="equipmentList-page">
      <div className="content-scroll">
        <header>
          <div className="header-top">
            <button className="btn btn-icon" onClick={() => navigate(-1)}>
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
            <div className="page-title">
              <h2>
                {planId && workoutMode === "plan"
                  ? planDetail?.name
                  : workoutMode === "direct"
                  ? "바로운동"
                  : "루틴추가"}
              </h2>
            </div>
          </div>
        </header>

        {workoutMode === "direct" || workoutMode === "addPlan" ? (
          <>
            <section className="container">
              <div className="search-bar">
                <input
                  type="search"
                  placeholder="기구명, 부위를 검색해주세요"
                />
              </div>
            </section>
            <div className="category-wrap">
              <button className="active">즐겨찾기</button>
              <button>허벅지</button>
              <button>어깨</button>
              <button>가슴</button>
              <button>팔</button>
              <button>등</button>
              <button>엉덩이</button>
              <button>엉덩이</button>
              <button>복근</button>
            </div>
          </>
        ) : null}

        <section className="container">
          <div className="equipment-wrap">
            <div className="top">
              {workoutMode === "addPlan" && selectedList.length ? (
                <div className="total-select">
                  <span>선택한 운동</span>
                  <span>{selectedList.length}개</span>
                </div>
              ) : null}
              <div className="auto-suggest">
                <span>자동제안</span>
                <Switch
                  {...label}
                  defaultChecked
                  size="small"
                  color="warning"
                />
              </div>
            </div>
            <ul className="equipment-list">
              {equipmentList.map((equipment: EquipmentType) => (
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

      {selectedList.length ? (
        <div className="btn-wrap">
          <button
            onClick={handleNextBtnClick}
            className="btn btn-orange bottom-fix"
          >
            다음
          </button>
        </div>
      ) : null}
    </div>
  );
}
