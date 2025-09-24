import type { EquipmentType } from "../types";
import { Star } from "lucide-react";

export default function Equipment({
  name = "힙어브덕션",
  imgSrc = "/equipment_01.png",
  waitingTime = 40,
  waitingCount = 2,
  isFavorite = true,
}: EquipmentType) {
  return (
    <>
      <div className="equipment">
        <img src={imgSrc} />
        <div className="info">
          <div className="title">
            <span className="name">{name}</span>
            <div className="favorite">
              {isFavorite ? (
                <Star size={18} strokeWidth="1.5" className="on" />
              ) : (
                <Star size={18} strokeWidth="1.5" className="" />
              )}
            </div>
          </div>
          {waitingTime ? (
            <div className={`status ${waitingTime ? "waiting" : null}`}>
              <span>대기 {waitingTime}분</span>
              <span className="dot"></span>
              <span>{waitingCount}명</span>
            </div>
          ) : (
            <div className="status available">
              <span>이용가능</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
