"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, LogOut, Users, RefreshCw, ExternalLink } from "lucide-react";
import Link from "next/link";

interface LawyerSummary {
  id: string;
  name: string;
  title: string;
  specialty: string;
  badge: string;
  experience: string;
}

export default function AdminDashboardPage() {
  const [lawyers, setLawyers] = useState<LawyerSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  const getToken = () => sessionStorage.getItem("admin-token") || "";

  const fetchLawyers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/lawyers", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      setLawyers(data);
    } catch {
      console.error("Error fetching lawyers");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const token = sessionStorage.getItem("admin-token");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchLawyers();
  }, [router, fetchLawyers]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`¿Estás seguro de eliminar a ${name}? Esta acción no se puede deshacer.`)) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/lawyers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        setLawyers((prev) => prev.filter((l) => l.id !== id));
      }
    } catch {
      alert("Error al eliminar");
    } finally {
      setDeleting(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-token");
    document.cookie = "admin-token=; path=/; max-age=0";
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Dashboard Admin
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/abogados"
                target="_blank"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Ver sitio
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions bar */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Abogados
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Gestiona los perfiles de los abogados del sitio
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchLawyers}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refrescar
            </button>
            <Link
              href="/admin/lawyers/new"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus className="h-4 w-4" />
              Nuevo Abogado
            </Link>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20">
            <RefreshCw className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">Cargando abogados...</p>
          </div>
        ) : lawyers.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
            <Users className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No hay abogados registrados
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Comienza creando el primer perfil
            </p>
            <Link
              href="/admin/lawyers/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Crear Abogado
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Abogado
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Título
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Especialidad
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Experiencia
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lawyers.map((lawyer) => (
                    <tr
                      key={lawyer.id}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                              {lawyer.badge}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {lawyer.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              /{lawyer.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                          {lawyer.title}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {lawyer.specialty}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {lawyer.experience}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/abogados/${lawyer.id}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Ver perfil público"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                          <Link
                            href={`/admin/lawyers/${lawyer.id}`}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Editar"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(lawyer.id, lawyer.name)}
                            disabled={deleting === lawyer.id}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                            title="Eliminar"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
