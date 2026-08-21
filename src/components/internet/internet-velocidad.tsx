import type { ApiResponse } from "@/lib/types";
import type {
  InternetVelocidadMediaProvinciasRow,
  InternetVelocidadMediaRow,
} from "@/lib/internet";

import {
  getVelocidadEvolutionData,
  getVelocidadKPIItems,
  getVelocidadProvinciaRankingData
} from "@/lib/internet";

import { LineChartBase }
  from "@/components/ui/charts/line-chart-base";

import { KPISection } from "@/components/home/kpi-section";
import { RankingBarChart } from "@/components/ui/charts/ranking-bar-chart";

export function InternetVelocidad({ velocidadMedia, provincias }: {
  velocidadMedia: ApiResponse<InternetVelocidadMediaRow>,
  provincias: ApiResponse<InternetVelocidadMediaProvinciasRow>,
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
            <LineChartBase
              data={evolutionData}
              height={350}
              series={[
                {
                  key: "mbps",
                  label: "Velocidad media",
                  color: "var(--blue-200)",
                  strokeWidth: 3,
                  activeDot: true,
                },
              ]}
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
            <RankingBarChart
              data={rankingData.map((r) => ({
                label: r.provincia,
                value: r.mbps,
              }))}
              color="#E74242"
              formatter={(v) => `${v.toFixed(1)} Mbps`}
            />
          </div>

        </div>
      </section>

    </>
  );
}