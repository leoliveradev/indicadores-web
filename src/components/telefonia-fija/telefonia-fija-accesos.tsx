import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaAccesosRow,
  TelefoniaFijaAccesosProvinciaRow,
} from "@/lib/telefonia-fija";

import {
  getAccesosKPIItems,
  getAccesosDonutData,
  getAccesosEvolutionData,
  getAccesosProvinciaRankingData,
} from "@/lib/telefonia-fija";

import { KPISection } from "@/components/home/kpi-section";

import { DonutChart } from "@/components/ui/charts/donut-chart";

import { ProvinciasMap } from "@/components/ui/map/provincias-map";

import { LineChartBase } from "@/components/ui/charts/line-chart-base";
import { RankingBarChart } from "@/components/ui/charts/ranking-bar-chart";
import { dispValue } from "@/lib/format";

type Props = {
  accesos: ApiResponse<TelefoniaFijaAccesosRow>;
  provincias: ApiResponse<TelefoniaFijaAccesosProvinciaRow>;
};

export function TelefoniaFijaAccesos({
  accesos,
  provincias,
}: Props) {
  const kpiItems =
    getAccesosKPIItems(accesos);

  const donutData =
    getAccesosDonutData(accesos);

  const evolutionData =
    getAccesosEvolutionData(accesos);

  const rankingData =
    getAccesosProvinciaRankingData(
      provincias
    );

  const provinciaData =
    provincias.data.map((p) => ({
      provincia: p.provincia,
      total: p.total,
    }));

  return (
    <>
      <KPISection
        title="Accesos de telefonía fija"
        items={kpiItems}
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

      <section className="section-wrap alt">
        <div className="section-inner">

          <h2 className="section-heading">
            Evolución histórica de accesos
          </h2>

          <div className="chart-card">
            <LineChartBase
              data={evolutionData}
              series={[
                {
                  key: "total",
                  label: "Total",
                  color: "#003667",
                  strokeWidth: 3,
                },
                {
                  key: "hogares",
                  label: "Hogares",
                  color: "#005297",
                },
                {
                  key: "comercial",
                  label: "Comercial",
                  color: "#E74242",
                },
                {
                  key: "gobiernos",
                  label: "Gobiernos",
                  color: "#005297",
                },
                {
                  key: "otros",
                  label: "Otros",
                  color: "#E74242",
                },
              ]}
              yFormatter={(v) =>
                dispValue(v, {
                  format: "compact",
                })
              }
            />
          </div>

        </div>
      </section>

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Distribución provincial
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="chart-card">
              <ProvinciasMap
                data={provinciaData}
              />
            </div>

            <div className="chart-card">
              <RankingBarChart
                data={rankingData.map((r) => ({
                  label: r.provincia,
                  value: r.total,
                }))}
              />
            </div>

          </div>

        </div>
      </section>
    </>
  );
}