"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalProduccionRow,
  MercadoPostalProvinciaRow,
} from "@/lib/mercado-postal";

import {
  getProduccionKPIItems,
  getProduccionEvolutionData,
  getProduccionInsights,
  getProduccionProvinciaKPIItems,
  getProduccionProvinciaEvolutionData,
  getProduccionProvinciaInsights
} from "@/lib/mercado-postal";

import { KPISection } from "@/components/home/kpi-section";

import type {
  PeriodFilterValue,
} from "@/lib/utils/filter-period";

import {
  filterByPeriods,
} from "@/lib/utils/filter-period";

import {
  PeriodFilter,
} from "@/components/ui/filters/period-filter";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { InsightsCard } from "../ui/insights/insights-card";

import { dispValue }
  from "@/lib/format";
import { useProvinciaSelector } from "@/hooks/use-provincia-selector";
import { ProvinciaFilter } from "../ui/filters/provincia-filter";

type Props = {
  produccion: ApiResponse<MercadoPostalProduccionRow>;
  produccionProvincias: ApiResponse<MercadoPostalProvinciaRow>;
};

export function MercadoPostalProduccion({
  produccion,
  produccionProvincias,
}: Props) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const {
    provincia,
    setProvincia,
    provincias,
    isArgentina,
  } = useProvinciaSelector(
    produccionProvincias.data
  );

  const nationalRows = filterByPeriods(
    produccion.data,
    period,
    12
  );

  const provincialRows = filterByPeriods(
    produccionProvincias.data.filter(
      (r) => r.provincia === provincia
    ),
    period,
    4
  );

  const kpiItems = isArgentina
    ? getProduccionKPIItems(nationalRows)
    : getProduccionProvinciaKPIItems(provincialRows);

  const evolutionData = isArgentina
    ? getProduccionEvolutionData(nationalRows)
    : getProduccionProvinciaEvolutionData(provincialRows);

  const insights = isArgentina
    ? getProduccionInsights(nationalRows)
    : getProduccionProvinciaInsights(provincialRows, provincia);

  return (
    <>
      <KPISection
        title="Producción"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            {isArgentina
              ? "Evolución histórica de producción"
              : `Evolución histórica de producción · ${provincia}`}
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
              series={
                isArgentina
                  ? [
                    {
                      key: "postales",
                      label: "Postales",
                      color: "var(--blue-300)",
                    },
                    {
                      key: "telegraficas",
                      label: "Telegráficas",
                      color: "var(--accent-green)",
                    },
                    {
                      key: "monetarios",
                      label: "Monetarios",
                      color: "var(--accent-amber)",
                    },
                  ]
                  : [
                    {
                      key: "unidades",
                      label: "Producción",
                      color: "var(--blue-300)",
                      strokeWidth: 3,
                    },
                  ]
              }
              tooltipFormatter={(v) =>
                v.toLocaleString("es-AR")
              }
              yFormatter={(v) =>
                dispValue(v, {
                  format: "compact",
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