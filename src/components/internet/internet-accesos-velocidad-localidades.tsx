"use client";

import { useMemo, useState } from "react";

import { GeoFilter } from "@/components/ui/filters/geo-filter";

import { BarChartBase }
  from "@/components/ui/charts/bar-chart-base";

import { InsightsCard }
  from "@/components/ui/insights/insights-card";

import { KPISection }
  from "@/components/home/kpi-section";

import { useGeoFilters }
  from "@/hooks/use-geo-filters";

import {
  getInternetAccesosVelocidadLocalidades,
} from "@/lib/api/internet";

import {
  getAccesosVelocidadData,
  getAccesosVelocidadRangosData,
} from "@/lib/internet";

import { dispValue }
  from "@/lib/format";

import {
  getAccesosVelocidadLocalidadInsights,
} from "@/lib/internet/insights";

import type {
  ProvinciaGeo,
  PartidoGeo,
  LocalidadGeo,
} from "@/lib/geo";

import type {
  InternetAccesosVelocidadLocalidadRow,
} from "@/lib/internet";

import {
  getAccesosVelocidadLocalidadKpi,
  getAccesosVelocidadLocalidadKPIItems
} from "@/lib/internet/accesos-velocidad-kpis";

type Props = {
  provincias: ProvinciaGeo[];
  partidos: PartidoGeo[];
  localidades: LocalidadGeo[];
};

export function InternetAccesosVelocidadLocalidades({
  provincias,
  partidos,
  localidades,
}: Props) {

  const {
    provinciaId,
    partidoId,
    localidadId,

    provincia,
    partido,
    localidad,

    partidosDisponibles,
    localidadesDisponibles,

    setProvinciaId,
    setPartidoId,
    setLocalidadId,
  } = useGeoFilters({
    provincias,
    partidos,
    localidades,
  });

  const [view, setView] =
    useState<"rangos" | "detalle">(
      "rangos"
    );

  const [rows, setRows] =
    useState<
      InternetAccesosVelocidadLocalidadRow[]
    >([]);

  const [loading, setLoading] =
    useState(false);

  const handleConsultar =
    async () => {

      if (
        !provincia ||
        !partido ||
        !localidad
      ) {
        return;
      }

      setLoading(true);

      try {

        const response =
          await getInternetAccesosVelocidadLocalidades({
            provincia:
              provincia.provincia,
            partido:
              partido.partido,
            localidad:
              localidad.localidad,
            limit: 100,
          });

        setRows(response.data);

      } finally {
        setLoading(false);
      }
    };

  const rangosData = useMemo(
    () =>
      getAccesosVelocidadRangosData(
        rows
      ),
    [rows]
  );

  const detalleData = useMemo(
    () =>
      getAccesosVelocidadData(
        rows
      ),
    [rows]
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

  const kpi = useMemo(
    () =>
      getAccesosVelocidadLocalidadKpi(
        rows
      ),
    [rows]
  );

  const kpiItems = useMemo(
    () =>
      getAccesosVelocidadLocalidadKPIItems(
        kpi
      ),
    [kpi]
  );

  const insights = useMemo(
    () =>
      localidad
        ? getAccesosVelocidadLocalidadInsights(
          localidad.localidad,
          rangosData,
          kpi.porcentaje100Plus
        )
        : [],
    [
      localidad,
      rangosData,
      kpi.porcentaje100Plus,
    ]
  );

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <h2 className="section-heading">
          Accesos por velocidad - Localidades
        </h2>

        <GeoFilter
          label="Provincia"
          value={String(
            provinciaId ?? ""
          )}
          options={provincias.map(
            (p) => ({
              value: String(p.id),
              label: p.provincia,
            })
          )}
          onChange={(value) =>
            setProvinciaId(
              value
                ? Number(value)
                : null
            )
          }
          allLabel="Seleccione provincia"
          allValue=""
        />

        {provinciaId && (
          <GeoFilter
            label="Partido"
            value={String(
              partidoId ?? ""
            )}
            options={partidosDisponibles.map(
              (p) => ({
                value: String(p.id),
                label: p.partido,
              })
            )}
            onChange={(value) =>
              setPartidoId(
                value
                  ? Number(value)
                  : null
              )
            }
            allLabel="Seleccione partido"
            allValue=""
          />
        )}

        {partidoId && (
          <GeoFilter
            label="Localidad"
            value={String(
              localidadId ?? ""
            )}
            options={localidadesDisponibles.map(
              (l) => ({
                value: String(l.id),
                label: l.localidad,
              })
            )}
            onChange={(value) =>
              setLocalidadId(
                value
                  ? Number(value)
                  : null
              )
            }
            allLabel="Seleccione localidad"
            allValue=""
          />
        )}

        <button
          className="tab-btn"
          disabled={
            !provincia ||
            !partido ||
            !localidad ||
            loading
          }
          onClick={
            handleConsultar
          }
        >
          {loading
            ? "Consultando..."
            : "Consultar"}
        </button>

        {!!rows.length && (
          <>
            <p className="chart-description mt-4">
              Accesos relevados:{" "}
              <strong>
                {dispValue(
                  kpi.totalAccesos,
                  {
                    format:
                      "number",
                  }
                )}
              </strong>
            </p>

            <KPISection
              title="Indicadores"
              items={kpiItems}
            />

            <div className="flex gap-2 mb-4">
              <button
                className={`tab-btn ${view === "rangos"
                  ? "active"
                  : ""
                  }`}
                onClick={() =>
                  setView(
                    "rangos"
                  )
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
                  setView(
                    "detalle"
                  )
                }
              >
                Detalle
              </button>
            </div>

            <div className="chart-card">
              <BarChartBase
                data={chartData}
                dataKey="accesos"
                xDataKey={
                  view ===
                    "rangos"
                    ? "rango"
                    : "velocidad"
                }
                label="Accesos"
                color="var(--blue-300)"
                yFormatter={(
                  v
                ) =>
                  dispValue(v, {
                    format:
                      "compact",
                  })
                }
                tooltipFormatter={(
                  v
                ) =>
                  v.toLocaleString(
                    "es-AR"
                  )
                }
              />
            </div>

            <InsightsCard
              insights={insights}
            />
          </>
        )}

      </div>
    </section>
  );
}