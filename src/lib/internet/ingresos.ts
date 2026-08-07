import { IDinero } from "@/components/ui/icons";
import { dispCurrencyCompact, fmtPercent } from "@/lib/format";
import type { ApiResponse } from "@/lib/types";
import type { InternetIngresosRow } from "@/lib/internet/types";

import type { KPIItem } from "@/components/home/kpi-section";

export function getIngresosKPIItems(
  response: ApiResponse<InternetIngresosRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const first = rows[0];
  const latest = rows[rows.length - 1];

  const growthPct =
    ((latest.ingresos - first.ingresos) /
      first.ingresos) *
    100;

  return [
    {
      label: "Ingresos actuales",
      icon: IDinero,
      value: latest.ingresos,
      format: (v) => dispCurrencyCompact(v),
    },
    {
      label: "Crecimiento desde 2014",
      icon: IDinero,
      value: growthPct,
      format: (v) => fmtPercent(v, 2),
    },
  ];
}

export function getIngresosEvolutionData(
  response: ApiResponse<InternetIngresosRow>
) {
  console.log(response.data.length);

  return response.data.map((row) => ({
    label: `${row.anio} T${row.trimestre}`,
    ingresos: row.ingresos,
  }));
}