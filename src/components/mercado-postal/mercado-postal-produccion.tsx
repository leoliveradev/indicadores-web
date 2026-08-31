"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalProduccionRow,
} from "@/lib/mercado-postal";

import {
  getProduccionKPIItems,
  getProduccionDonutData,
  getProduccionEvolutionData,
  getProduccionInsights
} from "@/lib/mercado-postal";

import { KPISection } from "@/components/home/kpi-section";

import { DonutChart }
  from "@/components/ui/charts/donut-chart";

import type {
  PeriodFilterValue,
} from "@/lib/utils/filter-period";

import {
  filterByPeriods,
} from "@/lib/utils/filter-period";

import {
  PeriodFilter,
} from "@/components/ui/filters/period-filter";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { InsightsCard } from "../ui/insights/insights-card";

import { dispValue }
  from "@/lib/format";

type Props = {
  produccion: ApiResponse<MercadoPostalProduccionRow>;
};

export function MercadoPostalProduccion({
  produccion,
}: Props) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const filteredRows =
    filterByPeriods(
      produccion.data,
      period,
      12
    );

  const kpiItems =
    getProduccionKPIItems(produccion);

  const donutData =
    getProduccionDonutData(produccion);

  const evolutionData =
    getProduccionEvolutionData(
      filteredRows
    );

  const insights =
    getProduccionInsights(
      filteredRows
    )

  return (
    <>
      <KPISection
        title="Producción"
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
            Evolución histórica de producción
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
                  key: "postales",
                  label: "Postales",
                  color: "var(--blue-300)",
                  strokeWidth: 3,
                },
                {
                  key: "telegraficas",
                  label: "Telegráficas",
                  color: "var(--accent-green)",
                },
                {
                  key: "monetarios",
                  label: "Monetarios",
                  color: "var(--accent-amber)",
                },
              ]}
              tooltipFormatter={(v) =>
                v.toLocaleString("es-AR")
              }
              yFormatter={(v) =>
                dispValue(v, {
                  format: "compact",
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