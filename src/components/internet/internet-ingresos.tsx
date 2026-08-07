import type { ApiResponse } from "@/lib/types";
import type { InternetIngresosRow } from "@/lib/internet/types";

import {
  getIngresosKPIItems,
  getIngresosEvolutionData,
} from "@/lib/internet";

import { KPISection } from "@/components/home/kpi-section";

import { IngresosAreaChart } from "@/components/ui/charts/ingresos-area-chart";

type Props = {
  data: ApiResponse<InternetIngresosRow>;
};

export function InternetIngresos({
  data,
}: Props) {
  const kpiItems = getIngresosKPIItems(data);

  const evolutionData =
    getIngresosEvolutionData(data);

  return (
    <>
      <KPISection
        title="Ingresos por servicios de Internet"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución histórica de ingresos
          </h2>

          <div className="chart-card">
            <IngresosAreaChart
              data={evolutionData}
            />
          </div>

        </div>
      </section>
    </>
  );
}
