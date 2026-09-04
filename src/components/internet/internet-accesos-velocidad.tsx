"use client";

import { useMemo, useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  InternetAccesosVelocidadRow,
} from "@/lib/internet";

import {
  getAccesosVelocidadData,
  getAccesosVelocidadRangosData,
} from "@/lib/internet/accesos-velocidad";

import {
  getAccesosVelocidadInsights,
  getAccesosVelocidadRangosInsights,
} from "@/lib/internet/insights";

import { BarChartBase }
  from "@/components/ui/charts/bar-chart-base";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import { dispValue }
  from "@/lib/format";

type Props = {
  velocidades: ApiResponse<InternetAccesosVelocidadRow>;
};

export function InternetAccesosVelocidad({
  velocidades,
}: Props) {
  const [view, setView] =
    useState<"rangos" | "detalle">(
      "rangos"
    );

  const detalleData = useMemo(
    () =>
      getAccesosVelocidadData(
        velocidades
      ),
    [velocidades]
  );

  const rangosData = useMemo(
    () =>
      getAccesosVelocidadRangosData(
        velocidades
      ),
    [velocidades]
  );

  const chartData = useMemo(
    () =>
      view === "rangos"
        ? rangosData
        : detalleData,
    [
      view,
      rangosData,
      detalleData,
    ]
  );

  const insights = useMemo(
    () =>
      view === "rangos"
        ? getAccesosVelocidadRangosInsights(
            rangosData
          )
        : getAccesosVelocidadInsights(
            detalleData
          ),
    [
      view,
      rangosData,
      detalleData,
    ]
  );

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <h2 className="section-heading">
          Accesos por velocidad
        </h2>

        <div className="flex gap-2 mb-4">
          <button
            className={`tab-btn ${
              view === "rangos"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setView("rangos")
            }
          >
            Rangos
          </button>

          <button
            className={`tab-btn ${
              view === "detalle"
                ? "active"
                : ""
            }`}
            onClick={() =>
              setView("detalle")
            }
          >
            Detalle
          </button>
        </div>

        <p className="chart-description">
          {view === "rangos"
            ? "Distribución de accesos agrupada por rangos de velocidad para el último período disponible."
            : "Detalle de accesos por velocidad para el último período disponible."}
        </p>

        <div className="chart-card">
          <BarChartBase
            data={chartData}
            dataKey="accesos"
            xDataKey={
              view === "rangos"
                ? "rango"
                : "velocidad"
            }
            label="Accesos"
            color="var(--blue-300)"
            yFormatter={(v) =>
              dispValue(v, {
                format: "compact",
              })
            }
            tooltipFormatter={(v) =>
              v.toLocaleString("es-AR")
            }
          />
        </div>

        <InsightsCard
          insights={insights}
        />

      </div>
    </section>
  );
}