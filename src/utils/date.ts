/**
 * 날짜 객체를 한국어 로케일("ko-KR") 형식의 문자열로 변환합니다.
 *
 * ex) new Date(2025, 6, 5) → "2025. 07. 05."
 *
 * @param {Date | number} date - 변환할 날짜 (Date 객체 또는 timestamp)
 * @returns {string} 한국어 날짜 문자열 (예: "2025. 07. 05.")
 */
export const addPeriodDateFormatter = new Intl.DateTimeFormat("ko-kr", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format;
