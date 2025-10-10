"use client";

import Link from "next/link";
import { useMemo } from "react";
import { services, lawyers } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { priceIn } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CarritoPage() {
  const { items, currency, removeItem, updateLawyer } = useAppStore();
  const total = useMemo(() => {
    return items.reduce((sum, i) => {
      const s = services.find((x) => x.id === i.serviceId);
      if (!s || s.priceUsd == null) return sum;
      return sum + (s.priceUsd * i.quantity);
    }, 0);
  }, [items]);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Carrito</h1>
      {items.length === 0 ? (
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          No hay servicios en tu carrito. <Link className="underline" href="/servicios">Explora servicios</Link>.
        </p>
      ) : (
        <div className="mt-6 space-y-4" role="list">
          {items.map((item, index) => {
            const service = services.find((x) => x.id === item.serviceId)!;
            // const lawyer = lawyers.find((l) => l.id === item.lawyerId);
            return (
              <div key={`${item.serviceId}-${index}`} className="rounded-2xl border p-4 dark:border-gray-800" role="listitem">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium">{service.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">{service.description}</div>
                    
                    <div className="mb-3">
                      <label className="block text-sm font-medium mb-1">Abogado asignado:</label>
                      <Select
                        value={item.lawyerId || "auto"}
                        onValueChange={(lawyerId) => updateLawyer(item.serviceId, lawyerId === "auto" ? "" : lawyerId)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Asignar automáticamente" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Asignar automáticamente</SelectItem>
                          {lawyers.map((l) => (
                            <SelectItem key={l.id} value={l.id}>
                              {l.name} — {l.specialty}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" aria-label="Quitar" onClick={() => removeItem(item.serviceId)}>-</Button>
                      <span aria-live="polite" className="min-w-6 text-center">{item.quantity}</span>
                      <Button variant="ghost" aria-label="Agregar" onClick={() => {
                        // Add item logic
                      }}>+</Button>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    {service.priceUsd != null && (
                      <div className="font-medium">
                        {priceIn(service.priceUsd * item.quantity, currency)}
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.serviceId)}
                      className="mt-1 text-red-600 hover:text-red-700"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="flex items-center justify-between border-t pt-4 dark:border-gray-800">
            <div className="text-sm text-gray-600 dark:text-gray-300">Total</div>
            <div className="text-lg font-semibold">{priceIn(total, currency)}</div>
          </div>
          <Button asChild className="w-full">
            <Link href="/checkout">Ir a pago</Link>
          </Button>
        </div>
      )}
    </div>
  );
}




