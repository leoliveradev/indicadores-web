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

import { KPISection }
  from "@/components/home/kpi-section";

import { IndicatorFilter }
  from "@/components/ui/filters/indicator-filter";

import {
  getTecnologiaProvinciaHighlights,
} from "@/lib/internet/provincias";


import type {
  InternetProvinciaView,
} from "../internet-provincias";

type Props = {
  tecnologiasProvincias: ApiResponse<InternetTecnologiaProvinciaRow>;
  view: InternetProvinciaView;
  onViewChange: (
    view: InternetProvinciaView
  ) => void;
};

export function TecnologiaProvinciaView({
  tecnologiasProvincias,
  view,
  onViewChange,
}: Props) {

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

  const highlights =
    getTecnologiaProvinciaHighlights(
      tecnologiasProvincias.data
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
    </>
  );
}