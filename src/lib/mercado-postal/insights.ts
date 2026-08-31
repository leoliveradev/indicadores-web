import { Insight } from "../types";
import type {
  MercadoPostalFacturacionRow,
  MercadoPostalProduccionRow,
  MercadoPostalPersonalRow
} from "./types";

export function getFacturacionInsights(
  rows: MercadoPostalFacturacionRow[]
): Insight[] {
  if (!rows.length) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const firstTotal =
    first.postales +
    first.telegraficas +
    first.monetarios;

  const latestTotal =
    latest.postales +
    latest.telegraficas +
    latest.monetarios;

  const variation =
    firstTotal > 0
      ? ((latestTotal - firstTotal) /
        firstTotal) * 100
      : null;

  const total =
    latest.postales +
    latest.telegraficas +
    latest.monetarios;

  const postalShare =
    (latest.postales / total) * 100;

  const segments = [
    {
      name: "Postales",
      value: latest.postales,
    },
    {
      name: "Telegráficas",
      value: latest.telegraficas,
    },
    {
      name: "Monetarios",
      value: latest.monetarios,
    },
  ];

  const top = segments.reduce(
    (max, item) =>
      item.value > max.value
        ? item
        : max
  );

  const totals = rows.map(
    (r) =>
      r.postales +
      r.telegraficas +
      r.monetarios
  );

  const peak =
    Math.max(...totals);

  const insights: Insight[] = [
    {
      type: "highlight",
      title: "Participación postal",
      text: `Los servicios postales representan ${postalShare.toFixed(
        1
      )}% de la facturación total actual.`,
    },
    {
      type: "highlight",
      title: "Segmento predominante",
      text: `${top.name} representa la mayor parte de la facturación actual.`,
    },
  ];

  if (
    variation !== null &&
    Math.abs(variation) < 1000
  ) {
    insights.push({
      type: "trend",
      title: "Variación del período",
      text: `La facturación total varió ${variation.toFixed(
        1
      )}% durante el período seleccionado.`,
    });
  }

  if (latestTotal === peak) {
    insights.push({
      type: "record",
      title: "Máximo histórico",
      text: "El último período registra el mayor nivel de facturación de toda la serie.",
    });
  }

  return insights;
}

export function getProduccionInsights(
  rows: MercadoPostalProduccionRow[]
): Insight[] {
  if (!rows.length) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const firstTotal =
    first.postales +
    first.telegraficas +
    first.monetarios;

  const latestTotal =
    latest.postales +
    latest.telegraficas +
    latest.monetarios;

  const variation =
    firstTotal > 0
      ? ((latestTotal - firstTotal) /
          firstTotal) * 100
      : null;

  const total =
    latest.postales +
    latest.telegraficas +
    latest.monetarios;

  const postalShare =
    total > 0
      ? (latest.postales / total) * 100
      : 0;

  const segments = [
    {
      name: "Postales",
      value: latest.postales,
    },
    {
      name: "Telegráficas",
      value: latest.telegraficas,
    },
    {
      name: "Monetarios",
      value: latest.monetarios,
    },
  ];

  const top = segments.reduce(
    (max, item) =>
      item.value > max.value
        ? item
        : max
  );

  const totals = rows.map(
    (r) =>
      r.postales +
      r.telegraficas +
      r.monetarios
  );

  const peak =
    Math.max(...totals);

  const insights: Insight[] = [];

  if (
    variation !== null &&
    Math.abs(variation) < 1000
  ) {
    insights.push({
      type: "trend",
      title: "Variación del período",
      text: `La producción total varió ${variation.toFixed(
        1
      )}% durante el período seleccionado.`,
    });
  }

  insights.push({
    type: "highlight",
    title: "Participación postal",
    text: `Los servicios postales representan ${postalShare.toFixed(
      1
    )}% de la producción total actual.`,
  });

  insights.push({
    type: "highlight",
    title: "Segmento predominante",
    text: `${top.name} concentra la mayor parte de la producción registrada.`,
  });

  if (latestTotal === peak) {
    insights.push({
      type: "record",
      title: "Máximo histórico",
      text: "El último período registra el mayor nivel de producción de toda la serie.",
    });
  }

  return insights;
}

export function getPersonalInsights(
  rows: MercadoPostalPersonalRow[]
): Insight[] {
  if (!rows.length) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const variation =
    first.personal_ocupado > 0
      ? (
          (latest.personal_ocupado -
            first.personal_ocupado) /
          first.personal_ocupado
        ) * 100
      : null;

  const peak = Math.max(
    ...rows.map(
      (r) => r.personal_ocupado
    )
  );

  const insights: Insight[] = [];

  if (
    variation !== null &&
    Math.abs(variation) < 1000
  ) {
    insights.push({
      type: "trend",
      title: "Variación del período",
      text: `El personal ocupado varió ${variation.toFixed(
        1
      )}% durante el período seleccionado.`,
    });
  }

  insights.push({
    type: "highlight",
    title: "Dotación actual",
    text: `El sector registra actualmente ${latest.personal_ocupado.toLocaleString(
      "es-AR"
    )} personas ocupadas.`,
  });

  if (
    latest.personal_ocupado === peak
  ) {
    insights.push({
      type: "record",
      title: "Máximo histórico",
      text: "El último período registra el mayor nivel de empleo de toda la serie.",
    });
  }

  return insights;
}