"use client";

import { useState } from "react";

import type { ApiResponse } from "@/lib/types";

import type {
  ComunicacionesMovilesLlamadasRow,
  ComunicacionesMovilesMinutosRow,
  ComunicacionesMovilesSmsRow,
} from "@/lib/comunicaciones-moviles";

import { KPISection }
  from "@/components/home/kpi-section";

import {
  getTraficoKPIItems,
} from "@/lib/comunicaciones-moviles/trafico";

import { TraficoLlamadas }
  from "./trafico-llamadas";

import { TraficoMinutos }
  from "./trafico-minutos";

import { TraficoSms }
  from "./trafico-sms";

type Props = {
  llamadas: ApiResponse<ComunicacionesMovilesLlamadasRow>;
  minutos: ApiResponse<ComunicacionesMovilesMinutosRow>;
  sms: ApiResponse<ComunicacionesMovilesSmsRow>;
};

const TABS = [
  { key: "llamadas", label: "Llamadas", },
  { key: "minutos", label: "Minutos", },
  { key: "sms", label: "SMS", },
] as const;

type TabKey =
  | "llamadas"
  | "minutos"
  | "sms";

export function ComunicacionesMovilesTrafico({
  llamadas,
  minutos,
  sms,
}: Props) {
  const [activeTab, setActiveTab] =
    useState<TabKey>("llamadas");

  const kpiItems =
    getTraficoKPIItems(
      llamadas,
      minutos,
      sms
    );

  return (
    <>
      <KPISection
        title="Tráfico móvil"
        items={kpiItems}
      />

      <section className="section-wrap">
        <div className="section-inner">
          <div className="tab-bar">

            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`tab-btn ${activeTab === tab.key
                  ? "active"
                  : ""
                  }`}
                onClick={() =>
                  setActiveTab(tab.key)
                }
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div>

            {activeTab === "llamadas" && (
              <TraficoLlamadas
                llamadas={llamadas}
              />
            )}

            {activeTab === "minutos" && (
              <TraficoMinutos
                minutos={minutos}
              />
            )}

            {activeTab === "sms" && (
              <TraficoSms
                sms={sms}
              />
            )}

          </div>
        </div>
      </section >

    </>
  );
}