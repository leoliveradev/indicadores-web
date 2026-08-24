import type { ApiResponse } from "@/lib/types";

import type {
  TelevisionIngresosRow,
} from "@/lib/television";

import {
  getIngresosKPIItems,
  getIngresosEvolutionData,
} from "@/lib/television";

import { KPISection } from "@/components/home/kpi-section";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";
import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import {
  getIngresosInsights,
} from "@/lib/television/insights";
import { dispCurrencyCompact }
  from "@/lib/format";

type Props = {
  ingresos: ApiResponse<TelevisionIngresosRow>;
};

export function TelevisionIngresos({
  ingresos,
}: Props) {
  const kpiItems =
    getIngresosKPIItems(ingresos);

  const evolutionData =
    getIngresosEvolutionData(ingresos);

  const insights =
    getIngresosInsights(
      ingresos.data
    );

  return (
    <>
      <KPISection
        title="Ingresos"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución histórica de ingresos
          </h2>

          <div className="chart-card">

            <LineChartBase
              data={evolutionData}
              series={[
                {
                  key: "tv_suscripcion",
                  label: "TV Suscripción",
                  color: "#005297",
                  strokeWidth: 3,
                },
                {
                  key: "tv_satelital",
                  label: "TV Satelital",
                  color: "#EEAE42",
                },
              ]}
              yFormatter={(v) =>
                dispCurrencyCompact(v)
              }
            />

          </div>
          <InsightsCard
            insights={insights}
          />
        </div>
      </section>
    </>
  );
}