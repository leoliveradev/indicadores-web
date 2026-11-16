import type { KPIItem } from "@/components/home/kpi-section";
import type {
  TelevisionAccesosProvinciaRow,
  TelevisionPenetracionProvinciaRow,
} from "./types";

import { dispValue } from "@/lib/format";

export function getAccesosProvinciaHighlights(
  rows: TelevisionAccesosProvinciaRow[]
): KPIItem[] {
  if (!rows.length) return [];

  const sorted = [...rows].sort(
    (a, b) =>
      b.tv_suscripcion - a.tv_suscripcion
  );

  const leader = sorted[0];

  const total = sorted.reduce(
    (sum, row) =>
      sum + row.tv_suscripcion,
    0
  );

  const average =
    total / sorted.length;

  const participation =
    total > 0
      ? (leader.tv_suscripcion /
          total) *
        100
      : 0;

  return [
    {
      label: "Accesos de la líder",
      value: leader.tv_suscripcion,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Participación líder",
      value: participation,
      format: (v) =>
        `${v.toFixed(1)}%`,
    },
    {
      label: "Promedio provincial",
      value: average,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
  ];
}

export function getPenetracionProvinciaHighlights(
  rows: TelevisionPenetracionProvinciaRow[]
): KPIItem[] {
  if (!rows.length) return [];

  const leader = rows.reduce((max, row) =>
    row.tv_suscripcion_100_hogares >
    max.tv_suscripcion_100_hogares
      ? row
      : max
  );

  const avgHogares =
    rows.reduce(
      (sum, row) =>
        sum +
        row.tv_suscripcion_100_hogares,
      0
    ) / rows.length;

  const avgHabitantes =
    rows.reduce(
      (sum, row) =>
        sum +
        row.tv_suscripcion_100_habitantes,
      0
    ) / rows.length;

  return [
    {
      label: "Penetración líder",
      value:
        leader.tv_suscripcion_100_hogares,
      format: (v) => v.toFixed(1),
    },
    {
      label: "Promedio hogares",
      value: avgHogares,
      format: (v) => v.toFixed(1),
    },
    {
      label: "Promedio habitantes",
      value: avgHabitantes,
      format: (v) => v.toFixed(1),
    },
  ];
}