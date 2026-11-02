"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  PortabilidadMovilRow,
} from "@/lib/portabilidad";

import {
  PortabilidadResumen,
} from "./portabilidad-resumen";

import {
  PortabilidadEvolucion,
} from "./portabilidad-evolucion";

import {
  PortabilidadEstacionalidad,
} from "./portabilidad-estacionalidad";

type TabKey =
  | "resumen"
  | "evolucion"
  | "estacionalidad";

const TABS: {
  key: TabKey;
  label: string;
}[] = [
  {
    key: "resumen",
    label: "Resumen",
  },
  {
    key: "evolucion",
    label: "Evolución",
  },
  {
    key: "estacionalidad",
    label: "Estacionalidad",
  },
];

type Props = {
  data: ApiResponse<PortabilidadMovilRow>;
};

export function PortabilidadTabs({
  data,
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
          <PortabilidadResumen
            data={data}
          />
        )}

        {active === "evolucion" && (
          <PortabilidadEvolucion
            data={data}
          />
        )}

        {active === "estacionalidad" && (
          <PortabilidadEstacionalidad
            data={data}
          />
        )}

      </div>
    </section>
  );
}