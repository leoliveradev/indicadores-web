import { getOverview } from "@/lib/api";
import { getAccesosItems, getFacturacionItems, getMiscelaneasItems, getPenetrationItems, getPortabilidadItems, getPostalItems } from "@/lib/home/sections";
import { KPISection } from "@/components/home/kpi-section";
import { fmtPeriod } from "@/lib/format";


export default async function HomePage() {
  const data = await getOverview();

  const period = fmtPeriod(data.periodo);

  return (
    <>
      {/* HERO */}
      <div className="home-hero">
        <div className="home-hero-inner">
          <div className="home-period-badge">
            {period} · Datos oficiales ENACOM
          </div>
          <h1 className="home-title">
            Indicadores del sector TIC en Argentina
          </h1>
        </div>
      </div>

      {/* SECTIONS */}
      <KPISection
        title="Accesos"
        items={getAccesosItems(data)}
      />

      <KPISection
        title="Penetración"
        items={getPenetrationItems(data)}
      />

      <KPISection
        title="Portabilidad"
        items={getPortabilidadItems(data)}
      />

      <KPISection
        title="Misceláneas"
        items={getMiscelaneasItems(data)}
      />

      <KPISection
        title="Facturación"
        items={getFacturacionItems(data)}
      />

      <KPISection
        title="Mercado Postal"
        items={getPostalItems(data)}
      />

    </>
  );
}