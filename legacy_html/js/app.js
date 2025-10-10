// App.js - Main application logic
class App {
  constructor() {
    this.init();
  }

  async init() {
    // Load partials
    await this.loadPartials();
    
    // Initialize navigation
    this.initNavigation();
    
    // Initialize search
    this.initSearch();
    
    // Re-initialize animations after DOM changes
    this.reinitializeAnimations();
  }

  async loadPartials() {
    try {
      // Load header
      const headerElement = document.querySelector('header[data-include]');
      if (headerElement) {
        const headerPath = headerElement.getAttribute('data-include');
        const headerResponse = await fetch(headerPath);
        const headerHTML = await headerResponse.text();
        headerElement.innerHTML = headerHTML;
      }

      // Load footer
      const footerElement = document.querySelector('footer[data-include]');
      if (footerElement) {
        const footerPath = footerElement.getAttribute('data-include');
        const footerResponse = await fetch(footerPath);
        const footerHTML = await footerResponse.text();
        footerElement.innerHTML = footerHTML;
      }
    } catch (error) {
      console.error('Error loading partials:', error);
    }
  }

  initNavigation() {
    // Set active navigation link
    this.setActiveNavLink();
    
    // Initialize mobile menu
    this.initMobileMenu();
  }

  setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Remove active class from all links
      link.classList.remove('active');
      
      // Add active class to current page
      if (href === currentPath || (currentPath === '/' && href === '/index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');

    if (mobileMenuToggle && mobileMenuClose && mobileMenu && mobileOverlay) {
      // Open mobile menu
      mobileMenuToggle.addEventListener('click', () => {
        this.openMobileMenu();
      });

      // Close mobile menu
      mobileMenuClose.addEventListener('click', () => {
        this.closeMobileMenu();
      });

      // Close on overlay click
      mobileOverlay.addEventListener('click', () => {
        this.closeMobileMenu();
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('translate-x-0')) {
          this.closeMobileMenu();
        }
      });
    }
  }

  openMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (mobileMenu && mobileOverlay) {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('translate-x-0');
      mobileOverlay.classList.remove('opacity-0', 'invisible');
      mobileOverlay.classList.add('opacity-100', 'visible');
      
      // Focus trap
      this.setupFocusTrap(mobileMenu);
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }
  }

  closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (mobileMenu && mobileOverlay) {
      mobileMenu.classList.add('translate-x-full');
      mobileMenu.classList.remove('translate-x-0');
      mobileOverlay.classList.add('opacity-0', 'invisible');
      mobileOverlay.classList.remove('opacity-100', 'visible');
      
      // Restore body scroll
      document.body.style.overflow = '';
    }
  }

  setupFocusTrap(container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    container.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    });

    // Focus first element
    if (firstElement) {
      firstElement.focus();
    }
  }

  initSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchClose = document.getElementById('search-close');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');

    if (searchToggle && searchClose && searchOverlay && searchInput) {
      // Open search
      searchToggle.addEventListener('click', () => {
        this.openSearch();
      });

      // Close search
      searchClose.addEventListener('click', () => {
        this.closeSearch();
      });

      // Close on overlay click
      searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
          this.closeSearch();
        }
      });

      // Close on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !searchOverlay.classList.contains('opacity-0')) {
          this.closeSearch();
        }
      });

      // Handle search
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.performSearch(e.target.value);
        }
      });
    }
  }

  openSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    
    if (searchOverlay && searchInput) {
      searchOverlay.classList.remove('opacity-0', 'invisible');
      searchOverlay.classList.add('opacity-100', 'visible');
      
      // Focus search input
      setTimeout(() => {
        searchInput.focus();
      }, 100);
    }
  }

  closeSearch() {
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    
    if (searchOverlay && searchInput) {
      searchOverlay.classList.add('opacity-0', 'invisible');
      searchOverlay.classList.remove('opacity-100', 'visible');
      searchInput.value = '';
    }
  }

  performSearch(query) {
    if (query.trim()) {
      // Simple search implementation
      const searchResults = this.searchContent(query);
      console.log('Search results:', searchResults);
      
      // For now, just log the results
      // In a real implementation, you would display results
      alert(`Buscando: "${query}"`);
    }
  }

  searchContent(query) {
    // Simple content search
    const searchableContent = document.querySelectorAll('h1, h2, h3, p, a');
    const results = [];
    
    searchableContent.forEach(element => {
      if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          element: element,
          text: element.textContent,
          type: element.tagName
        });
      }
    });
    
    return results;
  }

  reinitializeAnimations() {
    // Re-initialize any animations that depend on DOM ready
    // This ensures animations work after partials are loaded
    
    // Re-initialize scroll animations
    this.initScrollAnimations();
    
    // Re-initialize hover effects
    this.initHoverEffects();
    
    // Re-initialize parallax effects
    this.initParallaxEffects();
  }

  initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements with scroll animation classes
    const animatedElements = document.querySelectorAll('.scroll-animate, .fade-in, .slide-up');
    animatedElements.forEach(el => observer.observe(el));
  }

  initHoverEffects() {
    // Initialize hover effects for cards and buttons
    const hoverElements = document.querySelectorAll('.hover-lift, .hover-scale');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.classList.add('hover:scale-105', 'hover:shadow-lg');
      });
      
      element.addEventListener('mouseleave', () => {
        element.classList.remove('hover:scale-105', 'hover:shadow-lg');
      });
    });
  }

  initParallaxEffects() {
    // Initialize parallax effects
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
          const rate = scrolled * -0.5;
          element.style.transform = `translateY(${rate}px)`;
        });
      });
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new App();
});

// Export for use in other modules
window.App = App;
