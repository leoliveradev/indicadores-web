import { KPIItem } from "@/components/home/kpi-section";
import { dispValue } from "../format";
import { TelefoniaFijaAccesosProvinciaRow, TelefoniaFijaPenetracionProvinciaRow } from "./types";

export function getAccesosProvinciaHighlights(
  rows: TelefoniaFijaAccesosProvinciaRow[]
): KPIItem[] {
  if (!rows.length) return [];

  const sorted =
    [...rows].sort(
      (a, b) => b.total - a.total
    );

  const leader = sorted[0];

  const totalAccesos =
    sorted.reduce(
      (sum, row) => sum + row.total,
      0
    );

  const promedio =
    totalAccesos / sorted.length;

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

export function getPenetracionProvinciaHighlights(
  rows: TelefoniaFijaPenetracionProvinciaRow[]
): KPIItem[] {
  if (!rows.length) return [];

  const leader = rows.reduce((max, row) =>
    row.accesos_100_hog >
    max.accesos_100_hog
      ? row
      : max
  );

  const avgHogares =
    rows.reduce(
      (sum, row) =>
        sum + row.accesos_100_hog,
      0
    ) / rows.length;

  const avgHabitantes =
    rows.reduce(
      (sum, row) =>
        sum + row.accesos_100_hab,
      0
    ) / rows.length;

  return [
    {
      label: "Penetración líder",
      value: leader.accesos_100_hog,
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
