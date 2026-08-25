export type PeriodFilterValue =
  | "all"
  | "10y"
  | "5y"
  | "3y"
  | "1y";

export function filterByPeriods<T>(
  rows: T[],
  period: PeriodFilterValue,
  periodsPerYear: number
) {
  if (period === "all") {
    return rows;
  }

  const years = {
    "10y": 10,
    "5y": 5,
    "3y": 3,
    "1y": 1,
  }[period];

  return rows.slice(
    -(years * periodsPerYear)
  );
}