import { LazyWrapper } from "@/components/LazyWrapper";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Shield, Users, Globe, Target, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros — 3VB",
  description: "Conoce nuestro equipo de abogados especialistas en ciberfraude y recuperación de fondos. Más de 5 años de experiencia protegiendo tu dinero.",
};

export default function NosotrosPage() {
  return (
    <main className="min-h-[100svh]">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <LazyWrapper direction="up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Somos 3VB
              </h1>
            </LazyWrapper>
            <LazyWrapper direction="up" delay={0.1}>
              <p className="text-xl md:text-2xl text-blue-100 mb-8">
                Abogados especialistas en ciberfraude y recuperación de fondos
              </p>
            </LazyWrapper>
            <LazyWrapper direction="up" delay={0.2}>
              <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                Más de 5 años protegiendo a víctimas de estafas cibernéticas. 
                Nuestro equipo combina experiencia legal, tecnología forense y 
                conocimiento internacional para maximizar tus posibilidades de recuperación.
              </p>
            </LazyWrapper>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <LazyWrapper direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Nuestros resultados hablan por sí solos
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Datos que respaldan nuestra experiencia y compromiso
              </p>
            </div>
          </LazyWrapper>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <LazyWrapper direction="up" delay={0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  <AnimatedCounter target={1500} suffix="+" duration={1.5} />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Casos atendidos</p>
              </div>
            </LazyWrapper>

            <LazyWrapper direction="up" delay={0.2}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                  <AnimatedCounter target={2.5} suffix="M USD" duration={1.5} />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Recuperado</p>
              </div>
            </LazyWrapper>

            <LazyWrapper direction="up" delay={0.3}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  <AnimatedCounter target={8} suffix="+" duration={1.5} />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Países</p>
              </div>
            </LazyWrapper>

            <LazyWrapper direction="up" delay={0.4}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  <AnimatedCounter target={4} suffix=" meses" duration={1.5} />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">Tiempo promedio</p>
              </div>
            </LazyWrapper>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <LazyWrapper direction="up">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Nuestra Misión
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Proteger a las víctimas de ciberfraude mediante servicios legales especializados, 
                  tecnología forense avanzada y estrategias internacionales que maximicen la 
                  recuperación de fondos perdidos.
                </p>
              </div>
            </LazyWrapper>

            <LazyWrapper direction="up" delay={0.1}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Nuestra Visión
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Ser el bufete líder en Latinoamérica en la lucha contra el ciberfraude, 
                  estableciendo nuevos estándares de excelencia legal y tecnológica para 
                  proteger a las víctimas en el mundo digital.
                </p>
              </div>
            </LazyWrapper>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <LazyWrapper direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Nuestros Valores
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Los principios que guían nuestro trabajo diario
              </p>
            </div>
          </LazyWrapper>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <LazyWrapper direction="up" delay={0.1}>
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Integridad
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Actuamos con transparencia y honestidad en cada caso, 
                  priorizando siempre el bienestar de nuestros clientes.
                </p>
              </div>
            </LazyWrapper>

            <LazyWrapper direction="up" delay={0.2}>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Innovación
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Utilizamos las últimas tecnologías forenses y herramientas 
                  digitales para obtener los mejores resultados.
                </p>
              </div>
            </LazyWrapper>

            <LazyWrapper direction="up" delay={0.3}>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Compromiso
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Nos dedicamos completamente a cada caso, trabajando 
                  incansablemente hasta agotar todas las opciones legales.
                </p>
              </div>
            </LazyWrapper>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <LazyWrapper direction="up">
            <h2 className="text-3xl font-bold mb-6">
              ¿Necesitas ayuda con tu caso?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Agenda una consulta gratuita y descubre cómo podemos ayudarte a recuperar tu dinero
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contacto"
                className="inline-flex items-center rounded-2xl bg-white px-8 py-4 text-blue-600 font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
              >
                Consulta Gratuita
              </a>
              <a
                href="/calculadora"
                className="inline-flex items-center rounded-2xl border-2 border-white px-8 py-4 text-white font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
              >
                Calculadora de Recuperación
              </a>
            </div>
          </LazyWrapper>
        </div>
      </section>
    </main>
  );
}
