"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp } from "lucide-react";
import { SafeIcon } from "./SafeIcon";
import { useAppStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

interface CalculatorData {
  amountLost: number;
  timeElapsed: number; // días
  evidenceQuality: "low" | "medium" | "high";
  jurisdiction: "local" | "international";
}

export function RecoveryCalculator() {
  const [data, setData] = useState<CalculatorData>({
    amountLost: 0,
    timeElapsed: 0,
    evidenceQuality: "medium",
    jurisdiction: "local",
  });

  const [result, setResult] = useState<{
    successRate: number;
    estimatedCost: number;
    recommendedService: string;
    timeframe: string;
  } | null>(null);

  const currency = useAppStore((state) => state.currency);

  const calculateRecovery = useCallback(() => {
    const { amountLost, timeElapsed, evidenceQuality, jurisdiction } = data;
    
    // Factores de cálculo
    const timeFactor = Math.max(0.1, 1 - (timeElapsed / 365)); // Disminuye con el tiempo, mínimo 0.1
    const evidenceFactor = {
      low: 0.8,
      medium: 0.9,
      high: 1.0,
    }[evidenceQuality];
    
    const jurisdictionFactor = jurisdiction === "international" ? 0.9 : 1.0;
    
    // Verificar si el monto es mayor a 30 millones de dólares
    if (amountLost > 30000000) {
      setResult({
        successRate: 0,
        estimatedCost: 0,
        recommendedService: "No recomendamos este caso",
        timeframe: "No aplicable",
      });
      return;
    }
    
    // Tasa de éxito base entre 86% y 100%
    const baseSuccessRate = 0.86; // 86% mínimo
    const maxSuccessRate = 1.0; // 100% máximo
    
    // Calcular tasa de éxito con factores
    let successRate = baseSuccessRate + (maxSuccessRate - baseSuccessRate) * timeFactor * evidenceFactor * jurisdictionFactor;
    
    // Asegurar que esté entre 86% y 100%
    successRate = Math.max(0.86, Math.min(1.0, successRate));
    
    // Costo estimado (porcentaje del monto perdido)
    const costPercentage = jurisdiction === "international" ? 0.15 : 0.12;
    const estimatedCost = amountLost * costPercentage;
    
    // Servicio recomendado
    let recommendedService = "Asesoría Básica";
    if (amountLost > 10000) {
      recommendedService = "Recuperación de Fondos (honorarios por éxito)";
    } else if (amountLost > 5000) {
      recommendedService = "Asesoría Avanzada";
    } else if (amountLost > 1000) {
      recommendedService = "Asesoría Intermedia";
    }
    
    // Tiempo estimado
    let timeframe = "2-4 semanas";
    if (jurisdiction === "international") {
      timeframe = "3-6 meses";
    } else if (amountLost > 50000) {
      timeframe = "6-12 meses";
    }
    
    setResult({
      successRate,
      estimatedCost,
      recommendedService,
      timeframe,
    });
  }, [data]);

  useEffect(() => {
    if (data.amountLost > 0) {
      calculateRecovery();
    }
  }, [data, calculateRecovery]);

  const getSuccessColor = (rate: number) => {
    if (rate === 0) return "text-red-600";
    if (rate >= 0.95) return "text-green-600";
    if (rate >= 0.90) return "text-green-500";
    return "text-blue-600";
  };

  // Removed unused function

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border">
      <div className="flex items-center gap-3 mb-6">
                <SafeIcon icon={Calculator} className="h-6 w-6 text-emerald-600" />
        <h3 className="text-xl font-bold">Calculadora de Recuperación</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Monto perdido ({currency})
          </label>
          <input
            type="number"
            value={data.amountLost || ""}
            onChange={(e) => setData({ ...data, amountLost: Number(e.target.value) || 0 })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Ej: 5000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Días transcurridos
          </label>
          <input
            type="number"
            value={data.timeElapsed || ""}
            onChange={(e) => setData({ ...data, timeElapsed: Number(e.target.value) || 0 })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Ej: 30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Calidad de evidencia
          </label>
          <select
            value={data.evidenceQuality}
            onChange={(e) => setData({ ...data, evidenceQuality: e.target.value as "low" | "medium" | "high" })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="low">Baja (solo capturas)</option>
            <option value="medium">Media (capturas + metadatos)</option>
            <option value="high">Alta (evidencia completa)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Jurisdicción
          </label>
          <select
            value={data.jurisdiction}
            onChange={(e) => setData({ ...data, jurisdiction: e.target.value as "local" | "international" })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="local">Local</option>
            <option value="international">Internacional</option>
          </select>
        </div>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
                      <SafeIcon icon={TrendingUp} className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Tasa de éxito</p>
                <p className={`text-lg font-bold ${getSuccessColor(result.successRate)}`}>
                  {Math.round(result.successRate * 100)}%
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <SafeIcon icon={Calculator} className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Costo estimado</p>
                <p className="text-lg font-bold text-blue-600">
                  {formatPrice(result.estimatedCost, currency)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              <strong>Servicio recomendado:</strong> {result.recommendedService}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Tiempo estimado:</strong> {result.timeframe}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
