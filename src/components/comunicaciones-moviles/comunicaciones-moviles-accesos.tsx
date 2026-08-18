import type { ApiResponse } from "@/lib/types";
import type {
  ComunicacionesMovilesAccesosRow,
} from "@/lib/comunicaciones-moviles/types";

import {
  getAccesosKPIItems,
  getAccesosDonutData,
  getAccesosEvolutionData,
} from "@/lib/comunicaciones-moviles";

import { KPISection } from "@/components/home/kpi-section";

import { DonutChart }
  from "@/components/ui/charts/donut-chart";
import { LineChartBase } from "@/components/ui/charts/line-chart-base";

export function ComunicacionesMovilesAccesos({
  accesos,
}: {
  accesos: ApiResponse<ComunicacionesMovilesAccesosRow>;
}) {
  const kpiItems =
    getAccesosKPIItems(accesos);

  const donutData =
    getAccesosDonutData(accesos);

  const evolutionData =
    getAccesosEvolutionData(accesos);

  return (
    <>
      <KPISection
        title="Accesos móviles"
        items={kpiItems}
      />

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Composición actual
          </h2>

          <div className="chart-card">
            <DonutChart
              data={donutData}
            />
          </div>

        </div>
      </section>

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de líneas móviles
          </h2>

          <div className="chart-card">
            <LineChartBase
              data={evolutionData}
              series={[
                {
                  key: "prepago",
                  label: "Prepago",
                  color: "#2563eb",
                  strokeWidth: 3,
                },
                {
                  key: "pospago",
                  label: "Pospago",
                  color: "#16a34a",
                  strokeWidth: 3,
                },
                {
                  key: "operativos",
                  label: "Operativos",
                  color: "#f59e0b",
                  strokeWidth: 3,
                }
              ]}
            />
          </div>

          <p className="chart-description">
            Comparativa histórica entre
            líneas prepagas, pospagas y
            el total de líneas operativas.
          </p>

        </div>
      </section>
    </>
  );
}