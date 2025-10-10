"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LazyWrapper } from "./LazyWrapper";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-24 pb-20 md:pb-32">
      {/* Imagen de fondo optimizada */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/hero.jpg')"
        }}
      />
      {/* Overlay mejorado para mejor contraste */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/80" />
      {/* Patrón sutil */}
      <div className="absolute inset-0 -z-10 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <LazyWrapper direction="up" delay={0}>
          <motion.h1
            id="hero-title"
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Defendemos tu dinero en el mundo digital
          </motion.h1>
        </LazyWrapper>

        <LazyWrapper direction="up" delay={0.1}>
          <motion.p
            className="mt-6 text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Somos 3VB. Abogados especialistas en ciberfraude y recuperación de fondos.
          </motion.p>
        </LazyWrapper>

        <LazyWrapper direction="up" delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contacto"
              className="inline-flex items-center rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-4 text-white font-semibold shadow-xl shadow-blue-600/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Agenda una asesoría
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center rounded-2xl border-2 border-white/80 px-8 py-4 text-white font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Explorar servicios
            </Link>
          </div>
        </LazyWrapper>
      </div>
    </section>
  );
}


