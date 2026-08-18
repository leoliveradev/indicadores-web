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

export function getTelefoniaFijaOverviewItems(
  data: Overview
): KPIItem[] {
  return [
    {
      label: "Accesos fijos",
      icon: IInternet,
      value: data.accesos.fija,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
    {
      label: "Penetración hogares",
      icon: IInternet,
      value: data.penetracion.fija,
      format: (v) =>
        dispValue(v, {
          decimals: 2,
          suffix: "c/100 hogares",
        }),
    },
    {
      label: "Ingresos",
      icon: IDinero,
      value: data.ingresos.fija,
      format: (v) =>
        dispCurrencyCompact(v),
    },
  ];
}