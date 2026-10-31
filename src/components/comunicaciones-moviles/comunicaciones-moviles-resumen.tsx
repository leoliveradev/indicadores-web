import type { Overview }
  from "@/lib/home/types";

import {
  ComunicacionesMovilesOverview
} from "./comunicaciones-moviles-overview";

import {
  ComunicacionesMovilesAccesosRow,
  getAccesosDonutData,
} from "@/lib/comunicaciones-moviles";

import { DonutChart }
  from "@/components/ui/charts/donut-chart";
import { ApiResponse } from "@/lib/types";

type Props = {
  overview: Overview;
  accesos: ApiResponse<ComunicacionesMovilesAccesosRow>;
};

export function ComunicacionesMovilesResumen({
  overview,
  accesos,
}: Props) {

  const donutData =
    getAccesosDonutData(accesos);

  return (
    <>
      <ComunicacionesMovilesOverview
        data={overview}
      />

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Accesos por Modalidad de Contratación
          </h2>

          <div className="chart-card">
            <DonutChart
              data={donutData}
            />
          </div>

        </div>
      </section>
    </>
  );
}
