export const addPeriodDateFormatter = new Intl.DateTimeFormat("ko-kr", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).format;
