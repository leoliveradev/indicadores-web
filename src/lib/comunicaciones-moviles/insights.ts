import type { Insight }
  from "@/lib/types";

import type {
  ComunicacionesMovilesAccesosRow,
  ComunicacionesMovilesPenetracionRow,
  ComunicacionesMovilesLlamadasRow,
  ComunicacionesMovilesMinutosRow,
  ComunicacionesMovilesSmsRow,
  ComunicacionesMovilesIngresosRow
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

export function getPenetracionInsights(
  rows: ComunicacionesMovilesPenetracionRow[]
): Insight[] {
  if (rows.length < 2) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const variation =
    ((latest.accesos_100_hab - first.accesos_100_hab) /
      first.accesos_100_hab) *
    100;

  const peak = Math.max(
    ...rows.map(
      (r) => r.accesos_100_hab
    )
  );

  const insights: Insight[] = [];

  insights.push({
    title: "Variación de la penetración",
    text: `La penetración móvil varió ${variation.toFixed(
      1
    )}% durante el período seleccionado.`,
  });

  insights.push({
    title: "Nivel actual",
    text: `La penetración alcanzó ${latest.accesos_100_hab.toFixed(
      2
    )} accesos cada 100 habitantes.`,
  });

  if (
    latest.accesos_100_hab === peak
  ) {
    insights.push({
      title: "Máximo histórico",
      text: "El último período registra el nivel más alto de penetración de toda la serie.",
    });
  }

  return insights;
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

export function getIngresosInsights(
  rows: ComunicacionesMovilesIngresosRow[]
): Insight[] {
  if (rows.length < 2) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const variation =
    ((latest.ingresos - first.ingresos) /
      first.ingresos) *
    100;

  const peak = Math.max(
    ...rows.map((r) => r.ingresos)
  );

  const insights: Insight[] = [];

  insights.push({
    title: "Variación de ingresos",
    text: `Los ingresos variaron ${variation.toFixed(
      1
    )}% durante el período seleccionado.`,
  });

  if (latest.ingresos === peak) {
    insights.push({
      title: "Máximo histórico",
      text: "El último período registra el mayor nivel de ingresos de la serie analizada.",
    });
  }

  return insights;
}