import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { Header } from "@/components/Header";
import { ToastProvider } from '@/components/Toast';

// Optimización de fuentes con display: swap
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.3vb.legal"),
  title: {
    default: "3VB",
    template: "%s — 3VB"
  },
  description:
    "Bufete legal-tech especializado en ciberfraude, recuperación de dinero y auditoría de evidencia digital.",
  keywords: [
    "3VB",
    "ciberfraude",
    "recuperación de fondos",
    "abogados",
    "legal-tech",
    "estafas cibernéticas",
    "recuperación de dinero",
    "auditoría digital",
    "abogados especializados",
    "fraude online"
  ],
  alternates: { canonical: "/" },
  authors: [{ name: "3VB Legal" }],
  creator: "3VB Legal",
  publisher: "3VB Legal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://www.3vb.legal/",
    siteName: "3VB",
    title: "3VB — Abogados en ciberfraude y recuperación de fondos",
    description:
      "Bufete legal-tech especializado en ciberfraude, recuperación de dinero y auditoría de evidencia digital.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "3VB - Abogados especializados en ciberfraude"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "3VB — Abogados en ciberfraude y recuperación de fondos",
    description:
      "Bufete legal-tech especializado en ciberfraude, recuperación de dinero y auditoría de evidencia digital.",
    images: ["/og.png"],
    creator: "@3vb_legal"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            <SeoJsonLd />
            <Header />
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


