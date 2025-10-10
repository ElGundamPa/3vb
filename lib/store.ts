"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrencyCode } from "./pricing";

export type CartItem = {
  serviceId: string;
  lawyerId: string;
  quantity: number;
};

type State = {
  currency: CurrencyCode;
  items: CartItem[];
};

type Actions = {
  setCurrency: (c: CurrencyCode) => void;
  addItem: (serviceId: string, lawyerId?: string) => void;
  updateLawyer: (serviceId: string, lawyerId: string) => void;
  removeItem: (serviceId: string) => void;
  clearCart: () => void;
};

export const useAppStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      currency: "USD",
      items: [],
      setCurrency: (c) => set({ currency: c }),
      addItem: (serviceId, lawyerId = "") => {
        const existing = get().items.find((i) => i.serviceId === serviceId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.serviceId === serviceId ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { serviceId, lawyerId, quantity: 1 }] });
        }
      },
      updateLawyer: (serviceId, lawyerId) => {
        set({
          items: get().items.map((i) =>
            i.serviceId === serviceId ? { ...i, lawyerId } : i
          ),
        });
      },
      removeItem: (serviceId) => {
        const existing = get().items.find((i) => i.serviceId === serviceId);
        if (!existing) return;
        if (existing.quantity <= 1) {
          set({ items: get().items.filter((i) => i.serviceId !== serviceId) });
        } else {
          set({
            items: get().items.map((i) =>
              i.serviceId === serviceId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          });
        }
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "3vb-store:v1",
      // Version for persisted data; implement migrate when changing shape in future.
      version: 1,
      migrate: (persistedState: unknown, _version: number) => {
        // Use _version to keep TypeScript/ESLint happy if unused
        void _version;
        // If structure changes in future versions, handle transformations here.
        // Current example: ensure items is an array and currency has a default.
        if (!persistedState) return persistedState as unknown;
        const state = persistedState as Record<string, unknown>;
        const items = Array.isArray(state.items) ? (state.items as unknown[]) : [];
        const currency = typeof state.currency === 'string' ? (state.currency as string) : 'USD';
        return {
          ...state,
          items,
          currency,
        } as unknown;
      },
    }
  )
);





