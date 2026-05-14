import { getOverview } from "@/lib/api";
import { Section } from "@/components/home/section";
import { KPIValCard } from "@/components/home/kpi-val-card";
import { dispValue, dispCurrencyCompact } from "@/lib/format";
import {
  IFija,
  IInternet,
  ITV,
  IMovil,
  IPort,
  IVel,
  IDinero,
  IPostal,
} from "@/components/ui/icons";

// 👉 helper simple (después podés mejorarlo)
function formatPeriodo(periodo: string) {
  if (!periodo) return "Último período disponible";

  const [anio, mes] = periodo.split("-");
  return `${mes === "12" ? "Diciembre" : "Mes"} ${anio}`;
}

export default async function HomePage() {
  const data = await getOverview();

  const periodo = formatPeriodo(data.periodo);

  return (
    <>
      {/* HERO */}
      <div className="home-hero">
        <div className="home-hero-inner">
          <div className="home-period-badge">
            Indicadores a {periodo}
          </div>
          <h1 className="home-title">
            Indicadores del Sector TIC · Argentina
          </h1>
        </div>
      </div>

      {/* ACCESOS */}
      <Section title="Accesos">
        <KPIValCard
          label="Telefonía Fija"
          tooltip="Valores expresados en millones"
          icon={<IFija />}
          display={dispValue(data.accesos.fija, {
            format: "millions",
            suffix: "M"
          })}
          href="/telefonia-fija/accesos"

        />
        <KPIValCard
          label="Acceso a Internet Fija"
          tooltip="Valores expresados en millones"
          icon={<IInternet />}
          display={dispValue(data.accesos.internet, {
            format: "millions",
            suffix: "M"
          })}
          href="/internet/accesos"
        />
        <KPIValCard
          label="TV por Suscripción"
          tooltip="Valores expresados en millones"
          icon={<ITV />}
          display={dispValue(data.accesos.tv, {
            format: "millions",
            suffix: "M"
          })}
          href="/television/accesos"
        />
        <KPIValCard
          label="Comunicaciones Móviles"
          tooltip="Valores expresados en millones"
          icon={<IMovil />}
          display={dispValue(data.accesos.moviles, {
            format: "millions",
            suffix: "M"
          })}
          href="/comunicaciones-moviles/accesos"
        />
      </Section>

      {/* PENETRACIÓN */}
      <Section title="Penetración" alt>
        <KPIValCard
          label="Telefonía Fija"
          tooltip="Líneas cada 100 hogares"
          icon={<IFija />}
          display={dispValue(data.penetracion.fija, {
            multiline: true,
            suffix: "c/100 hogares"
          })}
          href="/telefonia-fija/penetracion"
        />
        <KPIValCard
          label="Acceso a Internet Fija"
          tooltip="Líneas cada 100 hogares"
          icon={<IInternet />}
          display={dispValue(data.penetracion.internet, {
            multiline: true,
            suffix: "c/100 hogares"
          })}
          href="/internet/penetracion"
        />
        <KPIValCard
          label="TV por Suscripción"
          tooltip="Líneas cada 100 hogares"
          icon={<ITV />}
          display={dispValue(data.penetracion.tv, {
            suffix: "c/100 hogares",
            multiline: true
          })}
          href="/television/penetracion"
        />
        <KPIValCard
          label="Comunicaciones Móviles"
          tooltip="Líneas cada 100 habitantes"
          icon={<IMovil />}
          display={dispValue(data.penetracion.moviles, {
            suffix: "c/100 hab.",
            multiline: true
          })}
          href="/comunicaciones-moviles/penetracion"
        />
      </Section>

      {/* PORTABILIDAD */}
      <Section title="Portabilidad">
        <KPIValCard
          label="Telefonía Fija (acumulado)"
          tooltip="Portaciones acumuladas desde 2022"
          icon={<IFija />}
          display={dispValue(data.portabilidad.fija.acumuladas, {
            decimals: 0
          })}
        />
        <KPIValCard
          label="Telefonía Fija (último mes)"
          tooltip="Portaciones del último mes"
          icon={<IFija />}
          display={dispValue(data.portabilidad.fija.mes, {
            decimals: 0
          })}
        />
        <KPIValCard
          label="Portaciones Móviles (acumulado)"
          tooltip="Portaciones acumuladas desde Marzo de 2012"
          icon={<IMovil />}
          display={dispValue(data.portabilidad.moviles.acumuladas, {
            format: 'compact'
          })}
        />
        <KPIValCard
          label="Portaciones Móviles (último mes)"
          tooltip="Portaciones del último mes"
          icon={<IMovil />}
          display={dispValue(data.portabilidad.moviles.mes, {
            decimals: 0
          })}
          href="/portabilidad"
        />
      </Section>

      {/* MISCELÁNEAS */}
      <Section title="Misceláneas">
        <KPIValCard
          label="Velocidad media de descarga"
          tooltip="Velocidad media de descarga en Megabits por segundo (Mbps)"
          icon={<IVel />}
          display={dispValue(data.miscelaneas.velocidad_mbps, {
            decimals: 2,
            suffix: "Mbps"
          })}
          href="/internet/accesos/velocidad-media"
        />
        <KPIValCard
          label="Fibra óptica"
          tooltip="Crecimiento anual en porcentaje de accesos de fibra óptica"
          icon={<IInternet />}
          display={dispValue(data.miscelaneas.fibra_pct, {
            decimals: 2,
            suffix: "%"
          })}
        />
        <KPIValCard
          label="Internet satelital"
          tooltip="Crecimiento anual en porcentaje de accesos de internet satelital"
          icon={<IInternet />}
          display={dispValue(data.miscelaneas.satelital_pct, {
            decimals: 2,
            suffix: "%"
          })}
        />
        <KPIValCard
          label="Radiobases 4G"
          tooltip="Cantidad de sitios con tecnología 4G"
          icon={<IVel />}
          display={dispValue(data.miscelaneas.radiobases_4g, {
            decimals: 0,
            suffix: " sitios"
          })}
        />
      </Section>

      {/* FACTURACIÓN */}
      <Section title="Facturación" alt>
        <KPIValCard
          label="Telefonía Fija"
          tooltip="Ingresos acumulados en billones de pesos"
          icon={<IFija />}
          display={dispCurrencyCompact(data.ingresos.fija)}
          href="/telefonia-fija/ingresos"
        />
        <KPIValCard
          label="Internet"
          tooltip="Ingresos acumulados en billones de pesos"
          icon={<IInternet />}
          display={dispCurrencyCompact(data.ingresos.internet)}
          href="/internet/ingresos"
        />
        <KPIValCard
          label="TV por Suscripción"
          tooltip="Ingresos acumulados en billones de pesos"
          icon={<ITV />}
          display={dispCurrencyCompact(data.ingresos.tv)}
          href="/television/ingresos"
        />
        <KPIValCard
          label="Comunicaciones Móviles"
          tooltip="Ingresos acumulados en billones de pesos"
          icon={<IMovil />}
          display={dispCurrencyCompact(data.ingresos.moviles)}
          href="/comunicaciones-moviles/ingresos"
        />
      </Section>

      {/* MERCADO POSTAL */}
      <Section title="Mercado Postal" alt>
        <KPIValCard
          label="Producción"
          tooltip="Producción acumulada en billones de unidades"
          icon={<IPostal />}
          display={dispValue(data.postal.produccion, {
            decimals: 0,
            format: 'compact'
          })}
        />
        <KPIValCard
          label="Facturación"
          tooltip="Ingresos acumulados en billones de pesos"
          icon={<IDinero />}
          display={dispCurrencyCompact(data.postal.facturacion)}
        />
      </Section>
    </>
  );
}