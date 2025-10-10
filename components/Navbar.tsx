"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
// import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/MobileMenu";
import { CartDrawer } from "@/components/CartDrawer";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

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
          <Link href="/abogados" className="hover:underline">Abogados</Link>
          <Link href="/contacto" className="hover:underline">Contacto</Link>
          <Link href="/legal" className="hover:underline">Legal</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button
            aria-label="Alternar tema"
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <CartDrawer />
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}




