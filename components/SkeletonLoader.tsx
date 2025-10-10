"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  lines?: number;
  width?: string;
  height?: string;
}

export function Skeleton({ 
  className = "", 
  lines = 1, 
  width = "100%", 
  height = "1rem" 
}: SkeletonProps) {
  const shimmer = {
    background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
  };

  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, index) => (
        <motion.div
          key={index}
          className="rounded-md"
          style={{
            ...shimmer,
            width: index === lines - 1 ? "75%" : width,
            height,
            marginBottom: index < lines - 1 ? "0.5rem" : "0",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        />
      ))}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
      <Skeleton height="2rem" width="60%" className="mb-4" />
      <Skeleton lines={3} className="mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton height="2rem" width="30%" />
        <Skeleton height="2.5rem" width="40%" />
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
      <Skeleton height="1.5rem" width="70%" className="mb-3" />
      <Skeleton lines={2} className="mb-4" />
      <div className="flex justify-between items-center mb-4">
        <Skeleton height="1.25rem" width="40%" />
        <Skeleton height="1.25rem" width="30%" />
      </div>
      <Skeleton height="2.5rem" width="100%" />
    </div>
  );
}
