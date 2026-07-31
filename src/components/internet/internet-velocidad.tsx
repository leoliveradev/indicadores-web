import type {
  ApiResponse,
  InternetVelocidadMediaRow,
} from "@/lib/types";

import {
  getVelocidadEvolutionData,
  getVelocidadMediaKpi,
} from "@/lib/internet/sections";

import { VelocidadLineChart } from "./velocidad-line-chart";

import { IVelocidad } from "@/components/ui/icons";

import { fmtNumber } from "@/lib/format";

type Props = {
  data: ApiResponse<InternetVelocidadMediaRow>;
};

export function InternetVelocidad({
  data,
}: Props) {
  const latest = getVelocidadMediaKpi(data);

  const evolutionData =
    getVelocidadEvolutionData(data);

  if (!latest) return null;

  return (
    <>
      <section className="section-wrap">
        <div className="section-inner">

          <div className="kpi-card">
            <IVelocidad />

            <div>
              <p>Velocidad media de descarga</p>

              <h3>
                {fmtNumber(latest.Mbps)} Mbps
              </h3>
            </div>
          </div>

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
    </>
  );
}