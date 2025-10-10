"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function AbogadosHero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const router = useRouter();

  const scrollToTeam = () => {
    const teamSection = document.getElementById('team-section');
    if (teamSection) {
      teamSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const goToServices = () => {
    router.push('/servicios');
  };

  return (
    <motion.section 
      className="relative py-24 bg-gray-900 overflow-hidden"
      style={{ y }}
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/abogados/hover-abogados.jpg')",
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gray-900/70" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-gray-200 text-sm font-medium mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              Nuestro Equipo
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-light mb-8 leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Abogados Especialistas
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Profesionales con reconocimiento internacional en disputas comerciales, 
              banca y servicios financieros, y arbitraje internacional.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={scrollToTeam}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Conocer el equipo</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
              
              <motion.button
                onClick={goToServices}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-lg font-medium transition-all duration-200 border border-white/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Ver servicios</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
