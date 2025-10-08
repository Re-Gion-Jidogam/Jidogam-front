/**
 * 주어진 날짜를 현재 시각 기준으로 상대 시간 문자열로 변환합니다.
 *
 * 예:
 *  - new Date(Date.now() - 1000 * 60 * 10) → "10분 전"
 *  - new Date(Date.now() + 1000 * 60 * 60 * 24) → "내일"
 *
 * @param {Date} date - 상대 시간을 계산할 기준 날짜
 * @param {string} [locale="ko"] - 사용할 로케일 (기본값: "ko")
 * @returns {string} 상대 시간 문자열 (예: "3시간 전", "2일 후")
 */
export const formatRelativeTimeIntl = (date: Date, locale = "ko") => {
  const now = new Date();
  const diffSec = Math.floor((date.getTime() - now.getTime()) / 1000);

  const relativeTimeFormatter = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  const divisions: [number, Intl.RelativeTimeFormatUnit][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [30, "day"],
    [12, "month"],
    [Infinity, "year"],
  ];

  let duration = diffSec;
  for (let i = 0; i < divisions.length; i++) {
    const [amount, unit] = divisions[i];
    if (Math.abs(duration) < amount) {
      return relativeTimeFormatter.format(Math.round(duration), unit);
    }
    duration /= amount;
  }
};
