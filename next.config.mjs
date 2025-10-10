/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true }, // evita optimizador de imágenes del servidor
  trailingSlash: true,        // sirve /ruta/ => /ruta/index.html
  // Mantener ESLint activo durante el build para atrapar problemas antes de desplegar.
  // Si el equipo decide ignorar reglas en producción, ajustar reglas concretas del .eslintrc.
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;



