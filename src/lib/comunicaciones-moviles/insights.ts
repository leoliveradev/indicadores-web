import type { Insight }
  from "@/lib/types";

import type {
  ComunicacionesMovilesAccesosRow,
  ComunicacionesMovilesLlamadasRow,
  ComunicacionesMovilesMinutosRow,
  ComunicacionesMovilesSmsRow
} from "./types";


export function getAccesosInsights(
  rows: ComunicacionesMovilesAccesosRow[]
): Insight[] {
  if (rows.length < 2) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const totalVariation =
    ((latest.operativos - first.operativos) /
      first.operativos) *
    100;

  const prepagoShare =
    (latest.prepago /
      latest.operativos) *
    100;

  const gap =
    latest.prepago -
    latest.pospago;

  return [
    {
      title: "Variación de accesos",
      text: `Las líneas móviles variaron ${totalVariation.toFixed(
        1
      )}% durante el período seleccionado.`,
    },
    {
      title: "Participación prepaga",
      text: `Las líneas prepagas representan ${prepagoShare.toFixed(
        1
      )}% de los accesos operativos actuales.`,
    },
    {
      title: "Brecha prepago-pospago",
      text: `Existen ${(gap / 1e6).toFixed(
        1
      )} millones más de líneas prepagas que pospagas.`,
    },
  ];
}

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