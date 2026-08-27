"use client";

import { useState } from "react";


import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaIngresosRow,
} from "@/lib/telefonia-fija";

import {
  getIngresosKPIItems,
  getIngresosEvolutionData,
  getIngresosInsights
} from "@/lib/telefonia-fija";

import { KPISection } from "@/components/home/kpi-section";


import type { PeriodFilterValue } from "@/lib/utils/filter-period";
import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { LineChartBase } from "@/components/ui/charts/line-chart-base";

import { InsightsCard } from "@/components/ui/insights/insights-card";

import { dispCurrency, dispCurrencyCompact } from "@/lib/format";

type Props = {
  ingresos: ApiResponse<TelefoniaFijaIngresosRow>;
};

export function TelefoniaFijaIngresos({
  ingresos,
}: Props) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const filteredRows =
    filterByPeriods(
      ingresos.data,
      period,
      4
    );

  const kpiItems =
    getIngresosKPIItems(ingresos);

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
        title="Ingresos de telefonía fija"
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
                  color: "var(--accent-green)",
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

          <InsightsCard
            insights={insights}
          />

        </div>
      </section>
    </>
  );
}