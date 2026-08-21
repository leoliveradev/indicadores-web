import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalFacturacionRow,
} from "@/lib/mercado-postal";

import {
  getFacturacionKPIItems,
  getFacturacionDonutData,
  getFacturacionEvolutionData,
} from "@/lib/mercado-postal";

import { KPISection } from "@/components/home/kpi-section";

import { DonutChart }
  from "@/components/ui/charts/donut-chart";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { dispCurrencyCompact }
  from "@/lib/format";

type Props = {
  facturacion: ApiResponse<MercadoPostalFacturacionRow>;
};

export function MercadoPostalFacturacion({
  facturacion,
}: Props) {
  const kpiItems =
    getFacturacionKPIItems(facturacion);

  const donutData =
    getFacturacionDonutData(facturacion);

  const evolutionData =
    getFacturacionEvolutionData(
      facturacion
    );

  return (
    <>
      <KPISection
        title="Facturación"
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
            Evolución histórica de facturación
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
                dispCurrencyCompact(v)
              }
            />

          </div>

          <p className="chart-description">
            Evolución de la facturación de los
            servicios postales, telegráficos y
            monetarios del mercado postal argentino.
          </p>

        </div>
      </section>
    </>
  );
}