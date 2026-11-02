"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  PortabilidadMovilRow,
} from "@/lib/portabilidad";

import {
  getPortabilidadSeasonalityInsights,
} from "@/lib/portabilidad";

import {
  getPortabilidadSeasonalityData,
} from "@/lib/portabilidad/seasonality";

import {
  filterSeasonalityData,
  type SeasonalityPeriodValue,
} from "@/lib/utils/seasonality-period";

import {
  SeasonalityFilter,
} from "@/components/ui/filters/seasonality-filter";

import {
  BarChartBase,
} from "@/components/ui/charts/bar-chart-base";

import {
  InsightsCard,
} from "@/components/ui/insights/insights-card";

import {
  dispValue,
} from "@/lib/format";

type Props = {
  data: ApiResponse<PortabilidadMovilRow>;
};

export function PortabilidadEstacionalidad({
  data,
}: Props) {

  const [
    seasonalityPeriod,
    setSeasonalityPeriod,
  ] = useState<SeasonalityPeriodValue>(
    "all"
  );

  const seasonalityRows =
    filterSeasonalityData(
      data.data,
      seasonalityPeriod
    );

  const seasonalityData =
    getPortabilidadSeasonalityData(
      seasonalityRows
    );

  const seasonalityInsights =
    getPortabilidadSeasonalityInsights(
      seasonalityData
    );

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <h2 className="section-heading">
          Estacionalidad mensual
        </h2>

        <SeasonalityFilter
          value={seasonalityPeriod}
          onChange={setSeasonalityPeriod}
        />

        <div className="chart-card">

          <BarChartBase
            data={seasonalityData}
            dataKey="promedio"
            label="Promedio"
            color="var(--blue-400)"
            xDataKey="mesCompleto"
            yFormatter={(v) =>
              dispValue(v, {
                format: "compact",
              })
            }
            tooltipFormatter={(v) =>
              v.toLocaleString("es-AR", {
                maximumFractionDigits: 0,
              })
            }
          />

        </div>

        <InsightsCard
          insights={seasonalityInsights}
        />

      </div>
    </section>
  );
}