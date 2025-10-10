"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LazyWrapper } from "./LazyWrapper";

const awards = [
  {
    id: 1,
    name: "Premio LegalTech 2023",
    description: "Mejor bufete de ciberfraude",
    image: "/assets/PREMIOS/1.webp",
    year: "2023"
  },
  {
    id: 2,
    name: "Certificación ISO 27001",
    description: "Seguridad de la información",
    image: "/assets/PREMIOS/2.webp",
    year: "2023"
  },
  {
    id: 3,
    name: "Reconocimiento Legal 500",
    description: "Excelencia en servicios legales",
    image: "/assets/PREMIOS/3.webp",
    year: "2024"
  },
  {
    id: 4,
    name: "Chambers & Partners",
    description: "Líderes en derecho digital",
    image: "/assets/PREMIOS/4.webp",
    year: "2024"
  },
  {
    id: 5,
    name: "Premio Innovación Legal",
    description: "Tecnología y derecho",
    image: "/assets/PREMIOS/5.jpg",
    year: "2023"
  },
  {
    id: 6,
    name: "Certificación Forense",
    description: "Auditoría digital especializada",
    image: "/assets/PREMIOS/6.webp",
    year: "2024"
  },
  {
    id: 7,
    name: "Reconocimiento Internacional",
    description: "Excelencia global en ciberfraude",
    image: "/assets/PREMIOS/7.jpg",
    year: "2024"
  }
];

export function Awards() {
  return (
    <section className="py-12 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white relative overflow-hidden">
      {/* Patrón sutil de fondo */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <LazyWrapper direction="up">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Reconocimientos y Premios
            </h2>
            <p className="text-sm text-blue-200 max-w-2xl mx-auto">
              Nuestro compromiso con la excelencia ha sido reconocido por las principales instituciones del sector legal
            </p>
          </div>
        </LazyWrapper>

        {/* Grid de Premios */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {awards.map((award, index) => (
            <LazyWrapper key={award.id} direction="up" delay={index * 0.1}>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20 hover:border-white/40 transition-all duration-300 h-full flex flex-col overflow-hidden">
                  {/* Efecto de resplandor sutil */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Contenido principal */}
                  <div className="relative z-10">
                    {/* Imagen del premio */}
                    <div className="relative mb-3 flex justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30"
                      >
                        <Image
                          src={award.image}
                          alt={award.name}
                          width={40}
                          height={40}
                          className="object-contain max-w-full max-h-full"
                          priority={index < 4}
                        />
                      </motion.div>
                      
                      {/* Efecto de brillo en hover */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] rounded-lg"></div>
                    </div>

                    {/* Información del premio */}
                    <div className="flex-1 text-center">
                      <h3 className="text-xs font-semibold text-white mb-1 group-hover:text-blue-100 transition-colors duration-300 line-clamp-2">
                        {award.name}
                      </h3>
                      <p className="text-blue-200 text-xs mb-2 leading-tight line-clamp-2">
                        {award.description}
                      </p>
                      <div className="flex items-center justify-center">
                        <span className="text-xs text-blue-300 font-medium bg-blue-500/20 px-2 py-1 rounded-full">
                          {award.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </LazyWrapper>
          ))}
        </div>

        {/* Estadísticas de reconocimientos */}
        <LazyWrapper direction="up" delay={0.8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-lg font-bold text-white mb-1">7+</div>
                <div className="text-blue-200 text-xs">Premios</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white mb-1">3</div>
                <div className="text-blue-200 text-xs">Años</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white mb-1">100%</div>
                <div className="text-blue-200 text-xs">Válidas</div>
              </div>
            </div>
          </motion.div>
        </LazyWrapper>
      </div>
    </section>
  );
}
