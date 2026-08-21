import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalFacturacionRow,
  MercadoPostalPersonalRow,
} from "@/lib/mercado-postal";

import { KPISection } from "@/components/home/kpi-section";

import {
  getMercadoPostalOverviewItems,
} from "@/lib/mercado-postal";

type Props = {
  facturacion: ApiResponse<MercadoPostalFacturacionRow>;
  personal: ApiResponse<MercadoPostalPersonalRow>;
};

export function MercadoPostalOverview({
  facturacion,
  personal,
}: Props) {
  const items =
    getMercadoPostalOverviewItems(
      facturacion,
      personal
    );

  return (
    <KPISection
      title="Resumen del servicio"
      items={items}
    />
  );
}