import type { KPIItem } from "@/components/home/kpi-section";

import { IInternet } from "@/components/ui/icons";

import { dispValue, fmtPercent } from "@/lib/format";

import type { ApiResponse } from "@/lib/types";

import type {
  PortabilidadMovilRow,
} from "./types";

export function getPortabilidadOverviewItems(
  response: ApiResponse<PortabilidadMovilRow>
): KPIItem[] {
  const rows = response.data;

  if (rows.length < 2) return [];

  const latest = rows[rows.length - 1];
  const previous = rows[rows.length - 2];

  const variation =
    ((latest.total - previous.total) /
      previous.total) *
    100;

  const totalHistorico =
    rows.reduce(
      (acc, row) => acc + row.total,
      0
    );

  const promedio =
    totalHistorico / rows.length;

  const pico =
    rows.reduce((max, row) =>
      row.total > max.total
        ? row
        : max
    );

  return [
    {
      label: "Portaciones (último mes)",
      icon: IInternet,
      value: latest.total,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Variación mensual",
      icon: () => null,
      value: variation,
      format: (v) =>
        fmtPercent(v, 1),
    },
    {
      label: "Total histórico",
      icon: () => null,
      value: totalHistorico,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Promedio mensual",
      icon: () => null,
      value: promedio,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Máximo histórico",
      icon: () => null,
      value: pico.total,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
  ];
}