export type SeasonalityPeriodValue =
  | "all"
  | "5y"
  | "3y"
  | "2y";

export function filterSeasonalityData<T>(
  rows: T[],
  period: SeasonalityPeriodValue
) {
  if (period === "all") {
    return rows;
  }

  const months = {
    "5y": 60,
    "3y": 36,
    "2y": 24,
  }[period];

  return rows.slice(-months);
}