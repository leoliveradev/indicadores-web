"use client";

import { KPISection } from "@/components/home/kpi-section";

import type { ApiResponse } from "@/lib/types";
import type {
  InternetTecnologiaRow,
  InternetTecnologiaProvinciaRow
} from "@/lib/internet";

import {
  getTecnologiaKPIItems,
  getTecnologiaEvolutionData,
  getTecnologiaProvinciaRankingData
} from "@/lib/internet";

import { ProvinciasMap } from "@/components/ui/map/provincias-map";
import { RankingBarChart } from "@/components/ui/charts/ranking-bar-chart";
import { LineChartBase } from "@/components/ui/charts/line-chart-base";

export function InternetTecnologia({
  tecnologias,
  tecnologiasProvincias
}: {
  tecnologias: ApiResponse<InternetTecnologiaRow>;
  tecnologiasProvincias: ApiResponse<InternetTecnologiaProvinciaRow>;
}) {
  const rows = tecnologias.data;

  if (!rows.length) {
    return <div className="error-box">Sin datos disponibles</div>;
  }

  const kpiItems = getTecnologiaKPIItems(tecnologias);
  const evolutionData = getTecnologiaEvolutionData(tecnologias);
  const rankingData = getTecnologiaProvinciaRankingData(tecnologiasProvincias);
  const provinciaData = tecnologiasProvincias.data.map((d) => ({
    provincia: d.provincia,
    total: d.total,
  }));
  const top = provinciaData.reduce((a, b) =>
    b.total > a.total ? b : a
  );


  return (
    <>
      {/* KPIs */}
      <KPISection title="Accesos por tecnología" items={kpiItems} />

      {/* EVOLUCIÓN */}
      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de accesos por tecnología
          </h2>

          <div className="chart-card">
            <LineChartBase
              data={evolutionData}
              series={[
                {
                  key: "fibra_optica",
                  label: "Fibra óptica",
                  color: "var(--accent-green)",
                  strokeWidth: 3,
                },
                {
                  key: "cablemodem",
                  label: "Cablemódem",
                  color: "var(--blue-400)",
                },
                {
                  key: "adsl",
                  label: "ADSL",
                  color: "var(--blue-200)",
                  strokeDasharray: "4 2",
                },
                {
                  key: "wireless",
                  label: "Wireless",
                  color: "var(--accent-amber)",
                },
              ]}
              yFormatter={(v) =>
                v.toLocaleString("es-AR")
              }
            />
          </div>
          <p className="chart-description">
            La fibra óptica muestra un crecimiento sostenido, mientras que ADSL presenta una caída progresiva en el tiempo.
          </p>
        </div>
      </section>


      {/* PROVINCIAS */}
      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Accesos por tecnología en provincias
          </h2>

          {/* INSIGHT */}
          <p className="chart-description">
            La provincia con mayor cantidad de accesos es{" "}
            <strong>{top.provincia}</strong> ({top.total}), concentrando la mayor
            infraestructura tecnológica del país.
          </p>

          {/* MAPA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="chart-card">
              <ProvinciasMap data={provinciaData} />
            </div>

            <div className="chart-card">
              <RankingBarChart
                data={rankingData.map((r) => ({
                  label: r.provincia,
                  value: r.total,
                }))}
                tooltipLabel="Accesos"
              />
            </div>

          </div>


        </div>
      </section>

    </>
  );
}