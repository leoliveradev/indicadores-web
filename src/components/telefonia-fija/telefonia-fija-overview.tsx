import type { Overview } from "@/lib/home/types";

import { KPISection } from "@/components/home/kpi-section";

import {
  getTelefoniaFijaOverviewItems,
} from "@/lib/telefonia-fija/overview";

export function TelefoniaFijaOverview({
  data,
}: {
  data: Overview;
}) {
  const items =
    getTelefoniaFijaOverviewItems(data);

  return (
    <KPISection
      title="Resumen del servicio"
      items={items}
    />
  );
}