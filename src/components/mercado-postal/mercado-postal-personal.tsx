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

          <p className="chart-description">
            Evolución histórica del personal
            ocupado registrado en el mercado
            postal argentino.
          </p>

        </div>
      </section>
    </>
  );
}