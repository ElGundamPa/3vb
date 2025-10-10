"use client";

import { Shield, Award, Users, Clock, CheckCircle, Star } from "lucide-react";
import { SafeIcon } from "./SafeIcon";

const trustSignals = [
  {
    icon: Shield,
    title: "Certificación ISO 27001",
    description: "Seguridad de la información certificada",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Award,
    title: "Premio LegalTech 2023",
    description: "Mejor bufete de ciberfraude",
    color: "text-blue-700",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Users,
    title: "500+ Casos Exitosos",
    description: "Clientes satisfechos",
    color: "text-blue-800",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Clock,
    title: "Respuesta en 24h",
    description: "Tiempo de respuesta garantizado",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
  },
];

const certifications = [
  "Certificación en Ciberfraude",
  "Especialización en Blockchain",
  "Auditoría Forense Digital",
  "Derecho Internacional",
];

const testimonials = [
  {
    name: "María González",
    case: "Recuperó $15,000 USD",
    rating: 5,
    text: "Excelente servicio, recuperé mi dinero en 3 meses.",
  },
  {
    name: "Carlos Rodríguez",
    case: "Recuperó $8,500 USD",
    rating: 5,
    text: "Profesionales altamente capacitados, muy recomendados.",
  },
  {
    name: "Ana Martínez",
    case: "Recuperó $22,000 USD",
    rating: 5,
    text: "El mejor bufete para casos de ciberfraude.",
  },
];

export function TrustSignals() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Confianza y Experiencia
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Más de 5 años de experiencia especializada en ciberfraude y recuperación de fondos
          </p>
        </div>

        {/* Trust Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustSignals.map((signal) => (
            <div
              key={signal.title}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 group-hover:-translate-y-1">
                <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                            <SafeIcon icon={signal.icon} className="h-8 w-8 text-white" />
                          </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {signal.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed">
                    {signal.description}
                  </p>
                  
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Certificaciones Especializadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border"
              >
                <SafeIcon icon={CheckCircle} className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span className="text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Casos de Éxito Recientes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border"
              >
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <SafeIcon key={i} icon={Star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-emerald-600 font-medium">{testimonial.case}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}