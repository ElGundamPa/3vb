import { getLawyers } from "@/lib/lawyers-db";
import type { Metadata } from "next";
import { AbogadosHero } from "@/components/AbogadosHero";
import { AbogadosStats } from "@/components/AbogadosStats";
import { AbogadosTeam } from "@/components/AbogadosTeam";

export const metadata: Metadata = {
  title: "Nuestros Abogados — 3VB",
  description: "Conoce a nuestro equipo de abogados especialistas en ciberfraude y recuperación de fondos. Profesionales altamente capacitados con amplia experiencia.",
};

export const dynamic = "force-dynamic";

export default async function AbogadosPage() {
  const lawyers = await getLawyers();

  const abogados = lawyers.map((lawyer, index) => ({
    id: index + 1,
    slug: lawyer.id,
    name: lawyer.name,
    title: lawyer.title,
    specialty: lawyer.specialty,
    experience: lawyer.experience,
    bio: lawyer.bio,
    quote: lawyer.cardQuote,
    quoteSource: lawyer.cardQuoteSource,
    achievements: lawyer.achievements,
    languages: lawyer.languages,
    pdfUrl: lawyer.pdfUrl,
  }));

  return (
    <main className="min-h-[100svh] overflow-x-hidden">
      <AbogadosHero />
      <AbogadosStats />
      <AbogadosTeam abogados={abogados} />
    </main>
  );
}
