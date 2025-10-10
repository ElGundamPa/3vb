export type CurrencyCode = "USD" | "MXN" | "PEN";

const RATES: Record<CurrencyCode, number> = {
  USD: 1,
  MXN: 17.2,
  PEN: 3.7,
};

export function convert(amountInUsd: number, currency: CurrencyCode): number {
  const rate = RATES[currency] ?? 1;
  return Math.round(amountInUsd * rate * 100) / 100;
}

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const locale = currency === "USD" ? "en-US" : currency === "MXN" ? "es-MX" : "es-PE";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function priceIn(amountUsd: number, currency: CurrencyCode): string {
  return formatCurrency(convert(amountUsd, currency), currency);
}





