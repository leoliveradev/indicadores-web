import type { ApiResponse } from "@/lib/types";
import type { KPIItem } from "@/components/home/kpi-section";

import { IDinero } from "@/components/ui/icons";

import {
  dispCurrencyCompact,
} from "@/lib/format";

import type {
  MercadoPostalFacturacionRow,
} from "./types";

export function getFacturacionKPIItems(
  response: ApiResponse<MercadoPostalFacturacionRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  const total =
    latest.postales +
    latest.telegraficas +
    latest.monetarios;

  return [
    {
      label: "Facturación total",
      icon: IDinero,
      value: total,
      format: (v) =>
        dispCurrencyCompact(v),
    },
    {
      label: "Servicios postales",
      icon: IDinero,
      value: latest.postales,
      format: (v) =>
        dispCurrencyCompact(v),
    },
    {
      label: "Servicios telegráficos",
      icon: IDinero,
      value: latest.telegraficas,
      format: (v) =>
        dispCurrencyCompact(v),
    },
    {
      label: "Servicios monetarios",
      icon: IDinero,
      value: latest.monetarios,
      format: (v) =>
        dispCurrencyCompact(v),
    },
  ];
}

export function getFacturacionDonutData(
  response: ApiResponse<MercadoPostalFacturacionRow>
) {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  return [
    {
      name: "Postales",
      value: latest.postales,
      color: "#005297",
    },
    {
      name: "Telegráficas",
      value: latest.telegraficas,
      color: "#EEAE42",
    },
    {
      name: "Monetarios",
      value: latest.monetarios,
      color: "#22c55e",
    },
  ];
}

export function getFacturacionEvolutionData(
  response: ApiResponse<MercadoPostalFacturacionRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio}-${String(row.mes).padStart(2, "0")}`,

    postales: row.postales,
    telegraficas: row.telegraficas,
    monetarios: row.monetarios,
  }));
}