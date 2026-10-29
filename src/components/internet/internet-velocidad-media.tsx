'use client';
import { useState } from "react";

import type { ApiResponse } from "@/lib/types";
import type {
  InternetVelocidadMediaProvinciasRow,
  InternetVelocidadMediaRow,
} from "@/lib/internet";

import {
  getVelocidadEvolutionData,
  getVelocidadKPIItems,
  getVmdProvinciaSortedData,
  getVelocidadInsights
} from "@/lib/internet";

import { KPISection } from "@/components/home/kpi-section";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import { filterByPeriods } from "@/lib/utils/filter-period";
import { PeriodFilter } from "@/components/ui/filters/period-filter";
import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { ProvinciasMap } from "@/components/ui/map/provincias-map";
import { dispValue } from "@/lib/format";
import { ScrollableRanking } from "../ui/ranking/scrollable-ranking";

export function InternetVelocidadMedia({ velocidadMedia, provincias }: {
  velocidadMedia: ApiResponse<InternetVelocidadMediaRow>,
  provincias: ApiResponse<InternetVelocidadMediaProvinciasRow>,
}) {

  const kpiItems = getVelocidadKPIItems(velocidadMedia);

  const [period, setPeriod] = useState<
    "all" | "10y" | "5y" | "3y" | "1y"
  >("all");

  const [selectedProvincia, setSelectedProvincia,] = useState<string>();

  const filteredRows =
    filterByPeriods(
      velocidadMedia.data,
      period,
      4
    );

  const evolutionData =
    getVelocidadEvolutionData({
      ...velocidadMedia,
      data: filteredRows,
    });

  const rankingData =
    getVmdProvinciaSortedData(provincias);

  const rankingItems = rankingData.map(
    (item) => ({
      id: item.provincia,
      label: item.provincia,
      value: item.mbps,
    })
  );

  const top = rankingData[0];

  const insights =
    getVelocidadInsights(
      filteredRows,
    );

  const provinciaData =
    provincias.data.map((d) => ({
      provincia: d.provincia,
      total: d.mbps,

      tooltipData: [
        {
          label: "Velocidad media",
          value: dispValue(d.mbps, {
            format: "number",
            decimals: 2,
            suffix: " Mbps",
          }),
          color: "#005297",
        },
      ],
    }));


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
            Evolución histórica de la velocidad media
          </h2>

          <PeriodFilter
            value={period}
            onChange={setPeriod}
          />

          <div className="chart-card">
            <LineChartBase
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

      {/* PROVINCIAS */}
      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Distribución provincial
          </h2>

          {/* INSIGHT */}
          <p className="chart-description">
            La provincia con mayor velocidad media es{" "}
            <strong>{top.provincia}</strong>
            con{" "}
            <strong>{top.mbps.toFixed(1)} Mbps</strong>.
          </p>

          {/* MAPA */}
          <div className="map-ranking-grid">

            <div className="chart-card">
              <ProvinciasMap
                data={provinciaData}
                selectedProvincia={selectedProvincia}
                onProvinciaHover={setSelectedProvincia}
              />
            </div>

            <ScrollableRanking
              title={`Provincias (${rankingData.length}) · Mbps`}
              items={rankingItems}
              selectedId={selectedProvincia}
              onSelect={setSelectedProvincia}
              formatter={(v) =>
                dispValue(v, {
                  format: "number",
                  decimals: 2
                })
              }
            />

          </div>

        </div>
      </section>
    </>
  );
}