import type { Insight } from "@/lib/types";

import type {
  TelevisionAccesosRow,
  TelevisionPenetracionRow,
  TelevisionIngresosRow,
} from "./types";

export function getAccesosInsights(
  rows: TelevisionAccesosRow[]
): Insight[] {
  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  const total =
    latest.tv_suscripcion +
    latest.tv_satelital;

  const shareSuscripcion =
    (latest.tv_suscripcion / total) * 100;

  const shareSatelital =
    (latest.tv_satelital / total) * 100;

  return [
    {
      title: "Participación de mercado",
      text: `La TV por suscripción representa ${shareSuscripcion.toFixed(
        1
      )}% de los accesos actuales.`,
    },
    {
      title: "TV satelital",
      text: `La TV satelital concentra ${shareSatelital.toFixed(
        1
      )}% del total de accesos.`,
    },
  ];
}


export function getIngresosInsights(
  rows: TelevisionIngresosRow[]
): Insight[] {
  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  const total =
    latest.tv_suscripcion +
    latest.tv_satelital;

  const share =
    (latest.tv_suscripcion / total) * 100;

  return [
    {
      title: "Principal fuente de ingresos",
      text: `La TV por suscripción genera ${share.toFixed(
        1
      )}% de los ingresos actuales del sector.`,
    },
  ];
}

export function getPenetracionInsights(
  rows: TelevisionPenetracionRow[]
): Insight[] {
  if (!rows.length) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const variation =
    ((latest.tv_suscripcion_100_hogares -
      first.tv_suscripcion_100_hogares) /
      first.tv_suscripcion_100_hogares) *
    100;

  const gap =
    latest.tv_suscripcion_100_hogares -
    latest.tv_suscripcion_100_habitantes;

  const peakHogares = Math.max(
    ...rows.map(
      (r) => r.tv_suscripcion_100_hogares
    )
  );



  const insights: Insight[] = [];
  
  insights.push({
    type: "trend",
    title: "Variación del período",
    text: `La penetración varió ${variation.toFixed(
      1
    )}% durante el período seleccionado.`,
  });

  insights.push({
    type: "highlight",
    title: "Penetración actual",
    text: `La TV por suscripción alcanzó ${latest.tv_suscripcion_100_hogares.toFixed(
      2
    )} accesos cada 100 hogares.`,
  });

  insights.push({
    type: "highlight",
    title: "Brecha hogares vs habitantes",
    text: `La diferencia actual es de ${gap.toFixed(
      2
    )} puntos entre ambos indicadores.`,
  });

  if (
    latest.tv_suscripcion_100_hogares ===
    peakHogares
  ) {
    insights.push({
      type: "record",
      title: "Máximo histórico",
      text: "El último período registra la mayor penetración sobre hogares de toda la serie.",
    });
  }

  return insights;
}