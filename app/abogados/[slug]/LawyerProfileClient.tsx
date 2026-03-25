/* eslint-disable react/no-unescaped-entities */
"use client";

import { Award, Mail, Calendar, FileText, ChevronDown, ExternalLink, Star, Users, Briefcase, Building, Clock, Globe, GraduationCap, Gavel, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import type { LawyerData } from "@/lib/lawyers-db";

const iconMap: Record<string, React.ReactNode> = {
  Award: <Award className="h-6 w-6" />,
  Mail: <Mail className="h-6 w-6" />,
  Calendar: <Calendar className="h-6 w-6" />,
  FileText: <FileText className="h-6 w-6" />,
  Star: <Star className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  Briefcase: <Briefcase className="h-6 w-6" />,
  Building: <Building className="h-6 w-6" />,
  Clock: <Clock className="h-6 w-6" />,
  Globe: <Globe className="h-6 w-6" />,
  GraduationCap: <GraduationCap className="h-6 w-6" />,
  Gavel: <Gavel className="h-6 w-6" />,
  BookOpen: <BookOpen className="h-6 w-6" />,
};

const smallIconMap: Record<string, React.ReactNode> = {
  Award: <Award className="h-5 w-5" />,
  Calendar: <Calendar className="h-5 w-5" />,
  FileText: <FileText className="h-5 w-5" />,
  Building: <Building className="h-5 w-5" />,
  Globe: <Globe className="h-5 w-5" />,
  BookOpen: <BookOpen className="h-5 w-5" />,
};

function getAccentClasses(color: string) {
  const map: Record<string, { gradient: string; text: string; textDark: string; bg: string; bgDark: string; statGradient: string }> = {
    blue: {
      gradient: "from-gray-900 to-blue-600",
      text: "text-blue-600",
      textDark: "dark:text-blue-400",
      bg: "bg-blue-100",
      bgDark: "dark:bg-blue-900/30",
      statGradient: "from-blue-600 to-purple-600",
    },
    green: {
      gradient: "from-gray-900 to-green-600",
      text: "text-green-600",
      textDark: "dark:text-green-400",
      bg: "bg-green-100",
      bgDark: "dark:bg-green-900/30",
      statGradient: "from-green-600 to-emerald-600",
    },
    purple: {
      gradient: "from-gray-900 to-purple-600",
      text: "text-purple-600",
      textDark: "dark:text-purple-400",
      bg: "bg-purple-100",
      bgDark: "dark:bg-purple-900/30",
      statGradient: "from-purple-600 to-indigo-600",
    },
  };
  return map[color] || map.blue;
}

export default function LawyerProfileClient({ lawyer }: { lawyer: LawyerData }) {
  const [expandedPanels, setExpandedPanels] = useState<number[]>([]);
  const [activeQuote, setActiveQuote] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const accent = getAccentClasses(lawyer.accentColor);

  useEffect(() => {
    if (lawyer.quotes.length <= 1) return;
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % lawyer.quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [lawyer.quotes.length]);

  const togglePanel = (index: number) => {
    setExpandedPanels((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      <motion.section
        className={`relative py-20 bg-gradient-to-br ${lawyer.heroGradient} text-white overflow-hidden`}
        style={{ y }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                className="flex justify-center lg:justify-start mb-6"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <span
                  className={`bg-gradient-to-r from-${lawyer.badgeColors.from} to-${lawyer.badgeColors.to} text-${lawyer.badgeColors.textColor} px-5 py-2 rounded-full font-bold text-sm shadow-lg`}
                >
                  {lawyer.badge}
                </span>
              </motion.div>

              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.h1
                  className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-white"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {lawyer.name}
                </motion.h1>

                <motion.div
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-8 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-400" />
                    <span className="font-medium">Colegiación: {lawyer.colegiacion}</span>
                  </div>
                  {lawyer.silkYear && (
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Award className="h-5 w-5 text-yellow-400" />
                      <span className="font-medium">
                        {lawyer.title}: {lawyer.silkYear}
                      </span>
                    </div>
                  )}
                  {!lawyer.silkYear && (
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Award className="h-5 w-5 text-green-400" />
                      <span className="font-medium">{lawyer.title}</span>
                    </div>
                  )}
                </motion.div>

                <motion.p
                  className="text-xl md:text-2xl font-light text-blue-200 mb-10 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {lawyer.bio}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {lawyer.emails.map((email) => (
                    <motion.a
                      key={email.address}
                      href={`mailto:${email.address}`}
                      className={`group flex items-center gap-3 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                        email.primary
                          ? `bg-gradient-to-r from-${lawyer.accentColor}-600 to-${lawyer.accentColor}-700 hover:from-${lawyer.accentColor}-700 hover:to-${lawyer.accentColor}-800 hover:shadow-xl`
                          : "bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="h-5 w-5" />
                      <span className="font-semibold">{email.address}</span>
                      <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section
        className="py-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {lawyer.stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${accent.statGradient} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 text-white`}
                  whileHover={{ rotate: 5 }}
                >
                  {smallIconMap[stat.icon] || <Award className="h-5 w-5" />}
                </motion.div>
                <motion.div
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Quotes Carousel */}
      {lawyer.quotes.length > 0 && (
        <motion.section
          className="py-20 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                className="relative min-h-[200px] flex items-center justify-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeQuote}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
                      &quot;{lawyer.quotes[activeQuote].text}&quot;
                    </blockquote>
                    <p className={`text-lg font-medium ${accent.text} ${accent.textDark}`}>
                      — {lawyer.quotes[activeQuote].source}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
              <div className="flex justify-center space-x-3 mt-8">
                {lawyer.quotes.map((_, index) => (
                  <motion.button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeQuote
                        ? `${accent.text.replace("text-", "bg-")} scale-125`
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    onClick={() => setActiveQuote(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Main Content */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Practice Overview & Areas */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className={`text-4xl font-bold text-gray-900 dark:text-white mb-8 bg-gradient-to-r ${accent.gradient} dark:from-white dark:to-${lawyer.accentColor}-400 bg-clip-text text-transparent`}>
                  Resumen de la Práctica
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6 text-lg leading-relaxed">
                  {lawyer.fullDescription.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="mt-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className={`text-3xl font-bold text-gray-900 dark:text-white mb-10 bg-gradient-to-r ${accent.gradient} dark:from-white dark:to-${lawyer.accentColor}-400 bg-clip-text text-transparent`}>
                  Áreas de Práctica
                </h3>
                <div className="space-y-6">
                  {lawyer.practiceAreas.map((area, index) => (
                    <motion.div
                      key={index}
                      className="group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <motion.div
                        className={`relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r ${area.color} p-0.5`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="bg-white dark:bg-gray-800 rounded-[15px]">
                          <motion.button
                            onClick={() => togglePanel(index)}
                            className="w-full flex items-center justify-between p-8 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 text-left"
                            whileHover={{ x: 5 }}
                          >
                            <div className="flex items-center gap-6">
                              <motion.div
                                className={`w-16 h-16 bg-gradient-to-r ${area.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}
                                whileHover={{ rotate: 5, scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                {iconMap[area.iconName] || <Briefcase className="h-6 w-6" />}
                              </motion.div>
                              <div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                  {area.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-2xl">
                                  {area.description}
                                </p>
                                <div className={`mt-2 text-sm ${accent.text} ${accent.textDark} font-medium`}>
                                  Haz clic para{" "}
                                  {expandedPanels.includes(index) ? "contraer" : "expandir"}{" "}
                                  detalles
                                </div>
                              </div>
                            </div>
                            <motion.div
                              animate={{ rotate: expandedPanels.includes(index) ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="h-6 w-6 text-gray-500" />
                            </motion.div>
                          </motion.button>

                          <AnimatePresence>
                            {expandedPanels.includes(index) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="px-8 pb-8 bg-gray-50 dark:bg-gray-700/50">
                                  <h5 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <Star className="h-5 w-5 text-yellow-500" />
                                    Casos de Ejemplo:
                                  </h5>
                                  <div className="grid gap-3">
                                    {area.cases.map((caseItem, caseIndex) => (
                                      <motion.div
                                        key={caseIndex}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 + caseIndex * 0.1 }}
                                        className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow"
                                      >
                                        <div className={`w-2 h-2 ${accent.text.replace("text-", "bg-")} rounded-full mt-2 flex-shrink-0`} />
                                        <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                          {caseItem}
                                        </span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="sticky top-8 space-y-8">
                {/* News */}
                {lawyer.news.length > 0 && (
                  <motion.div
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${accent.statGradient} rounded-lg flex items-center justify-center`}>
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      Últimas noticias relacionadas
                    </h4>
                    <div className="space-y-4">
                      {lawyer.news.map((noticia, index) => (
                        <motion.div
                          key={index}
                          className="group"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="p-4 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 group-hover:shadow-md">
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 bg-gradient-to-r ${accent.statGradient} rounded-full mt-2 flex-shrink-0`} />
                              <div className="flex-1">
                                <p className={`text-gray-800 dark:text-gray-200 text-sm leading-tight group-hover:${accent.text} dark:group-hover:${accent.textDark} transition-colors`}>
                                  {noticia.title}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={`text-xs ${accent.text} ${accent.textDark} ${accent.bg} ${accent.bgDark} px-2 py-1 rounded-full font-medium`}>
                                    {noticia.category}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {noticia.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Events */}
                {lawyer.events.length > 0 && (
                  <motion.div
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${accent.statGradient} rounded-lg flex items-center justify-center`}>
                        <Calendar className="h-4 w-4 text-white" />
                      </div>
                      Eventos relacionados
                    </h4>
                    <div className="space-y-4">
                      {lawyer.events.map((evento, index) => (
                        <motion.div
                          key={index}
                          className="group"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="p-4 rounded-xl hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 group-hover:shadow-md">
                            <div className="flex items-start gap-3">
                              <Calendar className={`h-5 w-5 ${accent.text} ${accent.textDark} flex-shrink-0 mt-1`} />
                              <div>
                                <p className={`text-gray-800 dark:text-gray-200 text-sm leading-tight group-hover:${accent.text} dark:group-hover:${accent.textDark} transition-colors`}>
                                  {evento.title}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className={`text-xs ${accent.text} ${accent.textDark} ${accent.bg} ${accent.bgDark} px-2 py-1 rounded-full font-medium`}>
                                    {evento.type}
                                  </span>
                                  <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {evento.date} | {evento.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Education */}
                {lawyer.education.length > 0 && (
                  <motion.div
                    className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${accent.statGradient} rounded-lg flex items-center justify-center`}>
                        <GraduationCap className="h-4 w-4 text-white" />
                      </div>
                      Educación y Premios Clave
                    </h4>
                    <div className="space-y-6">
                      {lawyer.education.map((edu, index) => (
                        <div key={index} className="space-y-3">
                          <div>
                            <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                              {edu.institution}
                            </h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {edu.degree}
                            </p>
                            <div className="space-y-1">
                              {edu.awards.map((premio, premioIndex) => (
                                <div key={premioIndex} className="flex items-start gap-2">
                                  <Award className={`h-3 w-3 ${accent.text} ${accent.textDark} flex-shrink-0 mt-1`} />
                                  <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {premio}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
