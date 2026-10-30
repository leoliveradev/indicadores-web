"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";
import type { InternetTecnologiaProvinciaRow } from "@/lib/internet";

import {
  getTecnologiaProvinciaSortedData,
} from "@/lib/internet";

import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

import { ScrollableRanking }
  from "@/components/ui/ranking/scrollable-ranking";

import { dispValue } from "@/lib/format";

export function TecnologiaProvinciaView({
  tecnologiasProvincias,
}: {
  tecnologiasProvincias:
    ApiResponse<InternetTecnologiaProvinciaRow>;
}) {

  const [
    selectedProvincia,
    setSelectedProvincia,
  ] = useState<string>();

  const provinciaData =
    tecnologiasProvincias.data.map((d) => ({
      provincia: d.provincia,
      total: d.total,
    }));

  const top =
    provinciaData.reduce((a, b) =>
      b.total > a.total ? b : a
    );

  const rankingData =
    getTecnologiaProvinciaSortedData(
      tecnologiasProvincias
    );

  const rankingItems =
    rankingData.map((item) => ({
      id: item.provincia,
      label: item.provincia,
      value: item.total,
    }));

  return (
    <section className="section-wrap alt">
      <div className="section-inner">

        <h2 className="section-heading">
          Accesos por tecnología en provincias
        </h2>

        <p className="chart-description">
          La provincia con mayor cantidad
          de accesos es{" "}
          <strong>
            {top.provincia}
          </strong>{" "}
          ({top.total.toLocaleString("es-AR")}),
          concentrando la mayor infraestructura
          tecnológica del país.
        </p>

        <div className="geo-layout">

          <div className="chart-card">
            <ProvinciasMap
              data={provinciaData}
              selectedProvincia={
                selectedProvincia
              }
              onProvinciaHover={
                setSelectedProvincia
              }
              legendFormatter={(v) =>
                dispValue(v, {
                  format: "compact",
                })
              }
            />
          </div>

          <ScrollableRanking
            title={`Provincias (${rankingData.length})`}
            items={rankingItems}
            selectedId={
              selectedProvincia
            }
            onSelect={
              setSelectedProvincia
            }
          />

        </div>

      </div>
    </section>
  );
}