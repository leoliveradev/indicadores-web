import type { ApiResponse } from "@/lib/types";
import type { KPIItem } from "@/components/home/kpi-section";

import { IDinero } from "@/components/ui/icons";

import {
  dispCurrencyCompact,
} from "@/lib/format";

import type {
  TelevisionIngresosRow,
} from "./types";

export function getIngresosKPIItems(
  response: ApiResponse<TelevisionIngresosRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  const total =
    latest.tv_suscripcion +
    latest.tv_satelital;

  return [
    {
      label: "Ingresos totales",
      icon: IDinero,
      value: total,
      format: (v) => dispCurrencyCompact(v),
    },
    {
      label: "TV Suscripción",
      icon: IDinero,
      value: latest.tv_suscripcion,
      format: (v) => dispCurrencyCompact(v),
    },
    {
      label: "TV Satelital",
      icon: IDinero,
      value: latest.tv_satelital,
      format: (v) => dispCurrencyCompact(v),
    },
  ];
}

export function getIngresosEvolutionData(
  response: ApiResponse<TelevisionIngresosRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    tv_suscripcion: row.tv_suscripcion,
    tv_satelital: row.tv_satelital,
  }));
}