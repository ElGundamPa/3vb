export type Service = {
  id: string;
  name: string;
  description: string;
  priceUsd?: number;
  successFee?: number; // porcentaje (0-1)
};

export type Lawyer = {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  countries: string[];
  languages: string[];
  rating: number;
  avatar?: string;
};

export const services: Service[] = [
  {
    id: "asesoria-basica",
    name: "Asesoría Básica",
    description: "Consulta inicial de 30 minutos para evaluar el caso y próximos pasos.",
    priceUsd: 49,
  },
  {
    id: "asesoria-intermedia",
    name: "Asesoría Intermedia",
    description: "Consulta de 60 minutos con plan de acción y checklist de evidencia.",
    priceUsd: 99,
  },
  {
    id: "asesoria-avanzada",
    name: "Asesoría Avanzada",
    description: "Asesoría estratégica avanzada con evaluación de vías de recuperación.",
    priceUsd: 199,
  },
  {
    id: "auditoria-evidencia",
    name: "Auditoría de Evidencia Digital",
    description: "Revisión de capturas, metadatos y trazabilidad OSINT para robustecer el caso.",
    priceUsd: 129,
  },
  {
    id: "recuperacion-fondos",
    name: "Recuperación de Fondos (honorarios por éxito)",
    description: "Gestión integral con honorarios de éxito sobre montos recuperados.",
    successFee: 0.12,
  },
];

export const lawyers: Lawyer[] = [
  {
    id: "william-edwards",
    name: "William Edwards KC",
    specialty: "Litigios Comerciales",
    bio: "Abogado líder en litigios comerciales, arbitraje, banca y finanzas, y fraude civil. Especializado en casos internacionales complejos con amplia experiencia en múltiples jurisdicciones.",
    countries: ["Reino Unido", "Emiratos Árabes Unidos", "Islas Vírgenes Británicas"],
    languages: ["Inglés", "Español"],
    rating: 4.9,
    avatar: "/avatars/william.png",
  },
  {
    id: "lisa-lacob",
    name: "Lisa Lacob",
    specialty: "Banca y Servicios Financieros",
    bio: "Abogada junior senior establecida con experiencia en Banca y Servicios Financieros, Fraude Civil, Resolución de Disputas Comerciales y Arbitraje, Negligencia Profesional, Derecho Societario e Insolvencia.",
    countries: ["Reino Unido", "Hong Kong", "Singapur"],
    languages: ["Inglés", "Español"],
    rating: 4.9,
    avatar: "/avatars/lisa.png",
  },
  {
    id: "tom-montagu-smith",
    name: "Tom Montagu-Smith KC",
    specialty: "Disputas Comerciales",
    bio: "Tom tiene una práctica pesada de disputas comerciales tanto en arbitraje como en litigios. Su trabajo incluye banca, empresas conjuntas, fraude, seguros y reaseguros y disputas que surgen de proyectos de construcción.",
    countries: ["Reino Unido", "Emiratos Árabes Unidos", "Dubai"],
    languages: ["Inglés", "Español"],
    rating: 4.9,
    avatar: "/avatars/tom.png",
  },
];





