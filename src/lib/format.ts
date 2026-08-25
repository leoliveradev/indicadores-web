import { MONTHS } from "@/lib/constants/dates";

export const fmtPeriod = (period?: string) => {
  if (!period) return "Último período disponible";

  const [anio, mes] = period.split("-");

  const mesLabel = MONTHS[mes] ?? "Período";

  return `${mesLabel} ${anio}`;
}

export const fmtNumber = (v: number, decimals = 0) =>
  new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(v);

export const fmtMillions = (v: number, decimals = 2) =>
  fmtNumber(v / 1e6, decimals);

export const fmtDecimal = (
  v: number,
  decimals = 2
) => fmtNumber(v, decimals);

export const fmtPercent = (
  v: number,
  decimals = 2
) => `${fmtNumber(v, decimals)} %`;

export const fmtCompact = (
  v: number
) => {
  if (v >= 1e6) {
    const millions = v / 1e6;

    return Number.isInteger(millions)
      ? `${fmtNumber(millions, 0)} M`
      : `${fmtNumber(millions, 1)} M`;
  }

  if (v >= 1e3) {
    return `${fmtNumber(v / 1e3, 1)} K`;
  }

  return fmtNumber(v);
};

export const fmtCurrency = (v: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(v);


export const fmtCurrencyMillions = (v: number, decimals = 1) =>
  `${fmtNumber(v / 1e6, decimals)} M`;


export const fmtCurrencyCompact = (v: number) => {
  if (v >= 1e12) {
    return `$ ${fmtNumber(v / 1e12, 2)} B`; // billones
  }

  if (v >= 1e9) {
    return `$ ${fmtNumber(v / 1e9, 2)} M`; // miles de millones
  }

  if (v >= 1e6) {
    return `$ ${fmtNumber(v / 1e6, 2)} M`;
  }

  return fmtCurrency(v);
};


export const dispValue = (
  value?: number,
  {
    format = "number",
    decimals = 2,
    suffix = "",
    prefix = "",
    multiline = false,
  }: {
    format?: "number" | "millions" | "compact" | "percent";
    decimals?: number;
    suffix?: string;
    prefix?: string;
    multiline?: boolean;
  } = {}
) => {
  if (value == null) return "";

  let formatted = "";

  switch (format) {
    case "millions":
      formatted = fmtMillions(value, decimals);
      break;
    case "compact":
      formatted = fmtCompact(value);
      break;
    case "percent":
      formatted = fmtPercent(value, decimals);
      break;
    default:
      formatted = fmtNumber(value, decimals);
  }

  if (multiline) {
    return `${prefix}${formatted}\n${suffix}`.trim();
  }

  return `${prefix}${formatted}${suffix ? " " + suffix : ""}`;
};


export const dispCurrency = (
  v?: number
): string => {
  return v == null ? "" : fmtCurrency(v);
};

export const dispCurrencyCompact = (
  v?: number
): string => {
  return v == null ? "" : fmtCurrencyCompact(v);
};

