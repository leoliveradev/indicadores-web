"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  TelevisionAccesosProvinciaRow,
} from "@/lib/television";

import {
  getAccesosProvinciaSortedData,
} from "@/lib/television";

import { ProvinciasMap }
  from "@/components/ui/map/provincias-map";

import { ScrollableRanking }
  from "@/components/ui/ranking/scrollable-ranking";

import { dispValue } from "@/lib/format";
import { KPISection } from "@/components/home/kpi-section";
import { getAccesosProvinciaHighlights } from "@/lib/television/provincias";
import { IndicatorFilter } from "@/components/ui/filters/indicator-filter";

import type {
  TelevisionProvinciaView,
} from "../television-provincias";

type Props = {
  provincias: ApiResponse<TelevisionAccesosProvinciaRow>;
  view: TelevisionProvinciaView;
  onViewChange: (
    view: TelevisionProvinciaView
  ) => void;
};

export function AccesosProvinciaView({
  provincias,
  view,
  onViewChange,
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
    provincias.data.map((row) => ({
      provincia: row.provincia,
      total: row.tv_suscripcion,
    }));

  const top = rankingData[0];
  const highlights =
    getAccesosProvinciaHighlights(
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
        La provincia líder es{" "}
        <strong>{top.provincia}</strong>.
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
    </>
  );
}