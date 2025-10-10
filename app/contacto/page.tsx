import { LazyWrapper } from "@/components/LazyWrapper";
import { ContactForm } from '@/components/ContactForm';
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto — 3VB",
  description: "Contáctanos para una consulta gratuita sobre tu caso de ciberfraude. Estamos aquí para ayudarte a recuperar tu dinero.",
};

export default function ContactoPage() {
  // ContactForm component handles submission and UX

  return (
    <main className="min-h-[100svh]">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contáctanos
            </h1>
            <p className="text-xl text-blue-100">
              Estamos aquí para ayudarte a recuperar tu dinero. Agenda una consulta gratuita.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <LazyWrapper direction="up">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                  Envíanos un mensaje
                </h2>
                <ContactForm />
              </div>
            </LazyWrapper>

            {/* Información de contacto */}
            <LazyWrapper direction="up" delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    Información de contacto
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Estamos disponibles para atenderte y resolver tus dudas sobre ciberfraude y recuperación de fondos.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Teléfono</h3>
                      <p className="text-gray-600 dark:text-gray-300">+52 1 81 4624 4620</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Lunes a Viernes, 8:00 AM - 7:00 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                      <p className="text-gray-600 dark:text-gray-300">contacto@3vb.org</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Respuesta en 24 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Ubicación</h3>
                      <p className="text-gray-600 dark:text-gray-300">Londres, Reino Unido</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Consultas presenciales y virtuales</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Horarios</h3>
                      <p className="text-gray-600 dark:text-gray-300">Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Sábados: 9:00 AM - 1:00 PM</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <a
                    href="https://wa.me/+5218146244620?text=Hola, me interesa una consulta sobre ciberfraude,Vengo de la pagina web"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full justify-center"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chatear por WhatsApp
                  </a>
                </div>
              </div>
            </LazyWrapper>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <LazyWrapper direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Preguntas frecuentes
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Respuestas a las consultas más comunes sobre nuestros servicios
              </p>
            </div>
          </LazyWrapper>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <LazyWrapper direction="up" delay={0.1}>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ¿Cuánto tiempo toma recuperar mi dinero?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  El tiempo varía según la complejidad del caso. Casos simples pueden resolverse en 2-4 semanas, mientras que casos internacionales pueden tomar 3-6 meses.
                </p>
              </div>
            </LazyWrapper>

            <LazyWrapper direction="up" delay={0.2}>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ¿Qué evidencia necesito?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Capturas de pantalla, conversaciones, comprobantes de transferencias, y cualquier documentación relacionada con la estafa. Mientras más evidencia, mejor.
                </p>
              </div>
            </LazyWrapper>

            <LazyWrapper direction="up" delay={0.3}>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ¿Trabajan con casos internacionales?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Sí, tenemos experiencia en casos transfronterizos y coordinamos con autoridades internacionales para maximizar las posibilidades de recuperación.
                </p>
              </div>
            </LazyWrapper>

            <LazyWrapper direction="up" delay={0.4}>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ¿Cuál es el costo de la consulta inicial?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  La consulta inicial es gratuita. Solo cobramos si decidimos tomar tu caso y trabajamos con honorarios de éxito en la mayoría de casos.
                </p>
              </div>
            </LazyWrapper>
          </div>
        </div>
      </section>
    </main>
  );
}