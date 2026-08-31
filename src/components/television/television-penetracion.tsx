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
  getPenetracionProvinciaRankingData,
  getPenetracionInsights,
} from "@/lib/television";

import { KPISection } from "@/components/home/kpi-section";

import { filterByPeriods, PeriodFilterValue } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import { RankingComparisonBarChart }
  from "@/components/ui/charts/ranking-comparison-bar-chart";

import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

type Props = {
  penetracion: ApiResponse<TelevisionPenetracionRow>;
  provincias: ApiResponse<TelevisionPenetracionProvinciaRow>;
};

export function TelevisionPenetracion({
  penetracion,
  provincias,
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

  const rankingData =
    getPenetracionProvinciaRankingData(
      provincias
    );

  const provinciaData =
    provincias.data.map((d) => ({
      provincia: d.provincia,
      total: d.tv_suscripcion_100hogares,

      tooltipData: [
        {
          label: "Hogares",
          value: d.tv_suscripcion_100hogares.toFixed(2),
          color: "var(--accent-green)",
        },
        {
          label: "Habitantes",
          value: d.tv_suscripcion_100habitantes.toFixed(2),
          color: "var(--accent-amber)",
        },
      ],
    }));

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

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Penetración por provincia
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="chart-card">
              <ProvinciasMap
                data={provinciaData}
              />
            </div>

            <div className="chart-card">

              <RankingComparisonBarChart
                data={rankingData.map((r) => ({
                  label: r.provincia,
                  primary: r.hogares,
                  secondary: r.habitantes,
                }))}
                primaryLabel="Hogares"
                secondaryLabel="Habitantes"
              />

            </div>

          </div>

        </div>
      </section>
    </>
  );
}