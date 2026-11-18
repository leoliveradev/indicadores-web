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

import type {
  InternetProvinciaView,
} from "../internet-provincias";
import { getPenetracionProvinciaKPIItems } from "@/lib/internet/provincias";
import { KPISection } from "@/components/home/kpi-section";
import { IndicatorFilter } from "@/components/ui/filters/indicator-filter";

type Props = {
  penetracionProvincias: ApiResponse<InternetPenetracionProvinciaRow>;
  view: InternetProvinciaView;
  onViewChange: (
    view: InternetProvinciaView
  ) => void;
};

export function PenetracionProvinciaView({
  penetracionProvincias,
  view,
  onViewChange,
}: Props) {

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

  const kpiItems =
    getPenetracionProvinciaKPIItems(
      penetracionProvincias.data
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
    </>
  );
}