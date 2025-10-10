"use client";

// Google Analytics 4 Event Tracking
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Eventos específicos para conversión
export const trackConversion = {
  // Eventos de navegación
  pageView: (page: string) => {
    trackEvent('page_view', {
      page_title: page,
      page_location: window.location.href,
    });
  },

  // Eventos de interacción con servicios
  serviceView: (serviceId: string, serviceName: string) => {
    trackEvent('view_item', {
      item_id: serviceId,
      item_name: serviceName,
      item_category: 'legal_service',
    });
  },

  serviceAddToCart: (serviceId: string, serviceName: string, price: number) => {
    trackEvent('add_to_cart', {
      currency: 'USD',
      value: price,
      items: [{
        item_id: serviceId,
        item_name: serviceName,
        item_category: 'legal_service',
        price: price,
        quantity: 1,
      }],
    });
  },

  // Eventos de formulario
  formStart: (formName: string) => {
    trackEvent('form_start', {
      form_name: formName,
    });
  },

  formSubmit: (formName: string, success: boolean) => {
    trackEvent('form_submit', {
      form_name: formName,
      success: success,
    });
  },

  // Eventos de calculadora
  calculatorUse: (amountLost: number, successRate: number) => {
    trackEvent('calculator_use', {
      amount_lost: amountLost,
      success_rate: successRate,
      event_category: 'engagement',
    });
  },

  // Eventos de contacto
  contactAttempt: (method: 'phone' | 'email' | 'form') => {
    trackEvent('contact_attempt', {
      contact_method: method,
      event_category: 'engagement',
    });
  },

  // Eventos de conversión
  leadGeneration: (source: string, value: number) => {
    trackEvent('generate_lead', {
      currency: 'USD',
      value: value,
      source: source,
    });
  },

  // Eventos de scroll y engagement
  scrollDepth: (depth: number) => {
    trackEvent('scroll', {
      scroll_depth: depth,
      event_category: 'engagement',
    });
  },

  // Eventos de tiempo en página
  timeOnPage: (time: number) => {
    trackEvent('timing_complete', {
      name: 'time_on_page',
      value: time,
    });
  },
};

// Heatmap y session recording
export const trackUserBehavior = {
  click: (element: string, location: string) => {
    trackEvent('click', {
      element: element,
      location: location,
      event_category: 'user_behavior',
    });
  },

  hover: (element: string, duration: number) => {
    trackEvent('hover', {
      element: element,
      duration: duration,
      event_category: 'user_behavior',
    });
  },

  focus: (element: string) => {
    trackEvent('focus', {
      element: element,
      event_category: 'user_behavior',
    });
  },
};

// A/B Testing
export const trackExperiment = (experimentName: string, variant: string) => {
  trackEvent('experiment_view', {
    experiment_name: experimentName,
    variant: variant,
    event_category: 'experiment',
  });
};

// Error tracking
export const trackError = (error: string, context: string) => {
  trackEvent('exception', {
    description: error,
    context: context,
    fatal: false,
  });
};

// Performance tracking
export const trackPerformance = {
  pageLoad: (loadTime: number) => {
    trackEvent('timing_complete', {
      name: 'page_load',
      value: loadTime,
    });
  },

  firstContentfulPaint: (fcp: number) => {
    trackEvent('timing_complete', {
      name: 'first_contentful_paint',
      value: fcp,
    });
  },

  largestContentfulPaint: (lcp: number) => {
    trackEvent('timing_complete', {
      name: 'largest_contentful_paint',
      value: lcp,
    });
  },

  cumulativeLayoutShift: (cls: number) => {
    trackEvent('timing_complete', {
      name: 'cumulative_layout_shift',
      value: cls,
    });
  },
};

// Declaración global para TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
