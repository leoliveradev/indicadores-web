"use client";

import { useState } from "react";


import type { ApiResponse } from "@/lib/types";

import type {
  TelevisionAccesosRow,
  TelevisionAccesosProvinciaRow,
} from "@/lib/television";

import {
  getAccesosKPIItems,
  getAccesosDonutData,
  getAccesosEvolutionData,
  getAccesosInsights,
  getAccesosProvinciaRankingData,
} from "@/lib/television";

import { KPISection } from "@/components/home/kpi-section";

import { DonutChart } from "@/components/ui/charts/donut-chart";


import type { PeriodFilterValue } from "@/lib/utils/filter-period";
import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { LineChartBase } from "@/components/ui/charts/line-chart-base";

import { InsightsCard } from "@/components/ui/insights/insights-card";

import { RankingBarChart } from "@/components/ui/charts/ranking-bar-chart";

import { ProvinciasMap } from "@/components/ui/map/provincias-map";

import { dispValue } from "@/lib/format";

type Props = {
  accesos: ApiResponse<TelevisionAccesosRow>;
  provincias: ApiResponse<TelevisionAccesosProvinciaRow>;
};

export function TelevisionAccesos({
  accesos,
  provincias,
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

  const rankingData =
    getAccesosProvinciaRankingData(provincias);

  const provinciaData =
    provincias.data.map((row) => ({
      provincia: row.provincia,
      total: row.tv_suscripcion,
    }));

  return (
    <>
      <KPISection
        title="Accesos de televisión por suscripción"
        items={kpiItems}
      />

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Composición actual
          </h2>

          <div className="chart-card">
            <DonutChart data={donutData} />
          </div>

        </div>
      </section>

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

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Distribución provincial
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="chart-card">
              <ProvinciasMap
                data={provinciaData}
              />
            </div>

            <div className="chart-card">

              <RankingBarChart
                data={rankingData.map((r) => ({
                  label: r.provincia,
                  value: r.total,
                }))}
              />

            </div>

          </div>

        </div>
      </section>
    </>
  );
}