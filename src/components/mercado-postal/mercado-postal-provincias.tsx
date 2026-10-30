import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalProvinciaRow,
} from "@/lib/mercado-postal";

import {
  getProvinciaMapData,
  getProvinciaSortedData,
} from "@/lib/mercado-postal";

import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

import { ScrollableDualRanking } from "../ui/ranking/scrollable-dual-ranking";
import { useState } from "react";
import { dispValue } from "@/lib/format";

type Props = {
  provincias: ApiResponse<MercadoPostalProvinciaRow>;
};

export function MercadoPostalProvincias({
  provincias,
}: Props) {
  const [selectedProvincia, setSelectedProvincia] =
    useState<string>();

  const provinciaData =
    getProvinciaMapData(provincias);

  const rankingData =
    getProvinciaSortedData(provincias);

  const top =
    rankingData.length > 0
      ? rankingData[0]
      : null;

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <h2 className="section-heading">
          Distribución provincial
        </h2>

        {top && (
          <p className="chart-description">
            Buenos Aires concentra la mayor
            facturación y producción postal,
            liderando ampliamente la actividad
            del sector.
          </p>
        )}

        <div className="map-ranking-grid">

          <div className="chart-card">
            <ProvinciasMap
              data={provinciaData}
              selectedProvincia={selectedProvincia}
              onProvinciaHover={setSelectedProvincia}
              legendFormatter={(v) =>
                dispValue(v, {
                  format: "compact",
                  decimals: 1,
                })
              }
                />
          </div>

          <ScrollableDualRanking
            title={`Provincias (${rankingData.length})`}
            items={rankingData.map((r) => ({
              id: r.provincia,
              label: r.provincia,
              primary: r.pesos,
              secondary: r.unidades,
            }))}
            primaryLabel="Facturación"
            secondaryLabel="Producción"
            selectedId={selectedProvincia}
            onSelect={setSelectedProvincia}
          />

        </div>

      </div>
    </section>
  );
}