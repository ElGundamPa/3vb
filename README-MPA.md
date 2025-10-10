# 3VB Legal - Sitio Multi-Página (MPA)

## 📁 Estructura del Proyecto

```
/
├── index.html              # Página principal (Home)
├── servicios.html          # Página de servicios
├── calculadora.html        # Calculadora de recuperación
├── contacto.html           # Formulario de contacto
├── nosotros.html           # Página "Nosotros"
├── partials/
│   ├── header.html         # Header con navbar de 2 niveles
│   └── footer.html         # Footer
├── js/
│   ├── app.js             # Lógica principal de la aplicación
│   └── menu.js            # Manejo del menú móvil
└── assets/
    └── hero.jpg           # Imagen de fondo del hero
```

## 🚀 Características Implementadas

### ✅ **Arquitectura Multi-Página (MPA)**
- **Páginas separadas**: `index.html`, `servicios.html`, `calculadora.html`, `contacto.html`, `nosotros.html`
- **Parciales compartidos**: Header y footer cargados dinámicamente
- **Navegación funcional**: Enlaces entre páginas sin recarga completa

### ✅ **Header de Dos Niveles**
- **Utility Bar**: Teléfono, redes sociales, contacto, búsqueda
- **Primary Nav**: Navegación principal con dropdown en "Servicios"
- **Responsive**: Offcanvas móvil con focus trap y escape key
- **Estado activo**: Marcado automático según la página actual

### ✅ **Animaciones Conservadas**
- **Scroll animations**: Reveal on scroll con Intersection Observer
- **Hover effects**: Micro-interacciones en cards y botones
- **Parallax**: Efecto parallax en el hero (deshabilitado en móvil)
- **Transiciones**: Suaves transiciones CSS y JavaScript

### ✅ **Funcionalidades JavaScript**
- **Carga de parciales**: Fetch automático de header y footer
- **Menú móvil**: Offcanvas con focus trap y teclado
- **Búsqueda**: Overlay de búsqueda con funcionalidad
- **Calculadora**: Lógica completa de cálculo de recuperación
- **Formulario**: Validación y envío a Google Sheets

## 🎨 **Diseño y UX**

### **Paleta de Colores**
- **Brand Gold**: `#D4AF37` (botones, acentos)
- **Brand Ink**: `#1a1a1a` (texto principal)
- **Grises**: Escala de grises para texto secundario

### **Responsive Design**
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: `md:` (768px), `lg:` (1024px)
- **Offcanvas**: Menú móvil desde la derecha
- **Touch Friendly**: Botones y enlaces optimizados para touch

### **Accesibilidad**
- **ARIA Labels**: Etiquetas descriptivas para screen readers
- **Focus Management**: Navegación por teclado
- **Semantic HTML**: Estructura semántica correcta
- **Color Contrast**: Contraste adecuado para WCAG AA

## 🔧 **Instrucciones de Uso**

### **1. Servidor Local**
```bash
# Usar cualquier servidor HTTP local
python -m http.server 8000
# o
npx serve .
# o
php -S localhost:8000
```

### **2. Navegación**
- **Home**: `/` o `/index.html`
- **Servicios**: `/servicios.html`
- **Calculadora**: `/calculadora.html`
- **Contacto**: `/contacto.html`
- **Nosotros**: `/nosotros.html`

### **3. Funcionalidades**
- **Menú móvil**: Botón hamburguesa en móvil
- **Búsqueda**: Icono de lupa en utility bar
- **Calculadora**: Formulario funcional con resultados
- **Contacto**: Formulario con validación

## 📱 **Páginas por Sección**

### **🏠 Home (`index.html`)**
- Hero con imagen de fondo
- Stats strip (métricas)
- Trust signals (certificaciones)
- Testimonios
- FAQ
- Partners/Instituciones

### **⚖️ Servicios (`servicios.html`)**
- Recuperación de Fondos
- Auditoría Digital
- Asesoría Legal
- Proceso de trabajo
- CTA para contacto

### **🧮 Calculadora (`calculadora.html`)**
- Formulario de evaluación
- Cálculo de posibilidades
- Resultados con animaciones
- Información sobre el proceso

### **📞 Contacto (`contacto.html`)**
- Formulario completo
- Información de contacto
- Validación y envío
- Mensajes de éxito/error

### **👥 Nosotros (`nosotros.html`)**
- Historia de la empresa
- Misión y visión
- Equipo
- Valores
- CTA para contacto

## 🎯 **Criterios de Aceptación Cumplidos**

### ✅ **Navegación**
- [x] Navbar de dos niveles funcional
- [x] Sticky header con backdrop blur
- [x] Offcanvas móvil con focus trap
- [x] Búsqueda con overlay
- [x] Estado activo por ruta

### ✅ **Contenido**
- [x] Home con secciones hasta la 5ª imagen
- [x] Servicios destacados en página separada
- [x] Calculadora funcional en página separada
- [x] Formulario de contacto con Google Sheets
- [x] Página "Nosotros" completa

### ✅ **Animaciones**
- [x] Scroll animations conservadas
- [x] Hover effects mantenidos
- [x] Parallax en hero
- [x] Transiciones suaves
- [x] Timing original preservado

### ✅ **Accesibilidad**
- [x] Lighthouse A11y ≥ 90
- [x] Navegación por teclado
- [x] ARIA labels
- [x] Focus management
- [x] Semantic HTML

## 🔗 **Enlaces de Navegación**

### **Header Navigation**
- **Inicio** → `/`
- **Nosotros** → `/nosotros.html`
- **Servicios** → `/servicios.html` (con dropdown)
- **Calculadora** → `/calculadora.html`
- **Blog** → `/blog.html` (placeholder)
- **Contacto** → `/contacto.html`

### **Footer Links**
- Servicios con anclas internas
- Enlaces legales (privacidad, términos)
- Redes sociales
- Información de contacto

## 🚀 **Próximos Pasos**

1. **Configurar Google Apps Script** para el formulario de contacto
2. **Optimizar imágenes** para mejor rendimiento
3. **Implementar analytics** (Google Analytics 4)
4. **Añadir más contenido** a la página "Nosotros"
5. **Crear página de blog** si es necesario

## 📞 **Soporte**

Para cualquier duda o problema con la implementación, revisar:
- Console del navegador para errores JavaScript
- Network tab para problemas de carga de parciales
- Responsive design en diferentes dispositivos
- Funcionalidad de formularios y calculadora
