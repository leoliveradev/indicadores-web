import type { KPIItem } from "@/components/home/kpi-section";

import { IInternet } from "@/components/ui/icons";

import { dispValue } from "@/lib/format";
import type { ApiResponse } from "@/lib/types";

import type {
  ComunicacionesMovilesAccesosRow,
} from "./types";

export function getAccesosKPIItems(
  response: ApiResponse<ComunicacionesMovilesAccesosRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  return [
    {
      label: "Líneas operativas",
      icon: IInternet,
      value: latest.operativos,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Prepago",
      icon: IInternet,
      value: latest.prepago,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Pospago",
      icon: IInternet,
      value: latest.pospago,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
  ];
}

export function getAccesosDonutData(
  response: ApiResponse<ComunicacionesMovilesAccesosRow>
) {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  return [
    {
      name: "Prepago",
      value: latest.prepago,
      color: "#2563eb",
    },
    {
      name: "Pospago",
      value: latest.pospago,
      color: "#16a34a",
    },
  ];
}

export function getAccesosEvolutionData(
  response: ApiResponse<ComunicacionesMovilesAccesosRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    prepago: row.prepago,
    pospago: row.pospago,
    operativos: row.operativos,
  }));
}