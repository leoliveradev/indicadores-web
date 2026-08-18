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

  return (
    <>
      <KPISection
        title="Penetración de telefonía fija"
        items={kpiItems}
      />

      <section className="section-wrap alt">
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
      </section>
    </>
  );
}