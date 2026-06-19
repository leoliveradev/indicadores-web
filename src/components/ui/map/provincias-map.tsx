"use client";

import { geoMercator, geoPath } from "d3-geo";
import { useState } from "react";
import { useGeoData } from "@/hooks/useGeoData";
import { useColorScale } from "@/hooks/useColorScale";
import { MapTooltip } from "@/components/ui/map/map-tooltip";
import { MapLegend } from "@/components/ui/map/map-legend";
import { PROVINCE_MAP } from "@/lib/maps";

type Props = {
  data: {
    provincia: string;
    total: number,
    hogares?: number;
    habitantes?: number;
  }[];
  onSelect?: (provincia: string) => void;
};

export function ProvinciasMap({ data, onSelect }: Props) {
  const geo = useGeoData();
  const [tooltip, setTooltip] = useState<any>(null);

  const GEO_TO_API = Object.fromEntries(
    Object.entries(PROVINCE_MAP).map(([api, geo]) => [geo, api])
  );

  const mapData = Object.fromEntries(
    data.map((d) => [
      PROVINCE_MAP[d.provincia],
      {
        total: d.total,
        hogares: d.hogares,
        habitantes: d.habitantes,
      },
    ])
  );

  const values = data.map((d) => d.total);
  const colorScale = useColorScale(values);

  if (!geo) return null;

  const projection = geoMercator().fitSize([800, 900], geo);
  const path = geoPath(projection);

  return (
    <div className="chart-container" style={{ position: "relative" }}>
      <svg width="100%" viewBox="0 0 800 900">
        {geo.features.map((feature: any) => {

          const geoName = feature.properties.NAME_1;
          const apiName = GEO_TO_API[geoName] || geoName;
          const entry = mapData[geoName];
          const value = entry?.total ?? 0;

          return (
            <path
              key={geoName}
              d={path(feature) || ""}
              fill={colorScale(value)}
              stroke="#fff"
              strokeWidth={0.5}
              onClick={() => onSelect?.(geoName)}
              onMouseMove={(e) => {
                const bounds = e.currentTarget.getBoundingClientRect();

                setTooltip({
                  x: e.clientX - bounds.left,
                  y: e.clientY - bounds.top,
                  name: apiName,
                  value,
                  hogares: entry?.hogares,
                  habitantes: entry?.habitantes,
                });
              }}
              onMouseLeave={() => setTooltip(null)}
              style={{ cursor: "pointer" }}
            />
          );
        })}
      </svg>

      {tooltip && <MapTooltip {...tooltip} />}

      <MapLegend scale={colorScale} />
    </div>
  );
}