"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services, lawyers } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { priceIn } from "@/lib/pricing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppointmentModal } from "@/components/AppointmentModal";
import { ShoppingCart, Check } from "lucide-react";
import { useCartPosition } from "@/hooks/useCartPosition";

interface ServiceCardProps {
  serviceId: string;
}

export function ServiceCard({ serviceId }: ServiceCardProps) {
  const { currency, addItem } = useAppStore();
  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cartPosition = useCartPosition();
  const service = services.find(s => s.id === serviceId);

  if (!service) return null;

  const priceLabel = service.priceUsd != null 
    ? priceIn(service.priceUsd, currency)
    : `${Math.round((service.successFee ?? 0) * 100)}% éxito`;

  const handleAddToCart = () => {
    if (isAnimating) return;
    
    console.log('Starting animation for service:', service.name);
    console.log('Card position:', cardRef.current?.getBoundingClientRect());
    
    setIsAnimating(true);
    addItem(serviceId, selectedLawyer);
    
    // Mostrar feedback de éxito
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    
    // Reset animación después de que termine
    setTimeout(() => {
      console.log('Animation ended');
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div className="relative">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
      <Card className="group h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{service.name}</span>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              {priceLabel}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {service.description}
          </p>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Selecciona tu abogado:
              </label>
              <Select value={selectedLawyer || "auto"} onValueChange={(value) => setSelectedLawyer(value === "auto" ? "" : value)}>
                <SelectTrigger>
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
            
            {service.priceUsd != null ? (
              <Button 
                onClick={handleAddToCart}
                disabled={isAnimating}
                className="w-full relative overflow-hidden"
                aria-label={`Añadir ${service.name} al carrito`}
              >
                <AnimatePresence mode="wait">
                  {showSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      ¡Añadido!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="normal"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {isAnimating ? "Añadiendo..." : "Añadir al carrito"}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Efecto de ondas */}
                {isAnimating && (
                  <motion.div
                    className="absolute inset-0 bg-green-500"
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                )}
              </Button>
            ) : (
              <Button 
                onClick={() => setShowAppointmentModal(true)}
                className="w-full bg-green-600 hover:bg-green-700"
                aria-label={`Reservar cita para ${service.name}`}
              >
                Reservar cita
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      
      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        serviceName={service.name}
        lawyerName={selectedLawyer ? lawyers.find(l => l.id === selectedLawyer)?.name || "Asignar automáticamente" : "Asignar automáticamente"}
        lawyerSpecialty={selectedLawyer ? lawyers.find(l => l.id === selectedLawyer)?.specialty || "" : ""}
      />
      </motion.div>
      
      {/* Animación de vuelo al carrito */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed z-50 pointer-events-none"
            initial={{
              x: cardRef.current?.getBoundingClientRect().left || 0,
              y: cardRef.current?.getBoundingClientRect().top || 0,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: cartPosition.x,
              y: cartPosition.y,
              scale: 0.3,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            onAnimationStart={() => console.log('Animation started')}
            onAnimationComplete={() => console.log('Animation completed')}
          >
            <div className="bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 border-2 border-white">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-semibold">{service.name}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
