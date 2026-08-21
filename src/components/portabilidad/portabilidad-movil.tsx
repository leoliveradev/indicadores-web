import type { ApiResponse } from "@/lib/types";

import type {
  PortabilidadMovilRow,
} from "@/lib/portabilidad";

import {
  getPortabilidadKPIItems,
  getPortabilidadEvolutionData,
} from "@/lib/portabilidad";

import { KPISection } from "@/components/home/kpi-section";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

type Props = {
  data: ApiResponse<PortabilidadMovilRow>;
};

export function PortabilidadMovil({
  data,
}: Props) {
  const kpiItems =
    getPortabilidadKPIItems(data);

  const evolutionData =
    getPortabilidadEvolutionData(data);

  return (
    <>
      <KPISection
        title="Portabilidad numérica móvil"
        items={kpiItems}
      />

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución histórica
          </h2>

          <div className="chart-card">

            <LineChartBase
              data={evolutionData}
              series={[
                {
                  key: "total",
                  label: "Portaciones",
                  color: "#003667",
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