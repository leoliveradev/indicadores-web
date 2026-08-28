import type { Insight }
  from "@/lib/types";

import type {
  PortabilidadMovilRow,
} from "./types";

export function getPortabilidadInsights(
  rows: PortabilidadMovilRow[]
): Insight[] {
  if (rows.length < 2) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const variation =
    ((latest.total - first.total) /
      first.total) *
    100;

  const promedio =
    rows.reduce(
      (acc, row) => acc + row.total,
      0
    ) / rows.length;

  const pico =
    rows.reduce((max, row) =>
      row.total > max.total
        ? row
        : max
    );

  return [
    {
      type: "trend",
      title: "Variación del período",
      text: `Las portaciones variaron ${variation.toFixed(
        1
      )}% durante el período seleccionado.`,
    },
    {
      type: "highlight",
      title: "Promedio mensual",
      text: `El promedio fue de ${promedio.toLocaleString(
        "es-AR",
        { maximumFractionDigits: 0 }
      )} portaciones mensuales.`,
    },
    {
      type: "record",
      title: "Máximo del período",
      text: `El valor más alto registrado fue de ${pico.total.toLocaleString(
        "es-AR"
      )} portaciones.`,
    },
  ];
}