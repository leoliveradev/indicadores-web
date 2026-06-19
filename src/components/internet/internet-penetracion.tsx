"use client";
import { useState } from "react";
import { KPISection } from "@/components/home/kpi-section";
import { PenetracionLineChart } from "@/components/internet/penetracion-line-chart";
import { ProvinciasMap } from "@/components/ui/map/provincias-map";
import { PenetracionProvinciasRanking } from "@/components/internet/penetracion-provincias-ranking";

import type {
  ApiResponse,
  InternetPenetracionRow,
  InternetPenetracionProvinciaRow,
} from "@/lib/types";

import {
  getPenetracionKPIItems,
  getPenetracionEvolutionData,
  getPenetracionProvinciaRanking,
  getLatestPenetracionProvinciaData,
} from "@/lib/internet/penetracion";

export function InternetPenetracion({
  penetracion,
  penetracionProvincias,
}: {
  penetracion: ApiResponse<InternetPenetracionRow>;
  penetracionProvincias: ApiResponse<InternetPenetracionProvinciaRow>;
}) {
  const [mode, setMode] = useState<"hogares" | "habitantes" | "ambos">("ambos");
  const rows = penetracion.data;
  const latest = rows[rows.length - 1];

  const gap =
    latest.accesos_cada_100_hogares -
    latest.accesos_cada_100_habitantes;

  if (!rows.length) {
    return <div className="error-box">Sin datos disponibles</div>;
  }

  const kpiItems = getPenetracionKPIItems(rows);
  const evolutionData = getPenetracionEvolutionData(rows);

  const latestProvincias = getLatestPenetracionProvinciaData(
    penetracionProvincias.data
  );

  const provinciaData = latestProvincias.map((d) => ({
    provincia: d.provincia,
    total: d.hogares,
    hogares: d.hogares,
    habitantes: d.habitantes,
  }));

  const rankingData = getPenetracionProvinciaRanking(latestProvincias);

  const top = provinciaData.reduce((a, b) =>
    b.hogares > a.hogares ? b : a
  );

  return (
    <>
      {/* KPIs */}
      <KPISection title="Penetración de Internet" items={kpiItems} />

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

      {/* EVOLUCIÓN */}
      <section className="section-wrap">
        <div className="section-inner">
          <h2 className="section-heading">
            Evolución de penetración
          </h2>

          <div className="chart-card">
            <PenetracionLineChart data={evolutionData} mode={mode} />
          </div>

          <p className="chart-description">
            En el último período, la penetración alcanzó{" "}
            <strong>{latest.accesos_cada_100_hogares}</strong> accesos por cada 100 hogares
            y <strong>{latest.accesos_cada_100_habitantes}</strong> por cada 100 habitantes.
            Existe una brecha de <strong>{gap.toFixed(2)}</strong> puntos, lo que refleja
            la diferencia entre disponibilidad de conexión en hogares y uso individual.
          </p>
        </div>
      </section>

      {/* PROVINCIAS */}
      <section className="section-wrap alt">
        <div className="section-inner">
          <h2 className="section-heading">
            Penetración por provincia
          </h2>

          <p className="chart-description">
            La mayor penetración es{" "}
            <strong>{top.provincia}</strong> ({top.hogares} accesos cada 100 hogares).
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="chart-card">
              <ProvinciasMap data={provinciaData} />
            </div>

            <div className="chart-card">
              <PenetracionProvinciasRanking data={rankingData} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}