"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface LazyWrapperProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function LazyWrapper({ 
  children, 
  className = "",
  threshold = 0.1,
  delay = 0,
  direction = "up"
}: LazyWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: threshold 
  });

  // Show content immediately with opacity 1, then animate when in view
  const directionVariants = {
    up: { y: 20, opacity: 0 },
    down: { y: -20, opacity: 0 },
    left: { x: 20, opacity: 0 },
    right: { x: -20, opacity: 0 },
  };

  const directionVariantsIn = {
    up: { y: 0, opacity: 1 },
    down: { y: 0, opacity: 1 },
    left: { x: 0, opacity: 1 },
    right: { x: 0, opacity: 1 },
  };

  // Show content with animation when in view
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={directionVariants[direction]}
      animate={isInView ? directionVariantsIn[direction] : directionVariants[direction]}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}
