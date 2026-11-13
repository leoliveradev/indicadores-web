import type { Insight } from "@/lib/types";

import type {
  TelevisionAccesosRow,
  TelevisionAccesosProvinciaRow,
  TelevisionPenetracionRow,
  TelevisionIngresosRow,
  TelevisionPenetracionProvinciaRow,
} from "./types";

import { dispValue, fmtDecimal, fmtPercent } from "@/lib/format";

export function getAccesosInsights(
  rows: TelevisionAccesosRow[],
  provincia?: string
): Insight[] {
  if (!rows.length) return [];

  const scope =
    provincia && provincia !== "Argentina"
      ? ` en ${provincia}`
      : "";

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
      text: `La TV por suscripción representa ${fmtPercent(shareSuscripcion)} de los accesos actuales.`,
    },
    {
      title: "TV satelital",
      text: `La TV satelital concentra ${fmtPercent(shareSatelital)} del total de accesos.${scope}`,
    },
  ];
}

export function getAccesosProvinciaInsights(
  rows: TelevisionAccesosProvinciaRow[],
  provincia: string
): Insight[] {
  if (!rows.length) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const variation =
    first.tv_suscripcion > 0
      ? (
        (latest.tv_suscripcion -
          first.tv_suscripcion) /
        first.tv_suscripcion
      ) * 100
      : null;

  const peak = Math.max(
    ...rows.map((r) => r.tv_suscripcion)
  );

  const insights: Insight[] = [
    {
      type: "highlight",
      title: "Accesos actuales",
      text: `En ${provincia}, la TV por suscripción registra ${dispValue(
        latest.tv_suscripcion,
        { format: "compact" }
      )} accesos en el último trimestre disponible.`,
    },
  ];

  if (
    variation !== null &&
    Math.abs(variation) < 1000
  ) {
    insights.push({
      type: "trend",
      title: "Crecimiento histórico",
      text: `Los accesos acumulan una variación de ${fmtPercent(
        variation
      )} desde el inicio de la serie.`,
    });
  }

  if (
    latest.tv_suscripcion === peak
  ) {
    insights.push({
      type: "record",
      title: "Máximo histórico",
      text: "El último trimestre registra el mayor nivel de accesos de toda la serie provincial.",
    });
  }

  return insights;
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
      text: `La TV por suscripción genera ${fmtPercent(share)} de los ingresos actuales del sector.`,
    },
  ];
}

export function getPenetracionInsights(
  rows: TelevisionPenetracionRow[],
  provincia?: string
): Insight[] {
  if (!rows.length) return [];

  const scope =
    provincia && provincia !== "Argentina"
      ? ` en ${provincia}`
      : "";

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
    text: `La penetración varió ${fmtPercent(variation)} durante el período seleccionado.`,
  });

  insights.push({
    type: "highlight",
    title: "Penetración actual",
    text: `La TV por suscripción alcanzó ${fmtDecimal(latest.tv_suscripcion_100_hogares)} accesos cada 100 hogares.${scope}`,
  });

  insights.push({
    type: "highlight",
    title: "Brecha hogares vs habitantes",
    text: `La diferencia actual es de ${fmtDecimal(gap)} puntos entre ambos indicadores.`,
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

export function getPenetracionProvinciaInsights(
  rows: TelevisionPenetracionProvinciaRow[],
  provincia: string
): Insight[] {
  if (!rows.length) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const variation =
    first.tv_suscripcion_100_hogares > 0
      ? (
          (latest.tv_suscripcion_100_hogares -
            first.tv_suscripcion_100_hogares) /
          first.tv_suscripcion_100_hogares
        ) * 100
      : null;

  const peak = Math.max(
    ...rows.map(
      (r) => r.tv_suscripcion_100_hogares
    )
  );

  const insights: Insight[] = [];

  if (
    variation !== null &&
    Math.abs(variation) < 1000
  ) {
    insights.push({
      type: "trend",
      title: "Crecimiento histórico",
      text: `La penetración de TV por suscripción acumuló una variación de ${fmtPercent(
        variation
      )} desde el inicio de la serie.`,
    });
  }

  insights.push({
    type: "highlight",
    title: "Penetración actual",
    text: `En ${provincia} se registran ${latest.tv_suscripcion_100_hogares.toFixed(
      2
    )} accesos cada 100 hogares.`,
  });

  // insights.push({
  //   type: "highlight",
  //   title: "Relación hogares y habitantes",
  //   text: `La penetración alcanza ${latest.tv_suscripcion_100_habitantes.toFixed(
  //     2
  //   )} accesos cada 100 habitantes.`,
  // });

  if (
    latest.tv_suscripcion_100_hogares ===
    peak
  ) {
    insights.push({
      type: "record",
      title: "Máximo histórico",
      text: "El último trimestre registra el mayor nivel de penetración de toda la serie provincial.",
    });
  }

  return insights;
}