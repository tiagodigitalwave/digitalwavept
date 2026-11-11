export function parseNum(v: string): number | null {
  const s = v.trim().replace(/\s/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function calculate(closeOf10: number, avgValue: number, clientsPerMonth: number) {
  const tenMeetings = closeOf10 * avgValue;
  const monthlyGoal = clientsPerMonth * avgValue;
  return {
    tenMeetings,
    monthlyGoal,
    fourMonths: tenMeetings * 4,
    yearGoal: monthlyGoal * 12,
  };
}
