import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useEquipmentStore } from "../../stores/equipmentStore";
import type { EquipmentType } from "../../types";
import Equipment from "../../components/layout/Equipment";

export default function ReservationPage() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(0);
  const [hasPlan, setHasPlan] = useState(true);
  const { equipmentList, loading, error, getEquipments, clearError } =
    useEquipmentStore();

  useEffect(() => {
    getEquipments();
  }, [getEquipments]);

  return (
    <div className="reservation-page">
      <div className="content-scroll">
        <header>
          <div className="header-top">
            <button className="btn btn-icon" onClick={() => navigate(-1)}>
              <ChevronLeft size={24} strokeWidth="2" />
            </button>
            <div className="page-title">
              <h2>바로운동</h2>
            </div>
          </div>
        </header>

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
            {hasPlan ? (
              <div className="top">
                <span>선택한 운동</span>
                <div>자동제안</div>
              </div>
            ) : null}
            <ul className="equipment-list">
              {equipmentList.map((equipment: EquipmentType) => (
                <li
                  key={equipment.id}
                  onClick={() => setSelectedId(equipment.id)}
                  className={selectedId === equipment.id ? "selected" : ""}
                >
                  <Equipment {...equipment} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {selectedId ? (
        <div className="btn-wrap">
          <button className="btn btn-orange bottom-fix">다음</button>
        </div>
      ) : null}
    </div>
  );
}
