import type { KPIItem } from "@/components/home/kpi-section";

import { IInternet } from "@/components/ui/icons";

import { dispValue } from "@/lib/format";
import type {  ApiResponse } from "@/lib/types";
import type {  ComunicacionesMovilesPenetracionRow } from "@/lib/comunicaciones-moviles/types";

export function getPenetracionKPIItems(
  response: ApiResponse<ComunicacionesMovilesPenetracionRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  return [
    {
      label: "Accesos cada 100 habitantes",
      icon: IInternet,
      value: latest.accesos_100_hab,
      format: (v) =>
        dispValue(v, {
          decimals: 2,
        }),
    },
  ];
}

export function getPenetracionEvolutionData(
  response: ApiResponse<ComunicacionesMovilesPenetracionRow>
) {
  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    accesos: row.accesos_100_hab,
  }));
}