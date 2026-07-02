export function formatToCETStyle(date = new Date(), timeZone = "Europe/Paris") {
  const options = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: timeZone,
    timeZoneName: "short",
  } as const;

  return new Intl.DateTimeFormat("en-US", options)
    .format(date)
    .replace(",", "");
}
