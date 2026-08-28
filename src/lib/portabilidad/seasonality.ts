import type {
  PortabilidadMovilRow,
  PortabilidadSeasonalityPoint
} from "./types";

const MONTHS = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];

export const MONTH_NAMES = [
  "",
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function getPortabilidadSeasonalityData(
  rows: PortabilidadMovilRow[]
): PortabilidadSeasonalityPoint[] {

  const grouped = new Map<
    number,
    number[]
  >();

  rows.forEach((row) => {
    const values =
      grouped.get(row.mes) ?? [];

    values.push(row.total);

    grouped.set(
      row.mes,
      values
    );
  });

  return Array.from(
    { length: 12 },
    (_, index) => {
      const month =
        index + 1;

      const values =
        grouped.get(month) ?? [];

      const promedio =
        values.length
          ? values.reduce(
            (sum, value) =>
              sum + value,
            0
          ) / values.length
          : 0;

      return {
        mes: MONTHS[index],
        mesCompleto: MONTH_NAMES[month],
        mesNumero: month,
        promedio,
      };
    }
  );
}