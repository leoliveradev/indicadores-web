import type { Insight } from "@/lib/types";

import type {
  TelefoniaFijaAccesosRow,
  TelefoniaFijaPenetracionRow,
} from "./types";

export function getAccesosInsights(
  rows: TelefoniaFijaAccesosRow[]
): Insight[] {
  if (rows.length < 2) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const variation =
    ((latest.total - first.total) /
      first.total) *
    100;

  const hogaresShare =
    (latest.hogares /
      latest.total) *
    100;

  const insights: Insight[] = [];

  insights.push({
    type: "trend",
    title: "Variación de accesos",
    text: `Los accesos de telefonía fija variaron ${variation.toFixed(
      1
    )}% durante el período seleccionado.`,
  });

  insights.push({
    type: "highlight",
    title: "Participación residencial",
    text: `Los hogares representan ${hogaresShare.toFixed(
      1
    )}% de los accesos actuales.`,
  });

  if (variation < 0) {
    insights.push({
      type: "warning",
      title: "Tendencia de largo plazo",
      text: "La telefonía fija continúa registrando una disminución de accesos respecto de períodos anteriores.",
    });
  }

  return insights;
}

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