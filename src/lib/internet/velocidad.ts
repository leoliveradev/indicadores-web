import { dispValue } from "@/lib/format";
import { ApiResponse } from "@/lib/types";
import type {
  InternetVelocidadMediaRow,
  InternetVelocidadMediaProvinciasRow
} from "@/lib/internet";

import type { KPIItem } from "@/components/home/kpi-section";


export function getVelocidadKPIItems(
  response: InternetVelocidadMediaRow[]
): KPIItem[] {
  const rows = response;

  if (!rows.length) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const growthLabel =
    first.anio === latest.anio
      ? `Crecimiento desde T${first.trimestre} ${first.anio}`
      : `Crecimiento desde ${first.anio}`;

  const growthPct =
    ((latest.mbps - first.mbps) / first.mbps) * 100;

  return [
    {
      label: "Velocidad media",
      // icon: IVelocidad,
      value: latest.mbps,
      format: (v: number) =>
        dispValue(v, {
          format: "number",
          decimals: 2,
          suffix: " Mbps"
        }),
    },
    {
      label: growthLabel,
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
    current: latest.mbps,
    growthPct:
      ((latest.mbps - first.mbps) / first.mbps) * 100,
    period: `${latest.anio} T${latest.trimestre}`,
  };
}

export function getVelocidadEvolutionData(
  response: InternetVelocidadMediaRow[]
) {
  return response.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    mbps: row.mbps,
  }));
}

export function getVmdProvinciaSortedData(
  response: ApiResponse<InternetVelocidadMediaProvinciasRow>
) {
  return [...response.data].sort(
    (a, b) => b.mbps - a.mbps
  );
}