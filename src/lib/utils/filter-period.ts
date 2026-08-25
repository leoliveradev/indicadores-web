// export type PeriodFilterValue =
//   | "all"
//   | "10y"
//   | "5y"
//   | "3y"
//   | "1y";

// // export function filterByYears<
// //   T extends {
// //     anio: number;
// //   }
// // >(
// //   rows: T[],
// //   period: PeriodFilterValue
// // ) {
// //   if (period === "all") {
// //     return rows;
// //   }

// //   const latestYear =
// //     rows[rows.length - 1]?.anio ?? 0;

// //   const years = {
// //     "10y": 10,
// //     "5y": 5,
// //     "3y": 3,
// //     "1y": 1,
// //   }[period];

// //   return rows.filter(
// //     (row) =>
// //       row.anio >=
// //       latestYear - years
// //   );
// // }

// export function filterByYears<
//   T extends {
//     anio: number;
//   }
// >(
//   rows: T[],
//   period: PeriodFilterValue
// ) {
//   if (period === "all") {
//     return rows;
//   }

//   const periods = {
//     "10y": 40,
//     "5y": 20,
//     "3y": 12,
//     "1y": 4,
//   }[period];

//   return rows.slice(-periods);
// }

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