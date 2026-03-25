import { promises as fs } from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "lawyers.json");

export interface LawyerEmail {
  address: string;
  primary: boolean;
}

export interface LawyerQuote {
  text: string;
  source: string;
}

export interface LawyerStat {
  label: string;
  value: string;
  icon: string;
}

export interface PracticeArea {
  title: string;
  description: string;
  cases: string[];
  iconName: string;
  color: string;
}

export interface NewsItem {
  title: string;
  date: string;
  category: string;
}

export interface EventItem {
  title: string;
  date: string;
  time: string;
  type: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  awards: string[];
}

export interface LawyerData {
  id: string;
  name: string;
  badge: string;
  badgeColors: { from: string; to: string; textColor: string };
  heroGradient: string;
  accentColor: string;
  title: string;
  specialty: string;
  bio: string;
  fullDescription: string[];
  experience: string;
  countries: string[];
  languages: string[];
  rating: number;
  emails: LawyerEmail[];
  colegiacion: string;
  silkYear: string | null;
  quotes: LawyerQuote[];
  stats: LawyerStat[];
  practiceAreas: PracticeArea[];
  achievements: string[];
  news: NewsItem[];
  events: EventItem[];
  education: EducationItem[];
  pdfUrl: string;
  cardQuote: string;
  cardQuoteSource: string;
}

export async function getLawyers(): Promise<LawyerData[]> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as LawyerData[];
}

export async function getLawyerBySlug(slug: string): Promise<LawyerData | null> {
  const lawyers = await getLawyers();
  return lawyers.find((l) => l.id === slug) ?? null;
}

export async function saveLawyers(lawyers: LawyerData[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(lawyers, null, 2), "utf-8");
}

export async function addLawyer(lawyer: LawyerData): Promise<LawyerData> {
  const lawyers = await getLawyers();
  if (lawyers.some((l) => l.id === lawyer.id)) {
    throw new Error(`Ya existe un abogado con id "${lawyer.id}"`);
  }
  lawyers.push(lawyer);
  await saveLawyers(lawyers);
  return lawyer;
}

export async function updateLawyer(
  id: string,
  data: Partial<LawyerData>
): Promise<LawyerData> {
  const lawyers = await getLawyers();
  const index = lawyers.findIndex((l) => l.id === id);
  if (index === -1) {
    throw new Error(`Abogado con id "${id}" no encontrado`);
  }
  lawyers[index] = { ...lawyers[index], ...data, id };
  await saveLawyers(lawyers);
  return lawyers[index];
}

export async function deleteLawyer(id: string): Promise<void> {
  const lawyers = await getLawyers();
  const filtered = lawyers.filter((l) => l.id !== id);
  if (filtered.length === lawyers.length) {
    throw new Error(`Abogado con id "${id}" no encontrado`);
  }
  await saveLawyers(filtered);
}
