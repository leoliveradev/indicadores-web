import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaIngresosRow,
} from "@/lib/telefonia-fija";

import {
  getIngresosKPIItems,
  getIngresosEvolutionData,
} from "@/lib/telefonia-fija";

import { KPISection } from "@/components/home/kpi-section";

import { IngresosAreaChart }
  from "@/components/ui/charts/ingresos-area-chart";

type Props = {
  ingresos: ApiResponse<TelefoniaFijaIngresosRow>;
};

export function TelefoniaFijaIngresos({
  ingresos,
}: Props) {
  const kpiItems =
    getIngresosKPIItems(ingresos);

  const evolutionData =
    getIngresosEvolutionData(
      ingresos
    );

  return (
    <>
      <KPISection
        title="Ingresos de telefonía fija"
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