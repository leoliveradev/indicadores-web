"use client";

import { useMemo, useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaPenetracionRow,
  TelefoniaFijaPenetracionProvinciaRow,
} from "@/lib/telefonia-fija";

import {
  getPenetracionKPIItems,
  getPenetracionEvolutionData,
  getPenetracionInsights,
} from "@/lib/telefonia-fija";

import { KPISection } from "@/components/home/kpi-section";

import { filterByPeriods, PeriodFilterValue } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";
import { ProvinciaFilter } from "../ui/filters/provincia-filter";

type Props = {
  penetracion: ApiResponse<TelefoniaFijaPenetracionRow>;
  penetracionProvincias: ApiResponse<TelefoniaFijaPenetracionProvinciaRow>;
};

export function TelefoniaFijaPenetracion({
  penetracion,
  penetracionProvincias,
}: Props) {

  const [provincia, setProvincia] =
    useState("Argentina");

  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const isArgentina =
    provincia === "Argentina";

  const provincias = useMemo(
    () =>
      [
        ...new Set(
          penetracionProvincias.data.map(
            r => r.provincia
          )
        ),
      ].sort(),
    [penetracionProvincias.data]
  );

  const currentRows = isArgentina
    ? filterByPeriods(
      penetracion.data,
      period,
      4
    )
    : filterByPeriods(
      penetracionProvincias.data.filter(
        r => r.provincia === provincia
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
        title="Penetración de telefonía fija"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            {isArgentina
              ? "Evolución de la penetración"
              : `Evolución de la penetración · ${provincia}`}
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
                  key: "hogares",
                  label: "Accesos cada 100 hogares",
                  color: "var(--blue-500)",
                  strokeWidth: 3,
                },
                {
                  key: "habitantes",
                  label: "Accesos cada 100 habitantes",
                  color: "var(--accent-green)",
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