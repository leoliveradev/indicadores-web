import type { Insight } from "@/lib/types";

import type {
  TelefoniaFijaPenetracionRow,
} from "./types";

export function getPenetracionInsights(
  rows: TelefoniaFijaPenetracionRow[]
): Insight[] {
  if (!rows.length) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const variation =
    ((latest.accesos_100_hog -
      first.accesos_100_hog) /
      first.accesos_100_hog) *
    100;

  const gap =
    latest.accesos_100_hog -
    latest.accesos_100_hab;

  return [
    {
      title: "Variación histórica",
      text: `La penetración cambió ${variation.toFixed(
        1
      )}% desde el inicio de la serie.`,
    },
    {
      title: "Brecha hogares vs habitantes",
      text: `La diferencia actual es de ${gap.toFixed(
        2
      )} puntos.`,
    },
  ];
}