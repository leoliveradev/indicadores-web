"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalFacturacionRow,
} from "@/lib/mercado-postal";

import {
  getFacturacionKPIItems,
  getFacturacionDonutData,
  getFacturacionEvolutionData,
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

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import {
  getFacturacionInsights,
} from "@/lib/mercado-postal/insights";

import { dispCurrency, dispCurrencyCompact }
  from "@/lib/format";

type Props = {
  facturacion: ApiResponse<MercadoPostalFacturacionRow>;
};

export function MercadoPostalFacturacion({
  facturacion,
}: Props) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const filteredRows =
    filterByPeriods(
      facturacion.data,
      period,
      12
    );

  const kpiItems =
    getFacturacionKPIItems(facturacion);

  const donutData =
    getFacturacionDonutData(facturacion);

  const evolutionData =
    getFacturacionEvolutionData(
      filteredRows
    );

  const insights =
    getFacturacionInsights(
      filteredRows
    );

  return (
    <>
      <KPISection
        title="Facturación"
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
            Evolución histórica de facturación
          </h2>

          <PeriodFilter
            value={period}
            onChange={setPeriod}
          />

          <div className="chart-card">

            <LineChartBase
              data={evolutionData}
              yDomain={[0, "dataMax"]}
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
              yFormatter={(v) =>
                dispCurrencyCompact(v)
              }
              tooltipFormatter={(v) =>
                dispCurrency(v)
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