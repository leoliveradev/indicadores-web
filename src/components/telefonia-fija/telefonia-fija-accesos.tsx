'use client';
import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaAccesosRow,
} from "@/lib/telefonia-fija";

import {
  getAccesosKPIItems,
  getAccesosEvolutionData,
  getAccesosInsights,
} from "@/lib/telefonia-fija";

import { KPISection } from "@/components/home/kpi-section";

import type { PeriodFilterValue } from "@/lib/utils/filter-period";
import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "../ui/filters/period-filter";

import { LineChartBase } from "@/components/ui/charts/line-chart-base";

import { InsightsCard } from "../ui/insights/insights-card";

import { dispValue } from "@/lib/format";

type Props = {
  accesos: ApiResponse<TelefoniaFijaAccesosRow>;
};

export function TelefoniaFijaAccesos({
  accesos,
}: Props) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const filteredRows =
    filterByPeriods(
      accesos.data,
      period,
      4
    );

  const kpiItems =
    getAccesosKPIItems(accesos);

  const evolutionData =
    getAccesosEvolutionData({
      ...accesos,
      data: filteredRows,
    });

  const insights =
    getAccesosInsights(
      filteredRows
    );

  return (
    <>
      <KPISection
        title="Accesos de telefonía fija"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución histórica de accesos
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
                  key: "hogares",
                  label: "Hogares",
                  color: "var(--accent-amber)",
                },
                {
                  key: "comercial",
                  label: "Comercial",
                  color: "var(--accent-red)",
                },
                {
                  key: "gobierno",
                  label: "Gobiernos",
                  color: "var(--accent-green)",
                },
                {
                  key: "otros",
                  label: "Otros",
                  color: "var(--blue-500)",
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