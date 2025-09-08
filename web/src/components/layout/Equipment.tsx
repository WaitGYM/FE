import type { Equipment } from "@types";

export default function Equipment({
  name = "힙어브덕션",
  imgSrc,
  waitingTime = 40,
  waitingCount = 2,
  isFavorite = true,
}: Equipment) {
  return (
    <>
      <div className="equipment">
        <img src={imgSrc} />
        <div className="info">
          <div>
            <span className="name">{name}</span>
            <div className="favorite">{isFavorite ? "🌟" : "⭐"}</div>
          </div>
          {waitingTime ? (
            <div className={`status ${waitingTime ? "waiting" : null}`}>
              <span>대기 {waitingTime}분</span>
              <span>{waitingCount}명</span>
            </div>
          ) : (
            <div>이용가능</div>
          )}
        </div>
      </div>
    </>
  );
}
