const formatterCache = new Map<string, Intl.DateTimeFormat>();

export function formatToCETStyle(date = new Date(), timeZone = "Europe/Paris") {
  let formatter = formatterCache.get(timeZone);

  if (!formatter) {
    formatter = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: timeZone,
      timeZoneName: "short",
    });
    formatterCache.set(timeZone, formatter);
  }

  return formatter.format(date).replace(",", "");
}
