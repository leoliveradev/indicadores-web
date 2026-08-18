"use client";

import { DonutChart } from "@/components/ui/charts/donut-chart";

type DonutItem = {
  name: string;
  value: number;
  color: string;
};

export function InternetInsights({
  tecnologiaData,
  rangosData,
}: {
  tecnologiaData: DonutItem[];
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