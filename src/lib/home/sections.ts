import { IFija, IInternet, ITV, IMovil, IPort, IVel, IDinero, IPostal, } from "@/components/ui/icons";
import { dispValue, dispCurrencyCompact } from "@/lib/format";
import { Overview } from "@/lib/types";

type KPIItem = {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  format: (v: number) => string | null;
  value: number;
  tooltip?: string;
  href?: string;
};

export function getAccesosItems(data: Overview): KPIItem[] {
  return [
    {
      label: "Telefonía Fija",
      icon: IFija,
      format: (v: number) => dispValue(v, { format: "compact" }),
      value: data.accesos.fija,
      tooltip: "Valores expresados en millones",
      href: "/telefonia-fija/accesos",
    },
    {
      label: "Acceso a Internet Fija",
      icon: IInternet,
      format: (v: number) => dispValue(v, { format: "compact" }),
      value: data.accesos.internet,
      tooltip: "Valores expresados en millones",
      href: "/internet/accesos",
    },
    {
      label: "TV por Suscripción",
      icon: ITV,
      format: (v: number) => dispValue(v, { format: "compact" }),
      value: data.accesos.tv,
      tooltip: "Valores expresados en millones",
      href: "/television/accesos",
    },
    {
      label: "Comunicaciones Móviles",
      icon: IMovil,
      format: (v: number) => dispValue(v, { format: "compact" }),
      value: data.accesos.moviles,
      tooltip: "Valores expresados en millones",
      href: "/comunicaciones-moviles/accesos",
    },
  ];
}

export function getPenetrationItems(data: Overview): KPIItem[] {
  return [
    {
      label: "Telefonía Fija",
      icon: IFija,
      format: (v: number) => dispValue(v, { multiline: true, suffix: "c/100 hogares" }),
      value: data.penetracion.fija,
      tooltip: "Líneas cada 100 hogares",
      href: "/telefonia-fija/penetracion",
    },
    {
      label: "Acceso a Internet Fija",
      icon: IInternet,
      format: (v: number) => dispValue(v, { multiline: true, suffix: "c/100 hogares" }),
      value: data.penetracion.internet,
      tooltip: "Líneas cada 100 hogares",
      href: "/internet/penetracion",
    },
    {
      label: "TV por Suscripción",
      icon: ITV,
      format: (v: number) => dispValue(v, { multiline: true, suffix: "c/100 hogares" }),
      value: data.penetracion.tv,
      tooltip: "Líneas cada 100 hogares",
      href: "/television/penetracion",
    },
    {
      label: "Comunicaciones Móviles",
      icon: IMovil,
      format: (v: number) => dispValue(v, { multiline: true, suffix: "c/100 hab." }),
      value: data.penetracion.moviles,
      tooltip: "Líneas cada 100 habitantes",
      href: "/comunicaciones-moviles/penetracion",
    },
  ];
}

export function getPortabilidadItems(data: Overview): KPIItem[] {
  return [
    {
      label: "Telefonía Fija (acumulado)",
      icon: IFija,
      format: (v: number) => dispValue(v, { decimals: 0 }),
      value: data.portabilidad.fija.acumuladas,
      tooltip: "Portaciones acumuladas desde 2022",
      href: "/portabilidad",
    },
    {
      label: "Telefonía Fija (último mes)",
      icon: IFija,
      format: (v: number) => dispValue(v, { decimals: 0 }),
      value: data.portabilidad.fija.mes,
      tooltip: "Portaciones del último mes",
      href: "/portabilidad",
    },
    {
      label: "Portaciones Móviles (acumulado)",
      icon: IMovil,
      format: (v: number) => dispValue(v, { format: 'compact' }),
      value: data.portabilidad.moviles.acumuladas,
      tooltip: "Portaciones acumuladas desde Marzo de 2012",
      href: "/portabilidad",
    },
    {
      label: "Portaciones Móviles (último mes)",
      icon: IMovil,
      format: (v: number) => dispValue(v, { decimals: 0 }),
      value: data.portabilidad.moviles.mes,
      tooltip: "Portaciones del último mes",
      href: "/portabilidad",
    },
  ];
}

export function getMiscelaneasItems(data: Overview): KPIItem[] {
  return [
    {
      label: "Velocidad media de descarga",
      icon: IVel,
      format: (v: number) => dispValue(v, { decimals: 2, suffix: "Mbps" }),
      value: data.miscelaneas.velocidad_mbps,
      tooltip: "Velocidad media de descarga en Megabits por segundo (Mbps)",
      href: "/internet/accesos/velocidad-media",
    },
    {
      label: "Fibra óptica",
      icon: IInternet,
      format: (v: number) => dispValue(v, { decimals: 2, suffix: "%" }),
      value: data.miscelaneas.fibra_pct,
      tooltip: "Crecimiento anual en porcentaje de accesos de fibra óptica",
      href: "/internet/accesos/fibra-optica",
    },
    {
      label: "Internet satelital",
      icon: IInternet,
      format: (v: number) => dispValue(v, { decimals: 2, suffix: "%" }),
      value: data.miscelaneas.satelital_pct,
      tooltip: "Crecimiento anual en porcentaje de accesos de internet satelital",
      href: "/internet/accesos/internet-satelital",
    },
    {
      label: "Radiobases 4G",
      icon: IMovil,
      format: (v: number) => dispValue(v, { decimals: 0, suffix: " sitios" }),
      value: data.miscelaneas.radiobases_4g,
      tooltip: "Cantidad de sitios con tecnología 4G",
      href: "/comunicaciones-moviles/accesos/radiobases-4g",
    },
  ];
}

export function getFacturacionItems(data: Overview): KPIItem[] {
  return [
    {
      label: "Telefonía Fija",
      icon: IFija,
      format: (v: number) => dispCurrencyCompact(v),
      value: data.ingresos.fija,
      tooltip: "Ingresos acumulados en billones de pesos",
      href: "/telefonia-fija/ingresos",
    },
    {
      label: "Internet",
      icon: IInternet,
      format: (v: number) => dispCurrencyCompact(v),
      value: data.ingresos.internet,
      tooltip: "Ingresos acumulados en billones de pesos",
      href: "/internet/ingresos",
    },
    {
      label: "TV por Suscripción",
      icon: ITV,
      format: (v: number) => dispCurrencyCompact(v),
      value: data.ingresos.tv,
      tooltip: "Ingresos acumulados en billones de pesos",
      href: "/television/ingresos",
    },
    {
      label: "Comunicaciones Móviles",
      icon: IMovil,
      format: (v: number) => dispCurrencyCompact(v),
      value: data.ingresos.moviles,
      tooltip: "Ingresos acumulados en billones de pesos",
      href: "/comunicaciones-moviles/ingresos",
    },
  ];
}

export function getPostalItems(data: Overview): KPIItem[] {
  return [
    {
      label: "Producción",
      icon: IPostal,
      format: (v: number) => dispValue(v, { format: 'compact' }),
      value: data.postal.produccion,
      tooltip: "Producción acumulada en billones de unidades",
      href: "/mercado-postal/produccion",
    },
    {
      label: "Facturación",
      icon: IDinero,
      format: (v: number) => dispCurrencyCompact(v),
      value: data.postal.facturacion,
      tooltip: "Ingresos acumulados en billones de pesos",
      href: "/mercado-postal/facturacion",
    }
  ];
}