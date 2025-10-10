"use client";

import { useEffect, useState } from 'react';

export function useCartPosition() {
  const [cartPosition, setCartPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCartPosition = () => {
      // Buscar el botón del carrito en el header/navbar, no en el drawer
      let cartButton = null;
      
      // Primero buscar por data-cart-button
      cartButton = document.querySelector('[data-cart-button]');
      
      // Si no encuentra, buscar en el header específicamente
      if (!cartButton) {
        const header = document.querySelector('header, nav, .navbar');
        if (header) {
          cartButton = header.querySelector('button[aria-label*="carrito"], button[aria-label*="Carrito"]');
        }
      }
      
      // Si aún no encuentra, buscar por el icono de ShoppingCart en el header
      if (!cartButton) {
        const header = document.querySelector('header, nav, .navbar');
        if (header) {
          const shoppingCartIcons = header.querySelectorAll('svg');
          for (const icon of shoppingCartIcons) {
            if (icon.getAttribute('data-lucide') === 'shopping-cart' || 
                icon.innerHTML.includes('shopping-cart') ||
                icon.parentElement?.getAttribute('aria-label')?.includes('carrito')) {
              cartButton = icon.closest('button');
              break;
            }
          }
        }
      }
      
      // Último recurso: buscar en toda la página pero excluir drawers/modals
      if (!cartButton) {
        const allCartButtons = document.querySelectorAll('button[aria-label*="carrito"], button[aria-label*="Carrito"]');
        for (const button of allCartButtons) {
          // Excluir botones que estén en drawers, modals o elementos ocultos
          if (!button.closest('[role="dialog"], .drawer, .modal, .hidden')) {
            cartButton = button;
            break;
          }
        }
      }
      
      if (cartButton) {
        const rect = cartButton.getBoundingClientRect();
        setCartPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
        console.log('🎯 Cart button found! Position:', { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
        console.log('📍 Cart button rect:', rect);
        console.log('🔍 Cart button element:', cartButton);
        console.log('📍 Cart button location in DOM:', cartButton.closest('header, nav, .navbar, body'));
      } else {
        // Fallback: posición aproximada del carrito en la esquina superior derecha
        const fallbackX = window.innerWidth - 60;
        const fallbackY = 80;
        setCartPosition({ x: fallbackX, y: fallbackY });
        console.log('Cart button NOT found, using fallback position:', { x: fallbackX, y: fallbackY });
        console.log('Available buttons:', document.querySelectorAll('button'));
      }
    };

    // Esperar un poco para que el DOM se cargue
    const timer = setTimeout(updateCartPosition, 100);

    // Escuchar cambios de ventana
    window.addEventListener('resize', updateCartPosition);
    window.addEventListener('scroll', updateCartPosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateCartPosition);
      window.removeEventListener('scroll', updateCartPosition);
    };
  }, []);

  return cartPosition;
}
