import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Abogado {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
}

export interface CartItem {
  id: string;
  serviceId: string;
  serviceName: string;
  servicePrice: number;
  abogado: Abogado | null;
  currency: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateAbogado: (itemId: string, abogado: Abogado | null) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const id = `${item.serviceId}-${Date.now()}`;
        const newItem: CartItem = { ...item, id };
        
        set((state) => ({
          items: [...state.items, newItem],
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      updateAbogado: (itemId, abogado) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, abogado: abogado ?? null } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.servicePrice, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.length;
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);

