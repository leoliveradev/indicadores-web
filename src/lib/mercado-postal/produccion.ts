import type { ApiResponse } from "@/lib/types";
import type { KPIItem } from "@/components/home/kpi-section";

import { IInternet } from "@/components/ui/icons";

import { dispValue } from "@/lib/format";

import type {
  MercadoPostalProduccionRow,
} from "./types";

export function getProduccionKPIItems(
  response: ApiResponse<MercadoPostalProduccionRow>
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
      label: "Producción total",
      icon: IInternet,
      value: total,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Postales",
      icon: IInternet,
      value: latest.postales,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Telegráficas",
      icon: IInternet,
      value: latest.telegraficas,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Monetarios",
      icon: IInternet,
      value: latest.monetarios,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
  ];
}

export function getProduccionDonutData(
  response: ApiResponse<MercadoPostalProduccionRow>
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

export function getProduccionEvolutionData(
  rows: MercadoPostalProduccionRow[]
) {
  return rows.map((row) => ({
    label: `${row.anio}-${String(row.mes).padStart(2, "0")}`,

    postales: row.postales,
    telegraficas: row.telegraficas,
    monetarios: row.monetarios,
  }));
}