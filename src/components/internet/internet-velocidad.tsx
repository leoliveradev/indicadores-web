'use client';
import { useState } from "react";

import type { ApiResponse } from "@/lib/types";
import type {
  InternetVelocidadMediaProvinciasRow,
  InternetVelocidadMediaRow,
} from "@/lib/internet";

import {
  getVelocidadEvolutionData,
  getVelocidadKPIItems,
  getVelocidadProvinciaRankingData
} from "@/lib/internet";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { KPISection } from "@/components/home/kpi-section";
import { RankingBarChart } from "@/components/ui/charts/ranking-bar-chart";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import {
  getVelocidadInsights,
} from "@/lib/internet/insights";

import { ProvinciasMap } from "@/components/ui/map/provincias-map";

import { filterByYears } from "@/lib/utils/filter-period";
import { PeriodFilter } from "../ui/filters/period-filter";

export function InternetVelocidad({ velocidadMedia, provincias }: {
  velocidadMedia: ApiResponse<InternetVelocidadMediaRow>,
  provincias: ApiResponse<InternetVelocidadMediaProvinciasRow>,
}) {

  const [period, setPeriod] = useState<
    "all" | "10y" | "5y" | "3y" | "1y"
  >("all");

  const kpiItems = getVelocidadKPIItems(velocidadMedia);

  const filteredRows =
    filterByYears(
      velocidadMedia.data,
      period
    );

  const evolutionData =
    getVelocidadEvolutionData({
      ...velocidadMedia,
      data: filteredRows,
    });

  const rankingData =
    getVelocidadProvinciaRankingData(provincias);
  const top = rankingData[0];

  const insights =
    getVelocidadInsights(
      filteredRows,
    );

  const provinciaData =
    provincias.data.map((d) => ({
      provincia: d.provincia,
      total: d.mbps,
      velocidad: d.mbps,
    }));


  return (
    <>
      <section className="section-wrap">
        <div className="section-inner">
          {/* KPIs */}
          <KPISection
            title="Velocidad media de descarga"
            items={kpiItems}
          />
        </div>
      </section>

      <PeriodFilter
        value={period}
        onChange={setPeriod}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución histórica de la velocidad media
          </h2>

          <div className="chart-card">
            <LineChartBase
              data={evolutionData}
              height={350}
              series={[
                {
                  key: "mbps",
                  label: "Velocidad media",
                  color: "var(--blue-200)",
                  strokeWidth: 3,
                  activeDot: true,
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
              <RankingBarChart
                data={rankingData.map((r) => ({
                  label: r.provincia,
                  value: r.mbps,
                }))}
                tooltipLabel="Velocidad media"
                formatter={(v) =>
                  `${v.toFixed(1)} Mbps`
                }
              />
            </div>

          </div>
          <p className="chart-description">
            La provincia con mayor velocidad media es{" "}
            <strong>{top.provincia}</strong>
            con{" "}
            <strong>{top.mbps.toFixed(1)} Mbps</strong>.
          </p>
        </div>
      </section>
    </>
  );
}