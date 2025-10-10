// Counter Animation Script - Fixed Version
document.addEventListener("DOMContentLoaded", () => {
  console.log("Counter script loaded");
  const counters = document.querySelectorAll(".counter");
  console.log("Found counters:", counters.length);

  const animateCount = (el) => {
    console.log("Animating counter:", el);
    const target = parseFloat(el.dataset.target);
    console.log("Target:", target);
    
    // Limpiar cualquier animación previa
    el.style.transition = 'none';
    el.textContent = '0';
    
    let start = 0;
    const duration = 3000; // 3 segundos
    const stepTime = 16; // ~60fps
    const steps = Math.ceil(duration / stepTime);
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
        console.log("Animation completed for:", target);
      }
      
      // Formatear el número según si es entero o decimal
      if (current % 1 === 0) {
        el.textContent = Math.floor(current);
      } else {
        el.textContent = current.toFixed(1);
      }
    }, stepTime);
  };

  // Intersection Observer para activar solo cuando aparece en pantalla
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      console.log("Intersection observed:", entry.isIntersecting, entry.target);
      if (entry.isIntersecting) {
        console.log("Starting animation for:", entry.target);
        // Marcar como animado para evitar conflictos
        entry.target.classList.add('animated');
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.3, // Reducir threshold para activar antes
    rootMargin: '0px 0px -100px 0px' // Activar antes de que esté completamente visible
  });

  counters.forEach(counter => {
    // Solo observar si no ha sido animado ya
    if (!counter.classList.contains('animated')) {
      console.log("Observing counter:", counter);
      observer.observe(counter);
    }
  });
  
  console.log("Counter script setup complete");
});

