"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalPersonalRow,
} from "@/lib/mercado-postal";

import {
  getPersonalKPIItems,
  getPersonalEvolutionData,
} from "@/lib/mercado-postal";

import { KPISection } from "@/components/home/kpi-section";


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
  getPersonalInsights,
} from "@/lib/mercado-postal/insights";

import { dispValue }
  from "@/lib/format";

type Props = {
  personal: ApiResponse<MercadoPostalPersonalRow>;
};

export function MercadoPostalPersonal({
  personal,
}: Props) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const filteredRows =
    filterByPeriods(
      personal.data,
      period,
      12
    );

  const kpiItems =
    getPersonalKPIItems(personal);

  const evolutionData =
    getPersonalEvolutionData(
      filteredRows
    );

  const insights =
    getPersonalInsights(
      filteredRows
    );

  return (
    <>
      <KPISection
        title="Personal ocupado"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución del empleo
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
                  key: "personal_ocupado",
                  label: "Personal ocupado",
                  color: "#005297",
                  strokeWidth: 3,
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
    </>
  );
}