"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  lawyerName: string;
  lawyerSpecialty: string;
}

export function AppointmentModal({ 
  isOpen, 
  onClose, 
  serviceName, 
  lawyerName, 
  lawyerSpecialty 
}: AppointmentModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Bloquear scroll del body
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleWhatsAppRedirect = () => {
    const message = `Hola, me interesa el servicio de ${serviceName}.%0A%0AAbogado seleccionado: ${lawyerName}${lawyerSpecialty ? ` - ${lawyerSpecialty}` : ""}%0A%0A¿Podrían contactarme para agendar una cita?`;
    const whatsappUrl = `https://wa.me/573001234567?text=${message}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-white">✓</span>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ¡Cita Reservada!
          </h2>
          
          {/* Message */}
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Hemos recibido tu solicitud. Te contactaremos en las próximas 24 horas para confirmar tu cita.
          </p>
          
          {/* Service Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Detalles de tu solicitud:
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Servicio:</strong> {serviceName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Abogado:</strong> {lawyerName}
              {lawyerSpecialty && ` - ${lawyerSpecialty}`}
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Volver al inicio
            </Button>
            <Button
              onClick={handleWhatsAppRedirect}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Abrir WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

