import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tom Montagu-Smith KC — 3VB",
  description: "Tom Montagu-Smith KC tiene una práctica pesada de disputas comerciales tanto en arbitraje como en litigios. Su trabajo incluye banca, empresas conjuntas, fraude, seguros y reaseguros y disputas que surgen de proyectos de construcción.",
};

export default function TomMontaguSmithLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
