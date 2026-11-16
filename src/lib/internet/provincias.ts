import { KPIItem } from "@/components/home/kpi-section";
import { InternetPenetracionProvinciaRow } from "./types";

import type {
  InternetTecnologiaProvinciaRow,
  InternetVelocidadMediaProvinciasRow,
} from "@/lib/internet";

import { dispValue } from "@/lib/format";

export function getPenetracionProvinciaHighlights(
  rows: InternetPenetracionProvinciaRow[]
): KPIItem[] {
  if (!rows.length) return [];

  const leader = rows.reduce(
    (max, row) =>
      row.accesos_cada_100_hogares >
        max.accesos_cada_100_hogares
        ? row
        : max
  );

  const avgHogares =
    rows.reduce(
      (sum, row) =>
        sum +
        row.accesos_cada_100_hogares,
      0
    ) / rows.length;

  const avgHabitantes =
    rows.reduce(
      (sum, row) =>
        sum +
        row.accesos_cada_100_habitantes,
      0
    ) / rows.length;

  return [
    {
      label: "Penetración líder",
      value:
        leader.accesos_cada_100_hogares,
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


export function getTecnologiaProvinciaHighlights(
  rows: InternetTecnologiaProvinciaRow[]
): KPIItem[] {
  if (!rows.length) return [];

  const leader = rows.reduce((max, row) =>
    row.total > max.total
      ? row
      : max
  );

  const totalAccesos =
    rows.reduce(
      (sum, row) => sum + row.total,
      0
    );

  const promedio =
    totalAccesos / rows.length;

  const participacion =
    totalAccesos > 0
      ? (leader.total / totalAccesos) * 100
      : 0;

  return [
    {
      label: "Accesos de la líder",
      value: leader.total,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Participación líder",
      value: participacion,
      format: (v) =>
        `${v.toFixed(1)}%`,
    },
    {
      label: "Promedio provincial",
      value: promedio,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
  ];
}

export function getVelocidadMediaProvinciaHighlights(
  rows: InternetVelocidadMediaProvinciasRow[]
): KPIItem[] {
  if (!rows.length) return [];

  const leader = rows.reduce((max, row) =>
    row.mbps > max.mbps
      ? row
      : max
  );

  const average =
    rows.reduce(
      (sum, row) => sum + row.mbps,
      0
    ) / rows.length;

  const sorted = [...rows].sort(
    (a, b) => b.mbps - a.mbps
  );

  const gap =
    sorted.length > 1
      ? sorted[0].mbps - sorted[1].mbps
      : 0;

  return [
    {
      label: "Velocidad líder",
      value: leader.mbps,
      format: (v) =>
        `${v.toFixed(1)} Mbps`,
    },
    {
      label: "Promedio provincial",
      value: average,
      format: (v) =>
        `${v.toFixed(1)} Mbps`,
    },
    {
      label: "Brecha líder",
      value: gap,
      format: (v) =>
        `${v.toFixed(1)} Mbps`,
    },
  ];
}