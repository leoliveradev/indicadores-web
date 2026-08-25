"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  ComunicacionesMovilesSmsRow,
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
  getSmsEvolutionData,
} from "@/lib/comunicaciones-moviles";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

  
import {
  InsightsCard,
} from "@/components/ui/insights/insights-card";

import {
  getSmsInsights,
} from "@/lib/comunicaciones-moviles/insights";

import {
  dispValue,
  fmtNumber,
} from "@/lib/format";

type Props = {
  sms: ApiResponse<ComunicacionesMovilesSmsRow>;
};

export function TraficoSms({
  sms,
}: Props) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const filteredRows =
    filterByPeriods(
      sms.data,
      period,
      4
    );

  const evolutionData =
    getSmsEvolutionData({
      ...sms,
      data: filteredRows,
    });

  const insights =
    getSmsInsights(
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
            key: "sms",
            label: "SMS",
            color: "#dc2626",
            strokeWidth: 3,
            activeDot: true
          },
        ]}
        yFormatter={(v) =>
          dispValue(v, {
            format: "compact",
          })
        }
        tooltipFormatter={(v) =>
          fmtNumber(v)
        }
      />
      <InsightsCard insights={insights} />
    </div>
  );
}