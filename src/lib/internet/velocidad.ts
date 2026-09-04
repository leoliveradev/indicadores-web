import { fmtDecimal, fmtPercent } from "@/lib/format";
import {  ApiResponse } from "@/lib/types";
import type {
  InternetVelocidadMediaRow,
  InternetVelocidadMediaProvinciasRow,
  InternetVelocidadRangosRow,
} from "@/lib/internet";

import type { KPIItem } from "@/components/home/kpi-section";

import { VELOCITY_CONFIG } from "@/lib/constants/internet";

import { buildDonutData, getTopN } from "./common";


export function getVelocidadRangosDonutData(
  response: ApiResponse<InternetVelocidadRangosRow>
) {
  const rows = response.data;

  if (!rows.length) return [];

  const cur = rows[rows.length - 1];

  return buildDonutData(cur, VELOCITY_CONFIG);
}

export function getVelocidadKPIItems(
  response: ApiResponse<InternetVelocidadMediaRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const growthPct =
    ((latest.Mbps - first.Mbps) / first.Mbps) * 100;

  return [
    {
      label: "Velocidad media",
      // icon: IVelocidad,
      value: latest.Mbps,
      format: (v: number) => `${fmtDecimal(v, 2)} Mbps`
    },
    {
      label: "Crecimiento desde 2014",
      // icon: IVelocidad,
      value: growthPct,
      format: (v: number) => fmtPercent(v, 0),
    },
  ];
}

export function getVelocidadStats(
  response: ApiResponse<InternetVelocidadMediaRow>
) {
  const rows = response.data;

  if (!rows.length) return null;

  const first = rows[0];
  const latest = rows[rows.length - 1];

  return {
    current: latest.Mbps,
    growthPct:
      ((latest.Mbps - first.Mbps) / first.Mbps) * 100,
    period: `${latest.anio} T${latest.trimestre}`,
  };
}

export function getVelocidadEvolutionData(
  response: ApiResponse<InternetVelocidadMediaRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    mbps: row.Mbps,
  }));
}

export function getVelocidadProvinciaRankingData(
  response: ApiResponse<InternetVelocidadMediaProvinciasRow>
) {
  const topRows = getTopN(
    response.data,
    (r) => r.mbps
  );
  return topRows;
}
