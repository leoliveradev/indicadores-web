"use client";

import { KPISection } from "@/components/home/kpi-section";
import { DonutChart } from "@/components/internet/donut-chart";

import type { InternetTecnologiaRow, ApiResponse } from "@/lib/types";
import { getTecnologiaDonutData } from "@/lib/internet/sections";
import { getTecnologiaKPIItems } from "@/lib/internet/sections";

export function InternetTecnologia({
  data,
}: {
  data: ApiResponse<InternetTecnologiaRow>;
}) {
  const rows = data.data;

  if (!rows.length) {
    return <div className="error-box">Sin datos disponibles</div>;
  }

  const donutData = getTecnologiaDonutData(data); // excluimos el último período para mostrar la evolución histórica
  const kpiItems = getTecnologiaKPIItems(data);

  return (
    <>
      {/* KPIs */}
      <KPISection title="Accesos por tecnología" items={kpiItems} />

      {/* Gráfico */}
      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Distribución por tecnología
          </h2>

          <div className="chart-card">
            <DonutChart data={donutData} />
          </div>

        </div>
      </section>
    </>
  );
}