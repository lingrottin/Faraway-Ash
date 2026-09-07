const SHANGHAI = "Asia/Shanghai";

/** Format a Date in Asia/Shanghai wall time parts. */
export function shanghaiParts(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: SHANGHAI,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });
  const parts = Object.fromEntries(
    fmt.formatToParts(date).map((p) => [p.type, p.value]),
  );
  return {
    year: parts.year,
    month: parts.month,
    day: parts.day,
    hour: parts.hour,
    minute: parts.minute,
    second: parts.second,
  };
}

/** Unix seconds for a Shanghai wall-clock datetime string. */
export function unixFromShanghaiWall(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0,
): number {
  // Interpret components as Asia/Shanghai (+08:00, no DST).
  return Math.floor(
    Date.UTC(year, month - 1, day, hour - 8, minute, second) / 1000,
  );
}

export function dateToShanghaiUnix(date: Date): number {
  const p = shanghaiParts(date);
  return unixFromShanghaiWall(
    Number(p.year),
    Number(p.month),
    Number(p.day),
    Number(p.hour),
    Number(p.minute),
    Number(p.second),
  );
}

export function formatDateYMD(date: Date): string {
  const p = shanghaiParts(date);
  return `${p.year}-${p.month}-${p.day}`;
}

export function readingTimeMinutes(text: string): number {
  const chars = text.replace(/\s+/g, "").length;
  // rough CJK-oriented estimate
  return Math.max(1, Math.round(chars / 400));
}
