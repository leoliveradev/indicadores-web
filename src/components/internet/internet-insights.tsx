"use client";

import { DonutChart } from "@/components/internet/donut-chart";
// import { VelocidadGauge } from "@/components/internet/velocidad-gauge";

type DonutItem = {
  name: string;
  value: number;
  color: string;
};

// type GaugeData = {
//   value: number;
//   trend?: number | null;
// };

export function InternetInsights({
  tecnologiaData,
  // gaugeData,
  rangosData,
}: {
  tecnologiaData: DonutItem[];
  // gaugeData: GaugeData | null;
  rangosData: DonutItem[];
}) {
  return (
    <section className="section-wrap alt">
      <div className="section-inner">

        <h2 className="section-heading">
          Insights principales
        </h2>

        <div className="charts-container">

          <div className="chart-card">
            <h3 className="chart-title">
              Composición por tecnología
            </h3>

            <DonutChart data={tecnologiaData} />
          </div>

          {/* <div className="chart-card">
            <h3 className="chart-title">
              Velocidad media de descarga (Mbps)
            </h3>

            {gaugeData && (
              <VelocidadGauge data={gaugeData} />
            )}
          </div> */}

          <div className="chart-card">
            <h3 className="chart-title">
              Distribución por rangos de velocidad
            </h3>
            <DonutChart data={rangosData} />
          </div>


        </div>
      </div>
    </section>
  );
}