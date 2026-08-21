import type { KPIItem } from "@/components/home/kpi-section";
import type { ApiResponse } from "@/lib/types";

import { IInternet } from "@/components/ui/icons";

import { dispValue } from "@/lib/format";

import type {
  PortabilidadMovilRow,
} from "./types";

export function getPortabilidadKPIItems(
  response: ApiResponse<PortabilidadMovilRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  return [
    {
      label: "Portaciones del último período",
      icon: IInternet,
      value: latest.total,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
  ];
}

export function getPortabilidadEvolutionData(
  response: ApiResponse<PortabilidadMovilRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio}-${String(row.mes).padStart(2, "0")}`,
    total: row.total,
  }));
}
