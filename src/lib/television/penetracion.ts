import type { ApiResponse } from "@/lib/types";
import type { KPIItem } from "@/components/home/kpi-section";

import { IInternet } from "@/components/ui/icons";

import { dispValue } from "@/lib/format";

import type {
  TelevisionPenetracionRow,
  TelevisionPenetracionProvinciaRow,
} from "./types";

export function getPenetracionKPIItems(
  response: ApiResponse<TelevisionPenetracionRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  return [
    {
      label: "TV suscripción / 100 hogares",
      icon: IInternet,
      value: latest.tv_suscripcion_100_hogares,
      format: (v) =>
        dispValue(v, {
          decimals: 2,
        }),
    },
    {
      label: "TV satelital / 100 hogares",
      icon: IInternet,
      value: latest.tv_satelital_100_hogares,
      format: (v) =>
        dispValue(v, {
          decimals: 2,
        }),
    },
  ];
}

export function getPenetracionEvolutionData(
  rows: TelevisionPenetracionRow[]
) {
  return rows.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,

    suscripcion_hogares:
      row.tv_suscripcion_100_hogares,

    suscripcion_habitantes:
      row.tv_suscripcion_100_habitantes,

    satelital_hogares:
      row.tv_satelital_100_hogares,

    satelital_habitantes:
      row.tv_satelital_100_habitantes,
  }));
}

export function getPenetracionProvinciaRankingData(
  response: ApiResponse<TelevisionPenetracionProvinciaRow>
) {
  return [...response.data]
    .sort(
      (a, b) =>
        b.tv_suscripcion_100hogares -
        a.tv_suscripcion_100hogares
    )
    .slice(0, 10)
    .map((row) => ({
      provincia: row.provincia,
      hogares: row.tv_suscripcion_100hogares,
      habitantes:
        row.tv_suscripcion_100habitantes,
    }));
}