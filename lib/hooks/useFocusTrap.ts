import { useEffect } from 'react';

/**
 * Hook para atrapar el foco dentro de un contenedor (modal/drawer)
 * Permite navegación con Tab/Shift+Tab y cierre con Escape
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement>, 
  isActive: boolean,
  onClose?: () => void
) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    
    // Obtener elementos focusables
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Manejar navegación con Tab
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab: ir al último elemento si estamos en el primero
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab: ir al primer elemento si estamos en el último
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Manejar tecla Escape
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    // Agregar event listeners
    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscapeKey);
    
    // Enfocar el primer elemento
    firstElement?.focus();

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isActive, containerRef, onClose]);
}
