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

  return (
    <>
      <KPISection
        title="Penetración de telefonía fija"
        items={kpiItems}
      />
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

            <p className="chart-description">
              La penetración de telefonía fija presenta fuertes diferencias
              entre provincias, con una mayor concentración en los distritos
              más urbanizados del país.
            </p>

          </div>

        </div>
      </section>
      {/* <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Ranking provincial
          </h2>

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
      </section> */}
    </>
  );
}