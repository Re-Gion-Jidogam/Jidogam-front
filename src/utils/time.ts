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
