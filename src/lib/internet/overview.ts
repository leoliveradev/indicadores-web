import { IInternet, IVelocidad, IDinero } from "@/components/ui/icons";
import { dispValue, dispCurrencyCompact } from "@/lib/format";
import type { Overview } from "@/lib/home/types";
import type { KPIItem } from "@/components/home/kpi-section";

export function getInternetOverviewItems(data: Overview): KPIItem[] {
  return [
    {
      label: "Accesos totales",
      icon: IInternet,
      value: data.accesos.internet,
      format: (v) => dispValue(v, { format: "compact" }),
    },
    // {
    //   label: "% Fibra",
    //   icon: IInternet,
    //   value: data.miscelaneas.fibra_pct,
    //   format: (v) => dispValue(v, { suffix: "%", decimals: 1 }),
    // },
    {
      label: "Penetración hogares",
      icon: IInternet,
      value: data.penetracion.internet,
      format: (v) => dispValue(v, {
        multiline: true,
        suffix: "c/100 hogares",
      }),
    },
    {
      label: "Velocidad media",
      icon: IVelocidad,
      value: data.miscelaneas.velocidad_mbps,
      format: (v) => dispValue(v, { decimals: 1, suffix: "Mbps" }),
    },
    {
      label: "Ingresos",
      icon: IDinero,
      value: data.ingresos.internet,
      format: (v) => dispCurrencyCompact(v),
    },
  ];
}
