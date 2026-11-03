'use client';
import { useMemo, useState } from "react";

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
  const [provincia, setProvincia] =
    useState("Argentina");

  const [period, setPeriod] = useState<
    "all" | "10y" | "5y" | "3y" | "1y"
  >("all");

  const provincias = useMemo(
    () =>
      [
        ...new Set(
          tecnologiasProvincias.data.map(
            r => r.provincia
          )
        ),
      ].sort(),
    [tecnologiasProvincias.data]
  );

  const rows = tecnologias.data;

  if (!rows.length) {
    return <div className="error-box">Sin datos disponibles</div>;
  }

  const isArgentina =
    provincia === "Argentina";

  const currentRows = isArgentina
    ? filterByPeriods(
      tecnologias.data,
      period,
      4
    )
    : filterByPeriods(
      tecnologiasProvincias.data.filter(
        r => r.provincia === provincia
      ),
      period,
      4
    );

  const kpiItems =
    getTecnologiaKPIItems(
      currentRows
    );

  const evolutionData =
    getTecnologiaEvolutionData(
      currentRows
    );

  const insights =
    getTecnologiaInsights(
      currentRows,
      provincia
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
            {provincia === "Argentina"
              ? "Evolución de accesos por tecnología"
              : `Evolución de accesos por tecnología · ${provincia}`}
          </h2>

          <div className="mb-4">
            <label className="filter-label">
              Provincia
            </label>

            <select
              className="filter-select"
              value={provincia}
              onChange={(e) =>
                setProvincia(e.target.value)
              }
            >
              <option value="Argentina">
                Argentina
              </option>

              {provincias.map((p) => (
                <option
                  key={p}
                  value={p}
                >
                  {p}
                </option>
              ))}
            </select>
          </div>

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