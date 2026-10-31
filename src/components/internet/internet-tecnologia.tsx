'use client';
import { useState } from "react";

import type { ApiResponse } from "@/lib/types";
import type {
  InternetTecnologiaRow,
  InternetTecnologiaProvinciaRow
} from "@/lib/internet";

import { KPISection } from "@/components/home/kpi-section";
import {
  getTecnologiaKPIItems,
  getTecnologiaEvolutionData,
  getTecnologiaInsights
} from "@/lib/internet";

import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";
import { LineChartBase } from "@/components/ui/charts/line-chart-base";

import { InsightsCard } from "@/components/ui/insights/insights-card";

import { dispValue } from "@/lib/format";

export function InternetTecnologia({
  tecnologias,
  tecnologiasProvincias
}: {
  tecnologias: ApiResponse<InternetTecnologiaRow>;
  tecnologiasProvincias: ApiResponse<InternetTecnologiaProvinciaRow>;
}) {
  const [period, setPeriod] = useState<
    "all" | "10y" | "5y" | "3y" | "1y"
  >("all");

  const rows = tecnologias.data;

  if (!rows.length) {
    return <div className="error-box">Sin datos disponibles</div>;
  }

  const kpiItems = getTecnologiaKPIItems(tecnologias);

  const filteredRows =
    filterByPeriods(
      tecnologias.data,
      period,
      4
    );

  const evolutionData =
    getTecnologiaEvolutionData({
      ...tecnologias,
      data: filteredRows,
    });

  const insights =
    getTecnologiaInsights(
      filteredRows
    );

  return (
    <>
      {/* KPIs */}
      <KPISection
        title="Accesos por tecnología"
        items={kpiItems}
      />

      {/* EVOLUCIÓN */}
      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de accesos por tecnología
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
                  key: "fibra_optica",
                  label: "Fibra óptica",
                  color: "var(--accent-green)",
                  strokeWidth: 3,
                  activeDot: true
                },
                {
                  key: "cablemodem",
                  label: "Cablemódem",
                  color: "var(--blue-400)",
                  strokeWidth: 3,
                  activeDot: true
                },
                {
                  key: "adsl",
                  label: "ADSL",
                  color: "var(--blue-200)",
                  strokeDasharray: "4 2",
                  activeDot: true
                },
                {
                  key: "wireless",
                  label: "Wireless",
                  color: "var(--accent-amber)",
                  strokeWidth: 3,
                  activeDot: true
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

          <InsightsCard insights={insights} />
        </div>
      </section>

    </>
  );
}