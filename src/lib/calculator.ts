export function parseNum(v: string): number | null {
  const s = v.trim().replace(/\s/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function calculate(closeOf10: number, avgValue: number, clientsPerMonth: number) {
  const tenMeetings = closeOf10 * avgValue;
  const monthlyGoal = clientsPerMonth * avgValue;
  const fourMonths = tenMeetings * 4;
  const yearGoal = monthlyGoal * 12;
  return {
    tenMeetings,
    monthlyGoal,
    fourMonths,
    yearGoal,
    contribution: yearGoal > 0 ? Math.min(100, (fourMonths / yearGoal) * 100) : null,
  };
}

export function formatEuro(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    // The runtime supports modern grouping; the project's Intl typings predate it.
    style: "currency", currency: "EUR", maximumFractionDigits: 0, useGrouping: "always",
  } as unknown as Intl.NumberFormatOptions).format(value).replace(/[\u00a0\u202f]/g, " ");
}

export function formatContribution(value: number, locale: string) {
  const number = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(value);
  return `${number}${locale === "pt-PT" ? " " : ""}%`;
}
