"use client";

import { motion } from "framer-motion";

const logos = [
  "Banco Santander",
  "BBVA",
  "Banorte",
  "HSBC",
  "Scotiabank",
  "Banco de México",
  "CNBV",
  "CONDUSEF",
];

export function MarqueeLogos() {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            Colaboramos con instituciones financieras líderes
          </h3>
          <p className="text-slate-500 text-sm">
            Confianza y respaldo de las principales entidades del sector
          </p>
        </motion.div>

        <div className="overflow-hidden relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
          
          <motion.div
            animate={{ x: [0, -100 * logos.length] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex gap-12"
            style={{ width: `${logos.length * 200}px` }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center w-48 h-16 text-slate-400 font-medium text-lg hover:text-slate-600 transition-colors duration-300"
              >
                {logo}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
