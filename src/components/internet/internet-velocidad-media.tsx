'use client';
import { useMemo, useState } from "react";

import type { ApiResponse } from "@/lib/types";
import type {
  InternetVelocidadMediaRow,
  InternetVelocidadMediaProvinciasRow
} from "@/lib/internet";

import {
  getVelocidadEvolutionData,
  getVelocidadKPIItems,
  getVelocidadInsights
} from "@/lib/internet";

import { KPISection } from "@/components/home/kpi-section";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";
import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { dispValue } from "@/lib/format";
import { ProvinciaFilter } from "../ui/filters/provincia-filter";

export function InternetVelocidadMedia({
  velocidadMedia,
  velocidadMediaProvincias
}: {
  velocidadMedia: ApiResponse<InternetVelocidadMediaRow>,
  velocidadMediaProvincias: ApiResponse<InternetVelocidadMediaProvinciasRow>
}) {

  const [period, setPeriod] = useState<
    "all" | "10y" | "5y" | "3y" | "1y"
  >("all");

  const [provincia, setProvincia] =
    useState("Argentina");

  const isArgentina =
    provincia === "Argentina";

  const provincias = useMemo(
    () =>
      [
        ...new Set(
          velocidadMediaProvincias.data.map(
            (r) => r.provincia
          )
        ),
      ].sort(),
    [velocidadMediaProvincias.data]
  );

  const rows = velocidadMedia.data;

  if (!rows.length) {
    return (
      <div className="error-box">
        Sin datos disponibles
      </div>
    );
  }

  const currentRows = isArgentina
    ? filterByPeriods(
      velocidadMedia.data,
      period,
      4
    )
    : filterByPeriods(
      velocidadMediaProvincias.data.filter(
        r => r.provincia === provincia
      ),
      period,
      4
    );

  const kpiItems =
    getVelocidadKPIItems(
      currentRows
    );

  const evolutionData =
    getVelocidadEvolutionData(
      currentRows
    );

  const insights =
    getVelocidadInsights(
      currentRows,
      provincia
    );

  console.log(
    velocidadMedia.data[0]
  );


  return (
    <>
      {/* KPIs */}
      <KPISection
        title="Velocidad media de descarga"
        items={kpiItems}
      />

      {/* EVOLUCIÓN */}
      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            {provincia === "Argentina"
              ? "Evolución histórica de la velocidad media"
              : `Evolución histórica de la velocidad media · ${provincia}`}
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
              height={350}
              series={[
                {
                  key: "mbps",
                  label: "Velocidad media",
                  color: "var(--blue-200)",
                  strokeWidth: 3,
                  activeDot: true
                },
              ]}
              tooltipFormatter={(v) =>
                dispValue(v, {
                  format: "number",
                  decimals: 2,
                  suffix: " Mbps",
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