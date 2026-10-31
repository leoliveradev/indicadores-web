"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  InternetVelocidadMediaProvinciasRow,
} from "@/lib/internet";

import {
  getVmdProvinciaSortedData,
} from "@/lib/internet";

import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

import { ScrollableRanking }
  from "@/components/ui/ranking/scrollable-ranking";

import { dispValue } from "@/lib/format";

export function VelocidadMediaProvinciaView({
  provincias,
}: {
  provincias:
    ApiResponse<InternetVelocidadMediaProvinciasRow>;
}) {
  const [
    selectedProvincia,
    setSelectedProvincia,
  ] = useState<string>();

  const rankingData =
    getVmdProvinciaSortedData(
      provincias
    );

  const rankingItems =
    rankingData.map((item) => ({
      id: item.provincia,
      label: item.provincia,
      value: item.mbps,
    }));

  const top = rankingData[0];

  const provinciaData =
    provincias.data.map((d) => ({
      provincia: d.provincia,
      total: d.mbps,

      tooltipData: [
        {
          label: "Velocidad media",
          value: dispValue(d.mbps, {
            format: "number",
            decimals: 2,
            suffix: " Mbps",
          }),
          color: "#005297",
        },
      ],
    }));

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <h2 className="section-heading">
          Distribución provincial
        </h2>

        <p className="chart-description">
          La provincia con mayor velocidad media es{" "}
          <strong>
            {top.provincia}
          </strong>{" "}
          con{" "}
          <strong>
            {top.mbps.toFixed(1)} Mbps
          </strong>.
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
            />
          </div>

          <ScrollableRanking
            title={`Provincias (${rankingData.length}) · Mbps`}
            items={rankingItems}
            selectedId={
              selectedProvincia
            }
            onSelect={
              setSelectedProvincia
            }
            formatter={(v) =>
              dispValue(v, {
                format: "number",
                decimals: 2,
              })
            }
          />

        </div>

      </div>
    </section>
  );
}