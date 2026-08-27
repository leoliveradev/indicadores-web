'use client';
import { useState } from "react";

import type { ApiResponse } from "@/lib/types";
import type {
  ComunicacionesMovilesAccesosRow,
} from "@/lib/comunicaciones-moviles/types";

import {
  getAccesosKPIItems,
  getAccesosDonutData,
  getAccesosEvolutionData,
} from "@/lib/comunicaciones-moviles";

import { KPISection } from "@/components/home/kpi-section";

import type { PeriodFilterValue } from "@/lib/utils/filter-period";
import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { DonutChart }
  from "@/components/ui/charts/donut-chart";
import { LineChartBase } from "@/components/ui/charts/line-chart-base";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import {
  getAccesosInsights,
} from "@/lib/comunicaciones-moviles/insights";

import { dispValue } from "@/lib/format";

export function ComunicacionesMovilesAccesos({
  accesos,
}: {
  accesos: ApiResponse<ComunicacionesMovilesAccesosRow>;
}) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const filteredRows =
    filterByPeriods(
      accesos.data,
      period,
      4
    );

  const kpiItems =
    getAccesosKPIItems(accesos);

  const donutData =
    getAccesosDonutData(accesos);

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
        title="Accesos móviles"
        items={kpiItems}
      />

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Composición actual
          </h2>

          <div className="chart-card">
            <DonutChart
              data={donutData}
            />
          </div>

        </div>
      </section>

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de líneas móviles
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
                  key: "prepago",
                  label: "Prepago",
                  color: "#2563eb",
                  strokeWidth: 3,
                },
                {
                  key: "pospago",
                  label: "Pospago",
                  color: "#16a34a",
                  strokeWidth: 3,
                },
                {
                  key: "operativos",
                  label: "Operativos",
                  color: "#f59e0b",
                  strokeWidth: 3,
                }
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