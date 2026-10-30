import { dispValue } from "@/lib/format";
import { ApiResponse } from "@/lib/types";
import type {
  InternetVelocidadMediaRow,
  InternetVelocidadMediaProvinciasRow
} from "@/lib/internet";

import type { KPIItem } from "@/components/home/kpi-section";



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
      format: (v: number) =>
        dispValue(v, {
          format: "number",
          decimals: 2,
          suffix: " Mbps"
        }),
    },
    {
      label: "Crecimiento desde 2014",
      // icon: IVelocidad,
      value: growthPct,
      format: (v: number) =>
        dispValue(v, {
          format: "number",
          decimals: 0,
          suffix: " %"
        }),
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

export function getVmdProvinciaSortedData(
  response: ApiResponse<InternetVelocidadMediaProvinciasRow>
) {
  return [...response.data].sort(
    (a, b) => b.mbps - a.mbps
  );
}