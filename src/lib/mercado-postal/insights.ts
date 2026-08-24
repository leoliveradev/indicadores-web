import { Insight } from "../types";
import type {
  MercadoPostalFacturacionRow,
  MercadoPostalPersonalRow
} from "./types";

export function getFacturacionInsights(
  rows: MercadoPostalFacturacionRow[]
): Insight[] {
  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  const total =
    latest.postales +
    latest.telegraficas +
    latest.monetarios;

  const postalShare =
    (latest.postales / total) * 100;

  return [
    {
      title: "Facturación postal",
      text: `Los servicios postales representan ${postalShare.toFixed(
        1
      )}% de la facturación total.`,
    },
    {
      title: "Servicios predominantes",
      text: "Los servicios postales continúan siendo el principal segmento del mercado.",
    },
  ];
}

export function getPersonalInsights(
  rows: MercadoPostalPersonalRow[]
): Insight[] {
  if (!rows.length) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const variation =
    ((latest.personal_ocupado -
      first.personal_ocupado) /
      first.personal_ocupado) *
    100;

  return [
    {
      title: "Evolución del empleo",
      text: `El personal ocupado varió ${variation.toFixed(
        1
      )}% respecto del inicio de la serie.`,
    },
  ];
}