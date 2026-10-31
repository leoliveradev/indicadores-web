"use client";
import { useState } from "react";
import { KPISection } from "@/components/home/kpi-section";
import { LineChartBase } from "@/components/ui/charts/line-chart-base";

import type { ApiResponse } from "@/lib/types";
import type {
  InternetPenetracionRow,
  InternetPenetracionProvinciaRow,
} from "@/lib/internet";

import {
  getPenetracionKPIItems,
  getPenetracionEvolutionData,
} from "@/lib/internet";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import {
  getPenetracionInsights,
} from "@/lib/internet/insights";

import { filterByPeriods, PeriodFilterValue } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";
import { PenetracionProvinciaView } from "@/components/internet/provincias/penetracion-provincia-view";

export function InternetPenetracion({
  penetracion,
  penetracionProvincias,
}: {
  penetracion: ApiResponse<InternetPenetracionRow>;
  penetracionProvincias: ApiResponse<InternetPenetracionProvinciaRow>;
}) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const rows = penetracion.data;

  if (!rows.length) {
    return <div className="error-box">Sin datos disponibles</div>;
  }

  const kpiItems = getPenetracionKPIItems(penetracion.data);

  const filteredRows =
    filterByPeriods(
      penetracion.data,
      period,
      4
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
      {/* KPIs */}
      <KPISection
        title="Penetración de Internet"
        items={kpiItems}
      />

      {/* EVOLUCIÓN */}
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
              height={320}
              xDataKey="period"
              series={[
                {
                  key: "hogares",
                  label: "Hogares",
                  color: "var(--blue-300)",
                },
                {
                  key: "habitantes",
                  label: "Habitantes",
                  color: "var(--accent-green)",
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