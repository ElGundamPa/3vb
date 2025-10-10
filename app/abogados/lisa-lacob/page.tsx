"use client";

import { Award, Mail, Calendar, FileText, ChevronDown, ExternalLink, Star, Users, Briefcase, BookOpen, Building, Clock, Globe, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

export default function LisaLacobPage() {
  const [expandedPanels, setExpandedPanels] = useState<number[]>([]);
  const [activeQuote, setActiveQuote] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Quotes carousel
  const quotes = [
    {
      text: "Lisa es una fuerza de la naturaleza. Intrépida y tranquila bajo presión. Una abogada enérgica y efectiva que luchará con uñas y dientes por su cliente. Subestímalos bajo tu propio riesgo.",
      source: "Legal 500 UK Bar (2025)",
    },
    {
      text: "Una defensora sobresaliente, extremadamente conocedora, capaz y efectiva, excepcionalmente inteligente, accesible y práctica.",
      source: "Chambers & Partners UK Bar (2025)",
    },
    {
      text: "Una defensora impresionante y tenaz en su enfoque, comercialmente astuta, muy aguda y excelente con los clientes.",
      source: "Legal 500 UK Bar (2025)",
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
      title: "Banca y Servicios Financieros",
      description: "Experiencia consistente clasificada por Legal 500 y Chambers & Partners como una abogada junior líder en banca y finanzas durante varios años.",
      cases: [
        "Farol & others v Clydesdale Bank and National Australia Bank - Acción grupal de más de 800 demandantes contra dos bancos por representaciones erróneas sobre los costos de ruptura",
        "Jansen & Hastings v Ten Financial LLP & others - Demandantes de bonos de préstamo en una reclamación sustancial contra dos IFAs",
        "Cohen v Nationwide - Prestatario alegando una relación injusta bajo la sección 140A de la Ley de Crédito al Consumidor en relación con un préstamo de tasa fija de £35 millones"
      ],
      icon: <Building className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Fraude Civil",
      description: "Regularmente instruida en disputas sustanciales de fraude civil, con un fuerte enfoque en litigios transfronterizos.",
      cases: [
        "Hung v Hua She Asset Management (Shanghai) Co Ltd [2022] EWHC 662 (Comm) - Ejecución de laudo arbitral contra individuo HNW de Hong Kong",
        "Executive Authority for Air Cargo v Prime Education Ltd [2020] EWHC 1985 (QB) - Defensa exitosa contra agencia del gobierno libio",
        "Órdenes de congelamiento mundial y órdenes de divulgación de activos inusuales"
      ],
      icon: <FileText className="h-6 w-6" />,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "Resolución de Disputas Comerciales y Arbitraje",
      description: "Reconocida como Abogada Junior Líder en Litigios Comerciales y también experimentada en arbitraje comercial internacional.",
      cases: [
        "Loches Capital Limited v Goldman Sachs International [2020] EWHC 2327 (Comm) - Reclamación contra banco de inversión por manipulación del SER",
        "J v Selling Shareholders - Arbitraje de £20 millones por presuntas violaciones de garantía en la venta de negocio basado en Dubai",
        "Ditto Limited v Drive-Thru Records LLC [2021] EWHC 2035 (Ch) - Aplicación exitosa para anular orden de servicio fuera de jurisdicción"
      ],
      icon: <Briefcase className="h-6 w-6" />,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Negligencia Profesional",
      description: "Regularmente instruida por prestamistas hipotecarios en relación con reclamaciones contra tasadores por sobrevaloración negligente de propiedades.",
      cases: [
        "Reclamaciones a gran escala contra tasadores y topógrafos por suposiciones adecuadas sobre costos de construcción",
        "Reclamaciones contra abogados completadores en el contexto de financiación inmobiliaria por violaciones de retención",
        "Reclamaciones contra abogados en el contexto de préstamos sindicados/finanzas estructuradas"
      ],
      icon: <Award className="h-6 w-6" />,
      color: "from-amber-500 to-orange-500"
    },
    {
      title: "Derecho Societario",
      description: "Actúa frecuentemente para empresas y accionistas en disputas complejas de derecho societario, incluyendo peticiones de prejuicio injusto s.994.",
      cases: [
        "Actuando para liquidadores de una empresa en reclamaciones contra ex directores y director sombra por violaciones del deber fiduciario",
        "Asesorando a empresas en relación con reclamaciones contra ex directores por violaciones del deber fiduciario",
        "Actuando para empresas en procedimientos de injunción urgente para restringir a ex directores de violar disposiciones de confidencialidad"
      ],
      icon: <Users className="h-6 w-6" />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Insolvencia y Reestructuración",
      description: "Instructa regularmente tanto por acreedores peticionarios como por deudores en audiencias de liquidación y quiebra.",
      cases: [
        "Aplicaciones para anular órdenes de quiebra y para dejar sin efecto demandas estatutarias",
        "Aplicaciones para sustitución de acreedores y para sustitución de servicio de peticiones",
        "The Co-operative Bank v Phillips [2017] EWHC 1320 (Ch) - Experiencia particular de CVAs e IVAs"
      ],
      icon: <Clock className="h-6 w-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Tecnología de la Información y Telecomunicaciones",
      description: "Actuando para empresas de software en relación con disputas sobre si las Regulaciones de Agentes Comerciales se aplican al software.",
      cases: [
        "Actuando para empresa de software en disputa sobre aplicación de Regulaciones de Agentes Comerciales a software",
        "Actuando para empresa de criptomonedas en defensa de presunta violación de contrato en transferencia de tokens",
        "Actuando para tres empresas en relación con reclamos AIT bajo acuerdo estándar de interconexión con BT"
      ],
      icon: <Globe className="h-6 w-6" />,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const noticiasRelacionadas = [
    {
      title: "Lisa Lacob y Devon Airey actuaron para el demandado exitoso, Sr. Eugene Jaffe, en Stein v Jaffe [2025] EWHC 2334 (Comm)",
      date: "15 de enero de 2025",
      category: "Éxito Legal"
    },
    {
      title: "Sentencia del Tribunal Superior sobre la transición LIBOR",
      date: "10 de diciembre de 2024",
      category: "Jurisprudencia"
    }
  ];

  const eventosRelacionados = [
    {
      title: "Seminario Anual de 3VB en Leeds 2025: Temas Calientes y Exploración del Horizonte",
      date: "8 de mayo de 2025",
      time: "6:00 pm - 7:00 pm",
      type: "Seminario"
    }
  ];

  const educacionPremios = {
    educacion: [
      {
        institucion: "Universidad de Cambridge",
        titulo: "LLM (primer nivel)",
        premios: ["Evan Lewis Thomas Law Studentship", "Mandela Bursary", "Galloway & Porter Prize"]
      },
      {
        institucion: "Universidad de Ciudad del Cabo",
        titulo: "B. Bus. Sc. (honores de primera clase) y LLB (magna cum laude)",
        premios: ["Judge Shock Prize", "Attorneys Fidelity Fund Prize", "Cape Bar Council Mooting prize"]
      }
    ],
    premios: {
      "Universidad de Cambridge": [
        "Evan Lewis-Thomas Law Studentship",
        "Mandela Cambridge Bursary", 
        "Galloway and Porter Prize (rendimiento general en exámenes)"
      ],
      "Universidad de Ciudad del Cabo": [
        "Cape Bar Council Moot Prize",
        "Amelia Schenkman Entrance Scholarship",
        "Attorney's Fidelity Fund Scholarship",
        "Judge Shock Prize for top First in law",
        "Butterworths Prize",
        "TW Price Memorial Prize",
        "Juta Law Prize"
      ]
    }
  };

  const stats = [
    { label: "Años de Experiencia", value: "20+", icon: <Calendar className="h-5 w-5" /> },
    { label: "Casos de Banca", value: "300+", icon: <Building className="h-5 w-5" /> },
    { label: "Jurisdicciones", value: "12+", icon: <Globe className="h-5 w-5" /> },
    { label: "Publicaciones", value: "15+", icon: <BookOpen className="h-5 w-5" /> }
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
                      src="/assets/abogados/Lisa-Lacob.jpg"
                      alt="Lisa Lacob"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>
                  
                  {/* Badge de Senior Junior */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-emerald-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    SJ
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
                  Lisa Lacob
                </motion.h1>
                
                <motion.div 
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mb-8 text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-400" />
                    <span className="font-medium">Colegiación: 2004</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Award className="h-5 w-5 text-green-400" />
                    <span className="font-medium">Senior Junior</span>
                  </div>
                </motion.div>
                
                <motion.p 
                  className="text-xl md:text-2xl font-light text-blue-200 mb-10 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Abogada establecida con experiencia en Banca y Servicios Financieros, Fraude Civil, Resolución de Disputas Comerciales y Arbitraje.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.a 
                    href="mailto:llacob@3vb.com" 
                    className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="h-5 w-5" />
                    <span className="font-semibold">llacob@3vb.com</span>
                    <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                  <motion.a 
                    href="mailto:SeniorJuniorsPMs@3vb.com" 
                    className="group flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="h-5 w-5" />
                    <span className="font-semibold">SeniorJuniorsPMs@3vb.com</span>
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
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
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
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 bg-gradient-to-r from-gray-900 to-green-600 dark:from-white dark:to-green-400 bg-clip-text text-transparent">
                  Resumen de la Práctica
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6 text-lg leading-relaxed">
                  <p>
                    Lisa Lacob es una abogada junior senior establecida con experiencia en Banca y Servicios Financieros, Fraude Civil, Resolución de Disputas Comerciales y Arbitraje, Negligencia Profesional, Derecho Societario e Insolvencia.
                  </p>
                  <p>
                    Lisa tiene una amplia experiencia en injunciónes urgentes, incluyendo la obtención de alivio injuntivo doméstico en apoyo de procedimientos judiciales extranjeros. También tiene una experiencia sustancial en juicios y es particularmente elogiada por su defensa.
                  </p>
                  <p>
                    Es reconocida por los directorios como Abogada Junior Líder en Banca y Finanzas (incluyendo Crédito al Consumidor), Litigios Comerciales, Fraude Civil y Negligencia Profesional y es descrita como &quot;una defensora sobresaliente&quot;, &quot;extremadamente conocedora, capaz y efectiva&quot;, &quot;excepcionalmente inteligente, accesible y práctica&quot;.
                  </p>
                  <p>
                    Muchos de los casos de Lisa son disputas bancarias y de servicios financieros de alto valor. Su experiencia trabajando como abogada bancaria no contenciosa en un bufete de abogados global líder y en el equipo de productos estructurados de un banco significa que tiene experiencia particular en préstamos sindicados, instrumentos derivados complejos, documentación ISDA y titulizaciones.
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
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 bg-gradient-to-r from-gray-900 to-green-600 dark:from-white dark:to-green-400 bg-clip-text text-transparent">
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
                                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
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
                    <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
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
                            <div className="w-2 h-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full mt-2 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="text-gray-800 dark:text-gray-200 text-sm leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                {noticia.title}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full font-medium">
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
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
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
                            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                            <div>
                              <p className="text-gray-800 dark:text-gray-200 text-sm leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {evento.title}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full font-medium">
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
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
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
