"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SafeIcon } from "./SafeIcon";
import { Button } from "@/components/ui/button";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir menú"
      >
        {isOpen ? <SafeIcon icon={X} size={20} /> : <SafeIcon icon={Menu} size={20} />}
      </Button>
      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 bg-white border-t border-gray-200 shadow-lg dark:bg-gray-900 dark:border-gray-800">
          <nav className="container mx-auto px-4 py-4 space-y-3">
            <Link
              href="/servicios"
              className="block py-2 text-gray-900 hover:text-emerald-600 dark:text-gray-100 dark:hover:text-emerald-400"
              onClick={() => setIsOpen(false)}
            >
              Servicios
            </Link>
            <Link
              href="/nosotros"
              className="block py-2 text-gray-900 hover:text-emerald-600 dark:text-gray-100 dark:hover:text-emerald-400"
              onClick={() => setIsOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              href="/abogados"
              className="block py-2 text-gray-900 hover:text-emerald-600 dark:text-gray-100 dark:hover:text-emerald-400"
              onClick={() => setIsOpen(false)}
            >
              Abogados
            </Link>
            <Link
              href="/calculadora"
              className="block py-2 text-gray-900 hover:text-emerald-600 dark:text-gray-100 dark:hover:text-emerald-400"
              onClick={() => setIsOpen(false)}
            >
              Calculadora
            </Link>
            <Link
              href="/contacto"
              className="block py-2 text-gray-900 hover:text-emerald-600 dark:text-gray-100 dark:hover:text-emerald-400"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
