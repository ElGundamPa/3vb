import { RecoveryCalculator } from "@/components/RecoveryCalculator";
import { LazyWrapper } from "@/components/LazyWrapper";

export default function CalculadoraPage() {
  return (
    <main className="min-h-[100svh]">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Calculadora de Recuperación
            </h1>
            <p className="text-xl text-blue-100">
              Evalúa las posibilidades de recuperar tu dinero perdido por estafas cibernéticas
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 max-w-6xl">
          <LazyWrapper direction="up">
            <RecoveryCalculator />
          </LazyWrapper>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-slate-800">¿Cómo funciona la calculadora?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Nuestra calculadora evalúa múltiples factores para determinar las posibilidades de recuperación
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800">Análisis de Factores</h3>
              <p className="text-slate-600 text-sm">
                Evaluamos el monto, tiempo transcurrido, calidad de evidencia y jurisdicción
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800">Cálculo Inteligente</h3>
              <p className="text-slate-600 text-sm">
                Utilizamos algoritmos basados en casos exitosos para estimar posibilidades
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-800">Recomendaciones</h3>
              <p className="text-slate-600 text-sm">
                Te sugerimos el mejor servicio y estrategia para tu caso específico
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
