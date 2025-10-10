"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { services, lawyers } from "@/lib/data";
import { priceIn } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

export function CartModal({ open, onClose }: CartModalProps) {
  const router = useRouter();
  const { items, currency, removeItem, updateLawyer, clearCart } = useAppStore();
  const containerRef = useFocusTrap(open);
  
  // Bloquear scroll del body
  useLockBodyScroll(open);

  const totalUsd = items.reduce((sum, item) => {
    const service = services.find(s => s.id === item.serviceId);
    if (!service || service.priceUsd == null) return sum;
    return sum + (service.priceUsd * item.quantity);
  }, 0);

  // Manejar tecla Esc
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [open, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
            onClick={handleBackdropClick}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ 
              duration: 0.3, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md sm:max-w-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
          >
            <div
              ref={containerRef}
              className="h-full w-full flex flex-col bg-white dark:bg-gray-900 shadow-xl border-l border-gray-200 dark:border-gray-700"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex-shrink-0">
                <h2 id="cart-title" className="text-lg font-semibold text-gray-900 dark:text-white">
                  Carrito
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  aria-label="Cerrar carrito"
                  className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                >
                  <X size={16} />
                </Button>
              </div>

              {/* Lista de productos */}
              <div 
                className="overflow-y-auto p-4 sm:p-6 flex-1"
                style={{ 
                  minHeight: '300px',
                  maxHeight: 'calc(100vh - 200px)'
                }}
              >
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ShoppingCart size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Tu carrito está vacío</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Agrega servicios para comenzar</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, index) => {
                      const service = services.find(s => s.id === item.serviceId);
                      const lawyer = lawyers.find(l => l.id === item.lawyerId);
                      
                      if (!service) return null;

                      return (
                        <motion.div
                          key={`${item.serviceId}-${index}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                          className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800"
                        >
                          <div className="space-y-3">
                            {/* Información del servicio */}
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white text-base">
                                {service.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {service.description}
                              </p>
                              {lawyer && (
                                <div className="mt-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                                    Abogado: {lawyer.name}
                                  </p>
                                  <p className="text-xs text-blue-600 dark:text-blue-400">
                                    Especialidad: {lawyer.specialty}
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Selector de abogado */}
                            <div>
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                Asignar Abogado:
                              </label>
                              <Select
                                value={item.lawyerId || "auto"}
                                onValueChange={(lawyerId) => updateLawyer(item.serviceId, lawyerId === "auto" ? "" : lawyerId)}
                              >
                                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                                  <SelectValue placeholder="Asignar automáticamente" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="auto">Asignar automáticamente</SelectItem>
                                  {lawyers.map((lawyer) => (
                                    <SelectItem key={lawyer.id} value={lawyer.id}>
                                      {lawyer.name} — {lawyer.specialty}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Controles de cantidad y precio */}
                            <div className="flex items-center justify-between">
                              {/* Solo mostrar contador para servicios que no son asesorías */}
                              {!service.id.includes('asesoria') ? (
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeItem(item.serviceId)}
                                    className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                                  >
                                    -
                                  </Button>
                                  <span className="min-w-8 text-center font-medium text-gray-900 dark:text-white">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const { addItem } = useAppStore.getState();
                                      addItem(item.serviceId, item.lawyerId);
                                    }}
                                    className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                                  >
                                    +
                                  </Button>
                                </div>
                              ) : (
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  Servicio único
                                </div>
                              )}
                              
                              <div className="text-right">
                                {service.priceUsd != null && (
                                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                                    {priceIn(service.priceUsd * item.quantity, currency)}
                                  </div>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItem(item.serviceId)}
                                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 text-xs"
                                >
                                  Eliminar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer fijo */}
              {items.length > 0 && (
                <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 sm:p-6">
                  <div className="flex items-center justify-between text-xl font-bold text-gray-900 dark:text-white mb-4">
                    <span>Total:</span>
                    <span className="text-green-600 dark:text-green-400">{priceIn(totalUsd, currency)}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="flex-1 h-11 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500"
                    >
                      Limpiar Carrito
                    </Button>
                    <Button
                      onClick={() => {
                        onClose();
                        router.push('/checkout');
                      }}
                      className="flex-1 h-11 bg-green-600 hover:bg-green-700 text-white"
                    >
                      Ir a Pago
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
