/* eslint-disable react/no-unescaped-entities */
import { getLawyers, getLawyerBySlug } from "@/lib/lawyers-db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LawyerProfileClient from "./LawyerProfileClient";

export async function generateStaticParams() {
  const lawyers = await getLawyers();
  return lawyers.map((l) => ({ slug: l.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const lawyer = await getLawyerBySlug(params.slug);
  if (!lawyer) return { title: "Abogado no encontrado — 3VB" };
  return {
    title: `${lawyer.name} — 3VB`,
    description: lawyer.bio,
  };
}

export default async function LawyerProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const lawyer = await getLawyerBySlug(params.slug);
  if (!lawyer) notFound();

  return <LawyerProfileClient lawyer={lawyer} />;
}
