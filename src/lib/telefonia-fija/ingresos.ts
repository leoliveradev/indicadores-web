import type { ApiResponse } from "@/lib/types";
import type { KPIItem } from "@/components/home/kpi-section";

import { IDinero } from "@/components/ui/icons";

import {
  dispCurrencyCompact,
  fmtPercent,
} from "@/lib/format";

import type {
  TelefoniaFijaIngresosRow,
} from "./types";

export function getIngresosKPIItems(
  response: ApiResponse<TelefoniaFijaIngresosRow>
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
      label: "Crecimiento desde 2014",
      icon: IDinero,
      value: growthPct,
      format: (v) => fmtPercent(v, 0),
    },
  ];
}

export function getIngresosEvolutionData(
  response: ApiResponse<TelefoniaFijaIngresosRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    ingresos: row.ingresos,
  }));
}

export function getIngresosStats(
  response: ApiResponse<TelefoniaFijaIngresosRow>
) {
  const rows = response.data;

  if (!rows.length) return null;

  const first = rows[0];
  const latest = rows[rows.length - 1];

  return {
    current: latest.ingresos,
    growthPct:
      ((latest.ingresos - first.ingresos) /
        first.ingresos) *
      100,
    period: `${latest.anio} T${latest.trimestre}`,
  };
}