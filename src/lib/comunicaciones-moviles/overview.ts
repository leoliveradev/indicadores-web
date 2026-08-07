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

export function getMovilesOverviewItems(
  data: Overview
): KPIItem[] {
  return [
    {
      label: "Accesos móviles",
      icon: IInternet,
      value: data.accesos.moviles,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Penetración",
      icon: IInternet,
      value: data.penetracion.moviles,
      format: (v) =>
        dispValue(v, {
          decimals: 2,
          suffix: "c/100 hab",
        }),
    },
    {
      label: "Ingresos",
      icon: IDinero,
      value: data.ingresos.moviles,
      format: (v) =>
        dispCurrencyCompact(v),
    },
  ];
}