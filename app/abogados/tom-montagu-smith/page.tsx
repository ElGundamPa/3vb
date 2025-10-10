/* eslint-disable react/no-unescaped-entities */
"use client";

import { Award, Mail, Calendar, FileText, ChevronDown, ExternalLink, Star, Users, Briefcase, Building, Gavel, Globe, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function TomMontaguSmithPage() {
  const [expandedPanels, setExpandedPanels] = useState<number[]>([]);
  const [activeQuote, setActiveQuote] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Quotes carousel
  const quotes = [
    {
      text: "Un abogado con una tasa de éxito muy alta, se mantiene actualizado en jurisprudencia y tiene una manera brillante con los jueces.",
      source: "Chambers & Partners (2025)",
    },
    {
      text: "Merece ampliamente su reputación como líder en el campo del derecho y la práctica de arbitraje de los EAU: aporta conocimiento forense, combinado con habilidades de defensa sin igual ante los tribunales.",
      source: "Legal 500 (2025)",
    },
    {
      text: "Tom tiene una experiencia extensa en los EAU y entiende la ley de los EAU mejor que la mayoría de los abogados.",
      source: "Chambers & Partners (2025)",
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
      title: "Arbitraje",
      description: "Tom tiene una práctica de arbitraje ocupada, actuando tanto en arbitrajes como en procedimientos judiciales relacionados con arbitrajes. Tiene experiencia particular en disputas relacionadas con empresas conjuntas, gestión hotelera e seguros.",
      cases: [
        "US$90m disputa relacionada con la compra fallida de una cadena de cines. LCIA, sede Londres (2020 - en curso)",
        "Disputa relacionada con la distribución de electrónicos de consumo en India. LCIA, sede Londres (2020 - en curso)",
        "Actuando para un banco de los EAU en una disputa de US$44m relacionada con llamadas en varias garantías de pago"
      ],
      icon: <Gavel className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Banca y Servicios Financieros",
      description: "Tom tiene una práctica bancaria y financiera variada y ha actuado en algunos de los casos más destacados y novedosos recientemente escuchados en el DIFC y otras jurisdicciones.",
      cases: [
        "Emirates NBD v KBBO (DIFC, 2020 - en curso). Actuando para un sindicato de 11 bancos contra 19 Demandados en una reclamación de USD300m",
        "Huobi v Tabarak [2020] DIFC TCD 001 (2020 - en curso). Primera reclamación en el DIFC Technology and Construction list y primera reclamación de criptomonedas en la región",
        "Confidencial: (2020 - en curso). Actuando para sindicato de bancos en reclamación para recuperar US$500m adelantados en arreglos de reestructuración"
      ],
      icon: <Building className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Fraude Civil, Rastreo de Activos y Recuperación",
      description: "Tom es regularmente instruido en reclamaciones que surgen de fraude significativo, incluyendo reclamaciones de negligencia de auditores por no detectar actividad fraudulenta.",
      cases: [
        "Skat v Elysium Global [2018] DIFC CFI 048 (2018 - en curso). Reclamación de US$2bn para recuperación de reembolsos de impuestos fraudulentos",
        "Childescu v Gheorghiu and ors [2020] CFI 032 (2020 - en curso). Primera reclamación DIFC para considerar la regla contra pérdida reflectiva post-Marex",
        "Confidencial [2020 - en curso]. Reclamación para recuperar préstamos de US$1bn obtenidos por fraude y desviados"
      ],
      icon: <FileText className="h-6 w-6" />,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Litigios Comerciales",
      description: "Tom tiene una práctica comercial amplia, con experiencia particular en disputas que involucran banca, empresas conjuntas, gestión hotelera y adquisiciones de negocios.",
      cases: [
        "Confidencial: (2021 - en curso). Actuando para un brazo de inversión estatal respecto a una empresa conjunta para el desarrollo de bienes raíces",
        "Taleem v National Bonds and Deyaar, una disputa de $100m sobre una transacción inmobiliaria (con Vernon Flynn QC)",
        "Nakheel v Souq (Dubai World Tribunal, 2011 - en curso). Actuando para Souq en esta disputa de AED 1bn sobre una transacción inmobiliaria"
      ],
      icon: <Briefcase className="h-6 w-6" />,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Construcción y Proyectos",
      description: "Tom es recomendado en Chambers & Partners para construcción. Tiene experiencia de arbitraje, adjudicación y el TCC. Su práctica tiene énfasis en energía, petróleo y gas.",
      cases: [
        "(2016) Brookfield Multiplex v DIFC Investments: construcción, arbitraje, injunciónes anti-demanda",
        "(2011 - 2015) Tres arbitrajes DIAC de AED 100m relacionados que surgen de un proyecto de construcción de alto perfil en Dubai",
        "Honeywell International v Meydan LLC [2014] EWHC (TCC) 1344. Ejecución de un laudo arbitral DIAC en el Reino Unido"
      ],
      icon: <Users className="h-6 w-6" />,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Energía, Petróleo y Gas",
      description: "Tom ha actuado en una variedad de asuntos relacionados con energía, incluyendo disputas de petróleo y gas, y proyectos de energía.",
      cases: [
        "US$30m arbitraje LCIA relacionado con la operación de una plataforma petrolera",
        "Corinth Pipeworks v Barclays Bank plc (2010) (DIFC), disputa de US$26m en Dubai relacionada con el suministro de gasoducto",
        "IPT2 Property v Total (2009) (TCC), reclamación de £4m que surge de la explosión de Buncefield"
      ],
      icon: <Globe className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Negligencia Profesional",
      description: "Tom ha actuado en reclamaciones contra abogados, contadores, asesores financieros, corredores de seguros, tasadores y profesionales de la construcción.",
      cases: [
        "Brampton Insurance v AHJ (Comm Ct) (2010 - 2011), reclamación contra corredores de reaseguros por no notificar reclamaciones",
        "Reclamación de negligencia de abogado relacionada con asesoramiento de planificación fiscal (2010)",
        "Lewis v Kyriacou (2009), reclamación de negligencia de abogados que surge de una escritura"
      ],
      icon: <Award className="h-6 w-6" />,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const noticiasRelacionadas = [
    {
      title: "El Tribunal de Apelación del DIFC confirma el laudo ICC de USD 1.6 mil millones y confirma la existencia de la doctrina de acto de estado extranjero en la ley DIFC",
      date: "20 de enero de 2025",
      category: "Jurisprudencia"
    },
    {
      title: "3VB clasificado como Leading Set en The Legal 500 EMEA 2025",
      date: "15 de enero de 2025",
      category: "Reconocimiento"
    },
    {
      title: "Tom Montagu-Smith KC y Miriam Schmelzer derrotan desafío al laudo ICC de USD 1.6 mil millones en el Tribunal DIFC",
      date: "10 de enero de 2025",
      category: "Éxito Legal"
    }
  ];

  const eventosRelacionados = [
    {
      title: "Dubai Arbitration Week 2024",
      date: "14 de noviembre de 2024",
      time: "4:00 pm - 8:00 pm",
      type: "Conferencia"
    },
    {
      title: "DIFC Webinar 6 - Tribunales DIFC y otros tribunales en los EAU",
      date: "12 de septiembre de 2024",
      time: "9:30 am",
      type: "Webinar"
    }
  ];

  const educacionPremios = {
    educacion: [
      {
        institucion: "Lincoln's Inn",
        titulo: "BVC Prize (2do en el año)",
        premios: ["BVC Prize 2001", "Hardewicke Scholarship 2000"]
      },
      {
        institucion: "College of Law",
        titulo: "PgDL: Distinción (top 5 en el año)",
        premios: ["Exhibition scholarship to Lincoln College, Oxford 1998"]
      },
      {
        institucion: "Oxford University",
        titulo: "BA en Política, Filosofía y Economía",
        premios: ["Exhibition scholarship to Lincoln College, Oxford"]
      }
    ],
    premios: {
      "2024": [
        "Commercial Silk of the Year - Legal 500 Middle East and North Africa (MENA) Awards"
      ],
      "Lincoln's Inn": [
        "BVC Prize (2001) - 2do en el año",
        "Hardewicke Scholarship (2000)"
      ],
      "College of Law": [
        "PgDL: Distinción (2000) - top 5 en el año"
      ],
      "Oxford University": [
        "Exhibition scholarship to Lincoln College (1998)"
      ]
    }
  };

  const stats = [
    { label: "Años de Experiencia", value: "23+", icon: <Calendar className="h-5 w-5" /> },
    { label: "Casos DIFC", value: "50+", icon: <Building className="h-5 w-5" /> },
    { label: "Jurisdicciones", value: "15+", icon: <Globe className="h-5 w-5" /> },
    { label: "Valor Total de Casos", value: "$10B+", icon: <Award className="h-5 w-5" /> }
  ];

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 text-white overflow-hidden"
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
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
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
                      src="/assets/abogados/Tom-Montagu-Smith-QC.jpg"
                      alt="Tom Montagu-Smith KC"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                  
                  {/* Badge de King's Counsel */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-400 to-indigo-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
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
                  className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white via-purple-100 to-indigo-200 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Tom Montagu-Smith KC
                </motion.h1>
                
                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-8 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Calendar className="h-5 w-5 text-purple-400" />
                    <span className="font-medium">Colegiación: 2001 | Silk: 2017</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Award className="h-5 w-5 text-indigo-400" />
                    <span className="font-medium">King's Counsel</span>
                  </div>
                </motion.div>
                
                <motion.p 
                  className="text-xl md:text-2xl font-light text-purple-200 mb-10 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Tom tiene una práctica pesada de disputas comerciales tanto en arbitraje como en litigios. Su trabajo incluye banca, empresas conjuntas, fraude, seguros y reaseguros.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.a 
                    href="mailto:tms@3vb.com" 
                    className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="h-5 w-5" />
                    <span className="font-semibold">tms@3vb.com</span>
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
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
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
        className="py-20 bg-gradient-to-r from-gray-50 to-purple-50 dark:from-gray-900 dark:to-gray-800"
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
                  <p className="text-lg font-medium text-purple-600 dark:text-purple-400">
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
                      ? 'bg-purple-600 scale-125' 
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
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 bg-gradient-to-r from-gray-900 to-purple-600 dark:from-white dark:to-purple-400 bg-clip-text text-transparent">
                  Resumen de la Práctica
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6 text-lg leading-relaxed">
                  <p>
                    Tom tiene una práctica pesada de disputas comerciales tanto en arbitraje como en litigios. Su trabajo incluye banca, empresas conjuntas, fraude, seguros y reaseguros y disputas que surgen de proyectos de construcción.
                  </p>
                  <p>
                    Tom ha estado involucrado en algunos de los casos de mayor valor y más significativos ante los Tribunales DIFC. Instrucciones significativas incluyen Emirates NBD v KBBO (DIFC, 2020 - en curso), una reclamación de US$300m para un sindicato de 11 bancos contra 19 demandados que surge de arreglos de reestructuración de deuda.
                  </p>
                  <p>
                    Tom apareció en muchas de las reclamaciones que establecieron la jurisdicción del Tribunal DIFC para ejecutar sentencias y laudos extranjeros, incluyendo DNB Bank v Gulf Eyadah (CA, 25 Feb 2016), que estableció la jurisdicción de &quot;conduit&quot; de los Tribunales DIFC.
                  </p>
                  <p>
                    En 2024, Tom ganó Commercial Silk of the Year en los Legal 500 Middle East and North Africa (MENA) Awards.
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
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 bg-gradient-to-r from-gray-900 to-purple-600 dark:from-white dark:to-purple-400 bg-clip-text text-transparent">
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
                                <div className="mt-2 text-sm text-purple-600 dark:text-purple-400 font-medium">
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
                                          <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
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
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
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
                            <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mt-2 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-gray-800 dark:text-gray-200 text-sm leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {noticia.title}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full font-medium">
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
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
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
                            <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
                            <div>
                              <p className="text-gray-800 dark:text-gray-200 text-sm leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {evento.title}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full font-medium">
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

                {/* Education & Awards */}
                <motion.div
                  className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                    Educación y Premios Clave
                  </h4>
                  <div className="space-y-6">
                    {educacionPremios.educacion.map((edu, index) => (
                      <div key={index} className="space-y-3">
                        <div>
                          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
                            {edu.institucion}
                          </h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {edu.titulo}
                          </p>
                          <div className="space-y-1">
                            {edu.premios.map((premio, premioIndex) => (
                              <div key={premioIndex} className="flex items-start gap-2">
                                <Award className="h-3 w-3 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
