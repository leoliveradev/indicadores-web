"use client";

import Link from "next/link";
import { useLatestTwo } from "@/hooks/use-latest-two";
import { trendPct, firstNumKey } from "@/lib/utilsInternet";
import { dispValue, dispCurrency } from "@/lib/format";
import { CustomTooltip } from "@/components/internet/tooltip";
import { KPICard } from "@/components/internet/kpi-card";
import { DonutChart } from "@/components/internet/donut-chart";
import { VelocidadGauge } from "@/components/internet/velocidad-gauge";
import { NavCard } from "@/components/internet/nav-card";

const NAV_ITEMS = [
  {
    href: "/internet/tecnologias",
    title: "Accesos por tecnología",
    desc: "Evolución histórica de ADSL, fibra, etc.",
    badge: "3 endpoints",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#005297" strokeWidth="1.8">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  { 
    href: "/internet/accesos", 
    title: "Accesos por provincia", 
    desc: "Ranking provincial y composición local.", 
    badge: "2 endpoints" },
  { 
    href: "/internet/penetracion", 
    title: "Penetración", desc: "Accesos cada 100 hogares y habitantes.", badge: "2 endpoints" },
  // ... agrega los que necesites
];

export default function InternetPage() {
  const tecnologias = useLatestTwo<any>("/api/v1/internet/accesos/tecnologias");
  const penetracion = useLatestTwo<any>("/api/v1/internet/penetracion");
  const ingresos = useLatestTwo<any>("/api/v1/internet/ingresos");
  const vmd = useLatestTwo<any>("/api/v1/internet/accesos/velocidad-media");

  const periodo = tecnologias.cur ? `${tecnologias.cur.anio}-T${tecnologias.cur.trimestre}` : "—";

  const fiberData = {
    value: tecnologias.cur ? (tecnologias.cur.fibra_optica / tecnologias.cur.total) * 100 : null,
    prev: tecnologias.prev ? (tecnologias.prev.fibra_optica / tecnologias.prev.total) * 100 : null,
  };

  // KPI values
  const fibPct = tecnologias.cur && tecnologias.cur.total > 0
    ? tecnologias.cur.fibra_optica / tecnologias.cur.total * 100 : null;
  const prevFibPct = tecnologias.prev && tecnologias.prev.total > 0
    ? tecnologias.prev.fibra_optica / tecnologias.prev.total * 100 : null;

  const penHogKey = penetracion.cur ? Object.keys(penetracion.cur).find((k) => k.includes("hogar")) ?? null : null;
  const penHabKey = penetracion.cur ? Object.keys(penetracion.cur).find((k) => k.includes("habit") || k.includes("pobl")) ?? null : null;
  const ingKey = ingresos.cur ? firstNumKey(ingresos.cur) : null;

  return (
    <div className="page-container">
      <header className="svc-page-header">
        <div className="svc-page-header-inner">
          <p className="svc-breadcrumb"><Link href="/">Inicio</Link> / Internet</p>
          <h1 className="svc-title">Internet fijo</h1>
        </div>
      </header>

      <main className="page-content">
        <h2 className="section-label">Resumen general — {periodo}</h2>

        <section className="kpi-grid">
          <KPICard
            label="Accesos totales"
            value={tecnologias.cur ? dispValue(tecnologias.cur.total) : null}
            trend={tecnologias.cur && tecnologias.prev ? trendPct(tecnologias.cur.total, tecnologias.prev.total) : null}
          />
          <KPICard
            label="% Fibra óptica"
            value={fiberData.value ? dispValue(fiberData.value, { decimals: 1 }) + "%" : null}
            trend={fiberData.value && fiberData.prev ? trendPct(fiberData.value, fiberData.prev) : null}
          />

          <KPICard
            label={`% Fibra sobre total (${periodo})`}
            value={fibPct !== null ? dispValue(fibPct, { decimals: 1 }) + "%" : null}
            trend={fibPct !== null && prevFibPct !== null ? trendPct(fibPct, prevFibPct) : null}
          />
          <KPICard
            label={`Penetración c/100 hogares (${periodo})`}
            value={penetracion.cur && penHogKey ? dispValue(penetracion.cur[penHogKey], { decimals: 1 }) : null}
            trend={penetracion.cur && penetracion.prev && penHogKey ? trendPct(penetracion.cur[penHogKey], penetracion.prev[penHogKey]) : null}
          />
          <KPICard
            label={`Penetración c/100 hab. (${periodo})`}
            value={penetracion.cur && penHabKey ? dispValue(penetracion.cur[penHabKey], { decimals: 1 }) : null}
            trend={penetracion.cur && penetracion.prev && penHabKey ? trendPct(penetracion.cur[penHabKey], penetracion.prev[penHabKey]) : null}
          />
          <KPICard
            label={`Ingresos miles $ (${periodo})`}
            value={ingresos.cur && ingKey ? dispCurrency(ingresos.cur[ingKey]) : null}
            trend={ingresos.cur && ingresos.prev && ingKey ? trendPct(ingresos.cur[ingKey], ingresos.prev[ingKey]) : null}
          />
        </section>

        {/* Visualizaciones */}
        <section className="charts-container">
          <ChartWrapper title="Composición por tecnología" sub={`Nacional — ${periodo}`}>
            <DonutChart cur={tecnologias.cur} prev={tecnologias.prev} />
          </ChartWrapper>

          <ChartWrapper title="Velocidad media" sub="Mbps de descarga">
            <VelocidadGauge cur={vmd.cur} prev={vmd.prev} />
          </ChartWrapper>
        </section>

        <h2 className="section-label">Explorar datos detallados</h2>
        <nav className="nav-grid">
          {NAV_ITEMS.map((item, index) => (
            <NavCard key={index} {...item} />
          ))}
        </nav>
      </main>
    </div>
  );
}




// Sub-componente local para layout de gráficos
function ChartWrapper({ title, sub, children }: { title: string, sub: string, children: React.ReactNode }) {
  return (
    <div className="chart-card">
      <h3 className="chart-title">{title}</h3>
      <p className="chart-sub">{sub}</p>
      {children}
    </div>
  );
}
