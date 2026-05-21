export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:3333';

export interface EndpointConfig {
  path: string;
  label: string;
  tab: string;
  hasProvincias?: boolean;
  hasLocalidades?: boolean;
  unit?: string;
}

// ── Internet ──────────────────────────────────────────────────────────
export const INTERNET_ENDPOINTS: EndpointConfig[] = [
  {
    path:          "/api/v1/internet/accesos",
    label:         "Accesos totales",
    tab:           "accesos",
    hasProvincias: true,
    unit:          "accesos",
  },
  {
    path:          "/api/v1/internet/penetracion",
    label:         "Penetración",
    tab:           "penetracion",
    hasProvincias: true,
    unit:          "accesos/100 hab.",
  },
  {
    path:          "/api/v1/internet/tecnologias",
    label:         "Tecnologías",
    tab:           "tecnologias",
    hasProvincias: true,
    hasLocalidades: true,
  },
  {
    path:          "/api/v1/internet/velocidad/media",
    label:         "Velocidad media",
    tab:           "velocidad",
    hasProvincias: true,
    unit:          "Mbps",
  },
  {
    path:          "/api/v1/internet/velocidad/rangos",
    label:         "Rangos de velocidad",
    tab:           "velocidad-rangos",
    hasProvincias: true,
  },
  {
    path:          "/api/v1/internet/ingresos",
    label:         "Ingresos",
    tab:           "ingresos",
    unit:          "$",
  },
];

// ── Comunicaciones Móviles ─────────────────────────────────────────────
export const MOVILES_ENDPOINTS: EndpointConfig[] = [
  { path: "/api/v1/comunicaciones-moviles/accesos",     label: "Accesos",      tab: "accesos",     unit: "líneas" },
  { path: "/api/v1/comunicaciones-moviles/ingresos",    label: "Ingresos",     tab: "ingresos",    unit: "$" },
  { path: "/api/v1/comunicaciones-moviles/llamadas",    label: "Llamadas",     tab: "llamadas",    unit: "llamadas" },
  { path: "/api/v1/comunicaciones-moviles/minutos",     label: "Minutos",      tab: "minutos",     unit: "minutos" },
  { path: "/api/v1/comunicaciones-moviles/penetracion", label: "Penetración",  tab: "penetracion", unit: "líneas/100 hab." },
  { path: "/api/v1/comunicaciones-moviles/sms",         label: "SMS",          tab: "sms",         unit: "mensajes" },
];

// ── Telefonía Fija ────────────────────────────────────────────────────
export const FIJA_ENDPOINTS: EndpointConfig[] = [
  { path: "/api/v1/telefonia-fija/accesos",     label: "Accesos",     tab: "accesos",    hasProvincias: true },
  { path: "/api/v1/telefonia-fija/ingresos",    label: "Ingresos",    tab: "ingresos",   unit: "$" },
  { path: "/api/v1/telefonia-fija/penetracion", label: "Penetración", tab: "penetracion",hasProvincias: true, unit: "accesos/100 hab." },
];

// ── TV ────────────────────────────────────────────────────────────────
export const TV_ENDPOINTS: EndpointConfig[] = [
  { path: "/api/v1/tv/accesos",     label: "Accesos",     tab: "accesos",    hasProvincias: true },
  { path: "/api/v1/tv/ingresos",    label: "Ingresos",    tab: "ingresos",   unit: "$" },
  { path: "/api/v1/tv/penetracion", label: "Penetración", tab: "penetracion",hasProvincias: true, unit: "accesos/100 hab." },
];

// ── Portabilidad ──────────────────────────────────────────────────────
export const PORTABILIDAD_ENDPOINTS: EndpointConfig[] = [
  { path: "/api/v1/portabilidad/moviles", label: "Portabilidad móvil", tab: "moviles" },
];

// ── Mercado Postal ────────────────────────────────────────────────────
export const POSTAL_ENDPOINTS: EndpointConfig[] = [
  { path: "/api/v1/mercado-postal/facturacion",                    label: "Facturación",             tab: "facturacion",  unit: "$" },
  { path: "/api/v1/mercado-postal/produccion",                     label: "Producción",              tab: "produccion" },
  { path: "/api/v1/mercado-postal/personal-ocupado",               label: "Personal ocupado",        tab: "personal" },
  { path: "/api/v1/mercado-postal/facturacion-produccion/provincias",label: "Fact. y prod. prov.",   tab: "provincias",   hasProvincias: true },
];
