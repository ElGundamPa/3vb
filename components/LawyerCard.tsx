"use client";

import { motion } from "framer-motion";
import { Star, MapPin, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LawyerCardProps {
  lawyer: {
    id: string;
    name: string;
    specialty: string;
    bio: string;
    countries: string[];
    languages: string[];
    rating: number;
    avatar?: string;
  };
}

export function LawyerCard({ lawyer }: LawyerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Card className="group h-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold">
              {lawyer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <CardTitle className="text-lg">{lawyer.name}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400">
                <Star size={14} className="fill-current" />
                <span>{lawyer.rating}/5</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
              {lawyer.specialty}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {lawyer.bio}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin size={14} />
              <span>{lawyer.countries.join(", ")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Globe size={14} />
              <span>{lawyer.languages.join(", ")}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
