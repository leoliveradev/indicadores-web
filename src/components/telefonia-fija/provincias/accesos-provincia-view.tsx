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

import type {
  TelefoniaFijaProvinciaView,
} from "../telefonia-fija-provincias";
import { getAccesosProvinciaKPIItems } from "@/lib/telefonia-fija/provincias";
import { KPISection } from "@/components/home/kpi-section";
import { IndicatorFilter } from "@/components/ui/filters/indicator-filter";

type Props = {
  provincias: ApiResponse<TelefoniaFijaAccesosProvinciaRow>;
  view: TelefoniaFijaProvinciaView;
  onViewChange: (
    view: TelefoniaFijaProvinciaView
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
    provincias.data.map((p) => ({
      provincia: p.provincia,
      total: p.total,
    }));

  const top = rankingData[0];

  const kpiItems =
    getAccesosProvinciaKPIItems(
      provincias.data
    );

  return (
    <>
      <KPISection
        title="Exploración provincial"
        items={kpiItems}
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