import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useEquipmentStore } from "../../stores/equipmentStore";
import type { EquipmentType } from "../../types";
import Equipment from "../../components/layout/Equipment";
// import { usePlanStore } from "../../stores/planStore";
// import Switch from "@mui/material/Switch";
import Header from "../../components/layout/Header";
import { BottomButtonWrapper } from "../../components/ui/Button";

export default function EquipmentListPage() {
  const navigate = useNavigate();
  const [selectedList, setSelectedList] = useState<EquipmentType[]>([]);
  const { equipmentList, loading, error, getEquipments, clearError } =
    useEquipmentStore();

  useEffect(() => {
    getEquipments();
  }, [getEquipments]);

  function handleEquipmentToggle(selectEquip: EquipmentType) {
    setSelectedList((prevSelected) =>
      prevSelected.includes(selectEquip)
        ? prevSelected.filter((v) => v !== selectEquip)
        : [...prevSelected, selectEquip]
    );
  }

  function handleNextBtnClick() {
    console.log(selectedList);
    // 세트설정으로
    navigate("/equipment-detail");
  }

  return (
    <div className="add-plan-page equipmentList-page">
      <div className="content-scroll">
        <Header
          leftContent={
            <button className="btn btn-icon" onClick={() => navigate(-1)}>
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
          }
          title={<h2>루틴추가</h2>}
        />

        <section className="container">
          <div className="search-bar">
            <input type="search" placeholder="기구명, 부위를 검색해주세요" />
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

        <section className="container">
          <div className="equipment-wrap">
            <div className="top">
              <div className="total-select">
                <span>선택한 운동</span>
                <span>{selectedList.length}개</span>
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
        <BottomButtonWrapper>
          <button onClick={handleNextBtnClick} className="btn btn-orange">
            다음
          </button>
        </BottomButtonWrapper>
      ) : null}
    </div>
  );
}
