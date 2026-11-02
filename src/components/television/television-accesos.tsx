"use client";

import { useState } from "react";


import type { ApiResponse } from "@/lib/types";

import type { TelevisionAccesosRow } from "@/lib/television";

import {
  getAccesosKPIItems,
  getAccesosEvolutionData,
  getAccesosInsights,
} from "@/lib/television";

import { KPISection } from "@/components/home/kpi-section";

import type { PeriodFilterValue } from "@/lib/utils/filter-period";
import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { LineChartBase } from "@/components/ui/charts/line-chart-base";

import { InsightsCard } from "@/components/ui/insights/insights-card";

import { dispValue } from "@/lib/format";

type Props = {
  accesos: ApiResponse<TelevisionAccesosRow>;
};

export function TelevisionAccesos({
  accesos,
}: Props) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const filteredRows =
    filterByPeriods(
      accesos.data,
      period,
      4
    );

  const kpiItems = getAccesosKPIItems(accesos);

  const evolutionData =
    getAccesosEvolutionData({
      ...accesos,
      data: filteredRows,
    });

  const insights =
    getAccesosInsights(
      filteredRows
    );


  return (
    <>
      <KPISection
        title="Accesos de televisión por suscripción"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución histórica de accesos
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
                  key: "tv_suscripcion",
                  label: "TV por suscripción",
                  color: "var(--accent-green)",
                  strokeWidth: 3,
                  activeDot: true,
                },
                {
                  key: "tv_satelital",
                  label: "TV satelital",
                  color: "var(--accent-amber)",
                  strokeWidth: 2,
                  activeDot: true,
                },
              ]}
              yFormatter={(v) =>
                dispValue(v, {
                  format: "compact",
                })
              }
              tooltipFormatter={(v) =>
                v.toLocaleString("es-AR")
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