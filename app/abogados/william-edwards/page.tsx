/* eslint-disable react/no-unescaped-entities */
"use client";

import { Award, Mail, Calendar, FileText, ChevronDown, ExternalLink, Star, Users, Briefcase, Clock, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function WilliamEdwardsPage() {
  const [expandedPanels, setExpandedPanels] = useState<number[]>([]);
  const [activeQuote, setActiveQuote] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Quotes carousel
  const quotes = [
    {
      text: "Es un abogado feroz, excepcionalmente elocuente y logra que los jueces lo acompañen con la facilidad con la que presenta los hechos y la ley ante el tribunal.",
      source: "Legal 500 UK Bar (2022)",
    },
    {
      text: "William es realmente excelente, muy inteligente, receptivo y fuerte en sus pies.",
      source: "Chambers & Partners UK Bar (2025)",
    },
    {
      text: "Un verdadero experto en derecho bancario y uno de los mejores juniors en el Commercial Bar.",
      source: "Chambers & Partners UK Bar (2022)",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  const togglePanel = (index: number) => {
    setExpandedPanels(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const areasDePractica = [
    {
      title: "Aviación y Aeroespacial",
      description: "Disputas relacionadas con arrendamientos de aeronaves, intereses de seguridad y contratos de venta.",
      cases: [
        "Peregrine Aviation Bravo Ltd v Laudamotion GmbH [2023] EWHC 48 (Comm)",
        "Gesner Investments Ltd v Bombardier Inc [2011] EWCA Civ 1118"
      ],
      icon: <Globe className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Disputas Comerciales",
      description: "Amplia gama de disputas comerciales y empresariales, incluyendo reclamaciones por negligencia contra profesionales.",
      cases: [
        "Emirates NBD Bank PJSC v Almakhawi [2023] EWHC 1113 (Comm)",
        "Zymurgorium Ltd v Hammonds of Knutsford plc [2023] EWCA Civ 52",
        "Sethia London Ltd v Sethi [2021] EWHC 367 (Comm)"
      ],
      icon: <Briefcase className="h-6 w-6" />,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Banca y Finanzas",
      description: "Todos los aspectos de la banca comercial y minorista y las finanzas corporativas.",
      cases: [
        "Emirates NBD Bank PJSC v Almakhawi [2023] EWHC 1113 (Comm)",
        "Abu Dhabi Commercial Bank v KBBOBRS Investments Holdings Ltd [2021] ADGMCFI 0002",
        "Union Bank of India (UK) Ltd v Alectrona Energy Pvte Ltd [2020] EWHC 3344 (Comm)"
      ],
      icon: <Award className="h-6 w-6" />,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Fraude Civil",
      description: "Área de práctica central, frecuentemente instruida en casos que involucran alegaciones de fraude.",
      cases: [
        "Emirates NBD Bank PJSC v Almakhawi [2023] EWHC 1113 (Comm)",
        "Dubai Islamic Bank v PSI Energy Holdings Co [2013] EWHC 3781 (Comm)",
        "Cobussen Principal Investment Holding Ltd v Akbar [2020] EWHC 476 (QB)"
      ],
      icon: <FileText className="h-6 w-6" />,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Insolvencia, Disputas Corporativas",
      description: "Regularmente instruida en disputas de insolvencia, corporativas y de sociedades.",
      cases: [
        "Harris v Holland [2020] EWHC 3104 (Ch)",
        "Re Guardian Care Homes (West) Ltd [2019] EWHC 2994 (Ch)",
        "Re BW Estates Ltd [2017] EWCA Civ 1201"
      ],
      icon: <Users className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Medidas Cautelares",
      description: "Su práctica frecuentemente implica la obtención de medidas cautelares.",
      cases: [
        "Emirates NBD Bank PJSC v Almakhawi [2023] EWHC 1113 (Comm)",
        "Harris v Holland [2020] EWHC 3104 (Ch)",
        "Bin Obaid v Al-Hezaimi [2018] EWHC 243 (Ch)"
      ],
      icon: <Clock className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const noticiasRelacionadas = [
    {
      title: "Matthew Parker KC defiende con éxito una solicitud de medida cautelar de 40 millones de USD",
      date: "15 de marzo de 2024",
      category: "Litigios"
    },
    {
      title: "William Edwards nombrado King's Counsel",
      date: "28 de febrero de 2024",
      category: "Reconocimiento"
    },
    {
      title: "William Edwards obtiene una orden que anula una sentencia de 70 millones de libras",
      date: "10 de enero de 2024",
      category: "Éxito Legal"
    }
  ];

  const eventosRelacionados = [
    {
      title: "Seminario Anual de 3VB en Manchester 2023",
      date: "16 de noviembre de 2023",
      time: "5:30 pm - 9:00 pm",
      type: "Seminario"
    },
    {
      title: "Foro de Desayuno Comercial: Sección 423 de la Ley de Insolvencia",
      date: "18 de julio de 2023",
      time: "8:15 am - 9:30 am",
      type: "Foro"
    }
  ];

  const stats = [
    { label: "Años de Experiencia", value: "23+", icon: <Calendar className="h-5 w-5" /> },
    { label: "Casos Exitosos", value: "500+", icon: <Award className="h-5 w-5" /> },
    { label: "Jurisdicciones", value: "15+", icon: <Globe className="h-5 w-5" /> },
    { label: "Publicaciones", value: "25+", icon: <FileText className="h-5 w-5" /> }
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden"
        style={{ y }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Imagen del abogado */}
              <motion.div 
                className="lg:col-span-1"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative w-72 h-96 mx-auto lg:mx-0 group">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                    <Image
                      src="/assets/abogados/William-Edwards.jpg"
                      alt="William Edwards KC"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                  
                  {/* Badge de King's Counsel */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    KC
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Información del abogado */}
              <motion.div 
                className="lg:col-span-2 text-center lg:text-left"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.h1 
                  className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  William Edwards KC
                </motion.h1>
                
                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-8 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-400" />
                    <span className="font-medium">Colegiación: 2002</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Award className="h-5 w-5 text-yellow-400" />
                    <span className="font-medium">King's Counsel: 2025</span>
                  </div>
                </motion.div>
                
                <motion.p 
                  className="text-xl md:text-2xl font-light text-blue-200 mb-10 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Abogado líder en litigios comerciales, arbitraje, banca y finanzas, y fraude civil.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.a 
                    href="mailto:wedwards@3vb.com" 
                    className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="h-5 w-5" />
                    <span className="font-semibold">wedwards@3vb.com</span>
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                  <motion.a 
                    href="mailto:SilksPMs@3vb.com" 
                    className="group flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="h-5 w-5" />
                    <span className="font-semibold">SilksPMs@3vb.com</span>
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  {stat.icon}
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

      {/* Quote Section */}
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
                    &quot;{quotes[activeQuote].text}&quot;
                  </blockquote>
                  <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                    — {quotes[activeQuote].source}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            {/* Indicadores de carrusel */}
            <div className="flex justify-center space-x-3 mt-8">
              {quotes.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeQuote 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
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

      {/* Main Content Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Column: Practice Overview & Areas of Practice */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                  Resumen de la Práctica
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6 text-lg leading-relaxed">
                  <p>
                    William Edwards KC es una destacada profesional en el ámbito del derecho comercial. Se especializa en litigios comerciales y arbitraje, a menudo con un componente internacional.
                  </p>
                  <p>
                    Es reconocido por Chambers & Partners y Legal 500 como una abogada junior líder en tres áreas: banca y finanzas, litigios comerciales y fraude civil, y tiene una experiencia particular en la intersección de banca, insolvencia y fraude civil.
                  </p>
                  <p>
                    Las publicaciones especializadas lo han descrito en los últimos años como &quot;siempre un placer tratar con él&quot;, &quot;un interrogador devastador que sin esfuerzo y rápidamente pone al Tribunal de su lado con los argumentos que presenta&quot;.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="mt-16"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                  Áreas de Práctica
                </h3>
                <div className="space-y-6">
                  {areasDePractica.map((area, index) => (
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
                                {area.icon}
                              </motion.div>
                              <div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                  {area.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-2xl">
                                  {area.description}
                                </p>
                                <div className="mt-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
                                  Haz clic para {expandedPanels.includes(index) ? 'contraer' : 'expandir'} detalles
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
                                  <div>
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
                                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {caseItem}
                                          </span>
                                        </motion.div>
                                      ))}
                                    </div>
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

            {/* Right Column: Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="sticky top-8 space-y-8">
                {/* Latest Related News */}
                <motion.div
                  className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    Últimas noticias relacionadas
                  </h4>
                  <div className="space-y-4">
                    {noticiasRelacionadas.map((noticia, index) => (
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
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-gray-800 dark:text-gray-200 text-sm leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {noticia.title}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full font-medium">
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

                {/* Related Events */}
                <motion.div
                  className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    Eventos relacionados
                  </h4>
                  <div className="space-y-4">
                    {eventosRelacionados.map((evento, index) => (
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
                            <Calendar className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                            <div>
                              <p className="text-gray-800 dark:text-gray-200 text-sm leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                {evento.title}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full font-medium">
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

                {/* Publications & Memberships */}
                <motion.div
                  className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    Publicaciones y Membresías
                  </h4>
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Publicaciones</h5>
                      <div className="space-y-3">
                        {[
                          "Colaborador en Banking Litigation (3ª ed.)",
                          "Capítulo sobre insolvencia en Paget's Law of Banking (14ª ed.)"
                        ].map((pub, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                          >
                            <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-tight">
                              {pub}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Membresías</h5>
                      <div className="space-y-3">
                        {["COMBAR", "Middle Temple", "Aviation & Aerospace"].map((mem, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                          >
                            <Award className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-tight">
                              {mem}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
