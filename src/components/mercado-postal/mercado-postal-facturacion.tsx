"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalFacturacionRow,
  MercadoPostalProvinciaRow,
} from "@/lib/mercado-postal";

import {
  getFacturacionKPIItems,
  getFacturacionEvolutionData,
  getFacturacionProvinciaKPIItems,
  getFacturacionProvinciaEvolutionData,
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

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import {
  getFacturacionInsights,
  getFacturacionProvinciaInsights,
} from "@/lib/mercado-postal/insights";

import {
  dispCurrency,
  dispCurrencyCompact
} from "@/lib/format";
import { useProvinciaSelector } from "@/hooks/use-provincia-selector";
import { ProvinciaFilter } from "../ui/filters/provincia-filter";

type Props = {
  facturacion: ApiResponse<MercadoPostalFacturacionRow>;
  facturacionProvincias: ApiResponse<MercadoPostalProvinciaRow>;
};

export function MercadoPostalFacturacion({
  facturacion,
  facturacionProvincias,
}: Props) {
  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const {
    provincia,
    setProvincia,
    provincias,
    isArgentina,
  } = useProvinciaSelector(
    facturacionProvincias.data
  );

  const nationalRows = filterByPeriods(
    facturacion.data,
    period,
    12
  );

  const provincialRows = filterByPeriods(
    facturacionProvincias.data.filter(
      (r) => r.provincia === provincia
    ),
    period,
    4
  );

  const kpiItems = isArgentina
    ? getFacturacionKPIItems(nationalRows)
    : getFacturacionProvinciaKPIItems(provincialRows);

  const evolutionData = isArgentina
    ? getFacturacionEvolutionData(nationalRows)
    : getFacturacionProvinciaEvolutionData(provincialRows);

  const insights = isArgentina
    ? getFacturacionInsights(nationalRows)
    : getFacturacionProvinciaInsights(provincialRows, provincia);

  return (
    <>
      <KPISection
        title="Facturación"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            {isArgentina
              ? "Evolución histórica de facturación"
              : `Evolución histórica de facturación · ${provincia}`}
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
              yDomain={[0, "dataMax"]}
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
                      key: "pesos",
                      label: "Facturación",
                      color: "var(--blue-300)",
                      strokeWidth: 3,
                    },
                  ]
              }
              yFormatter={(v) =>
                dispCurrencyCompact(v)
              }
              tooltipFormatter={(v) =>
                dispCurrency(v)
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