"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, User, ChevronDown } from "lucide-react";
import { SafeIcon } from "./SafeIcon";
import { useCartStore, type CartItem } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from 'next/image';
import { useCallback, useState } from "react";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const abogados = [
  {
    id: "william-edwards",
    name: "William Edwards KC",
    title: "King's Counsel",
    specialty: "Litigios Comerciales",
    image: "/assets/abogados/William-Edwards.jpg",
  },
  {
    id: "lisa-lacob",
    name: "Lisa Lacob",
    title: "Senior Junior",
    specialty: "Banca y Servicios Financieros",
    image: "/assets/abogados/Lisa-Lacob.jpg",
  },
  {
    id: "tom-montagu-smith",
    name: "Tom Montagu-Smith KC",
    title: "King's Counsel",
    specialty: "Disputas Comerciales",
    image: "/assets/abogados/Tom-Montagu-Smith-QC.jpg",
  },
];

interface CartItemProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateAbogado: (itemId: string, abogado: Lawyer | null) => void;
}

interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  image: string;
  title: string;
}

interface LawyerDropdownProps {
  value: string;
  onChange: (abogado: Lawyer | null) => void;
}

function LawyerDropdown({ value, onChange }: LawyerDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedAbogado = value ? abogados.find(a => a.id === value) : null;

  const handleSelect = (abogado: Lawyer | null) => {
    onChange(abogado);
    setIsOpen(false);
  };


  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-left flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
              {selectedAbogado ? (
            <>
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600 flex-shrink-0">
                <Image
                  src={selectedAbogado.image}
                  alt={selectedAbogado.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Error loading dropdown image:', selectedAbogado.image);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                  onLoadingComplete={() => {
                    console.log('Dropdown image loaded:', selectedAbogado.image);
                  }}
                />
              </div>
              <span className="text-sm">{selectedAbogado.name} — {selectedAbogado.specialty}</span>
            </>
          ) : (
            <span className="text-sm">Asignar automáticamente</span>
          )}
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => handleSelect(null)}
              className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-gray-500" />
              </div>
              <span>Asignar automáticamente</span>
            </button>
            {abogados.map((abogado) => (
              <button
                key={abogado.id}
                type="button"
                onClick={() => handleSelect(abogado)}
                className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-3"
              >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600 flex-shrink-0">
                  <Image
                    src={abogado.image}
                    alt={abogado.name}
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Error loading dropdown image:', abogado.image);
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                    onLoadingComplete={() => {
                      console.log('Dropdown image loaded:', abogado.image);
                    }}
                  />
                </div>
                <div>
                  <div className="font-medium text-sm">{abogado.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{abogado.specialty}</div>
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CartItemComponent({ item, onRemove, onUpdateAbogado }: CartItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
            {item.serviceName}
          </h4>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {formatPrice(item.servicePrice, item.currency)}
          </p>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors p-1"
          aria-label="Eliminar del carrito"
        >
          <SafeIcon icon={Trash2} className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Selecciona tu abogado:
          </label>
          <LawyerDropdown
            value={item.abogado?.id?.toString() || ""}
            onChange={(abogado) => onUpdateAbogado(item.id, abogado)}
          />
        </div>

        {item.abogado && (
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600 flex-shrink-0">
              <Image
                src={item.abogado.image}
                alt={item.abogado.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Error loading selected lawyer image:', item.abogado?.image);
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
                onLoadingComplete={() => {
                  console.log('Selected lawyer image loaded:', item.abogado?.image);
                }}
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-900 dark:text-white">
                Abogado: {item.abogado.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Especialidad: {item.abogado.specialty}
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}


export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateAbogado,
    clearCart,
    getTotalPrice,
    getItemCount,
  } = useCartStore();

  const containerRef = useFocusTrap(isOpen);
  const totalPrice = getTotalPrice();
  const itemCount = getItemCount();

  // Bloquear scroll del body
  useLockBodyScroll(isOpen);
  
  // Focus trap
  // `useFocusTrap` returns a ref when called with the active flag.
  // We already assigned `containerRef` above using the hook, so there's no need to call it again here.

  // Manejar clicks en el backdrop
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  }, [closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop con blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            style={{ touchAction: 'none' }}
          />

          {/* Cart Panel - Estructura de 3 secciones */}
          <motion.div
            ref={containerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50"
            style={{ 
              touchAction: 'pan-y'
            }}
          >
            {/* Header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <SafeIcon icon={ShoppingCart} className="h-6 w-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Carrito ({itemCount})
                  </h2>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Cerrar carrito"
                >
                  <SafeIcon icon={X} className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Contenido - Área scrollable */}
            <div 
              className="overflow-y-scroll p-6 max-h-[60vh]"
            >
              <div className="space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <SafeIcon icon={ShoppingCart} className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                      Añade servicios para comenzar
                    </p>
                    <Link
                      href="/servicios"
                      onClick={closeCart}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Ver Servicios
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <CartItemComponent
                        key={item.id}
                        item={item}
                        onRemove={removeItem}
                        onUpdateAbogado={updateAbogado}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer - Fijo al fondo */}
            {items.length > 0 && (
              <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total:
                    </span>
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                      {formatPrice(totalPrice, items[0]?.currency || "USD")}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={clearCart}
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium"
                    >
                      Limpiar Carrito
                    </button>
                    <Link
                      href="/checkout"
                      onClick={closeCart}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-center font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Ir a Pago
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
