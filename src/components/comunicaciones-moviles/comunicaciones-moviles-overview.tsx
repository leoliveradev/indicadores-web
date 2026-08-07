import { KPISection } from "@/components/home/kpi-section";

import type { Overview } from "@/lib/home/types";

import {
  getMovilesOverviewItems,
} from "@/lib/comunicaciones-moviles";

export function ComunicacionesMovilesOverview({
  data,
}: {
  data: Overview;
}) {
  const items =
    getMovilesOverviewItems(data);

  return (
    <KPISection
      title="Resumen del servicio"
      items={items}
    />
  );
}