"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaAccesosProvinciaRow,
} from "@/lib/telefonia-fija";

import {
  getAccesosProvinciaSortedData,
} from "@/lib/telefonia-fija";

import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

import { ScrollableRanking }
  from "@/components/ui/ranking/scrollable-ranking";

import { dispValue } from "@/lib/format";

type Props = {
  provincias:
    ApiResponse<TelefoniaFijaAccesosProvinciaRow>;
};

export function AccesosProvinciaView({
  provincias,
}: Props) {

  const [
    selectedProvincia,
    setSelectedProvincia,
  ] = useState<string>();

  const rankingData =
    getAccesosProvinciaSortedData(
      provincias
    );

  const rankingItems =
    rankingData.map((item) => ({
      id: item.provincia,
      label: item.provincia,
      value: item.total,
    }));

  const provinciaData =
    provincias.data.map((p) => ({
      provincia: p.provincia,
      total: p.total,
    }));

  const top = rankingData[0];

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <h2 className="section-heading">
          Distribución provincial
        </h2>

        <p className="chart-description">
          La provincia con mayor cantidad
          de accesos es{" "}
          <strong>
            {top.provincia}
          </strong>{" "}
          con{" "}
          <strong>
            {top.total.toLocaleString("es-AR")}
          </strong>{" "}
          líneas.
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