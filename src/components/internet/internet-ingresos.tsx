'use client';
import { useState } from "react";

import type { ApiResponse } from "@/lib/types";
import type { InternetIngresosRow } from "@/lib/internet";

import {
  getIngresosKPIItems,
  getIngresosEvolutionData,
  getIngresosInsights
} from "@/lib/internet";

import { KPISection } from "@/components/home/kpi-section";

import type { PeriodFilterValue } from "@/lib/utils/filter-period";
import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { LineChartBase } from "@/components/ui/charts/line-chart-base";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import { dispCurrency, dispCurrencyCompact } from "@/lib/format";

type Props = {
  ingresos: ApiResponse<InternetIngresosRow>;
};

export function InternetIngresos({
  ingresos,
}: Props) {
  const [period, setPeriod] = useState<PeriodFilterValue>("all");

  const kpiItems = getIngresosKPIItems(ingresos);

  const filteredRows =
    filterByPeriods(
      ingresos.data,
      period,
      4
    );

  const evolutionData =
    getIngresosEvolutionData({
      ...ingresos,
      data: filteredRows,
    });

  const insights =
    getIngresosInsights(
      filteredRows
    );

  return (
    <>
      <KPISection
        title="Ingresos por servicios de Internet"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución histórica de ingresos
          </h2>

          <PeriodFilter
            value={period}
            onChange={setPeriod}
          />

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

          <InsightsCard insights={insights} />

        </div>
      </section>
    </>
  );
}
