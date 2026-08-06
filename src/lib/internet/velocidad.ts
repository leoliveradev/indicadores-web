import { fmtDecimal, fmtPercent } from "@/lib/format";
import type {
  ApiResponse, 
  InternetVelocidadMediaRow,
  InternetVelocidadMediaProvinciasRow,
  InternetVelocidadRangosRow,
} from "@/lib/types";

import type { KPIItem } from "@/components/home/kpi-section";

import { VELOCITY_CONFIG } from "@/lib/constants/internet";

import { trendPct } from "@/lib/utilsInternet";

import { buildDonutData, getTopN } from "./common";


export function getVelocidadRangosDonutData(
  response: ApiResponse<InternetVelocidadRangosRow>
) {
  const rows = response.data;

  if (!rows.length) return [];

  const cur = rows[rows.length - 1];

  return buildDonutData(cur, VELOCITY_CONFIG);
}

export function getVelocidadGaugeData(
  response: ApiResponse<InternetVelocidadMediaRow>
) {
  const rows = Array.isArray(response)
    ? response
    : response?.data ?? [];

  if (!rows.length) return null;

  const cur = rows[rows.length - 1];
  const prev = rows.length > 1 ? rows[rows.length - 2] : null;

  // 🔥 fallback robusto
  const value =
    cur.Mbps ??
    0;

  const prevValue =
    prev?.Mbps ??
    null;

  return {
    value,
    trend: prevValue ? trendPct(value, prevValue) : null,
  };
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
      format: (v: number) => fmtPercent(v, 2),
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
