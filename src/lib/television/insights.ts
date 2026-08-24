import type { Insight } from "@/lib/types";

import type {
  TelevisionAccesosRow,
  TelevisionIngresosRow
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