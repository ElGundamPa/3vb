import { lawyers } from "@/lib/data";
import type { Metadata } from "next";
import { AbogadosHero } from "@/components/AbogadosHero";
import { AbogadosStats } from "@/components/AbogadosStats";
import { AbogadosTeam } from "@/components/AbogadosTeam";

export const metadata: Metadata = {
  title: "Nuestros Abogados — 3VB",
  description: "Conoce a nuestro equipo de abogados especialistas en ciberfraude y recuperación de fondos. Profesionales altamente capacitados con amplia experiencia.",
};

// Funciones helper usadas al construir la lista `abogados`
// Función para obtener el título según la especialidad
function getTitleBySpecialty(specialty: string): string {
  switch (specialty) {
    case "Litigios Comerciales":
      return "King's Counsel";
    case "Banca y Servicios Financieros":
      return "Senior Junior";
    case "Disputas Comerciales":
      return "King's Counsel";
    default:
      return "Especialista Senior";
  }
}

// Función para obtener la cita según el abogado
function getQuoteByLawyer(name: string, specialty: string): string {
  switch (name) {
    case "William Edwards KC":
      return "William es un abogado excepcionalmente inteligente, accesible y práctico. Es un defensor impresionante y tenaz en su enfoque, comercialmente astuto, muy agudo y excelente con los clientes.";
    case "Lisa Lacob":
      return "Lisa es una fuerza de la naturaleza. Intrépida y tranquila bajo presión. Una abogada enérgica y efectiva que luchará con uñas y dientes por su cliente. Subestímalos bajo tu propio riesgo.";
    case "Tom Montagu-Smith KC":
      return "Un abogado con una tasa de éxito muy alta, se mantiene actualizado en jurisprudencia y tiene una manera brillante con los jueces. Muy personal, muy amigable, medido y educado.";
    default:
      return `${name} combina la experiencia de un especialista senior, el intelecto de un académico y todas las habilidades estratégicas de un experto en ${specialty.toLowerCase()}.`;
  }
}

// Fuente de la cita según el abogado (para mostrar el origen de la quote)
function getQuoteSourceByLawyer(name: string): string {
  switch (name) {
    case 'William Edwards KC':
      return 'Legal 500 UK (2025)';
    case 'Lisa Lacob':
      return 'Chambers & Partners (2025)';
    case 'Tom Montagu-Smith KC':
      return 'Chambers & Partners UK Bar (2025)';
    default:
      return 'Fuente interna';
  }
}

// Logros simulados por abogado (puedes ajustarlos o cargarlos desde data)
function getAchievementsByLawyer(name: string): string[] {
  switch (name) {
    case 'William Edwards KC':
      return ['250+ casos ganados', 'Especialista en fraudes internacionales', 'Reconocimiento por la corte'];
    case 'Lisa Lacob':
      return ['300+ casos penales', 'Coordinación internacional', 'Certificación en Ciberdelitos'];
    case 'Tom Montagu-Smith KC':
      return ['150+ casos civiles', 'Miembro del Colegio de Abogados', 'Publicaciones en derecho'];
    default:
      return [];
  }
}

// Solo los primeros 3 abogados (William, Lisa, Tom)
const abogados = lawyers.slice(0, 3).map((lawyer, index) => {
  // Definir las imágenes específicas para cada abogado
  const imagePaths = ['/assets/abogados/William-Edwards.jpg', '/assets/abogados/Lisa-Lacob.jpg', '/assets/abogados/Tom-Montagu-Smith-QC.jpg'];
  const imagePath = imagePaths[index] || '/assets/abogados/1.jpg';
  
  // Crear el slug para la URL
  const slug = lawyer.id;
  
  return {
    id: index + 1,
    slug: slug,
    name: lawyer.name,
    title: getTitleBySpecialty(lawyer.specialty),
    specialty: lawyer.specialty,
    experience: `${Math.floor(Math.random() * 5) + 8}+ años de experiencia`,
    image: imagePath,
    bio: lawyer.bio,
    quote: getQuoteByLawyer(lawyer.name, lawyer.specialty),
    quoteSource: getQuoteSourceByLawyer(lawyer.name),
    achievements: getAchievementsByLawyer(lawyer.name),
    languages: lawyer.languages,
    pdfUrl: `/assets/Pdf/${index + 1}.pdf`
  };
});

export default function AbogadosPage() {
  return (
    <main className="min-h-[100svh] overflow-x-hidden">
      <AbogadosHero />
      <AbogadosStats />
      <AbogadosTeam abogados={abogados} />
    </main>
  );
}