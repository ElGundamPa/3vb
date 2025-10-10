"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { SafeIcon } from "./SafeIcon";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/MobileMenu";
import { usePathname } from "next/navigation";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-900/60 ${
        scrolled ? "border-b border-gray-200 dark:border-gray-800" : ""
      }`}
      role="navigation"
      aria-label="Principal"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="font-extrabold text-xl">
          3VB
        </Link>
        <nav className="hidden md:flex items-center gap-6" aria-label="Secciones">
          <Link href="/servicios" className="hover:underline">Servicios</Link>
          <Link href="/nosotros" className="hover:underline">Nosotros</Link>
          <Link href="/abogados" className="hover:underline">Abogados</Link>
          <Link href="/calculadora" className="hover:underline">Calculadora</Link>
          <Link href="/contacto" className="hover:underline">Contacto</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            aria-label="Alternar tema"
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <SafeIcon icon={Sun} size={18} /> : <SafeIcon icon={Moon} size={18} />}
          </Button>
          <MobileMenu />
        </div>
      </div>
      
    </div>
  );
}
