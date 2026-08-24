import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalPersonalRow,
} from "@/lib/mercado-postal";

import {
  getPersonalKPIItems,
  getPersonalEvolutionData,
} from "@/lib/mercado-postal";

import { KPISection } from "@/components/home/kpi-section";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import {
  getPersonalInsights,
} from "@/lib/mercado-postal/insights";

import { dispValue }
  from "@/lib/format";

type Props = {
  personal: ApiResponse<MercadoPostalPersonalRow>;
};

export function MercadoPostalPersonal({
  personal,
}: Props) {
  const kpiItems =
    getPersonalKPIItems(personal);

  const evolutionData =
    getPersonalEvolutionData(personal);

  const insights =
    getPersonalInsights(
      personal.data
    );

  return (
    <>
      <KPISection
        title="Personal ocupado"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución del empleo
          </h2>

          <div className="chart-card">

            <LineChartBase
              data={evolutionData}
              series={[
                {
                  key: "personal_ocupado",
                  label: "Personal ocupado",
                  color: "#005297",
                  strokeWidth: 3,
                },
              ]}
              yFormatter={(v) =>
                dispValue(v, {
                  format: "compact",
                })
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