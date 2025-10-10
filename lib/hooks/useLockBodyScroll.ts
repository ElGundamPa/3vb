import { useEffect } from 'react';

/**
 * Hook para bloquear el scroll del body cuando un modal/drawer está abierto
 * Maneja el padding-right para compensar la pérdida de la scrollbar
 */
export function useLockBodyScroll(lock: boolean) {
  useEffect(() => {
    if (lock) {
      // Guardar el estilo original
      const originalStyle = window.getComputedStyle(document.body).overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Calcular el ancho de la scrollbar
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Bloquear el scroll
      document.body.style.overflow = 'hidden';
      
      // Compensar la pérdida de la scrollbar si existe
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      
      // Cleanup function
      return () => {
        document.body.style.overflow = originalStyle;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [lock]);
}
