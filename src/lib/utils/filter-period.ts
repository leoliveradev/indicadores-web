export type PeriodFilterValue =
  | "all"
  | "10y"
  | "5y"
  | "3y"
  | "1y";

export function filterByYears<
  T extends {
    anio: number;
  }
>(
  rows: T[],
  period: PeriodFilterValue
) {
  if (period === "all") {
    return rows;
  }

  const latestYear =
    rows[rows.length - 1]?.anio ?? 0;

  const years = {
    "10y": 10,
    "5y": 5,
    "3y": 3,
    "1y": 1,
  }[period];

  return rows.filter(
    (row) =>
      row.anio >=
      latestYear - years
  );
}