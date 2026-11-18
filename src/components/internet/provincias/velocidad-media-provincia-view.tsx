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

import { KPISection }
  from "@/components/home/kpi-section";

import { IndicatorFilter }
  from "@/components/ui/filters/indicator-filter";

import {
  getVelocidadMediaProvinciaKPIItems,
} from "@/lib/internet/provincias";

import type {
  InternetProvinciaView,
} from "../internet-provincias";

type Props = {
  provincias: ApiResponse<InternetVelocidadMediaProvinciasRow>;
  view: InternetProvinciaView;
  onViewChange: (
    view: InternetProvinciaView
  ) => void;
};

export function VelocidadMediaProvinciaView({
  provincias,
  view,
  onViewChange,
}: Props) {
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

  const kpiItems =
    getVelocidadMediaProvinciaKPIItems(
      provincias.data
    );

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
            value: "tecnologia",
            label: "Tecnología",
          },
          {
            value: "velocidad",
            label: "Velocidad media",
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
    </>
  );
}