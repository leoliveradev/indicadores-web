import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalProvinciaRow,
} from "@/lib/mercado-postal";

import {
  getProvinciaMapData,
  getProvinciaRankingData,
} from "@/lib/mercado-postal";

import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

import { RankingComparisonBarChart }
  from "@/components/ui/charts/ranking-comparison-bar-chart";

type Props = {
  provincias: ApiResponse<MercadoPostalProvinciaRow>;
};

export function MercadoPostalProvincias({
  provincias,
}: Props) {
  const mapData =
    getProvinciaMapData(provincias);

  const rankingData =
    getProvinciaRankingData(provincias);

  const top =
    rankingData.length > 0
      ? rankingData[0]
      : null;

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <h2 className="section-heading">
          Distribución provincial
        </h2>

        {top && (
          <p className="chart-description">
            Buenos Aires concentra la mayor
            facturación y producción postal,
            liderando ampliamente la actividad
            del sector.
          </p>
        )}

        <div className="grid grid-cols-2 gap-6">

          <div className="chart-card">
            <ProvinciasMap
              data={mapData}
            />
          </div>

          <div className="chart-card">

            <RankingComparisonBarChart
              data={rankingData.map((r) => ({
                label: r.provincia,
                primary: r.pesos,
                secondary: r.unidades,
              }))}
              primaryLabel="Facturación"
              secondaryLabel="Producción"
              primaryColor="#005297"
              secondaryColor="#22c55e"
            />

          </div>

        </div>

      </div>
    </section>
  );
}