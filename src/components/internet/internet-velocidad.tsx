import type {  ApiResponse } from "@/lib/types";
import type {
  InternetVelocidadMediaProvinciasRow,
  InternetVelocidadMediaRow,
} from "@/lib/internet/types";

import {
  getVelocidadEvolutionData,
  getVelocidadKPIItems,
  getVelocidadProvinciaRankingData
} from "@/lib/internet";

import { VelocidadLineChart } from "./velocidad-line-chart";

import { KPISection } from "@/components/home/kpi-section";

import { VelocidadRankingChart } from "./velocidad-ranking-chart";


export function InternetVelocidad({ velocidadMedia, provincias} : {
  velocidadMedia : ApiResponse<InternetVelocidadMediaRow>,
  provincias : ApiResponse<InternetVelocidadMediaProvinciasRow>,
}) {
  const kpiItems = getVelocidadKPIItems(velocidadMedia);

  const evolutionData =
    getVelocidadEvolutionData(velocidadMedia);

  const rankingData =
    getVelocidadProvinciaRankingData(provincias);

  return (
    <>
      <section className="section-wrap">
        <div className="section-inner">
          {/* KPIs */}
          <KPISection
            title="Velocidad media de descarga"
            items={kpiItems}
          />
        </div>
      </section>

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución histórica de la velocidad media
          </h2>

          <div className="chart-card">
            <VelocidadLineChart
              data={evolutionData}
            />
          </div>

        </div>
      </section>

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Ranking provincial de velocidad media
          </h2>

          <div className="chart-card">
            <VelocidadRankingChart
              data={rankingData}
            />
          </div>

        </div>
      </section>

    </>
  );
}