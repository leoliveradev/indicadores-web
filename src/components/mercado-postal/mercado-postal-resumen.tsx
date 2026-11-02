"use client";

import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalFacturacionRow,
  MercadoPostalPersonalRow,
  MercadoPostalProduccionRow,
} from "@/lib/mercado-postal";

import {
  MercadoPostalOverview,
} from "./mercado-postal-overview";

import {
  getFacturacionDonutData,
  getProduccionDonutData,
} from "@/lib/mercado-postal";

import {
  DonutChart,
} from "@/components/ui/charts/donut-chart";

type Props = {
  facturacion: ApiResponse<MercadoPostalFacturacionRow>;
  personal: ApiResponse<MercadoPostalPersonalRow>;
  produccion: ApiResponse<MercadoPostalProduccionRow>;
};

export function MercadoPostalResumen({
  facturacion,
  personal,
  produccion,
}: Props) {

  const facturacionDonut =
    getFacturacionDonutData(
      facturacion
    );

  const produccionDonut =
    getProduccionDonutData(
      produccion
    );

  return (
    <>
      <MercadoPostalOverview
        facturacion={facturacion}
        personal={personal}
      />

      <section className="section-wrap">
        <div className="section-inner">

          <h2 className="section-heading">
            Composición actual del mercado
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="chart-card">
              <h3 className="chart-title">
                Producción
              </h3>

              <DonutChart
                data={produccionDonut}
              />
            </div>

            <div className="chart-card">
              <h3 className="chart-title">
                Facturación
              </h3>

              <DonutChart
                data={facturacionDonut}
              />
            </div>

          </div>

        </div>
      </section>
    </>
  );
}