"use client";

import { motion } from "framer-motion";
import { Award, Users, Globe, Gavel } from "lucide-react";

export function AbogadosStats() {
  return (
    <motion.section 
      className="py-20 bg-gray-900 dark:bg-gray-950"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4 text-white">
            Nuestro Impacto
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-light">
            Resultados respaldados por reconocimientos internacionales
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { 
              icon: <Users className="h-6 w-6" />, 
              value: "3", 
              label: "Abogados Especialistas",
              description: "King's Counsel y Senior Juniors",
              color: "from-blue-500 to-cyan-400",
              bgColor: "bg-gray-800"
            },
            { 
              icon: <Award className="h-6 w-6" />, 
              value: "30+", 
              label: "Años de Experiencia",
              description: "Experiencia combinada",
              color: "from-purple-500 to-pink-400",
              bgColor: "bg-gray-800"
            },
            { 
              icon: <Gavel className="h-6 w-6" />, 
              value: "1000+", 
              label: "Casos Exitosos",
              description: "Resolución exitosa",
              color: "from-emerald-500 to-teal-400",
              bgColor: "bg-gray-800"
            },
            { 
              icon: <Globe className="h-6 w-6" />, 
              value: "15+", 
              label: "Jurisdicciones",
              description: "Cobertura internacional",
              color: "from-amber-500 to-orange-400",
              bgColor: "bg-gray-800"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="group text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className={`relative ${stat.bgColor} p-8 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-500 group-hover:scale-105`}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Icon container with gradient background */}
                <motion.div
                  className={`flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="text-4xl md:text-5xl font-bold mb-3 text-white"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                
                <div className="font-semibold text-lg mb-2 text-white">
                  {stat.label}
                </div>
                
                <div className="text-gray-300 text-sm">
                  {stat.description}
                </div>

                {/* Subtle glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
