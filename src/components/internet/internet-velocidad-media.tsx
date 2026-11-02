'use client';
import { useState } from "react";

import type { ApiResponse } from "@/lib/types";
import type { InternetVelocidadMediaRow } from "@/lib/internet";

import {
  getVelocidadEvolutionData,
  getVelocidadKPIItems,
  getVelocidadInsights
} from "@/lib/internet";

import { KPISection } from "@/components/home/kpi-section";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";
import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { dispValue } from "@/lib/format";

export function InternetVelocidadMedia({ velocidadMedia }: {
  velocidadMedia: ApiResponse<InternetVelocidadMediaRow>,
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

  const insights =
    getVelocidadInsights(
      filteredRows,
    );


  return (
    <>
      {/* KPIs */}
      <KPISection
        title="Velocidad media de descarga"
        items={kpiItems}
      />

      {/* EVOLUCIÓN */}
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
                dispValue(v, {
                  format: "number",
                  decimals: 2,
                  suffix: " Mbps",
                })
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