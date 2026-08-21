import type { Overview } from "@/lib/home/types";
import type { KPIItem } from "@/components/home/kpi-section";

import {
  IInternet,
  IDinero,
} from "@/components/ui/icons";

import {
  dispValue,
  dispCurrencyCompact,
} from "@/lib/format";

export function getTelevisionOverviewItems(
  data: Overview
): KPIItem[] {
  return [
    {
      label: "Accesos TV",
      icon: IInternet,
      value: data.accesos.tv,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Penetración",
      icon: IInternet,
      value: data.penetracion.tv,
      format: (v) =>
        dispValue(v, {
          decimals: 2,
        }),
    },
    {
      label: "Ingresos",
      icon: IDinero,
      value: data.ingresos.tv,
      format: (v) =>
        dispCurrencyCompact(v),
    },
  ];
}