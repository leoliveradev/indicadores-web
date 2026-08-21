import type { ApiResponse } from "@/lib/types";
import type { KPIItem } from "@/components/home/kpi-section";

import {
  IDinero,
  IInternet,
} from "@/components/ui/icons";

import {
  dispCurrencyCompact,
  dispValue,
} from "@/lib/format";

import type {
  MercadoPostalFacturacionRow,
  MercadoPostalPersonalRow,
} from "./types";

export function getMercadoPostalOverviewItems(
  facturacion: ApiResponse<MercadoPostalFacturacionRow>,
  personal: ApiResponse<MercadoPostalPersonalRow>
): KPIItem[] {
  const facturacionRows = facturacion.data;
  const personalRows = personal.data;

  if (!facturacionRows.length || !personalRows.length) {
    return [];
  }

  const latestFacturacion =
    facturacionRows[facturacionRows.length - 1];

  const latestPersonal =
    personalRows[personalRows.length - 1];

  const totalFacturacion =
    latestFacturacion.postales +
    latestFacturacion.telegraficas +
    latestFacturacion.monetarios;

  return [
    {
      label: "Facturación total",
      icon: IDinero,
      value: totalFacturacion,
      format: (v) => dispCurrencyCompact(v),
    },
    {
      label: "Personal ocupado",
      icon: IInternet,
      value: latestPersonal.personal_ocupado,
      format: (v) =>
        dispValue(v, {
          format: "compact",
        }),
    },
  ];
}