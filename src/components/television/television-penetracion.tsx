"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelevisionPenetracionRow,
  TelevisionPenetracionProvinciaRow,
} from "@/lib/television";

import {
  getPenetracionKPIItems,
  getPenetracionEvolutionData,
  getPenetracionInsights,
} from "@/lib/television";

import { KPISection } from "@/components/home/kpi-section";

import { filterByPeriods, PeriodFilterValue } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

type Props = {
  penetracion: ApiResponse<TelevisionPenetracionRow>;
  provincias: ApiResponse<TelevisionPenetracionProvinciaRow>;
};

export function TelevisionPenetracion({
  penetracion,
}: Props) {

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
        title="Penetración de televisión"
        items={kpiItems}
      />

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de penetración
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
                  key: "suscripcion_hogares",
                  label: "TV Suscripción",
                  color: "var(--accent-green)",
                },
                {
                  key: "satelital_hogares",
                  label: "TV Satelital",
                  color: "var(--accent-amber)",
                },
              ]}
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