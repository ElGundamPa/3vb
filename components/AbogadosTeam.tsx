"use client";

import { motion } from "framer-motion";
import { AbogadoCard } from "@/components/AbogadoCard";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Abogado {
  id: number;
  slug?: string;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  image: string;
  bio: string;
  quote: string;
  quoteSource: string;
  achievements: string[];
  languages: string[];
  pdfUrl: string;
}

interface AbogadosTeamProps {
  abogados: Abogado[];
}

export function AbogadosTeam({ abogados }: AbogadosTeamProps) {
  const router = useRouter();

  const goToServices = () => {
    router.push('/servicios');
  };

  return (
    <motion.section 
      id="team-section"
      className="py-20 bg-white dark:bg-gray-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
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
          <motion.h2 
            className="text-3xl md:text-4xl font-light mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Nuestro Equipo
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Profesionales con experiencia única y especialización para brindarte la mejor 
            representación legal en disputas comerciales internacionales.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {abogados.map((abogado, index) => (
            <motion.div
              key={abogado.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <AbogadoCard abogado={abogado} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-12">
            <motion.h3 
              className="text-2xl md:text-3xl font-light mb-4 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              ¿Necesitas asesoría legal especializada?
            </motion.h3>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-light"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              Nuestro equipo está listo para brindarte la mejor representación 
              en disputas comerciales, banca y arbitraje internacional.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
            >
              <motion.button
                onClick={goToServices}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-100"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Contactar equipo</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
