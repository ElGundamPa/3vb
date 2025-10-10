export function SeoJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'LegalService'],
    name: '3VB',
    alternateName: '3VB Legal',
    url: 'https://www.3vb.legal',
    image: 'https://www.3vb.legal/og.png',
    logo: 'https://www.3vb.legal/logo.png',
    description: 'Bufete legal-tech especializado en ciberfraude y recuperación de fondos.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
      addressLocality: 'Madrid',
      postalCode: '28001',
      streetAddress: 'Calle Legal Tech, 123'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+34-XXX-XXX-XXX',
        contactType: 'customer service',
        availableLanguage: ['Spanish', 'English'],
        areaServed: ['ES', 'MX', 'CO', 'PE', 'CL'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
        }
      }
    ],
    areaServed: [
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'Mexico' },
      { '@type': 'Country', name: 'Colombia' },
      { '@type': 'Country', name: 'Peru' },
      { '@type': 'Country', name: 'Chile' }
    ],
    serviceType: [
      'Asesoría legal',
      'Ciberfraude',
      'Recuperación de fondos',
      'Auditoría de evidencia digital',
      'Blockchain',
      'Criptomonedas'
    ],
    sameAs: [
      'https://twitter.com/3vb_legal',
      'https://www.linkedin.com/company/3vb-legal',
      'https://facebook.com/3vb.legal'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'María González'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Excelente servicio, recuperé mi dinero en 3 meses.'
      }
    ],
    foundingDate: '2019',
    numberOfEmployees: '15',
    knowsAbout: [
      'Ciberfraude',
      'Recuperación de fondos',
      'Auditoría digital',
      'Blockchain',
      'Criptomonedas',
      'Derecho internacional'
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Certificación en Ciberfraude',
        credentialCategory: 'certification'
      }
    ]
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}




