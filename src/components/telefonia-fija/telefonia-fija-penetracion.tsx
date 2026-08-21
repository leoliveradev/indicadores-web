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
  getPenetracionProvinciaRankingData,
} from "@/lib/telefonia-fija";

import { KPISection } from "@/components/home/kpi-section";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";
import { RankingComparisonBarChart }
  from "@/components/ui/charts/ranking-comparison-bar-chart";
import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

type Props = {
  penetracion: ApiResponse<TelefoniaFijaPenetracionRow>;
  provincias: ApiResponse<TelefoniaFijaPenetracionProvinciaRow>;
};

export function TelefoniaFijaPenetracion({
  penetracion,
  provincias,
}: Props) {
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

  const provinciaData = provincias.data.map((d) => ({
    provincia: d.provincia,

    // Escala del mapa
    total: d.accesos_100_hog,

    // Tooltip
    hogares: d.accesos_100_hog,
    habitantes: d.accesos_100_hab,
  }));

  const [mode, setMode] = useState<
    "hogares" | "habitantes" | "ambos"
  >("ambos");

  return (
    <>
      <KPISection
        title="Penetración de telefonía fija"
        items={kpiItems}
      />
      <div className="flex gap-2 mb-4">
        <button
          className={`tab-btn ${mode === "ambos" ? "active" : ""}`}
          onClick={() => setMode("ambos")}
        >
          Ambos
        </button>

        <button
          className={`tab-btn ${mode === "hogares" ? "active" : ""}`}
          onClick={() => setMode("hogares")}
        >
          Hogares
        </button>

        <button
          className={`tab-btn ${mode === "habitantes" ? "active" : ""}`}
          onClick={() => setMode("habitantes")}
        >
          Habitantes
        </button>
      </div>
      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de la penetración
          </h2>

          <div className="chart-card">

            <LineChartBase
              data={evolutionData}
              series={[
                ...(mode === "hogares" || mode === "ambos"
                  ? [
                    {
                      key: "hogares",
                      label: "Accesos cada 100 hogares",
                      color: "#005297",
                      strokeWidth: 3,
                    },
                  ]
                  : []),

                ...(mode === "habitantes" || mode === "ambos"
                  ? [
                    {
                      key: "habitantes",
                      label: "Accesos cada 100 habitantes",
                      color: "#22c55e",
                    },
                  ]
                  : []),
              ]}
            />

          </div>

          <p className="chart-description">
            Evolución histórica de la penetración de la
            telefonía fija medida sobre hogares y habitantes.
          </p>

        </div>
      </section>

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Distribución provincial
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

          <p className="chart-description">
            La penetración de telefonía fija presenta fuertes diferencias
            entre provincias, con una mayor concentración en los distritos
            más urbanizados del país.
          </p>

        </div>
      </section>
    </>
  );
}