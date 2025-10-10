import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lisa Lacob — 3VB",
  description: "Lisa Lacob es una abogada junior senior establecida con experiencia en Banca y Servicios Financieros, Fraude Civil, Resolución de Disputas Comerciales y Arbitraje, Negligencia Profesional, Derecho Societario e Insolvencia.",
};

export default function LisaLacobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
