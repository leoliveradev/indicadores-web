"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  ComunicacionesMovilesMinutosRow,
} from "@/lib/comunicaciones-moviles";

import {
  getMinutosEvolutionData,
} from "@/lib/comunicaciones-moviles";

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
  getMinutosInsights,
} from "@/lib/comunicaciones-moviles/insights";

import { dispValue } from "@/lib/format";

type Props = {
  minutos: ApiResponse<ComunicacionesMovilesMinutosRow>;
};

export function TraficoMinutos({
  minutos,
}: Props) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const filteredRows =
    filterByPeriods(
      minutos.data,
      period,
      4
    );

  const evolutionData =
    getMinutosEvolutionData({
      ...minutos,
      data: filteredRows,
    });

  const insights =
    getMinutosInsights(
      filteredRows
    );

  return (
    <div className="chart-card">

      <PeriodFilter
        value={period}
        onChange={setPeriod}
      />

      <LineChartBase
        data={evolutionData}
        series={[
          {
            key: "prepago",
            label: "Prepago",
            color: "#2563eb",
            activeDot: true,
          },
          {
            key: "pospago",
            label: "Pospago",
            color: "#16a34a",
            activeDot: true,
          },
          {
            key: "total",
            label: "Total",
            color: "#f59e0b",
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

      <InsightsCard insights={insights} />

    </div>
  );
}