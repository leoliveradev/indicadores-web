"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelevisionPenetracionProvinciaRow,
} from "@/lib/television";

import {
  getPenetracionProvinciaSortedData,
} from "@/lib/television";

import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

import { ScrollableDualRanking }
  from "@/components/ui/ranking/scrollable-dual-ranking";

import type {
  TelevisionProvinciaView,
} from "../television-provincias";

import { IndicatorFilter } from "@/components/ui/filters/indicator-filter";
import { getPenetracionProvinciaHighlights } from "@/lib/television/provincias";
import { KPISection } from "@/components/home/kpi-section";

type Props = {
  provincias: ApiResponse<TelevisionPenetracionProvinciaRow>;
  view: TelevisionProvinciaView;
  onViewChange: (
    view: TelevisionProvinciaView
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
      total: d.tv_suscripcion_100_hogares,

      tooltipData: [
        {
          label: "Hogares",
          value:
            d.tv_suscripcion_100_hogares.toFixed(2),
          color: "var(--accent-green)",
        },
        {
          label: "Habitantes",
          value:
            d.tv_suscripcion_100_habitantes.toFixed(2),
          color: "var(--accent-amber)",
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