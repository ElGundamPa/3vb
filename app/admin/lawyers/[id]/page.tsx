"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp, RefreshCw, FileText, Upload } from "lucide-react";
import Link from "next/link";

interface LawyerForm {
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
  emails: { address: string; primary: boolean }[];
  colegiacion: string;
  silkYear: string | null;
  quotes: { text: string; source: string }[];
  stats: { label: string; value: string; icon: string }[];
  practiceAreas: {
    title: string;
    description: string;
    cases: string[];
    iconName: string;
    color: string;
  }[];
  achievements: string[];
  news: { title: string; date: string; category: string }[];
  events: { title: string; date: string; time: string; type: string }[];
  education: { institution: string; degree: string; awards: string[] }[];
  pdfUrl: string;
  cardQuote: string;
  cardQuoteSource: string;
}

const EMPTY_LAWYER: LawyerForm = {
  id: "",
  name: "",
  badge: "KC",
  badgeColors: { from: "yellow-400", to: "yellow-600", textColor: "black" },
  heroGradient: "from-slate-900 via-blue-900 to-slate-800",
  accentColor: "blue",
  title: "",
  specialty: "",
  bio: "",
  fullDescription: [""],
  experience: "",
  countries: [""],
  languages: [""],
  rating: 5.0,
  emails: [{ address: "", primary: true }],
  colegiacion: "",
  silkYear: null,
  quotes: [{ text: "", source: "" }],
  stats: [{ label: "", value: "", icon: "Award" }],
  practiceAreas: [],
  achievements: [""],
  news: [],
  events: [],
  education: [],
  pdfUrl: "",
  cardQuote: "",
  cardQuoteSource: "",
};

const ICON_OPTIONS = ["Award", "Calendar", "FileText", "Building", "Globe", "BookOpen", "Briefcase", "Users", "Clock", "Gavel", "Star", "GraduationCap"];
const ACCENT_OPTIONS = ["blue", "green", "purple"];

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        {open ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
      </button>
      {open && <div className="p-5 pt-0 space-y-4">{children}</div>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm";
const textareaCls = `${inputCls} min-h-[80px] resize-y`;
const selectCls = inputCls;

export default function LawyerEditorPage() {
  const params = useParams();
  const lawyerId = params.id as string;
  const isNew = lawyerId === "new";
  const router = useRouter();

  const [form, setForm] = useState<LawyerForm>(EMPTY_LAWYER);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const getToken = () => sessionStorage.getItem("admin-token") || "";

  const fetchLawyer = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/lawyers/${lawyerId}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.status === 401) { router.push("/admin/login"); return; }
      if (res.status === 404) { router.push("/admin"); return; }
      const data = await res.json();
      setForm(data);
    } catch {
      setError("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }, [lawyerId, router]);

  useEffect(() => {
    if (!sessionStorage.getItem("admin-token")) { router.push("/admin/login"); return; }
    if (!isNew) fetchLawyer();
  }, [isNew, fetchLawyer, router]);

  const updateField = <K extends keyof LawyerForm>(key: K, value: LawyerForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setError("");
    setSaving(true);
    try {
      const url = isNew ? "/api/admin/lawyers" : `/api/admin/lawyers/${lawyerId}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Error al guardar"); return; }
      router.push("/admin");
    } catch {
      setError("Error de conexión");
    } finally {
      setSaving(false);
    }
  };

  const handleUploadCv = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isNew) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Solo se permiten archivos PDF");
      return;
    }
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch(`/api/admin/lawyers/${lawyerId}/upload-cv`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al subir");
        return;
      }
      updateField("pdfUrl", data.pdfUrl);
    } catch {
      setError("Error al subir el archivo");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link href="/admin" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                {isNew ? "Nuevo Abogado" : `Editar: ${form.name}`}
              </h1>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Información Básica */}
        <Section title="Información Básica">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="ID (slug URL)">
              <input className={inputCls} value={form.id} onChange={(e) => updateField("id", e.target.value.toLowerCase().replace(/\s+/g, "-"))} disabled={!isNew} placeholder="nombre-apellido" />
            </Field>
            <Field label="Nombre completo">
              <input className={inputCls} value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="William Edwards KC" />
            </Field>
            <Field label="Título">
              <input className={inputCls} value={form.title} onChange={(e) => updateField("title", e.target.value)} placeholder="King's Counsel" />
            </Field>
            <Field label="Especialidad">
              <input className={inputCls} value={form.specialty} onChange={(e) => updateField("specialty", e.target.value)} placeholder="Litigios Comerciales" />
            </Field>
            <Field label="Badge (texto corto)">
              <input className={inputCls} value={form.badge} onChange={(e) => updateField("badge", e.target.value)} placeholder="KC" />
            </Field>
            <Field label="Experiencia">
              <input className={inputCls} value={form.experience} onChange={(e) => updateField("experience", e.target.value)} placeholder="23+ años de experiencia" />
            </Field>
            <Field label="Colegiación">
              <input className={inputCls} value={form.colegiacion} onChange={(e) => updateField("colegiacion", e.target.value)} placeholder="2002" />
            </Field>
            <Field label="Año Silk (dejar vacío si no aplica)">
              <input className={inputCls} value={form.silkYear || ""} onChange={(e) => updateField("silkYear", e.target.value || null)} placeholder="2025" />
            </Field>
            <Field label="Rating">
              <input className={inputCls} type="number" step="0.1" min="0" max="5" value={form.rating} onChange={(e) => updateField("rating", parseFloat(e.target.value) || 0)} />
            </Field>
          </div>

          {/* Hoja de Vida */}
          <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Hoja de Vida (CV / PDF)
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Adjunta el PDF de la hoja de vida del abogado. Los visitantes podrán descargarlo desde la tarjeta del abogado en el sitio.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer font-medium text-sm disabled:opacity-50">
                <Upload className="h-4 w-4" />
                {uploading ? "Subiendo..." : "Seleccionar PDF"}
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleUploadCv}
                  disabled={uploading || isNew}
                  className="sr-only"
                />
              </label>
              {form.pdfUrl && (
                <>
                  <a
                    href={form.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    Ver archivo actual
                  </a>
                  <button
                    type="button"
                    onClick={() => updateField("pdfUrl", "")}
                    className="inline-flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                    Quitar
                  </button>
                </>
              )}
            </div>
            {!form.pdfUrl && !isNew && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Ningún archivo adjunto. Sube un PDF para que aparezca el botón &quot;Descargar Hoja de Vida&quot; en la tarjeta.
              </p>
            )}
          </div>

          <Field label="Biografía (resumen corto para tarjeta)">
            <textarea className={textareaCls} value={form.bio} onChange={(e) => updateField("bio", e.target.value)} rows={3} />
          </Field>
        </Section>

        {/* Apariencia */}
        <Section title="Apariencia" defaultOpen={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Color de acento">
              <select className={selectCls} value={form.accentColor} onChange={(e) => updateField("accentColor", e.target.value)}>
                {ACCENT_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Hero Gradient">
              <input className={inputCls} value={form.heroGradient} onChange={(e) => updateField("heroGradient", e.target.value)} />
            </Field>
            <Field label="Badge Color From">
              <input className={inputCls} value={form.badgeColors.from} onChange={(e) => updateField("badgeColors", { ...form.badgeColors, from: e.target.value })} />
            </Field>
            <Field label="Badge Color To">
              <input className={inputCls} value={form.badgeColors.to} onChange={(e) => updateField("badgeColors", { ...form.badgeColors, to: e.target.value })} />
            </Field>
            <Field label="Badge Text Color">
              <input className={inputCls} value={form.badgeColors.textColor} onChange={(e) => updateField("badgeColors", { ...form.badgeColors, textColor: e.target.value })} />
            </Field>
          </div>
        </Section>

        {/* Descripción Completa */}
        <Section title="Descripción Completa (Perfil)">
          {form.fullDescription.map((p, i) => (
            <div key={i} className="flex gap-2">
              <textarea className={`${textareaCls} flex-1`} value={p} onChange={(e) => {
                const arr = [...form.fullDescription]; arr[i] = e.target.value; updateField("fullDescription", arr);
              }} rows={3} placeholder={`Párrafo ${i + 1}`} />
              <button onClick={() => updateField("fullDescription", form.fullDescription.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:text-red-700 self-start mt-1"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <button onClick={() => updateField("fullDescription", [...form.fullDescription, ""])} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"><Plus className="h-4 w-4" />Agregar párrafo</button>
        </Section>

        {/* Contacto */}
        <Section title="Emails de Contacto">
          {form.emails.map((email, i) => (
            <div key={i} className="flex items-center gap-2">
              <input className={`${inputCls} flex-1`} value={email.address} onChange={(e) => {
                const arr = [...form.emails]; arr[i] = { ...arr[i], address: e.target.value }; updateField("emails", arr);
              }} placeholder="email@3vb.com" />
              <label className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                <input type="checkbox" checked={email.primary} onChange={(e) => {
                  const arr = [...form.emails]; arr[i] = { ...arr[i], primary: e.target.checked }; updateField("emails", arr);
                }} className="rounded" />
                Principal
              </label>
              <button onClick={() => updateField("emails", form.emails.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <button onClick={() => updateField("emails", [...form.emails, { address: "", primary: false }])} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"><Plus className="h-4 w-4" />Agregar email</button>
        </Section>

        {/* Idiomas y Países */}
        <Section title="Idiomas y Países">
          <Field label="Idiomas (separados por coma)">
            <input className={inputCls} value={form.languages.join(", ")} onChange={(e) => updateField("languages", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
          </Field>
          <Field label="Países (separados por coma)">
            <input className={inputCls} value={form.countries.join(", ")} onChange={(e) => updateField("countries", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
          </Field>
        </Section>

        {/* Cita de Tarjeta */}
        <Section title="Cita en la Tarjeta (Listado)">
          <Field label="Cita">
            <textarea className={textareaCls} value={form.cardQuote} onChange={(e) => updateField("cardQuote", e.target.value)} rows={2} />
          </Field>
          <Field label="Fuente de la cita">
            <input className={inputCls} value={form.cardQuoteSource} onChange={(e) => updateField("cardQuoteSource", e.target.value)} placeholder="Legal 500 UK (2025)" />
          </Field>
        </Section>

        {/* Quotes Carousel */}
        <Section title="Citas del Carrusel (Perfil)" defaultOpen={false}>
          {form.quotes.map((q, i) => (
            <div key={i} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Cita {i + 1}</span>
                <button onClick={() => updateField("quotes", form.quotes.filter((_, idx) => idx !== i))} className="p-1 text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
              </div>
              <textarea className={textareaCls} value={q.text} onChange={(e) => { const arr = [...form.quotes]; arr[i] = { ...arr[i], text: e.target.value }; updateField("quotes", arr); }} rows={2} placeholder="Texto de la cita" />
              <input className={inputCls} value={q.source} onChange={(e) => { const arr = [...form.quotes]; arr[i] = { ...arr[i], source: e.target.value }; updateField("quotes", arr); }} placeholder="Fuente" />
            </div>
          ))}
          <button onClick={() => updateField("quotes", [...form.quotes, { text: "", source: "" }])} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"><Plus className="h-4 w-4" />Agregar cita</button>
        </Section>

        {/* Stats */}
        <Section title="Estadísticas (Perfil)" defaultOpen={false}>
          {form.stats.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <input className={`${inputCls} flex-1`} value={s.label} onChange={(e) => { const arr = [...form.stats]; arr[i] = { ...arr[i], label: e.target.value }; updateField("stats", arr); }} placeholder="Etiqueta" />
              <input className={`${inputCls} w-24`} value={s.value} onChange={(e) => { const arr = [...form.stats]; arr[i] = { ...arr[i], value: e.target.value }; updateField("stats", arr); }} placeholder="Valor" />
              <select className={`${selectCls} w-32`} value={s.icon} onChange={(e) => { const arr = [...form.stats]; arr[i] = { ...arr[i], icon: e.target.value }; updateField("stats", arr); }}>
                {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
              </select>
              <button onClick={() => updateField("stats", form.stats.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <button onClick={() => updateField("stats", [...form.stats, { label: "", value: "", icon: "Award" }])} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"><Plus className="h-4 w-4" />Agregar estadística</button>
        </Section>

        {/* Practice Areas */}
        <Section title="Áreas de Práctica" defaultOpen={false}>
          {form.practiceAreas.map((area, i) => (
            <div key={i} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Área {i + 1}</span>
                <button onClick={() => updateField("practiceAreas", form.practiceAreas.filter((_, idx) => idx !== i))} className="p-1 text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className={inputCls} value={area.title} onChange={(e) => { const arr = [...form.practiceAreas]; arr[i] = { ...arr[i], title: e.target.value }; updateField("practiceAreas", arr); }} placeholder="Título del área" />
                <div className="flex gap-2">
                  <select className={`${selectCls} flex-1`} value={area.iconName} onChange={(e) => { const arr = [...form.practiceAreas]; arr[i] = { ...arr[i], iconName: e.target.value }; updateField("practiceAreas", arr); }}>
                    {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                  <input className={`${inputCls} flex-1`} value={area.color} onChange={(e) => { const arr = [...form.practiceAreas]; arr[i] = { ...arr[i], color: e.target.value }; updateField("practiceAreas", arr); }} placeholder="from-blue-500 to-cyan-500" />
                </div>
              </div>
              <textarea className={textareaCls} value={area.description} onChange={(e) => { const arr = [...form.practiceAreas]; arr[i] = { ...arr[i], description: e.target.value }; updateField("practiceAreas", arr); }} rows={2} placeholder="Descripción" />
              <Field label="Casos (uno por línea)">
                <textarea className={textareaCls} value={area.cases.join("\n")} onChange={(e) => { const arr = [...form.practiceAreas]; arr[i] = { ...arr[i], cases: e.target.value.split("\n").filter(Boolean) }; updateField("practiceAreas", arr); }} rows={3} placeholder="Un caso por línea" />
              </Field>
            </div>
          ))}
          <button onClick={() => updateField("practiceAreas", [...form.practiceAreas, { title: "", description: "", cases: [], iconName: "Briefcase", color: "from-blue-500 to-cyan-500" }])} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"><Plus className="h-4 w-4" />Agregar área de práctica</button>
        </Section>

        {/* Achievements */}
        <Section title="Logros" defaultOpen={false}>
          <Field label="Logros (separados por coma)">
            <input className={inputCls} value={form.achievements.join(", ")} onChange={(e) => updateField("achievements", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} />
          </Field>
        </Section>

        {/* News */}
        <Section title="Noticias Relacionadas" defaultOpen={false}>
          {form.news.map((n, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                <input className={`${inputCls} md:col-span-2`} value={n.title} onChange={(e) => { const arr = [...form.news]; arr[i] = { ...arr[i], title: e.target.value }; updateField("news", arr); }} placeholder="Título" />
                <input className={inputCls} value={n.date} onChange={(e) => { const arr = [...form.news]; arr[i] = { ...arr[i], date: e.target.value }; updateField("news", arr); }} placeholder="Fecha" />
                <input className={inputCls} value={n.category} onChange={(e) => { const arr = [...form.news]; arr[i] = { ...arr[i], category: e.target.value }; updateField("news", arr); }} placeholder="Categoría" />
              </div>
              <button onClick={() => updateField("news", form.news.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:text-red-700 mt-1"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <button onClick={() => updateField("news", [...form.news, { title: "", date: "", category: "" }])} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"><Plus className="h-4 w-4" />Agregar noticia</button>
        </Section>

        {/* Events */}
        <Section title="Eventos Relacionados" defaultOpen={false}>
          {form.events.map((ev, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                <input className={`${inputCls} md:col-span-2`} value={ev.title} onChange={(e) => { const arr = [...form.events]; arr[i] = { ...arr[i], title: e.target.value }; updateField("events", arr); }} placeholder="Título" />
                <input className={inputCls} value={ev.date} onChange={(e) => { const arr = [...form.events]; arr[i] = { ...arr[i], date: e.target.value }; updateField("events", arr); }} placeholder="Fecha" />
                <input className={inputCls} value={ev.time} onChange={(e) => { const arr = [...form.events]; arr[i] = { ...arr[i], time: e.target.value }; updateField("events", arr); }} placeholder="Hora" />
                <input className={inputCls} value={ev.type} onChange={(e) => { const arr = [...form.events]; arr[i] = { ...arr[i], type: e.target.value }; updateField("events", arr); }} placeholder="Tipo" />
              </div>
              <button onClick={() => updateField("events", form.events.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:text-red-700 mt-1"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          <button onClick={() => updateField("events", [...form.events, { title: "", date: "", time: "", type: "" }])} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"><Plus className="h-4 w-4" />Agregar evento</button>
        </Section>

        {/* Education */}
        <Section title="Educación y Premios" defaultOpen={false}>
          {form.education.map((edu, i) => (
            <div key={i} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Educación {i + 1}</span>
                <button onClick={() => updateField("education", form.education.filter((_, idx) => idx !== i))} className="p-1 text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
              </div>
              <input className={inputCls} value={edu.institution} onChange={(e) => { const arr = [...form.education]; arr[i] = { ...arr[i], institution: e.target.value }; updateField("education", arr); }} placeholder="Institución" />
              <input className={inputCls} value={edu.degree} onChange={(e) => { const arr = [...form.education]; arr[i] = { ...arr[i], degree: e.target.value }; updateField("education", arr); }} placeholder="Título / Grado" />
              <Field label="Premios (uno por línea)">
                <textarea className={textareaCls} value={edu.awards.join("\n")} onChange={(e) => { const arr = [...form.education]; arr[i] = { ...arr[i], awards: e.target.value.split("\n").filter(Boolean) }; updateField("education", arr); }} rows={2} />
              </Field>
            </div>
          ))}
          <button onClick={() => updateField("education", [...form.education, { institution: "", degree: "", awards: [] }])} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"><Plus className="h-4 w-4" />Agregar educación</button>
        </Section>

        {/* Save button at bottom */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            {saving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </main>
    </div>
  );
}
