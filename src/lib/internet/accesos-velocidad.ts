import { KPIItem } from "@/components/home/kpi-section";
import type {
  InternetAccesosVelocidadComparacionItem,
  InternetAccesosVelocidadComparacionKpi,
  InternetAccesosVelocidadRangoItem,
  InternetAccesosVelocidadRow,
} from "./types";

export type InternetAccesosVelocidadItem = {
  velocidad: string;
  accesos: number;
};

export function getAccesosVelocidadData(
  rows: InternetAccesosVelocidadRow[]
): InternetAccesosVelocidadItem[] {

  const grouped =
    new Map<number, number>();

  rows.forEach((row) => {
    grouped.set(
      row.velocidad,
      (grouped.get(row.velocidad) ?? 0)
      + row.accesos
    );
  });

  return [...grouped.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([velocidad, accesos]) => ({
      velocidad:
        velocidad === 0
          ? "Sin dato"
          : `${velocidad} Mbps`,
      accesos,
    }));
}

export function getAccesosVelocidadRangosData(
  rows: InternetAccesosVelocidadRow[]
): InternetAccesosVelocidadRangoItem[] {

  const ranges = [
    {
      label: "0-10 Mbps",
      min: 0,
      max: 10,
    },
    {
      label: "10-30 Mbps",
      min: 10,
      max: 30,
    },
    {
      label: "30-100 Mbps",
      min: 30,
      max: 100,
    },
    {
      label: "100-300 Mbps",
      min: 100,
      max: 300,
    },
    {
      label: "300-1000 Mbps",
      min: 300,
      max: 1000,
    },
    {
      label: "1000+ Mbps",
      min: 1000,
      max: Infinity,
    },
  ];

  const totals = new Map<string, number>();

  ranges.forEach((range) => {
    totals.set(range.label, 0);
  });

  rows.forEach((row) => {

    const range = ranges.find((r) => {
      if (r.max === Infinity) {
        return row.velocidad >= r.min;
      }

      return (
        row.velocidad >= r.min &&
        row.velocidad < r.max
      );
    });

    if (!range) return;

    totals.set(
      range.label,
      (totals.get(range.label) ?? 0) +
      row.accesos
    );
  });

  return ranges.map((range) => ({
    rango: range.label,
    accesos:
      totals.get(range.label) ?? 0,
  }));
}

export function filterAccesosVelocidadByProvincia(
  rows: InternetAccesosVelocidadRow[],
  provincia: string
) {
  if (provincia === "all") {
    return rows;
  }

  return rows.filter(
    (row) =>
      row.provincia === provincia
  );
}

export function getAccesosVelocidadProvincias(
  rows: InternetAccesosVelocidadRow[]
) {
  return [...new Set(
    rows.map(
      (row) => row.provincia
    )
  )].sort();
}

export function getAccesosVelocidadComparacionData(
  provinciaRows: InternetAccesosVelocidadRow[],
  nacionalRows: InternetAccesosVelocidadRow[]
): InternetAccesosVelocidadComparacionItem[] {

  const provinciaData =
    getAccesosVelocidadRangosData(provinciaRows);

  const nacionalData =
    getAccesosVelocidadRangosData(nacionalRows);

  const totalProvincia =
    provinciaData.reduce(
      (acc, item) => acc + item.accesos,
      0
    );

  const totalNacional =
    nacionalData.reduce(
      (acc, item) => acc + item.accesos,
      0
    );

  return provinciaData.map((provItem) => {
    const nacionalItem =
      nacionalData.find(
        (n) => n.rango === provItem.rango
      );

    return {
      rango: provItem.rango,

      provincia:
        totalProvincia > 0
          ? Number(
              (
                (provItem.accesos /
                  totalProvincia) *
                100
              ).toFixed(2)
            )
          : 0,

      nacional:
        totalNacional > 0
          ? Number(
              (
                ((nacionalItem?.accesos ?? 0) /
                  totalNacional) *
                100
              ).toFixed(2)
            )
          : 0,
    };
  });
}

export function getAccesosVelocidadComparacionKPIItems(
  provincia: string,
  kpi: InternetAccesosVelocidadComparacionKpi
): KPIItem[] {
  return [
    {
      label: `${provincia} >100 Mbps`,
      value: kpi.provincia,
      format: (v) => `${v.toFixed(1)}%`,
    },
    {
      label: "Argentina >100 Mbps",
      value: kpi.nacional,
      format: (v) => `${v.toFixed(1)}%`,
    },
    {
      label: "Diferencia",
      value: kpi.diferencia,
      format: (v) =>
        `${v > 0 ? "+" : ""}${v.toFixed(1)} pp`,
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