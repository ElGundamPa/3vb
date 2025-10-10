"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LazyWrapper } from "./LazyWrapper";
import { Download, Globe, Award, Star, FileText } from "lucide-react";

interface AbogadoCardProps {
  abogado: {
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
  };
  index: number;
}

export function AbogadoCard({ abogado, index }: AbogadoCardProps) {
  const handleCardClick = () => {
    if (abogado.slug) {
      window.open(`/abogados/${abogado.slug}`, '_blank');
    }
  };

  return (
    <LazyWrapper direction="up" delay={index * 0.1}>
      <div className="group relative">
        <div 
          className={`bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-blue-600 h-full flex flex-col relative overflow-hidden ${abogado.slug ? 'cursor-pointer' : ''}`}
          onClick={handleCardClick}
        >
          {/* Efecto de resplandor sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 dark:from-blue-900/5 dark:to-indigo-900/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Contenido principal */}
          <div className="relative z-10">
            {/* Header con imagen y título */}
            <div className="text-center mb-6">
              {/* Imagen del abogado */}
              <div className="relative mb-4 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-800 group-hover:border-blue-200 dark:group-hover:border-blue-600 transition-colors duration-300 shadow-lg"
                >
                  <Image
                    src={abogado.image}
                    alt={abogado.name}
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                    priority={index < 3}
                  />
                  {/* Overlay profesional */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.div>
              </div>

              {/* Información principal */}
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {abogado.name}
              </h3>
              
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
                {abogado.title}
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {abogado.specialty}
              </p>

              {/* Experiencia */}
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700">
                  {abogado.experience}
                </span>
              </div>
            </div>

            {/* Biografía */}
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                {abogado.bio}
              </p>
            </div>

            {/* Cita profesional destacada */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-4 mb-6 border-l-4 border-blue-500 relative">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-700 dark:text-gray-300 italic text-sm leading-relaxed mb-2">
                    &quot;{abogado.quote}&quot;
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
                    {abogado.quoteSource}
                  </p>
                </div>
              </div>
            </div>

            {/* Logros destacados */}
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                <Star className="h-4 w-4" />
                Logros Destacados
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {abogado.achievements.slice(0, 2).map((achievement, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>

            {/* Idiomas */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                <Globe className="h-4 w-4" />
                <span className="font-medium">Idiomas</span>
              </div>
              <div className="flex gap-2 justify-center">
                {abogado.languages.map((lang, idx) => (
                  <span key={idx} className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-700">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Botón de descarga de PDF y enlace a perfil */}
            <div className="mt-auto space-y-3">
              {abogado.slug && (
                <div className="text-center">
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    Haz clic en la tarjeta para ver el perfil completo
                  </span>
                </div>
              )}
              <a
                href={abogado.pdfUrl}
                download={`${abogado.name.replace(/\s+/g, '_')}_CV.pdf`}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn"
                onClick={(e) => e.stopPropagation()}
              >
                <FileText className="h-4 w-4" />
                <Download className="h-4 w-4" />
                Descargar Hoja de Vida
              </a>
            </div>
          </div>
        </div>
      </div>
    </LazyWrapper>
  );
}
