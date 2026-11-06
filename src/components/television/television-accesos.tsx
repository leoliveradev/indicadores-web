"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelevisionAccesosRow,
  TelevisionAccesosProvinciaRow,
} from "@/lib/television";

import {
  getAccesosKPIItems,
  getAccesosEvolutionData,
  getAccesosInsights,
} from "@/lib/television";

import { KPISection } from "@/components/home/kpi-section";

import type { PeriodFilterValue } from "@/lib/utils/filter-period";
import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { LineChartBase } from "@/components/ui/charts/line-chart-base";

import { InsightsCard } from "@/components/ui/insights/insights-card";

import { dispValue } from "@/lib/format";
import { ProvinciaFilter } from "../ui/filters/provincia-filter";
import { useProvinciaSelector } from "@/hooks/use-provincia-selector";

type Props = {
  accesos: ApiResponse<TelevisionAccesosRow>;
  accesosProvincias: ApiResponse<TelevisionAccesosProvinciaRow>;
};

export function TelevisionAccesos({
  accesos,
  accesosProvincias,
}: Props) {

  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const {
    provincia,
    setProvincia,
    provincias,
    isArgentina,
  } = useProvinciaSelector(
    accesosProvincias.data
  );

  const currentRows = isArgentina
    ? filterByPeriods(
      accesos.data,
      period,
      4
    )
    : filterByPeriods(
      accesosProvincias.data.filter(
        (r) => r.provincia === provincia
      ),
      period,
      4
    );

  const kpiItems =
    getAccesosKPIItems(
      currentRows
    );

  const evolutionData =
    getAccesosEvolutionData(
      currentRows
    );

  const insights =
    getAccesosInsights(
      currentRows,
      provincia
    );

  return (
    <>
      <KPISection
        title="Accesos de televisión por suscripción"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            {isArgentina
              ? "Evolución histórica de accesos"
              : `Evolución histórica de accesos · ${provincia}`}
          </h2>

          <ProvinciaFilter
            value={provincia}
            options={provincias}
            onChange={setProvincia}
          />

          <PeriodFilter
            value={period}
            onChange={setPeriod}
          />

          <div className="chart-card">

            <LineChartBase
              key={provincia}
              data={evolutionData}
              series={[
                {
                  key: "tv_suscripcion",
                  label: "TV por suscripción",
                  color: "var(--accent-green)",
                  strokeWidth: 3,
                  activeDot: true,
                },
                {
                  key: "tv_satelital",
                  label: "TV satelital",
                  color: "var(--accent-amber)",
                  strokeWidth: 2,
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

    </>
  );
}