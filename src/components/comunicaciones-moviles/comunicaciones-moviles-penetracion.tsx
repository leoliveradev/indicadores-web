"use client";

import { useState } from "react";

import { ApiResponse } from "@/lib/types";

import type {
  ComunicacionesMovilesPenetracionRow,
} from "@/lib/comunicaciones-moviles/types";

import {
  getPenetracionKPIItems,
  getPenetracionEvolutionData,
} from "@/lib/comunicaciones-moviles";

import { KPISection } from "@/components/home/kpi-section";

import type {
  PeriodFilterValue,
} from "@/lib/utils/filter-period";

import {
  filterByPeriods,
} from "@/lib/utils/filter-period";

import {
  PeriodFilter,
} from "@/components/ui/filters/period-filter";

import { LineChartBase } from "@/components/ui/charts/line-chart-base";

import {
  getPenetracionInsights,
} from "@/lib/comunicaciones-moviles/insights";

import {
  InsightsCard,
} from "@/components/ui/insights/insights-card";

export function ComunicacionesMovilesPenetracion({
  penetracion,
}: {
  penetracion: ApiResponse<ComunicacionesMovilesPenetracionRow>;
}) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const filteredRows =
    filterByPeriods(
      penetracion.data,
      period,
      4
    );

  const kpiItems =
    getPenetracionKPIItems(
      penetracion
    );

  const evolutionData =
    getPenetracionEvolutionData(
      filteredRows
    );

  const insights =
    getPenetracionInsights(
      filteredRows
    );

  return (
    <>
      <KPISection
        title="Penetración móvil"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de la penetración móvil
          </h2>

          <PeriodFilter
            value={period}
            onChange={setPeriod}
          />

          <div className="chart-card">
            <LineChartBase
              data={evolutionData}
              height={400}
              series={[
                {
                  key: "accesos",
                  label: "Accesos cada 100 habitantes",
                  color: "#2563eb",
                  strokeWidth: 3,
                },
              ]}
              tooltipFormatter={(v) =>
                `${v.toFixed(2)}`
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