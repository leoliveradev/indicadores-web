'use client';
import { useMemo, useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaAccesosRow,
  TelefoniaFijaAccesosProvinciaRow,
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
import { ProvinciaFilter } from "../ui/filters/provincia-filter";

type Props = {
  accesos: ApiResponse<TelefoniaFijaAccesosRow>;
  accesosProvincias: ApiResponse<TelefoniaFijaAccesosProvinciaRow>;
};

export function TelefoniaFijaAccesos({
  accesos,
  accesosProvincias,
}: Props) {

  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const [provincia, setProvincia] =
    useState("Argentina");

  const isArgentina =
    provincia === "Argentina";

  const provincias = useMemo(
    () =>
      [
        ...new Set(
          accesosProvincias.data.map(
            r => r.provincia
          )
        ),
      ].sort(),
    [accesosProvincias.data]
  );

  const currentRows = isArgentina
    ? filterByPeriods(
      accesos.data,
      period,
      4
    )
    : filterByPeriods(
      accesosProvincias.data.filter(
        r => r.provincia === provincia
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
        title="Accesos de telefonía fija"
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
              data={evolutionData}
              key={provincia}
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