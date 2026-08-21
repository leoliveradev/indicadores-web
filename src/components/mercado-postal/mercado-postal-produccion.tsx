import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalProduccionRow,
} from "@/lib/mercado-postal";

import {
  getProduccionKPIItems,
  getProduccionDonutData,
  getProduccionEvolutionData,
} from "@/lib/mercado-postal";

import { KPISection } from "@/components/home/kpi-section";

import { DonutChart }
  from "@/components/ui/charts/donut-chart";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { dispValue }
  from "@/lib/format";

type Props = {
  produccion: ApiResponse<MercadoPostalProduccionRow>;
};

export function MercadoPostalProduccion({
  produccion,
}: Props) {
  const kpiItems =
    getProduccionKPIItems(produccion);

  const donutData =
    getProduccionDonutData(produccion);

  const evolutionData =
    getProduccionEvolutionData(
      produccion
    );

  return (
    <>
      <KPISection
        title="Producción"
        items={kpiItems}
      />

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Composición actual
          </h2>

          <div className="chart-card">
            <DonutChart data={donutData} />
          </div>

        </div>
      </section>

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución histórica de producción
          </h2>

          <div className="chart-card">

            <LineChartBase
              data={evolutionData}
              series={[
                {
                  key: "postales",
                  label: "Postales",
                  color: "#005297",
                  strokeWidth: 3,
                },
                {
                  key: "telegraficas",
                  label: "Telegráficas",
                  color: "#EEAE42",
                },
                {
                  key: "monetarios",
                  label: "Monetarios",
                  color: "#22c55e",
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
            Evolución de la producción de
            servicios postales, telegráficos y
            monetarios en unidades.
          </p>

        </div>
      </section>
    </>
  );
}