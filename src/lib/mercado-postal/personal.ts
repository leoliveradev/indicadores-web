import type { ApiResponse } from "@/lib/types";
import type { KPIItem } from "@/components/home/kpi-section";

import { IInternet } from "@/components/ui/icons";

import { dispValue } from "@/lib/format";

import type {
  MercadoPostalPersonalRow,
} from "./types";

export function getPersonalKPIItems(
  response: ApiResponse<MercadoPostalPersonalRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  return [
    {
      label: "Personal ocupado",
      icon: IInternet,
      value: latest.personal_ocupado,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
  ];
}

export function getPersonalEvolutionData(
  response: ApiResponse<MercadoPostalPersonalRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    personal_ocupado: row.personal_ocupado,
  }));
}