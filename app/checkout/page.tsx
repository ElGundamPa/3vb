"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { services, lawyers } from "@/lib/data";
import { priceIn } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/Toast';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, CreditCard, Shield } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, currency, clearCart } = useAppStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { addToast } = useToast();

  const totalUsd = items.reduce((sum, item) => {
    const service = services.find(s => s.id === item.serviceId);
    if (!service || service.priceUsd == null) return sum;
    return sum + (service.priceUsd * item.quantity);
  }, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault?.();
    setIsProcessing(true);

    try {
      const payload = {
        source: 'checkout',
        submittedAt: new Date().toISOString(),
        contact: formData,
        items,
        totalUsd,
      };

      await fetch('/api/submit-form/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Simular procesamiento
      await new Promise(resolve => setTimeout(resolve, 1200));

      setIsCompleted(true);
      clearCart();
    } catch (err) {
      console.error('Error forwarding checkout form:', err);
      addToast({ type: 'error', title: 'Error', description: 'No se pudo procesar la reserva. Intenta nuevamente.' });
    } finally {
      setIsProcessing(false);
    }
  };


  if (isCompleted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-white">✓</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">¡Cita Reservada!</h1>
            <p className="text-xl text-blue-100 mb-8">
              Hemos recibido tu solicitud. Te contactaremos en las próximas 24 horas para confirmar tu cita.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Volver al inicio
                </Button>
              </Link>
              <Link href="/servicios">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                  Ver más servicios
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Carrito Vacío</h1>
            <p className="text-xl text-blue-100 mb-8">
              No tienes servicios en tu carrito. Agrega algunos servicios para continuar.
            </p>
            <Link href="/servicios">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Ver Servicios
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/servicios">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft size={20} className="mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">Finalizar Reserva</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CreditCard size={20} />
                    Información de Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-white">Nombre completo</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-white">Teléfono</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-white">Mensaje adicional (opcional)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="bg-slate-700 border-slate-600 text-white"
                        rows={3}
                      />
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Resumen del pedido */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Resumen de tu Reserva</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {items.map((item, index) => {
                      const service = services.find(s => s.id === item.serviceId);
                      const lawyer = lawyers.find(l => l.id === item.lawyerId);
                      
                      if (!service) return null;

                      return (
                        <div key={`${item.serviceId}-${index}`} className="border-b border-slate-700 pb-4 last:border-b-0">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-medium text-white">{service.name}</h3>
                              <p className="text-sm text-slate-300">{service.description}</p>
                              {lawyer && (
                                <p className="text-sm text-blue-400 mt-1">
                                  Abogado: {lawyer.name}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              {service.priceUsd != null && (
                                <div className="font-medium text-white">
                                  {priceIn(service.priceUsd * item.quantity, currency)}
                                </div>
                              )}
                              {service.successFee && (
                                <div className="text-sm text-green-400">
                                  {Math.round(service.successFee * 100)}% éxito
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="border-t border-slate-700 pt-4 mt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total:</span>
                      <span>{priceIn(totalUsd, currency)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Información de seguridad */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Shield className="text-green-400 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-white mb-2">Información Segura</h3>
                      <p className="text-sm text-slate-300">
                        Tu información está protegida con encriptación de extremo a extremo. 
                        Solo utilizaremos tus datos para contactarte sobre tu cita.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Botón de confirmación */}
              <Button
                onClick={handleSubmit}
                disabled={isProcessing || !formData.name || !formData.email || !formData.phone}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Procesando...
                  </div>
                ) : (
                  "Confirmar Reserva"
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
      
    </main>
  );
}