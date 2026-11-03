"use client";
import { useMemo, useState } from "react";
import { KPISection } from "@/components/home/kpi-section";
import { LineChartBase } from "@/components/ui/charts/line-chart-base";

import type { ApiResponse } from "@/lib/types";
import type {
  InternetPenetracionProvinciaRow,
  InternetPenetracionRow
} from "@/lib/internet";

import {
  getPenetracionKPIItems,
  getPenetracionEvolutionData,
} from "@/lib/internet";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import {
  getPenetracionInsights,
} from "@/lib/internet/insights";

import { filterByPeriods, PeriodFilterValue } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";
import { ProvinciaFilter } from "../ui/filters/provincia-filter";

export function InternetPenetracion({
  penetracion,
  penetracionProvincias,
}: {
  penetracion: ApiResponse<InternetPenetracionRow>;
  penetracionProvincias: ApiResponse<InternetPenetracionProvinciaRow>;
}) {
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
            (r) => r.provincia
          )
        ),
      ].sort(),
    [penetracionProvincias.data]
  );

  const rows = penetracion.data;

  if (!rows.length) {
    return <div className="error-box">Sin datos disponibles</div>;
  }

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
      {/* KPIs */}
      <KPISection
        title="Penetración de Internet"
        items={kpiItems}
      />

      {/* EVOLUCIÓN */}
      <section className="section-wrap alt">
        <div className="section-inner">
          <h2 className="section-heading">
            {provincia === "Argentina"
              ? "Evolución de penetración"
              : `Evolución de penetración · ${provincia}`}
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
              height={320}
              xDataKey="period"
              series={[
                {
                  key: "hogares",
                  label: "Hogares",
                  color: "var(--blue-300)",
                },
                {
                  key: "habitantes",
                  label: "Habitantes",
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