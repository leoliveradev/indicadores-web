"use client";
import { useState } from "react";
import { KPISection } from "@/components/home/kpi-section";
import { LineChartBase } from "@/components/ui/charts/line-chart-base";
import { ProvinciasMap } from "@/components/ui/map/provincias-map";

import type { ApiResponse } from "@/lib/types";
import type {
  InternetPenetracionRow,
  InternetPenetracionProvinciaRow,
} from "@/lib/internet";

import {
  getPenetracionKPIItems,
  getPenetracionEvolutionData,
  getPenetracionProvinciaRankingData
} from "@/lib/internet";

import { RankingComparisonBarChart } from "@/components/ui/charts/ranking-comparison-bar-chart";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import {
  getPenetracionInsights,
} from "@/lib/internet/insights";
import { filterByPeriods, PeriodFilterValue } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

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

  const rankingData = getPenetracionProvinciaRankingData(penetracionProvincias);

  const provinciaData = penetracionProvincias.data.map((d) => ({
    provincia: d.provincia,
    total: d.accesos_cada_100_hogares,
    hogares: d.accesos_cada_100_hogares,
    habitantes: d.accesos_cada_100_habitantes,
  }));

  const top = provinciaData.reduce((a, b) =>
    b.hogares > a.hogares ? b : a
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

      {/* PROVINCIAS */}
      <section className="section-wrap alt">
        <div className="section-inner">
          <h2 className="section-heading">
            Penetración por provincia
          </h2>

          <p className="chart-description">
            La mayor penetración es{" "}
            <strong>{top.provincia}</strong> ({top.hogares} accesos cada 100 hogares).
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="chart-card">
              <ProvinciasMap data={provinciaData} />
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
                primaryColor="var(--blue-200)"
                secondaryColor="var(--accent-green)"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}