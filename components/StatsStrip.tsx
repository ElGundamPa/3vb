"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";

const stats = [
  { label: "Casos Exitosos", value: 1500, suffix: "+", color: "text-blue-600 dark:text-blue-400" },
  { label: "USD Recuperados", value: 2.5, suffix: "M", color: "text-green-600 dark:text-green-400" },
  { label: "Años de Experiencia", value: 8, suffix: "+", color: "text-purple-600 dark:text-purple-400" },
  { label: "Meses Promedio", value: 4, suffix: "", color: "text-orange-600 dark:text-orange-400" },
];

export function StatsStrip() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-blue-900 dark:to-slate-800 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-40 dark:opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-center group"
            >
              <div className="relative">
                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-3 drop-shadow-lg`}>
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    duration={1.5}
                  />
                </div>
                <div className="text-sm font-medium text-slate-700 dark:text-blue-100 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 dark:from-blue-400/20 dark:to-cyan-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" style={{ filter: 'blur(20px)' }}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}