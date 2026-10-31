import type { Overview } from "@/lib/home/types";

import {
  TelefoniaFijaOverview,
} from "./telefonia-fija-overview";

import { DonutChart } from "@/components/ui/charts/donut-chart";

import { getAccesosDonutData } from "@/lib/telefonia-fija/accesos";
import { TelefoniaFijaAccesosRow } from "@/lib/telefonia-fija/types";
import { ApiResponse } from "@/lib/types";

export function TelefoniaFijaResumen({
  overview,
  accesos,
}: {
  overview: Overview;
  accesos: ApiResponse<TelefoniaFijaAccesosRow>;
}) {

  const donutData =
    getAccesosDonutData(accesos);

  return (
    <>
      <TelefoniaFijaOverview
        data={overview}
      />


      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Composición actual de accesos
          </h2>

          <div className="chart-card">
            <DonutChart data={donutData} />
          </div>

        </div>
      </section>
    </>
  );
}