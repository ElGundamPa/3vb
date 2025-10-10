"use client";

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { SuccessAnimation } from './SuccessAnimation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface AppointmentSuccessModalProps {
  open: boolean;
  onClose: () => void;
  autoCloseDelay?: number; // en milisegundos, 0 para deshabilitar
}

export function AppointmentSuccessModal({ 
  open, 
  onClose, 
  autoCloseDelay = 3000 
}: AppointmentSuccessModalProps) {
  const containerRef = useFocusTrap(open);
  
  // Lock body scroll cuando el modal está abierto
  useLockBodyScroll(open);

  const handleClose = useCallback(() => {
    // Delay para permitir la animación de salida
    setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    if (autoCloseDelay > 0) {
      const timer = setTimeout(() => handleClose(), autoCloseDelay);
      return () => clearTimeout(timer);
    }
    // if autoCloseDelay === 0 do not auto-close
    return;
  }, [open, autoCloseDelay, handleClose]);

  // Listen for escape key and custom close events
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        handleClose();
      }
    };

    const handleModalClose = () => {
      if (open) {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('modal-close', handleModalClose as EventListener);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('modal-close', handleModalClose as EventListener);
    };
  }, [open, handleClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
            onClick={handleBackdropClick}
          />
          
          {/* Modal */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative mx-auto w-[92vw] max-w-[520px] max-h-[80vh] overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <div className="text-center">
              {/* Success Animation */}
              <div className="flex justify-center mb-6">
                <SuccessAnimation />
              </div>
              
              {/* Title */}
              <h2 
                id="modal-title"
                className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-4"
              >
                ¡Cita reservada!
              </h2>
              
              {/* Subtitle */}
              <p 
                id="modal-description"
                className="text-center text-slate-600 dark:text-slate-300 mb-6 leading-relaxed"
              >
                Hemos recibido tu solicitud. Te contactaremos en las próximas 24 horas para confirmar tu cita.
              </p>
              
              {/* Service Info */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                  Detalles de tu solicitud:
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Servicio:</strong> Consulta legal especializada
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Estado:</strong> Pendiente de confirmación
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Próximo paso:</strong> Te contactaremos vía WhatsApp
                </p>
              </div>
              
              {/* Button */}
              <Button
                asChild
                className="mt-6 w-full h-11 rounded-xl font-medium bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleClose}
              >
                <Link href="/">
                  Volver al inicio
                </Link>
              </Button>
              
              {/* Auto-close indicator */}
              {autoCloseDelay > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                  Este modal se cerrará automáticamente en unos segundos
                </p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

