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

import { KPISection }
  from "@/components/home/kpi-section";

import { IndicatorFilter }
  from "@/components/ui/filters/indicator-filter";

import {
  getPenetracionProvinciaHighlights,
} from "@/lib/telefonia-fija/provincias";

import type {
  TelefoniaFijaProvinciaView,
} from "../telefonia-fija-provincias";

type Props = {
  provincias:
  ApiResponse<TelefoniaFijaPenetracionProvinciaRow>;
  view: TelefoniaFijaProvinciaView;
  onViewChange: (
    view: TelefoniaFijaProvinciaView
  ) => void;
};

export function PenetracionProvinciaView({
  provincias,
  view,
  onViewChange,
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

  const highlights =
    getPenetracionProvinciaHighlights(
      provincias.data
    );

  return (
    <>
      <KPISection
        title="Exploración provincial"
        items={highlights}
      />

      <IndicatorFilter
        value={view}
        onChange={onViewChange}
        options={[
          {
            value: "accesos",
            label: "Accesos",
          },
          {
            value: "penetracion",
            label: "Penetración",
          },
        ]}
      />

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
    </>
  );
}