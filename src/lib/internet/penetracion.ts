import {
  InternetPenetracionRow,
  InternetPenetracionProvinciaRow,
} from "@/lib/types";

import { fmtNumber } from "@/lib/format";

export function getPenetracionKPIItems(
  rows: InternetPenetracionRow[]
) {
  const latest = rows[rows.length - 1];

  if (!rows.length) return [];

  return [
    {
      label: "Accesos / 100 hogares",
      value: latest.accesos_cada_100_hogares,
      // icon: "home",
      format: (v: number) => fmtNumber(v, 2),
    },
    {
      label: "Accesos / 100 habitantes",
      value: latest.accesos_cada_100_habitantes,
      // icon: "users",
      format: (v: number) => fmtNumber(v, 2),
    },
  ];
}

export function getPenetracionEvolutionData(rows: InternetPenetracionRow[]) {
  return rows.map((r) => ({
    period: `${r.anio} T${r.trimestre}`,
    hogares: Number(r.accesos_cada_100_hogares),
    habitantes: Number(r.accesos_cada_100_habitantes),
  }));
}

export function getLatestPenetracionProvinciaData(rows: InternetPenetracionProvinciaRow[]) {
  const latestMap = new Map();

  rows.forEach((r) => {
    const key = r.provincia;
    const period = r.anio * 10 + r.trimestre;

    if (
      !latestMap.has(key) ||
      latestMap.get(key).period < period
    ) {
      latestMap.set(key, {
        provincia: r.provincia,
        total: r.accesos_cada_100_hogares,
        hogares: r.accesos_cada_100_hogares,
        habitantes: r.accesos_cada_100_habitantes,
        period,
      });
    }
  });

  return Array.from(latestMap.values());
}

export function getPenetracionProvinciaRanking(rows: {
  provincia: string;
  hogares: number;
  habitantes: number;
}[]) {
  return rows
    .slice()
    .sort((a, b) => b.hogares - a.hogares)
    .slice(0, 10)
    .map((r) => ({
      provincia: r.provincia,
      value: r.hogares,
      hogares: r.hogares,
      habitantes: r.habitantes,
    }));
}