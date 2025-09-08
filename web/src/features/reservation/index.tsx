import { useEffect, useState, type ReactEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useEquipmentStore } from "@stores/equipmentStore";
import type { TEquipment } from "@types";
import Equipment from "@comp/layout/Equipment";

export default function ReservationPage() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [hasPlan, setHasPlan] = useState(true);
  const { equipmentList, loading, error, getEquipments, clearError } =
    useEquipmentStore();

  useEffect(() => {
    getEquipments();
  }, [getEquipments]);

  return (
    <div className="reservation-page">
      <header className="h-52">
        <button className="btn btn-icon" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} strokeWidth="2" />
        </button>
        <div className="page-title">
          <h2>바로운동</h2>
        </div>
      </header>

      <section className="container">
        <div className="search-bar">
          <input type="search" placeholder="기구명, 부위를 검색해주세요" />
        </div>
        <div className="category-wrap">
          <button>즐겨찾기</button>
          <button>허벅지</button>
          <button>어깨</button>
          <button>가슴</button>
          <button>팔</button>
          <button>등</button>
          <button>엉덩이</button>
          <button>엉덩이</button>
          <button>복근</button>
        </div>
        <div className="equipment-wrap">
          {hasPlan ? (
            <div className="top">
              <span>선택한 운동</span>
              <div>자동제안</div>
            </div>
          ) : null}
          <ul className="equipment-list">
            {equipmentList.map((equipment: TEquipment) => (
              <li
                key={equipment.id}
                onClick={() => setSelectedId(equipment.id)}
                className={selectedId === equipment.id ? "selected" : ""}
              >
                <Equipment
                  name={equipment.name}
                  isFavorite={equipment.isFavorite}
                  imgSrc={equipment.imgSrc}
                  waitingTime={equipment.waitingTime}
                  waitingCount={equipment.waitingCount}
                />
              </li>
            ))}
          </ul>
        </div>

        {selectedId ? (
          <button className="btn btn-orange bottom-fix">다음</button>
        ) : null}
      </section>
    </div>
  );
}
