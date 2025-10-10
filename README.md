# 3VB — Legal-Tech (Next.js 14)

Sitio en español (es-ES) para 3VB, bufete orientado a recuperación de dinero por estafas cibernéticas.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Variants (shadcn-like)
- Framer Motion
- Zustand (persistencia localStorage)
- Accesibilidad WCAG AA

## Requisitos

- Node.js >= 18.18

## Instalación

En Windows (PowerShell):

```powershell
# Instalar Node.js desde https://nodejs.org
# Verificar
node -v
npm -v

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## Estructura

- `app/`: páginas (Home, Servicios, Abogados, Carrito, Checkout, Contacto, Legal)
- `components/`: Navbar, Footer, UI (button, card), SEO JSON-LD
- `lib/`: `data.ts` (seed), `store.ts` (Zustand), `pricing.ts` (monedas), `utils.ts`

## Monedas

`lib/pricing.ts` implementa tasas fijas: USD=1, MXN=17.2, PEN=3.7.

## Accesibilidad

- Focus visible, etiquetas ARIA, tamaños de toque adecuados.

## SEO


## Export estático (Next `output: 'export'`) - limitaciones y recomendaciones

Este proyecto está configurado para generar un sitio estático (HTML estático) via `next export`. Algunas consideraciones importantes:

- Ventajas: despliegue sencillo en CDNs/hosting estático (Netlify, Vercel static, S3 + CloudFront), tiempos de respuesta consistentemente rápidos.
- Limitaciones:
	- No están disponibles las funciones de servidor de Next.js (Server Actions que dependan de runtime server, Middlewares avanzados, API routes con server-side dynamic behavior).
	- `next/image` optimizaciones automáticas no están habilitadas en salida estática; si planeas usar optimización de imagen, considera migrar a un hosting con soporte de Image Optimization o reconfigurar para SSR.
	- Si necesitas autenticación server-side, personalización por usuario, o integraciones en tiempo real, evalúa migrar a SSR/Edge functions.

Recomendaciones:

- Documenta en el README cualquier caso que requiera SSR y planifica rutas a migrar.
- Versiona y prueba el uso de `next/image` si en el futuro migras a SSR. Para el export estático, usar fondos en CSS y `picture`/`img` con `loading="lazy"` es aceptable.
- Añade tests y CI (se incluye un workflow básico) para proteger cambios que puedan romper el flujo de export.
- shadcn/ui completo (sheet, select, toast, switch)
- Drawer de carrito con spring suave
- Parallax en Hero, hover glow en botones, ajustes de espaciado/tipografía
- Toggle Dark Mode persistente (ya habilitado con `next-themes`)

## Deployment (Vercel)

Quick Vercel deploy instructions:

1. Create a new repository on GitHub and push your code.
2. Go to https://vercel.com/new and import your GitHub repo.
3. In Vercel project settings -> Environment Variables, set:
	- `GOOGLE_SHEETS_WEBHOOK` = https://script.google.com/macros/s/REPLACE_WITH_YOUR_ID/exec
	- `APPS_SCRIPT_SECRET` = <your-secret>
4. Deploy. Vercel will run the build and publish your site.

Local push example:

```bash
git add .
git commit -m "Add Google Sheets webhook integration and deployment setup"
git push origin master
```






