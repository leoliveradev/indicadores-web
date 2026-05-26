"use client";

import { KPISection } from "@/components/home/kpi-section";
// import { DonutChart } from "@/components/internet/donut-chart";

import type { InternetTecnologiaRow, ApiResponse, InternetTecnologiaProvinciaRow } from "@/lib/types";
import { TecnologiaLineChart } from "@/components/internet/tecnologia-line-chart";
import { getTecnologiaDonutData, getTecnologiaKPIItems, getTecnologiaEvolutionData, getProvinciaRankingData, getLatestTecnologiaProvinciaData } from "@/lib/internet/sections";

// import { TecnologiaProvinciasTable } from "@/components/internet/tecnologia-provincias-table";

import { TecnologiaProvinciasRanking } from "./tecnologia-provincias-ranking";

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

          {/* <TecnologiaProvinciasTable data={tecnologiasProvincias} /> */}

          <div className="chart-card">
            <TecnologiaProvinciasRanking data={rankingData} />
          </div>

        </div>
      </section>

    </>
  );
}