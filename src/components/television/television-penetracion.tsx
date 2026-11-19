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
  getPenetracionProvinciaEvolutionData,
  getPenetracionProvinciaInsights,
  getPenetracionProvinciaKPIItems,
} from "@/lib/television";

import { KPISection } from "@/components/home/kpi-section";

import { filterByPeriods, PeriodFilterValue } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import { GeoFilter } from "@/components/ui/filters/geo-filter";
import { useProvinciaSelector } from "@/hooks/use-provincia-selector";

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
    provincias,
    isArgentina,
  } = useProvinciaSelector(
    penetracionProvincias.data
  );

  const nationalRows = filterByPeriods(
    penetracion.data,
    period,
    4
  );

  const provincialRows = filterByPeriods(
    penetracionProvincias.data.filter(
      (r) => r.provincia === provincia
    ),
    period,
    4
  );

  const kpiItems = isArgentina
    ? getPenetracionKPIItems(nationalRows)
    : getPenetracionProvinciaKPIItems(provincialRows);

  const evolutionData = isArgentina
    ? getPenetracionEvolutionData(nationalRows)
    : getPenetracionProvinciaEvolutionData(provincialRows);

  const insights = isArgentina
    ? getPenetracionInsights(nationalRows)
    : getPenetracionProvinciaInsights(
      provincialRows,
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

          <GeoFilter
            label="Provincia"
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
              series={
                isArgentina
                  ? [
                    {
                      key: "suscripcion_hogares",
                      label: "TV por suscripción",
                      color: "var(--accent-green)",
                      strokeWidth: 3,
                      activeDot: true,
                    },
                    {
                      key: "satelital_hogares",
                      label: "TV satelital",
                      color: "var(--accent-amber)",
                      strokeWidth: 2,
                      activeDot: true,
                    },
                  ]
                  : [
                    {
                      key: "suscripcion_hogares",
                      label: "TV por suscripción",
                      color: "var(--accent-green)",
                      strokeWidth: 3,
                      activeDot: true,
                    }
                  ]
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