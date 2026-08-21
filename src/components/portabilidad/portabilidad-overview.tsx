import type { ApiResponse } from "@/lib/types";

import type {
  PortabilidadMovilRow,
} from "@/lib/portabilidad";

import { KPISection }
  from "@/components/home/kpi-section";

import {
  getPortabilidadOverviewItems,
} from "@/lib/portabilidad/overview";

export function PortabilidadOverview({
  data,
}: {
  data: ApiResponse<PortabilidadMovilRow>;
}) {
  const items =
    getPortabilidadOverviewItems(data);

  return (
    <KPISection
      title="Resumen del servicio"
      items={items}
    />
  );
}
