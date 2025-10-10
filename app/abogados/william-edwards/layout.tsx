import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "William Edwards KC — 3VB",
  description: "William Edwards KC es una destacada profesional en el ámbito del derecho comercial, especializada en litigios y arbitraje internacional, banca y finanzas, fraude civil, insolvencia y disputas corporativas.",
};

export default function WilliamEdwardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
