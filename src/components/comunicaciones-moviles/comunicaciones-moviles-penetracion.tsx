import {  ApiResponse } from "@/lib/types";

import type {
  ComunicacionesMovilesPenetracionRow,
} from "@/lib/comunicaciones-moviles/types";

import {
  getPenetracionKPIItems,
  getPenetracionEvolutionData,
} from "@/lib/comunicaciones-moviles";

import { KPISection } from "@/components/home/kpi-section";

import { PenetracionLineChart }
  from "./penetracion-line-chart";

export function ComunicacionesMovilesPenetracion({
  penetracion,
}: {
  penetracion: ApiResponse<ComunicacionesMovilesPenetracionRow>;
}) {
  const kpiItems =
    getPenetracionKPIItems(
      penetracion
    );

  const evolutionData =
    getPenetracionEvolutionData(
      penetracion
    );

  return (
    <>
      <KPISection
        title="Penetración móvil"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de la penetración móvil
          </h2>

          <div className="chart-card">
            <PenetracionLineChart
              data={evolutionData}
            />
          </div>

        </div>
      </section>
    </>
  );
}