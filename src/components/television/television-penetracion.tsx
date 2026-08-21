"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelevisionPenetracionRow,
  TelevisionPenetracionProvinciaRow,
} from "@/lib/television";

import {
  getPenetracionKPIItems,
  getPenetracionEvolutionData,
  getPenetracionProvinciaRankingData,
} from "@/lib/television";

import { KPISection } from "@/components/home/kpi-section";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { RankingComparisonBarChart }
  from "@/components/ui/charts/ranking-comparison-bar-chart";

import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

type Props = {
  penetracion: ApiResponse<TelevisionPenetracionRow>;
  provincias: ApiResponse<TelevisionPenetracionProvinciaRow>;
};

export function TelevisionPenetracion({
  penetracion,
  provincias,
}: Props) {
  const [mode, setMode] = useState<
    "hogares" | "habitantes"
  >("hogares");

  const kpiItems =
    getPenetracionKPIItems(
      penetracion
    );

  const evolutionData =
    getPenetracionEvolutionData(
      penetracion
    );

  const rankingData =
    getPenetracionProvinciaRankingData(
      provincias
    );

  const provinciaData =
    provincias.data.map((d) => ({
      provincia: d.provincia,

      total:
        d.tv_suscripcion_100hogares,

      hogares:
        d.tv_suscripcion_100hogares,

      habitantes:
        d.tv_suscripcion_100habitantes,
    }));

  return (
    <>
      <KPISection
        title="Penetración de televisión"
        items={kpiItems}
      />

      <div className="flex gap-2 mb-4">
        <button
          className={`tab-btn ${
            mode === "hogares"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setMode("hogares")
          }
        >
          Hogares
        </button>

        <button
          className={`tab-btn ${
            mode === "habitantes"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setMode("habitantes")
          }
        >
          Habitantes
        </button>
      </div>

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de penetración
          </h2>

          <div className="chart-card">

            <LineChartBase
              data={evolutionData}
              series={
                mode === "hogares"
                  ? [
                      {
                        key: "suscripcion_hogares",
                        label:
                          "TV Suscripción",
                        color: "#005297",
                      },
                      {
                        key: "satelital_hogares",
                        label:
                          "TV Satelital",
                        color: "#EEAE42",
                      },
                    ]
                  : [
                      {
                        key: "suscripcion_habitantes",
                        label:
                          "TV Suscripción",
                        color: "#005297",
                      },
                      {
                        key: "satelital_habitantes",
                        label:
                          "TV Satelital",
                        color: "#EEAE42",
                      },
                    ]
              }
            />

          </div>

        </div>
      </section>

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Penetración por provincia
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <div className="chart-card">
              <ProvinciasMap
                data={provinciaData}
              />
            </div>

            <div className="chart-card">

              <RankingComparisonBarChart
                data={rankingData.map((r) => ({
                  label: r.provincia,
                  primary: r.hogares,
                  secondary: r.habitantes,
                }))}
                primaryLabel="Hogares"
                secondaryLabel="Habitantes"
              />

            </div>

          </div>

        </div>
      </section>
    </>
  );
}