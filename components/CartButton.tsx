"use client";

// useState not required here
import { ShoppingCart } from "lucide-react";
import { SafeIcon } from "./SafeIcon";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { useCartModal } from "@/hooks/useCartModal";
import { CartModal } from "@/components/CartModal";

export function CartButton() {
  const { items } = useAppStore();
  const { isOpen, openModal, closeModal } = useCartModal();

  return (
    <>
      <Button
        variant="outline"
        onClick={openModal}
        className="relative border-slate-300 bg-white text-gray-900 hover:bg-gray-50 dark:bg-transparent dark:text-gray-100 dark:hover:bg-gray-800"
        aria-label="Abrir carrito"
        data-cart-button
      >
        <SafeIcon icon={ShoppingCart} size={18} />
        {items.length > 0 && (
          <span className="absolute -right-2 -top-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-green-500 px-1.5 text-xs text-white font-bold animate-pulse">
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        )}
      </Button>
      
      {/* Modal del carrito */}
      <CartModal open={isOpen} onClose={closeModal} />
    </>
  );
}
