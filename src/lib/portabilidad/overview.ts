import type { KPIItem } from "@/components/home/kpi-section";

import { IInternet } from "@/components/ui/icons";

import { dispValue } from "@/lib/format";

import type { ApiResponse } from "@/lib/types";

import type {
  PortabilidadMovilRow,
} from "./types";

export function getPortabilidadOverviewItems(
  response: ApiResponse<PortabilidadMovilRow>
): KPIItem[] {
  const rows = response.data;

  if (!rows.length) return [];

  const latest = rows[rows.length - 1];

  return [
    {
      label: "Portaciones móviles",
      icon: IInternet,
      value: latest.total,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
  ];
}