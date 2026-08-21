import type { Overview }
  from "@/lib/home/types";

import { KPISection }
  from "@/components/home/kpi-section";

import {
  getTelevisionOverviewItems,
} from "@/lib/television/overview";

export function TelevisionOverview({
  data,
}: {
  data: Overview;
}) {
  const items =
    getTelevisionOverviewItems(data);

  return (
    <KPISection
      title="Resumen del servicio"
      items={items}
    />
  );
}