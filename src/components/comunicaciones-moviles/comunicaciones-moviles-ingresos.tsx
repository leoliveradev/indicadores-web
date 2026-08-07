import type { ApiResponse } from "@/lib/types";

import type {
  ComunicacionesMovilesIngresosRow,
} from "@/lib/comunicaciones-moviles/types";

import {
  getIngresosKPIItems,
  getIngresosEvolutionData,
} from "@/lib/comunicaciones-moviles";

import { KPISection }
  from "@/components/home/kpi-section";

import { IngresosAreaChart }
  from "@/components/ui/charts/ingresos-area-chart";

export function ComunicacionesMovilesIngresos({
  ingresos,
}: {
  ingresos: ApiResponse<ComunicacionesMovilesIngresosRow>;
}) {
  const kpiItems =
    getIngresosKPIItems(ingresos);

  const evolutionData =
    getIngresosEvolutionData(ingresos);

  return (
    <>
      <KPISection
        title="Ingresos de comunicaciones móviles"
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