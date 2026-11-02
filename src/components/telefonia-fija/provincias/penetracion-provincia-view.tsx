"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelefoniaFijaPenetracionProvinciaRow,
} from "@/lib/telefonia-fija";

import {
  getPenetracionProvinciaSortedData,
} from "@/lib/telefonia-fija";

import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

import { ScrollableDualRanking }
  from "@/components/ui/ranking/scrollable-dual-ranking";

type Props = {
  provincias:
    ApiResponse<TelefoniaFijaPenetracionProvinciaRow>;
};

export function PenetracionProvinciaView({
  provincias,
}: Props) {

  const [
    selectedProvincia,
    setSelectedProvincia,
  ] = useState<string>();

  const rankingData =
    getPenetracionProvinciaSortedData(
      provincias
    );

  const provinciaData =
    provincias.data.map((d) => ({
      provincia: d.provincia,
      total: d.accesos_100_hog,

      tooltipData: [
        {
          label: "Hogares",
          value: d.accesos_100_hog.toFixed(2),
          color: "var(--blue-500)",
        },
        {
          label: "Habitantes",
          value: d.accesos_100_hab.toFixed(2),
          color: "var(--accent-green)",
        },
      ],
    }));

  const top = rankingData[0];

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <h2 className="section-heading">
          Penetración por provincia
        </h2>

        <p className="chart-description">
          La mayor penetración corresponde a{" "}
          <strong>{top.provincia}</strong>{" "}
          con{" "}
          <strong>
            {top.hogares.toFixed(2)}
          </strong>{" "}
          accesos cada 100 hogares.
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

          <ScrollableDualRanking
            title={`Provincias (${rankingData.length})`}
            items={rankingData.map((r) => ({
              id: r.provincia,
              label: r.provincia,
              primary: r.hogares,
              secondary: r.habitantes,
            }))}
            primaryLabel="Hogares"
            secondaryLabel="Habitantes"
            selectedId={selectedProvincia}
            onSelect={setSelectedProvincia}
          />

        </div>

      </div>
    </section>
  );
}