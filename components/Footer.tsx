export function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 py-12 dark:border-gray-800">
      <div className="container mx-auto px-4 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
          <div>
            <div className="font-bold text-gray-900 dark:text-white">3VB</div>
            <p className="mt-2 max-w-md">
              Bufete legal-tech orientado a la defensa frente a estafas digitales y la recuperación de fondos.
            </p>
          </div>
          <nav className="grid grid-cols-2 gap-3 md:grid-cols-4" aria-label="Enlaces de pie de página">
            <a href="/servicios" className="hover:underline">Servicios</a>
            <a href="/abogados" className="hover:underline">Abogados</a>
            <a href="/contacto" className="hover:underline">Contacto</a>
            <a href="/legal" className="hover:underline">Legal</a>
          </nav>
        </div>
        <p className="mt-8">© {new Date().getFullYear()} 3VB. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}




