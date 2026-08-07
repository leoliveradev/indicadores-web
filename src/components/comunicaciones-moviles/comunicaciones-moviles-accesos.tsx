import type {  ApiResponse } from "@/lib/types";
import type {
  ComunicacionesMovilesAccesosRow,
} from "@/lib/comunicaciones-moviles/types";

import {
  getAccesosKPIItems,
  getAccesosDonutData,
  getAccesosEvolutionData,
} from "@/lib/comunicaciones-moviles";

import { KPISection } from "@/components/home/kpi-section";

import { AccesosDonutChart }
  from "./accesos-donut-chart";

import { AccesosLineChart }
  from "./accesos-line-chart";

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
            <AccesosDonutChart
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
            <AccesosLineChart
              data={evolutionData}
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