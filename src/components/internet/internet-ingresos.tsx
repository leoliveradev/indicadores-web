import type {
  ApiResponse,
  InternetIngresosRow,
} from "@/lib/types";

import {
  getIngresosKPIItems,
  getIngresosEvolutionData,
} from "@/lib/internet";

import { KPISection } from "@/components/home/kpi-section";
import { Section } from "@/components/home/section";

import { IngresosAreaChart } from "./ingresos-area-chart";

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
    // <>
    //   <KPISection
    //     title="Ingresos por servicios de Internet"
    //     items={kpiItems}
    //   />

    //   <Section
    //     title="Evolución histórica de ingresos"
    //     alt
    //   >
    //     <IngresosAreaChart
    //       data={evolutionData}
    //     />
    //   </Section>
    // </>
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
