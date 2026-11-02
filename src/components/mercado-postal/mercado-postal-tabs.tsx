"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalFacturacionRow,
  MercadoPostalProduccionRow,
  MercadoPostalPersonalRow,
  MercadoPostalProvinciaRow,
} from "@/lib/mercado-postal";

import {
  MercadoPostalResumen,
} from "./mercado-postal-resumen";

import {
  MercadoPostalFacturacion,
} from "./mercado-postal-facturacion";

import {
  MercadoPostalProduccion,
} from "./mercado-postal-produccion";

import {
  MercadoPostalPersonal,
} from "./mercado-postal-personal";

import {
  MercadoPostalProvincias,
} from "./mercado-postal-provincias";

type TabKey =
  | "resumen"
  | "provincias"
  | "facturacion"
  | "produccion"
  | "personal";

const TABS: {
  key: TabKey;
  label: string;
}[] = [
  {
    key: "resumen",
    label: "Resumen",
  },
  {
    key: "provincias",
    label: "Provincias",
  },
  {
    key: "facturacion",
    label: "Facturación",
  },
  {
    key: "produccion",
    label: "Producción",
  },
  {
    key: "personal",
    label: "Personal",
  },
];

type Props = {
  facturacion:
    ApiResponse<MercadoPostalFacturacionRow>;

  produccion:
    ApiResponse<MercadoPostalProduccionRow>;

  personal:
    ApiResponse<MercadoPostalPersonalRow>;

  provincias:
    ApiResponse<MercadoPostalProvinciaRow>;
};

export function MercadoPostalTabs({
  facturacion,
  produccion,
  personal,
  provincias,
}: Props) {

  const [active, setActive] =
    useState<TabKey>("resumen");

  return (
    <section className="section-wrap">
      <div className="section-inner">

        <div className="tab-bar">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn ${
                active === tab.key
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActive(tab.key)
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {active === "resumen" && (
          <MercadoPostalResumen
            facturacion={facturacion}
            produccion={produccion}
            personal={personal}
          />
        )}

        {active === "provincias" && (
          <MercadoPostalProvincias
            provincias={provincias}
          />
        )}

        {active === "facturacion" && (
          <MercadoPostalFacturacion
            facturacion={facturacion}
          />
        )}

        {active === "produccion" && (
          <MercadoPostalProduccion
            produccion={produccion}
          />
        )}

        {active === "personal" && (
          <MercadoPostalPersonal
            personal={personal}
          />
        )}

      </div>
    </section>
  );
}