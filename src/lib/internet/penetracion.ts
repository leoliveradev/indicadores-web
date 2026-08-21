import {  ApiResponse } from "@/lib/types";

import {
  InternetPenetracionRow,
  InternetPenetracionProvinciaRow,
} from "@/lib/internet";

import { fmtNumber } from "@/lib/format";
import { getTopN } from "./common";

export function getPenetracionKPIItems(
  rows: InternetPenetracionRow[]
) {
  const latest = rows[rows.length - 1];

  if (!rows.length) return [];

  return [
    {
      label: "Accesos / 100 hogares",
      value: latest.accesos_cada_100_hogares,
      // icon: "home",
      format: (v: number) => fmtNumber(v, 2),
    },
    {
      label: "Accesos / 100 habitantes",
      value: latest.accesos_cada_100_habitantes,
      // icon: "users",
      format: (v: number) => fmtNumber(v, 2),
    },
  ];
}

export function getPenetracionEvolutionData(rows: InternetPenetracionRow[]) {
  return rows.map((r) => ({
    period: `${r.anio} T${r.trimestre}`,
    hogares: Number(r.accesos_cada_100_hogares),
    habitantes: Number(r.accesos_cada_100_habitantes),
  }));
}

export function getPenetracionProvinciaRankingData(
  response: ApiResponse<InternetPenetracionProvinciaRow>
) {
  return [...response.data]
    .sort((a, b) => b.accesos_cada_100_hogares - a.accesos_cada_100_hogares)
    .slice(0, 10)
    .map((row) => ({
      provincia: row.provincia,
      total: row.accesos_cada_100_hogares,
      hogares: row.accesos_cada_100_hogares,
      habitantes: row.accesos_cada_100_habitantes
    }));
}

export function getPenetracionProvinciaRanking(
  response: ApiResponse<InternetPenetracionProvinciaRow>
) {
  const topRows = getTopN(
    response.data,
    (r) => r.accesos_cada_100_hogares
  );
  return topRows.map((r) => ({
    provincia: r.provincia,
    value: r.accesos_cada_100_hogares,
    hogares: r.accesos_cada_100_hogares,
    habitantes: r.accesos_cada_100_habitantes,
  }));
}