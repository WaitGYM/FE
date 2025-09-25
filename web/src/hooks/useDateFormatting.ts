export const formatDateStr = (isoString: string): string => {
  const date = new Date(isoString);

  // UTC → KST 보정: +9시간 오프셋 적용
  // 한국 시간으로 보정
  const offsetMs = 9 * 60 * 60 * 1000;
  const localDate = new Date(date.getTime() + offsetMs);

  const year = String(localDate.getFullYear()).slice(2);
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const day = String(localDate.getDate()).padStart(2, "0");
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[localDate.getDay()];

  return `${year}.${month}.${day}.${weekday}`;
};
