export function formatLogTimestamp(
  timestampStr: string,
  nowMs: number,
): string {
  const logDate = new Date(timestampStr);
  const diffMs = nowMs - logDate.getTime();

  if (diffMs < 0) return "0M";

  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 60) {
    return `${diffMins}M`;
  }

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) {
    return `${diffHours}H`;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(logDate);
}
