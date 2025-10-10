import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/lib/data";
import { CurrencySwitcher } from "@/components/CurrencySwitcher";
import { LazyWrapper } from "@/components/LazyWrapper";
import { CartButton } from "@/components/CartButton";
import Link from "next/link";

export const dynamic = "force-static";

export default function ServiciosPage() {
  return (
    <main className="min-h-[100svh]">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/fondos/servicios.jpg')",
          }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gray-900/70" />
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              Nuestros Servicios
              <br />
              Especializados
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Soluciones legales especializadas para proteger y recuperar tu dinero en el
              mundo digital
            </p>
          </div>
        </div>
      </section>



      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold mb-4">Servicios Disponibles</h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        Selecciona el servicio que necesitas. Puedes elegir tu abogada/o para cada servicio.
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <CurrencySwitcher />
                      <CartButton />
                    </div>
                  </div>
          
          <LazyWrapper direction="up">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} serviceId={service.id} />
              ))}
            </div>
          </LazyWrapper>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestro Proceso</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Cómo trabajamos para recuperar tu dinero
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">1</div>
              <h3 className="text-lg font-semibold mb-2">Consulta Inicial</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Evaluamos tu caso y determinamos la viabilidad de recuperación</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">2</div>
              <h3 className="text-lg font-semibold mb-2">Análisis Forense</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Recopilamos y analizamos toda la evidencia digital disponible</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">3</div>
              <h3 className="text-lg font-semibold mb-2">Estrategia Legal</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Desarrollamos la mejor estrategia legal para tu caso específico</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">4</div>
              <h3 className="text-lg font-semibold mb-2">Recuperación</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Ejecutamos la estrategia y trabajamos para recuperar tu dinero</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Necesitas ayuda con tu caso?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Agenda una consulta gratuita para evaluar tu caso
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center rounded-2xl bg-white px-8 py-4 text-emerald-500 font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              Consulta Gratuita
            </Link>
            <Link
              href="/calculadora"
              className="inline-flex items-center rounded-2xl border-2 border-white px-8 py-4 text-white font-semibold hover:bg-white hover:text-emerald-500 transition-all duration-300 hover:scale-105"
            >
              Calculadora de Recuperación
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}



