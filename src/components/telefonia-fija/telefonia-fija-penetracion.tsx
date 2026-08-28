"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaPenetracionRow,
  TelefoniaFijaPenetracionProvinciaRow,
} from "@/lib/telefonia-fija";

import {
  getPenetracionKPIItems,
  getPenetracionEvolutionData,
  getPenetracionInsights,
  getPenetracionProvinciaRankingData,
} from "@/lib/telefonia-fija";

import { KPISection } from "@/components/home/kpi-section";

import { filterByPeriods, PeriodFilterValue } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";
import { RankingComparisonBarChart }
  from "@/components/ui/charts/ranking-comparison-bar-chart";
import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

type Props = {
  penetracion: ApiResponse<TelefoniaFijaPenetracionRow>;
  provincias: ApiResponse<TelefoniaFijaPenetracionProvinciaRow>;
};

export function TelefoniaFijaPenetracion({
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

  const provinciaData = provincias.data.map((d) => ({
    provincia: d.provincia,

    // Escala del mapa
    total: d.accesos_100_hog,

    // Tooltip
    hogares: d.accesos_100_hog,
    habitantes: d.accesos_100_hab,
  }));

  return (
    <>
      <KPISection
        title="Penetración de telefonía fija"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de la penetración
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
                  key: "hogares",
                  label: "Accesos cada 100 hogares",
                  color: "#005297",
                  strokeWidth: 3,
                },
                {
                  key: "habitantes",
                  label: "Accesos cada 100 habitantes",
                  color: "#22c55e",
                },
              ]}
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