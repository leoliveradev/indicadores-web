"use client";

import { KPISection } from "@/components/home/kpi-section";
// import { DonutChart } from "@/components/internet/donut-chart";

import type { InternetTecnologiaRow, ApiResponse, InternetTecnologiaProvinciaRow } from "@/lib/types";
import { TecnologiaLineChart } from "@/components/internet/tecnologia-line-chart";
import { getTecnologiaDonutData, getTecnologiaKPIItems, getTecnologiaEvolutionData, getProvinciaRankingData, getLatestTecnologiaProvinciaData } from "@/lib/internet/sections";

// import { TecnologiaProvinciasTable } from "@/components/internet/tecnologia-provincias-table";

import { TecnologiaProvinciasRanking } from "./tecnologia-provincias-ranking";
import { ProvinciasMap } from "@/components/ui/map/provincias-map";

export function InternetTecnologia({ tecnologias, tecnologiasProvincias }: {
  tecnologias: ApiResponse<InternetTecnologiaRow>;
  tecnologiasProvincias: ApiResponse<InternetTecnologiaProvinciaRow>;
}) {
  const rows = tecnologias.data;

  if (!rows.length) {
    return <div className="error-box">Sin datos disponibles</div>;
  }

  // const donutData = getTecnologiaDonutData(tecnologias);
  const kpiItems = getTecnologiaKPIItems(tecnologias);
  const evolutionData = getTecnologiaEvolutionData(tecnologias);
  // const latestProvinciaData = getLatestTecnologiaProvinciaData(tecnologiasProvincias);
  const rankingData = getProvinciaRankingData(tecnologiasProvincias);
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

      {/* Gráfico */}
      {/* <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Distribución por tecnología
          </h2>

          <div className="chart-card">
            <DonutChart data={donutData} />
          </div>

        </div>
      </section> */}

      {/* EVOLUCIÓN */}
      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de accesos por tecnología
          </h2>

          <div className="chart-card">
            <TecnologiaLineChart data={evolutionData} />
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
          <div className="grid grid-cols-2 gap-6">

            <div className="chart-card">
              <ProvinciasMap data={provinciaData} />
            </div>

            <div className="chart-card">
              <TecnologiaProvinciasRanking data={rankingData} />
            </div>

          </div>


        </div>
      </section>

    </>
  );
}