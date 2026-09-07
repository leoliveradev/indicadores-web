"use client";

import { useMemo, useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  InternetAccesosVelocidadRow,
} from "@/lib/internet";

import {
  filterAccesosVelocidadByProvincia,
  getAccesosVelocidadProvincias,
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

  const [provincia, setProvincia] =
    useState("all");

  const provincias = useMemo(
    () =>
      getAccesosVelocidadProvincias(
        velocidades.data
      ),
    [velocidades.data]
  );

  const filteredRows = useMemo(
    () =>
      filterAccesosVelocidadByProvincia(
        velocidades.data,
        provincia
      ),
    [
      velocidades.data,
      provincia,
    ]
  );

  const rangosData = useMemo(
    () =>
      getAccesosVelocidadRangosData(
        filteredRows
      ),
    [filteredRows]
  );

  const detalleData = useMemo(
    () =>
      getAccesosVelocidadData(
        filteredRows
      ),
    [filteredRows]
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

  const totalAccesos = useMemo(
    () =>
      filteredRows.reduce(
        (acc, row) =>
          acc + row.accesos,
        0
      ),
    [filteredRows]
  );

  const insights = useMemo(
    () =>
      view === "rangos"
        ? getAccesosVelocidadRangosInsights(
          rangosData,
          provincia
        )
        : getAccesosVelocidadInsights(
          detalleData
        ),
    [
      view,
      provincia,
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

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
          >
            Provincia
          </label>

          <select
            value={provincia}
            onChange={(e) =>
              setProvincia(
                e.target.value
              )
            }
            className="border rounded-md px-3 py-2"
          >
            <option value="all">
              Todas las provincias
            </option>

            {provincias.map((p) => (
              <option
                key={p}
                value={p}
              >
                {p}
              </option>
            ))}
          </select>
        </div>

        <p className="chart-description">
          Accesos relevados:{" "}
          <strong>
            {dispValue(totalAccesos, {
              format: "number",
              decimals: 0,
            })}
          </strong>
        </p>

        <div className="flex gap-2 mb-4">
          <button
            className={`tab-btn ${view === "rangos"
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
            className={`tab-btn ${view === "detalle"
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