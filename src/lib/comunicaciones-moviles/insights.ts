import type { Insight }
  from "@/lib/types";

import type {
  ComunicacionesMovilesLlamadasRow,
  ComunicacionesMovilesMinutosRow,
  ComunicacionesMovilesSmsRow
} from "./types";

export function getLlamadasInsights(
  rows: ComunicacionesMovilesLlamadasRow[]
): Insight[] {
  if (rows.length < 2) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const variation =
    ((latest.total - first.total) /
      first.total) *
    100;

  return [
    {
      title: "Variación del tráfico",
      text: `Las llamadas variaron ${variation.toFixed(
        1
      )}% durante el período seleccionado.`,
    },
  ];
}

export function getMinutosInsights(
  rows: ComunicacionesMovilesMinutosRow[]
): Insight[] {
  if (rows.length < 2) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const variation =
    ((latest.total - first.total) /
      first.total) *
    100;

  return [
    {
      title: "Variación del tráfico",
      text: `Los minutos cursados variaron ${variation.toFixed(
        1
      )}% durante el período seleccionado.`,
    },
  ];
}

export function getSmsInsights(
  rows: ComunicacionesMovilesSmsRow[]
): Insight[] {
  if (rows.length < 2) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const variation =
    ((latest.sms - first.sms) /
      first.sms) *
    100;

  const peak = Math.max(
    ...rows.map((r) => r.sms)
  );

  const drop =
    ((peak - latest.sms) /
      peak) *
    100;

  return [
    {
      title: "Variación del período",
      text: `El envío de SMS varió ${variation.toFixed(
        1
      )}% durante el período seleccionado.`,
    },
    {
      title: "Cambio estructural",
      text: `Los SMS disminuyeron ${drop.toFixed(
        1
      )}% respecto de su máximo histórico.`,
    },
  ];
}