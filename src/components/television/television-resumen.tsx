import type { Overview }
  from "@/lib/home/types";

import {
  TelevisionOverview,
} from "./television-overview";
import { DonutChart } from "../ui/charts/donut-chart";
import { getAccesosDonutData } from "@/lib/television/accesos";
import { ApiResponse } from "@/lib/types";
import { TelevisionAccesosRow } from "@/lib/television/types";

export function TelevisionResumen({
  overview,
  accesos,
}: {
  overview: Overview;
  accesos: ApiResponse<TelevisionAccesosRow>;

}) {
  const donutData =
    getAccesosDonutData(accesos);

  return (
    <>
      <TelevisionOverview
        data={overview}
      />

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Composición actual
          </h2>

          <div className="chart-card">
            <DonutChart data={donutData} />
          </div>

        </div>
      </section>
    </>
  );
}