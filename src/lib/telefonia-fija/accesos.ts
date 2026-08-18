import type { ApiResponse } from "@/lib/types";
import type { KPIItem } from "@/components/home/kpi-section";

import { IInternet } from "@/components/ui/icons";

import { dispValue } from "@/lib/format";

import type {
  TelefoniaFijaAccesosRow,
  TelefoniaFijaAccesosProvinciaRow,
} from "./types";

export function getAccesosKPIItems(
  response: ApiResponse<TelefoniaFijaAccesosRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  return [
    {
      label: "Accesos totales",
      icon: IInternet,
      value: latest.total,
      format: (v) =>
        dispValue(v, { format: "compact" }),
    },
    {
      label: "Hogares",
      icon: IInternet,
      value: latest.hogares,
      format: (v) =>
        dispValue(v, { format: "compact" }),
    },
    {
      label: "Comercial",
      icon: IInternet,
      value: latest.comercial,
      format: (v) =>
        dispValue(v, { format: "compact" }),
    },
    {
      label: "Gobierno",
      icon: IInternet,
      value: latest.gobierno,
      format: (v) =>
        dispValue(v, { format: "compact" }),
    },
  ];
}

export function getAccesosDonutData(
  response: ApiResponse<TelefoniaFijaAccesosRow>
) {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  return [
    {
      name: "Hogares",
      value: latest.hogares,
      color: "#005297",
    },
    {
      name: "Comercial",
      value: latest.comercial,
      color: "#E74242",
    },
    {
      name: "Gobierno",
      value: latest.gobierno,
      color: "#ACAE22",
    },
    {
      name: "Otros",
      value: latest.otros,
      color: "#9CA3AF",
    },
  ];
}

export function getAccesosEvolutionData(
  response: ApiResponse<TelefoniaFijaAccesosRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    hogares: row.hogares,
    comercial: row.comercial,
    gobierno: row.gobierno,
    otros: row.otros,
    total: row.total,
  }));
}

export function getAccesosProvinciaRankingData(
  response: ApiResponse<TelefoniaFijaAccesosProvinciaRow>
) {
  return [...response.data]
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
    .map((row) => ({
      provincia: row.provincia,
      total: row.total,
    }));
}