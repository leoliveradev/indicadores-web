"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  PortabilidadMovilRow,
} from "@/lib/portabilidad";

import {
  getPortabilidadEvolutionData,
  getPortabilidadInsights,
} from "@/lib/portabilidad";

import type {
  PeriodFilterValue,
} from "@/lib/utils/filter-period";

import {
  filterByPeriods,
} from "@/lib/utils/filter-period";

import {
  PeriodFilter,
} from "@/components/ui/filters/period-filter";

import {
  LineChartBase,
} from "@/components/ui/charts/line-chart-base";

import {
  InsightsCard,
} from "@/components/ui/insights/insights-card";

import {
  dispValue,
} from "@/lib/format";

type Props = {
  data: ApiResponse<PortabilidadMovilRow>;
};

export function PortabilidadEvolucion({
  data,
}: Props) {

  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const filteredRows =
    filterByPeriods(
      data.data,
      period,
      12
    );

  const evolutionData =
    getPortabilidadEvolutionData({
      ...data,
      data: filteredRows,
    });

  const insights =
    getPortabilidadInsights(
      filteredRows
    );

  return (
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
  );
}