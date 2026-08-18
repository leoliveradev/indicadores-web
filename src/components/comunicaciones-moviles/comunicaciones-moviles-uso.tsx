import type { ApiResponse } from "@/lib/types";

import type {
  ComunicacionesMovilesLlamadasRow,
  ComunicacionesMovilesMinutosRow,
  ComunicacionesMovilesSmsRow,
} from "@/lib/comunicaciones-moviles/types";

import {
  getLlamadasEvolutionData,
  getMinutosEvolutionData,
  getSmsEvolutionData,
} from "@/lib/comunicaciones-moviles";

// import { UsoLineChart } from "./uso-line-chart";
import { SmsLineChart } from "./sms-line-chart";
import { LineChartBase } from "@/components/ui/charts/line-chart-base";

type Props = {
  llamadas: ApiResponse<ComunicacionesMovilesLlamadasRow>;
  minutos: ApiResponse<ComunicacionesMovilesMinutosRow>;
  sms: ApiResponse<ComunicacionesMovilesSmsRow>;
};

export function ComunicacionesMovilesUso({
  llamadas,
  minutos,
  sms,
}: Props) {
  const llamadasData =
    getLlamadasEvolutionData(llamadas);

  const minutosData =
    getMinutosEvolutionData(minutos);

  const smsData =
    getSmsEvolutionData(sms);

  return (
    <>
      {/* LLAMADAS */}

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de llamadas
          </h2>

          <div className="chart-card">
            <LineChartBase
              data={llamadasData}
              series={[
                {
                  key: "prepago",
                  label: "Prepago",
                  color: "#2563eb",
                },
                {
                  key: "pospago",
                  label: "Pospago",
                  color: "#16a34a",
                },
                {
                  key: "total",
                  label: "Total",
                  color: "#f59e0b",
                },
              ]}
            />
          </div>

          <p className="chart-description">
            Comparativa histórica entre
            llamadas prepagas, pospagas y
            el total de comunicaciones.
          </p>

        </div>
      </section>

      {/* MINUTOS */}

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de minutos cursados
          </h2>

          <div className="chart-card">
            {/* <UsoLineChart
              data={minutosData}
            /> */}
            <LineChartBase
              data={minutosData}
              series={[
                {
                  key: "prepago",
                  label: "Prepago",
                  color: "#2563eb",
                },
                {
                  key: "pospago",
                  label: "Pospago",
                  color: "#16a34a",
                },
                {
                  key: "total",
                  label: "Total",
                  color: "#f59e0b",
                },
              ]}
            />
          </div>

          <p className="chart-description">
            Evolución de los minutos de voz
            consumidos por líneas móviles.
          </p>

        </div>
      </section>

      {/* SMS */}

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución de SMS
          </h2>

          <div className="chart-card">
            <SmsLineChart
              data={smsData}
            />
          </div>

          <p className="chart-description">
            Evolución histórica de mensajes SMS
            enviados desde líneas móviles.
          </p>

        </div>
      </section>
    </>
  );
}