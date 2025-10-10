"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SafeIcon } from "./SafeIcon";

const testimonials = [
  {
    id: 1,
    name: "María González",
    location: "México",
    text: "3VB me ayudó a recuperar $15,000 USD que perdí en una estafa de criptomonedas. Su equipo fue profesional y eficiente.",
    rating: 5,
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    location: "Colombia",
    text: "Excelente servicio. Recuperaron mis fondos en menos de 3 meses. Altamente recomendados.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    location: "Perú",
    text: "El proceso fue transparente y me mantuvieron informada en cada paso. Muy satisfecha con el resultado.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Hemos ayudado a cientos de personas a recuperar sus fondos perdidos en estafas digitales.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 group-hover:-translate-y-1 h-full">
                <div className="space-y-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <SafeIcon key={i} icon={Star} size={20} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  {/* Quote icon */}
                  <SafeIcon icon={Quote} className="h-8 w-8 text-blue-500 mb-4" />
                  
                  {/* Testimonial text */}
                  <p className="text-slate-700 italic leading-relaxed text-lg">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  
                  {/* Author info */}
                  <div className="border-t border-slate-100 pt-6">
                    <div className="font-bold text-slate-800 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-slate-500 text-sm">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
                
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
