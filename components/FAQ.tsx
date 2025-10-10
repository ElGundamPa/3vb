"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SafeIcon } from "./SafeIcon";

const faqs = [
  {
    id: 1,
    question: "¿Qué debo hacer si fui víctima de una estafa digital?",
    answer: "Primero, preserva toda la evidencia (capturas de pantalla, conversaciones, transferencias). Luego, contacta inmediatamente a tu banco y reporta el incidente. Finalmente, busca asesoría legal especializada para evaluar las opciones de recuperación."
  },
  {
    id: 2,
    question: "¿Cuánto tiempo toma recuperar fondos?",
    answer: "El tiempo varía según la complejidad del caso. Casos simples pueden resolverse en 2-4 meses, mientras que casos complejos pueden tomar 6-12 meses o más. La cooperación del cliente y la calidad de la evidencia son factores clave."
  },
  {
    id: 3,
    question: "¿Atienden casos internacionales?",
    answer: "Sí, tenemos experiencia en casos transfronterizos. Trabajamos con clientes en México, Colombia, Perú, Chile y otros países de Latinoamérica. Nuestro equipo está preparado para manejar la complejidad legal internacional."
  },
  {
    id: 4,
    question: "¿Cómo preservar evidencia digital?",
    answer: "Toma capturas de pantalla de todas las conversaciones, guarda los archivos originales, no modifiques metadatos, y documenta fechas y horas. Si es posible, haz una copia de seguridad completa de tu dispositivo."
  },
  {
    id: 5,
    question: "¿Cuáles son los honorarios?",
    answer: "Ofrecemos diferentes modalidades: servicios con precio fijo (asesorías) y honorarios por éxito (recuperación de fondos). En casos de recuperación, nuestros honorarios son del 12% del monto recuperado, solo si tenemos éxito."
  }
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Respuestas a las dudas más comunes sobre nuestros servicios
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-blue-200">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
                  aria-expanded={openItems.includes(faq.id)}
                >
                  <span className="font-semibold text-slate-800 text-lg pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    {openItems.includes(faq.id) ? (
                      <SafeIcon icon={Minus} size={24} className="text-blue-500" />
                    ) : (
                      <SafeIcon icon={Plus} size={24} className="text-blue-500" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 py-6 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
