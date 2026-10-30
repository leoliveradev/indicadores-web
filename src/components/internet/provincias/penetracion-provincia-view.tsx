"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  InternetPenetracionProvinciaRow,
} from "@/lib/internet";

import {
  getPenetracionProvinciaSortedData,
} from "@/lib/internet";

import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

import { ScrollableDualRanking }
  from "@/components/ui/ranking/scrollable-dual-ranking";

export function PenetracionProvinciaView({
  penetracionProvincias,
}: {
  penetracionProvincias:
  ApiResponse<InternetPenetracionProvinciaRow>;
}) {

  const [
    selectedProvincia,
    setSelectedProvincia,
  ] = useState<string>();

  const rankingData =
    getPenetracionProvinciaSortedData(
      penetracionProvincias
    );

  const provinciaData =
    penetracionProvincias.data.map((d) => ({
      provincia: d.provincia,

      total:
        d.accesos_cada_100_hogares,

      tooltipData: [
        {
          label: "Hogares",
          value:
            d.accesos_cada_100_hogares.toFixed(
              2
            ),
          color: "var(--blue-300)",
        },
        {
          label: "Habitantes",
          value:
            d.accesos_cada_100_habitantes.toFixed(
              2
            ),
          color: "var(--accent-green)",
        },
      ],
    }));

  const top =
    penetracionProvincias.data.reduce(
      (a, b) =>
        b.accesos_cada_100_hogares >
          a.accesos_cada_100_hogares
          ? b
          : a
    );

  return (
    <section className="section-wrap alt">
      <div className="section-inner">

        <h2 className="section-heading">
          Penetración por provincia
        </h2>

        <p className="chart-description">
          La mayor penetración
          corresponde a{" "}
          <strong>
            {top.provincia}
          </strong>{" "}
          con{" "}
          <strong>
            {top.accesos_cada_100_hogares.toFixed(
              2
            )}
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
            items={rankingData.map(
              (r) => ({
                id: r.provincia,
                label: r.provincia,
                primary: r.hogares,
                secondary: r.habitantes,
              })
            )}
            primaryLabel="Hogares"
            secondaryLabel="Habitantes"
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