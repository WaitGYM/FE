type EquipmentProps = {
  name: string;
  imgSrc: string;
  waitingTime: string;
  waitingCount: number;
  isFavorite: boolean;
};

export default function Equipment({
  name = "힙어브덕션",
  imgSrc,
  waitingTime = "40분",
  waitingCount = 2,
  isFavorite = true,
}: EquipmentProps) {
  return (
    <>
      <div className="equipment">
        <img src={imgSrc} alt="equipment image" />
        <div className="info">
          <div>
            <span className="name">{name}</span>
            <div className="favorite">{isFavorite ? "🌟" : "⭐"}</div>
          </div>
          {waitingTime ? (
            <div className={`status ${waitingTime ? "waiting" : null}`}>
              대기 {waitingTime} - {waitingCount}명
            </div>
          ) : (
            <div>사용가능</div>
          )}
        </div>
      </div>
    </>
  );
}
