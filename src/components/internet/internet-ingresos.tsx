'use client';
import { useState } from "react";

import type { ApiResponse } from "@/lib/types";
import type { InternetIngresosRow } from "@/lib/internet";

import {
  getIngresosKPIItems,
  getIngresosEvolutionData,
} from "@/lib/internet";

import { KPISection } from "@/components/home/kpi-section";

import type { PeriodFilterValue }  from "@/lib/utils/filter-period";
import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { IngresosAreaChart } from "@/components/ui/charts/ingresos-area-chart";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import {
  getIngresosInsights,
} from "@/lib/internet/insights";

type Props = {
  ingresos: ApiResponse<InternetIngresosRow>;
};

export function InternetIngresos({
  ingresos,
}: Props) {
  const kpiItems = getIngresosKPIItems(ingresos);

  const [period, setPeriod] = useState<PeriodFilterValue>("all");

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

      <PeriodFilter
        value={period}
        onChange={setPeriod}
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

          <InsightsCard insights={insights} />
          
        </div>
      </section>
    </>
  );
}
