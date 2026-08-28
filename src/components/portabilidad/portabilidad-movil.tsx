"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  PortabilidadMovilRow,
} from "@/lib/portabilidad";

import {
  // getPortabilidadKPIItems,
  getPortabilidadEvolutionData,
  getPortabilidadInsights,
  getPortabilidadSeasonalityInsights
} from "@/lib/portabilidad";

// import { KPISection } from "@/components/home/kpi-section";

import type { PeriodFilterValue } from "@/lib/utils/filter-period";
import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import {
  InsightsCard,
} from "@/components/ui/insights/insights-card";

import { BarChartBase }
  from "@/components/ui/charts/bar-chart-base";

import {
  getPortabilidadSeasonalityData,
} from "@/lib/portabilidad/seasonality";

import { dispValue }
  from "@/lib/format";
import { filterSeasonalityData, SeasonalityPeriodValue } from "@/lib/utils/seasonality-period";
import { SeasonalityFilter } from "../ui/filters/seasonality-filter";

type Props = {
  data: ApiResponse<PortabilidadMovilRow>;
};

export function PortabilidadMovil({
  data,
}: Props) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const [seasonalityPeriod, setSeasonalityPeriod,] =
    useState<SeasonalityPeriodValue>(
      "all"
    );

  const filteredRows =
    filterByPeriods(
      data.data,
      period,
      12
    );

  // const kpiItems =
  //   getPortabilidadKPIItems(data);

  const evolutionData =
    getPortabilidadEvolutionData({
      ...data,
      data: filteredRows,
    });

  const insights =
    getPortabilidadInsights(
      filteredRows
    );

  const seasonalityRows =
    filterSeasonalityData(
      data.data,
      seasonalityPeriod
    );

  const seasonalityData =
    getPortabilidadSeasonalityData(
      seasonalityRows
    );

  const seasonalityInsights =
    getPortabilidadSeasonalityInsights(
      seasonalityData
    );

  return (
    <>
      {/* <KPISection
        title="Portabilidad numérica móvil"
        items={kpiItems}
      /> */}

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución histórica
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
                  key: "total",
                  label: "Portaciones",
                  color: "#003667",
                  strokeWidth: 3,
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
            Estacionalidad mensual
          </h2>

          <SeasonalityFilter
            value={seasonalityPeriod}
            onChange={setSeasonalityPeriod}
          />

          <div className="chart-card">

            <BarChartBase
              data={seasonalityData}
              dataKey="promedio"
              label="Promedio"
              color="var(--blue-400)"
              xDataKey="mesCompleto"
              yFormatter={(v) =>
                dispValue(v, {
                  format: "compact",
                })
              }
              tooltipFormatter={(v) =>
                v.toLocaleString("es-AR", {
                  maximumFractionDigits: 0,
                })
              }
            />

          </div>

          <InsightsCard
            insights={seasonalityInsights}
          />

        </div>
      </section>

    </>
  );
}