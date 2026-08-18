import type { ApiResponse } from "@/lib/types";
import type { KPIItem } from "@/components/home/kpi-section";

import { IInternet } from "@/components/ui/icons";

import { dispValue } from "@/lib/format";

import type {
  TelefoniaFijaPenetracionRow,
  TelefoniaFijaPenetracionProvinciaRow,
} from "./types";

export function getPenetracionKPIItems(
  response: ApiResponse<TelefoniaFijaPenetracionRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  return [
    {
      label: "Accesos / 100 habitantes",
      icon: IInternet,
      value: latest.accesos_100_hab,
      format: (v) => dispValue(v, {
        decimals: 2,
      }),
    },
    {
      label: "Accesos / 100 hogares",
      icon: IInternet,
      value: latest.accesos_100_hog,
      format: (v) => dispValue(v, {
        decimals: 2,
      }),
    },
  ];
}

export function getPenetracionEvolutionData(
  response: ApiResponse<TelefoniaFijaPenetracionRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    habitantes: row.accesos_100_hab,
    hogares: row.accesos_100_hog,
  }));
}

export function getPenetracionProvinciaRankingData(
  response: ApiResponse<TelefoniaFijaPenetracionProvinciaRow>
) {
  return [...response.data]
    .sort(
      (a, b) =>
        b.accesos_100_hog -
        a.accesos_100_hog
    )
    .slice(0, 10)
    .map((row) => ({
      provincia: row.provincia,
      hogares: row.accesos_100_hog,
      habitantes: row.accesos_100_hab,
    }));
}