import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaIngresosRow,
} from "@/lib/telefonia-fija";

import {
  getIngresosKPIItems,
  getIngresosEvolutionData,
} from "@/lib/telefonia-fija";

import { KPISection } from "@/components/home/kpi-section";

import { LineChartBase } from "@/components/ui/charts/line-chart-base";

import { dispCurrency, dispCurrencyCompact } from "@/lib/format";

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
            <LineChartBase
              data={evolutionData}
              series={[
                {
                  key: "ingresos",
                  label: "Ingresos",
                  color: "var(--color-money, #16a34a)",
                  strokeWidth: 3,
                  activeDot: true,
                },
              ]}
              yFormatter={(v) =>
                dispCurrencyCompact(v)
              }
              tooltipFormatter={(v) =>
                dispCurrency(v)
              }
            />
          </div>

        </div>
      </section>
    </>
  );
}