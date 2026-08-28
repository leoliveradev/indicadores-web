import type { Insight }
  from "@/lib/types";

import type {
  PortabilidadMovilRow,
  PortabilidadSeasonalityPoint
} from "./types";
import { MONTH_NAMES } from "./seasonality";

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

export function getPortabilidadSeasonalityInsights(
  rows: PortabilidadSeasonalityPoint[]
): Insight[] {

  if (!rows.length) return [];

  const maxMonth =
    rows.reduce((max, row) =>
      row.promedio > max.promedio
        ? row
        : max
    );

  const minMonth =
    rows.reduce((min, row) =>
      row.promedio < min.promedio
        ? row
        : min
    );

  const firstSemester =
    rows
      .slice(0, 6)
      .reduce(
        (acc, row) => acc + row.promedio,
        0
      );

  const secondSemester =
    rows
      .slice(6)
      .reduce(
        (acc, row) => acc + row.promedio,
        0
      );

  return [
    {
      type: "record",
      title: "Mes de mayor actividad",
      text: `${MONTH_NAMES[maxMonth.mesNumero]} registra el promedio histórico más alto de portaciones.`,
    },
    {
      type: "warning",
      title: "Mes de menor actividad",
      text: `${MONTH_NAMES[minMonth.mesNumero]} presenta el promedio histórico más bajo.`,
    },
    {
      type: "highlight",
      title: "Concentración temporal",
      text:
        secondSemester > firstSemester
          ? "El segundo semestre concentra más portaciones que el primero."
          : "El primer semestre concentra más portaciones que el segundo.",
    },
  ];
}