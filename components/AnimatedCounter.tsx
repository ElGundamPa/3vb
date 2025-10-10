"use client";

import { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ 
  target, 
  suffix = "", 
  duration = 1.5, 
  className = "" 
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            // Start animation from 0
            setDisplayValue(0);
            
            // Start animation
            const startTime = Date.now();
            const startValue = 0;
            const endValue = target;
            const animationDuration = duration * 1000;

            const animate = () => {
              const elapsed = Date.now() - startTime;
              const progress = Math.min(elapsed / animationDuration, 1);
              
              // Easing function for smooth animation
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentValue = startValue + (endValue - startValue) * easeOut;
              
              setDisplayValue(currentValue);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplayValue(endValue);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -50px 0px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, target, duration, isMounted]);

  const formatValue = (val: number) => {
    if (isNaN(val)) return "0";
    if (val % 1 === 0) {
      return Math.floor(val);
    }
    return val.toFixed(1);
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div ref={elementRef} className={className}>
        <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 drop-shadow-lg">
          0{suffix}
        </div>
      </div>
    );
  }

  return (
    <div ref={elementRef} className={className}>
      <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 drop-shadow-lg">
        {formatValue(displayValue)}{suffix}
      </div>
    </div>
  );
}