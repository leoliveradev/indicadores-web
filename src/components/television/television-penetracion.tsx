"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelevisionPenetracionRow,
  TelevisionPenetracionProvinciaRow,
} from "@/lib/television";

import {
  getPenetracionKPIItems,
  getPenetracionEvolutionData,
  getPenetracionInsights,
} from "@/lib/television";

import { KPISection } from "@/components/home/kpi-section";

import { filterByPeriods, PeriodFilterValue } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";
import { useProvinciaSelector } from "@/hooks/use-provincia-selector";
import { ProvinciaFilter } from "../ui/filters/provincia-filter";

type Props = {
  penetracion: ApiResponse<TelevisionPenetracionRow>;
  penetracionProvincias: ApiResponse<TelevisionPenetracionProvinciaRow>;
};

export function TelevisionPenetracion({
  penetracion,
  penetracionProvincias
}: Props) {

  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const {
    provincia,
    setProvincia,
    provincias: provinciaOptions,
    isArgentina,
  } = useProvinciaSelector(
    penetracionProvincias.data
  );

  const currentRows = isArgentina
    ? filterByPeriods(
      penetracion.data,
      period,
      4
    )
    : filterByPeriods(
      penetracionProvincias.data.filter(
        (r) => r.provincia === provincia
      ),
      period,
      4
    );

  const kpiItems =
    getPenetracionKPIItems(
      currentRows
    );

  const evolutionData =
    getPenetracionEvolutionData(
      currentRows
    );

  const insights =
    getPenetracionInsights(
      currentRows,
      provincia
    );

  return (
    <>
      <KPISection
        title="Penetración de televisión"
        items={kpiItems}
      />

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            {isArgentina
              ? "Evolución de penetración"
              : `Evolución de penetración · ${provincia}`}
          </h2>

          <ProvinciaFilter
            value={provincia}
            options={provinciaOptions}
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
                  key: "suscripcion_hogares",
                  label: "TV Suscripción",
                  color: "var(--accent-green)",
                },
                {
                  key: "satelital_hogares",
                  label: "TV Satelital",
                  color: "var(--accent-amber)",
                },
              ]}
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