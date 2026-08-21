"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  MercadoPostalFacturacionRow,
  MercadoPostalProduccionRow,
  MercadoPostalPersonalRow,
  MercadoPostalProvinciaRow,
} from "@/lib/mercado-postal";

import { MercadoPostalFacturacion }
  from "./mercado-postal-facturacion";

import { MercadoPostalProduccion }
  from "./mercado-postal-produccion";

import { MercadoPostalPersonal }
  from "./mercado-postal-personal";

import { MercadoPostalProvincias }
  from "./mercado-postal-provincias";

const TABS = [
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
  {
    key: "provincias",
    label: "Provincias",
  },
];

type Props = {
  facturacion: ApiResponse<MercadoPostalFacturacionRow>;
  produccion: ApiResponse<MercadoPostalProduccionRow>;
  personal: ApiResponse<MercadoPostalPersonalRow>;
  provincias: ApiResponse<MercadoPostalProvinciaRow>;
};

export function MercadoPostalTabs({
  facturacion,
  produccion,
  personal,
  provincias,
}: Props) {
  const [active, setActive] =
    useState("facturacion");

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

        {active === "provincias" && (
          <MercadoPostalProvincias
            provincias={provincias}
          />
        )}

      </div>
    </section>
  );
}