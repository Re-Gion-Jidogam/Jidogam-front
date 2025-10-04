/**
 * 숫자를 한국어 로케일("ko-KR") 형식으로 변환합니다.
 *
 * 예:
 *  - 1000 → "1,000"
 *  - 1234567 → "1,234,567"
 *
 * @param {number | bigint} value - 변환할 숫자
 * @returns {string} 포맷된 숫자 문자열
 */
export const addCommaFormatter = new Intl.NumberFormat("ko-kr", {
  compactDisplay: "long",
}).format;
