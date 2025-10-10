"use client";

import { useAppStore } from "@/lib/store";
import type { CurrencyCode } from "@/lib/pricing";

const options: CurrencyCode[] = ["USD", "MXN", "PEN"];

export function CurrencySwitcher() {
  const currency = useAppStore((s) => s.currency);
  const setCurrency = useAppStore((s) => s.setCurrency);
  return (
    <label className="inline-flex items-center gap-2 text-sm" aria-label="Selector de moneda">
      <span className="text-gray-600 dark:text-gray-300">Moneda</span>
      <select
        className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
      >
        {options.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </label>
  );
}




