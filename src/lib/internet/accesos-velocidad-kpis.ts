import { KPIItem } from "@/components/home/kpi-section";
import { dispValue } from "../format";
import {
  InternetAccesosVelocidadComparacionKpi,
  InternetAccesosVelocidadRow
} from "./types";

import {
  getAccesosVelocidadRangosData,
  VelocidadAccesoRow
} from "./accesos-velocidad";


export function getAccesosVelocidadComparacionKPIItems(
  provincia: string,
  kpi: InternetAccesosVelocidadComparacionKpi
): KPIItem[] {
  return [
    {
      label: `${provincia} >100 Mbps`,
      value: kpi.provincia,
      format: (v) =>
        dispValue(v, {
          format: "percent",
          decimals: 1
        }),
    },
    {
      label: "Argentina >100 Mbps",
      value: kpi.nacional,
      format: (v) =>
        dispValue(v, {
          format: "percent",
          decimals: 1
        }),
    },
    {
      label: "Diferencia",
      value: kpi.diferencia,
      format: (v) =>
        `${v > 0 ? "+" : ""}${v.toFixed(1)} pp`,
      tooltip:
        "Diferencia en puntos porcentuales respecto al promedio nacional."
    },
  ];
}

export function getAccesosVelocidadComparacionKpi(
  provinciaRows: InternetAccesosVelocidadRow[],
  nacionalRows: InternetAccesosVelocidadRow[]
): InternetAccesosVelocidadComparacionKpi {
  const provinciaRangos =
    getAccesosVelocidadRangosData(
      provinciaRows
    );

  const nacionalRangos =
    getAccesosVelocidadRangosData(
      nacionalRows
    );

  const provinciaTotal =
    provinciaRangos.reduce(
      (acc, item) => acc + item.accesos,
      0
    );

  const nacionalTotal =
    nacionalRangos.reduce(
      (acc, item) => acc + item.accesos,
      0
    );

  const provincia100Plus =
    provinciaRangos
      .filter((r) =>
        [
          "100-300 Mbps",
          "300-1000 Mbps",
          "1000+ Mbps",
        ].includes(r.rango)
      )
      .reduce(
        (acc, item) => acc + item.accesos,
        0
      );

  const nacional100Plus =
    nacionalRangos
      .filter((r) =>
        [
          "100-300 Mbps",
          "300-1000 Mbps",
          "1000+ Mbps",
        ].includes(r.rango)
      )
      .reduce(
        (acc, item) => acc + item.accesos,
        0
      );

  const provincia =
    (provincia100Plus /
      provinciaTotal) *
    100;

  const nacional =
    (nacional100Plus /
      nacionalTotal) *
    100;

  return {
    provincia: Number(
      provincia.toFixed(1)
    ),
    nacional: Number(
      nacional.toFixed(1)
    ),
    diferencia: Number(
      (provincia - nacional)
        .toFixed(1)
    ),
  };
}

export type AccesosVelocidadLocalidadKpi = {
  totalAccesos: number;
  velocidadPredominante: number;
  porcentaje100Plus: number;
};

export function getAccesosVelocidadLocalidadKpi(
  rows: VelocidadAccesoRow[]
): AccesosVelocidadLocalidadKpi {

  const totalAccesos =
    rows.reduce(
      (acc, row) =>
        acc + row.accesos,
      0
    );

  const predominante =
    [...rows]
      .sort(
        (a, b) =>
          b.accesos - a.accesos
      )[0];

  const accesos100Plus =
    rows
      .filter(
        (r) =>
          r.velocidad >= 100
      )
      .reduce(
        (acc, row) =>
          acc + row.accesos,
        0
      );

  return {
    totalAccesos,

    velocidadPredominante:
      predominante?.velocidad ?? 0,

    porcentaje100Plus:
      totalAccesos > 0
        ? Number(
          (
            (accesos100Plus /
              totalAccesos) *
            100
          ).toFixed(1)
        )
        : 0,
  };
}

export function getAccesosVelocidadLocalidadKPIItems(
  kpi: AccesosVelocidadLocalidadKpi
): KPIItem[] {

  return [
    {
      label: "Accesos",
      value: kpi.totalAccesos,
      format: (v) =>
        dispValue(v, {
          format: "number",
        }),
    },

    {
      label:
        "Velocidad predominante",

      value:
        kpi.velocidadPredominante,

      format: (v) =>
        `${v} Mbps`,
    },

    {
      label: ">100 Mbps",

      value:
        kpi.porcentaje100Plus,

      format: (v) =>
        dispValue(v, {
          format: "percent",
          decimals: 1,
        }),
    },
  ];
}