"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaPenetracionRow,
  TelefoniaFijaPenetracionProvinciaRow,
} from "@/lib/telefonia-fija";

import {
  getPenetracionKPIItems,
  getPenetracionEvolutionData,
  getPenetracionInsights,
  getPenetracionProvinciaSortedData,
} from "@/lib/telefonia-fija";

import { KPISection } from "@/components/home/kpi-section";

import { filterByPeriods, PeriodFilterValue } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";
import { ScrollableDualRanking } from "../ui/ranking/scrollable-dual-ranking";

type Props = {
  penetracion: ApiResponse<TelefoniaFijaPenetracionRow>;
  provincias: ApiResponse<TelefoniaFijaPenetracionProvinciaRow>;
};

export function TelefoniaFijaPenetracion({
  penetracion,
  provincias,
}: Props) {
  const [selectedProvincia, setSelectedProvincia] =
    useState<string>();

  const [period, setPeriod] =
    useState<PeriodFilterValue>("all");

  const filteredRows =
    filterByPeriods(
      penetracion.data,
      period,
      4
    );

  const kpiItems =
    getPenetracionKPIItems(
      penetracion
    );

  const evolutionData =
    getPenetracionEvolutionData(
      filteredRows
    );

  const insights =
    getPenetracionInsights(
      filteredRows
    );

  const rankingData =
    getPenetracionProvinciaSortedData(
      provincias
    );

  const provinciaData = provincias.data.map((d) => ({
    provincia: d.provincia,
    total: d.accesos_100_hog,

    tooltipData: [
      {
        label: "Hogares",
        value: d.accesos_100_hog.toFixed(2),
        color: "var(--blue-500)",
      },
      {
        label: "Habitantes",
        value: d.accesos_100_hab.toFixed(2),
        color: "var(--accent-green)",
      },
    ],
  }));


  return (
    <>
      <KPISection
        title="Penetración de telefonía fija"
        items={kpiItems}
      />

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de la penetración
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

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Distribución provincial
          </h2>

          <div className="map-ranking-grid">
            
            <div className="chart-card">
              <ProvinciasMap
                data={provinciaData}
                selectedProvincia={selectedProvincia}
                onProvinciaHover={setSelectedProvincia}
              />
            </div>

            <ScrollableDualRanking
              title={`Provincias (${rankingData.length})`}
              items={rankingData.map((r) => ({
                id: r.provincia,
                label: r.provincia,
                primary: r.hogares,
                secondary: r.habitantes,
              }))}
              primaryLabel="Hogares"
              secondaryLabel="Habitantes"
              selectedId={selectedProvincia}
              onSelect={setSelectedProvincia}
            />
          </div>

        </div>
      </section>
    </>
  );
}