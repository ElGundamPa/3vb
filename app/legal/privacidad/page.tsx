export default function PrivacidadPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>Información que recopilamos</h2>
        <p>
          Recopilamos información personal que nos proporcionas directamente, como tu nombre, 
          dirección de correo electrónico, número de teléfono y detalles sobre tu caso legal.
        </p>
        
        <h2>Cómo usamos tu información</h2>
        <p>
          Utilizamos tu información personal para brindarte servicios legales, comunicarnos 
          contigo sobre tu caso y cumplir con nuestras obligaciones legales y profesionales.
        </p>
        
        <h2>Protección de datos</h2>
        <p>
          Implementamos medidas de seguridad técnicas y organizativas para proteger tu 
          información personal contra acceso no autorizado, alteración, divulgación o destrucción.
        </p>
        
        <h2>Compartir información</h2>
        <p>
          No vendemos, alquilamos ni compartimos tu información personal con terceros, 
          excepto cuando sea necesario para brindar nuestros servicios legales o cuando 
          la ley lo requiera.
        </p>
        
        <h2>Tus derechos</h2>
        <p>
          Tienes derecho a acceder, rectificar, eliminar o portar tu información personal. 
          También puedes oponerte al procesamiento de tus datos en ciertas circunstancias.
        </p>
        
        <h2>Contacto</h2>
        <p>
          Si tienes preguntas sobre esta política de privacidad, puedes contactarnos en 
          <a href="mailto:privacidad@3vb.legal" className="text-emerald-600 hover:underline">
            privacidad@3vb.legal
          </a>.
        </p>
      </div>
    </div>
  );
}
