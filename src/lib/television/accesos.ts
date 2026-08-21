import type { ApiResponse } from "@/lib/types";
import type { KPIItem } from "@/components/home/kpi-section";

import { IInternet } from "@/components/ui/icons";

import { dispValue } from "@/lib/format";

import type {
  TelevisionAccesosRow,
  TelevisionAccesosProvinciaRow,
} from "./types";

export function getAccesosKPIItems(
  response: ApiResponse<TelevisionAccesosRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  const total =
    latest.tv_suscripcion +
    latest.tv_satelital;

  return [
    {
      label: "Accesos totales",
      icon: IInternet,
      value: total,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "TV por suscripción",
      icon: IInternet,
      value: latest.tv_suscripcion,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "TV satelital",
      icon: IInternet,
      value: latest.tv_satelital,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
  ];
}

export function getAccesosDonutData(
  response: ApiResponse<TelevisionAccesosRow>
) {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  return [
    {
      name: "TV Suscripción",
      value: latest.tv_suscripcion,
      color: "#005297",
    },
    {
      name: "TV Satelital",
      value: latest.tv_satelital,
      color: "#EEAE42",
    },
  ];
}

export function getAccesosEvolutionData(
  response: ApiResponse<TelevisionAccesosRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,

    tv_suscripcion: row.tv_suscripcion,
    tv_satelital: row.tv_satelital,
  }));
}

export function getAccesosProvinciaRankingData(
  response: ApiResponse<TelevisionAccesosProvinciaRow>
) {
  return [...response.data]
    .sort(
      (a, b) =>
        b.tv_suscripcion -
        a.tv_suscripcion
    )
    .slice(0, 10)
    .map((row) => ({
      provincia: row.provincia,
      total: row.tv_suscripcion,
    }));
}