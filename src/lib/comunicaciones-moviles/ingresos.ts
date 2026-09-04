import type { KPIItem } from "@/components/home/kpi-section";

import { IDinero } from "@/components/ui/icons";

import {
  dispCurrencyCompact,
  fmtPercent,
} from "@/lib/format";

import type { ApiResponse } from "@/lib/types";

import type {
  ComunicacionesMovilesIngresosRow,
} from "./types";

export function getIngresosKPIItems(
  response: ApiResponse<ComunicacionesMovilesIngresosRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const growthPct =
    ((latest.ingresos - first.ingresos) /
      first.ingresos) *
    100;

  return [
    {
      label: "Ingresos actuales",
      icon: IDinero,
      value: latest.ingresos,
      format: (v) => dispCurrencyCompact(v),
    },
    {
      label: "Crecimiento desde 2013",
      icon: IDinero,
      value: growthPct,
      format: (v) => fmtPercent(v, 0),
    },
  ];
}

export function getIngresosEvolutionData(
  response: ApiResponse<ComunicacionesMovilesIngresosRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    ingresos: row.ingresos,
  }));
}