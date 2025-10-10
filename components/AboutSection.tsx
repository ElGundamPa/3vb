"use client";

import { motion } from "framer-motion";
import { LazyWrapper } from "./LazyWrapper";
import { AnimatedCounter } from "./AnimatedCounter";

const stats = [
  { value: 1500, suffix: "+", label: "Casos Exitosos" },
  { value: 2.5, suffix: "M USD", label: "Recuperados" },
  { value: 8, suffix: "+", label: "Años de Experiencia" },
  { value: 4, suffix: " meses", label: "Tiempo Promedio" }
];

const values = [
  {
    icon: "🛡️",
    title: "Integridad",
    description: "Actuamos con total transparencia y honestidad en cada caso, manteniendo los más altos estándares éticos."
  },
  {
    icon: "⚡",
    title: "Innovación",
    description: "Utilizamos las últimas tecnologías y metodologías para resolver casos complejos de ciberfraude."
  },
  {
    icon: "🎯",
    title: "Excelencia",
    description: "Nos comprometemos a brindar resultados excepcionales y superar las expectativas de nuestros clientes."
  },
  {
    icon: "🤝",
    title: "Confianza",
    description: "Construimos relaciones duraderas basadas en la confianza mutua y el respeto profesional."
  }
];

const timeline = [
  {
    year: "2019",
    title: "Fundación de 3VB",
    description: "Nacimos con la visión de revolucionar el derecho digital y la recuperación de fondos."
  },
  {
    year: "2020",
    title: "Primeros Casos Exitosos",
    description: "Recuperamos más de $500,000 USD en nuestros primeros casos de ciberfraude."
  },
  {
    year: "2021",
    title: "Expansión Internacional",
    description: "Ampliamos nuestros servicios a México, Colombia y otros países de Latinoamérica."
  },
  {
    year: "2022",
    title: "Certificación ISO 27001",
    description: "Obtuvimos la certificación internacional en seguridad de la información."
  },
  {
    year: "2023",
    title: "Premio LegalTech",
    description: "Reconocidos como el mejor bufete de ciberfraude por la industria legal-tech."
  },
  {
    year: "2024",
    title: "Líderes del Sector",
    description: "Más de 1,500 casos exitosos y $2.5M USD recuperados para nuestros clientes."
  }
];

export function AboutSection() {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <LazyWrapper direction="up">
          <div className="text-center mb-16">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Conoce Nuestra Historia
            </motion.h1>
            <motion.p
              className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Somos pioneros en la defensa legal digital, especializados en recuperación de fondos 
              y ciberfraude. Nuestra misión es proteger tu patrimonio en el mundo digital.
            </motion.p>
          </div>
        </LazyWrapper>

        {/* Stats Section */}
        <LazyWrapper direction="up" delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 group-hover:-translate-y-1">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-3">
                    <AnimatedCounter 
                      target={stat.value} 
                      suffix={stat.suffix}
                      duration={1.5}
                    />
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </LazyWrapper>

        {/* Mission & Vision */}
        <LazyWrapper direction="up" delay={0.4}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Nuestra Misión</h3>
              <p className="text-slate-600 leading-relaxed">
                Defender los derechos digitales de nuestros clientes, recuperar fondos perdidos 
                por ciberfraude y establecer precedentes legales que protejan a la sociedad 
                en el mundo digital.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100"
            >
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Nuestra Visión</h3>
              <p className="text-slate-600 leading-relaxed">
                Ser el bufete líder en derecho digital a nivel internacional, reconocido por 
                nuestra innovación tecnológica y excelencia en la recuperación de fondos 
                y defensa contra ciberfraude.
              </p>
            </motion.div>
          </div>
        </LazyWrapper>

        {/* Values */}
        <LazyWrapper direction="up" delay={0.6}>
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200 group-hover:-translate-y-1 h-full">
                    <div className="text-3xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </LazyWrapper>

        {/* Timeline */}
        <LazyWrapper direction="up" delay={0.8}>
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-800">
              Nuestra Historia
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-emerald-500"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1, 
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    className="relative flex items-start"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                    
                    {/* Content */}
                    <div className="ml-16 bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-2xl font-bold text-blue-600">{item.year}</span>
                        <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </LazyWrapper>

        {/* CTA Section */}
        <LazyWrapper direction="up" delay={1.0}>
          <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para Defender tus Derechos Digitales?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Únete a los miles de clientes que han confiado en nosotros para recuperar 
              sus fondos y proteger su patrimonio digital.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contacto"
                className="inline-flex items-center rounded-2xl bg-white px-8 py-4 text-blue-600 font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Consulta Gratuita
              </a>
              <a
                href="/abogados"
                className="inline-flex items-center rounded-2xl border-2 border-white px-8 py-4 text-white font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
              >
                Conoce Nuestro Equipo
              </a>
            </div>
          </div>
        </LazyWrapper>
      </div>
    </div>
  );
}
