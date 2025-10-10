"use client";

import { useEffect, useState } from "react";

interface SafeIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  className?: string;
  size?: number;
  [key: string]: unknown;
}

/**
 * Componente que previene errores de hidratación con iconos de Lucide React
 * que contienen elementos SVG con <circle>
 */
export function SafeIcon({ icon: Icon, className = "", size = 24, ...props }: SafeIconProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Durante la hidratación, renderizar un placeholder
  if (!isMounted) {
    return (
      <div 
        className={`inline-block ${className}`}
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
    );
  }

  return <Icon className={className} width={size} height={size} {...(props as unknown as React.SVGProps<SVGSVGElement>)} />;
}
