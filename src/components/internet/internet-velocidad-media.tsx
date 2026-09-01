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
  getVelocidadProvinciaRankingData,
  getVelocidadInsights
} from "@/lib/internet";

import { KPISection } from "@/components/home/kpi-section";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";
import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { ProvinciasMap } from "@/components/ui/map/provincias-map";
import { RankingBarChart } from "@/components/ui/charts/ranking-bar-chart";

export function InternetVelocidadMedia({ velocidadMedia, provincias }: {
  velocidadMedia: ApiResponse<InternetVelocidadMediaRow>,
  provincias: ApiResponse<InternetVelocidadMediaProvinciasRow>,
}) {

  const kpiItems = getVelocidadKPIItems(velocidadMedia);

  const [period, setPeriod] = useState<
    "all" | "10y" | "5y" | "3y" | "1y"
  >("all");

  const filteredRows =
    filterByPeriods(
      velocidadMedia.data,
      period,
      4
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

      tooltipData: [
        {
          label: "Velocidad media",
          value: `${d.mbps.toFixed(1)} Mbps`,
          color: "#005297",
        },
      ],
    }));


  return (
    <>
      {/* KPIs */}
      <KPISection
        title="Velocidad media de descarga"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución histórica de la velocidad media
          </h2>

          <PeriodFilter
            value={period}
            onChange={setPeriod}
          />

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
                  activeDot: true
                },
              ]}
              tooltipFormatter={(v) =>
                `${v.toFixed(2)} Mbps`
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