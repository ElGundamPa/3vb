"use client";

import React, { useState } from 'react';
import { useToast } from './Toast';

export function ContactForm() {
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/submit-form/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'contacto', submittedAt: new Date().toISOString(), data }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        addToast({ type: 'error', title: 'No se pudo enviar', description: json?.error || 'Error del servidor' });
      } else {
        addToast({ type: 'success', title: 'Mensaje enviado', description: 'Gracias, te contactaremos pronto.' });
        form.reset();
      }
    } catch (err) {
      console.error('ContactForm submit error:', err);
      addToast({ type: 'error', title: 'Error de red', description: 'Intenta nuevamente más tarde.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="Tu nombre completo"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Correo electrónico *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="+57 300 123 4567"
          />
        </div>
        <div>
          <label htmlFor="pais" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            País
          </label>
          <select
            id="pais"
            name="pais"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">Selecciona tu país</option>
            <option value="colombia">Colombia</option>
            <option value="mexico">México</option>
            <option value="peru">Perú</option>
            <option value="chile">Chile</option>
            <option value="españa">España</option>
            <option value="otros">Otros</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="servicio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Servicio de interés
        </label>
        <select
          id="servicio"
          name="servicio"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Selecciona un servicio</option>
          <option value="asesoria-basica">Asesoría Básica</option>
          <option value="asesoria-intermedia">Asesoría Intermedia</option>
          <option value="asesoria-avanzada">Asesoría Avanzada</option>
          <option value="auditoria-evidencia">Auditoría de Evidencia Digital</option>
          <option value="recuperacion-fondos">Recuperación de Fondos</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Cuéntanos sobre tu caso *
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          placeholder="Describe brevemente tu situación y cómo podemos ayudarte..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  );
}
