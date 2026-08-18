import { ApiResponse } from "@/lib/types";

import type {
  ComunicacionesMovilesPenetracionRow,
} from "@/lib/comunicaciones-moviles/types";

import {
  getPenetracionKPIItems,
  getPenetracionEvolutionData,
} from "@/lib/comunicaciones-moviles";

import { KPISection } from "@/components/home/kpi-section";

import { LineChartBase } from "@/components/ui/charts/line-chart-base";

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
            <LineChartBase
              data={evolutionData}
              height={400}
              series={[
                {
                  key: "accesos",
                  label: "Accesos cada 100 habitantes",
                  color: "#2563eb",
                  strokeWidth: 3,
                },
              ]}
            />
          </div>

        </div>
      </section>
    </>
  );
}