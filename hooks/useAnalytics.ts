"use client";

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { trackConversion, trackPerformance, trackUserBehavior } from '@/lib/analytics';

export function useAnalytics() {
  const pathname = usePathname();

  // Track page views
  useEffect(() => {
    trackConversion.pageView(pathname);
  }, [pathname]);

  // Track scroll depth
  useEffect(() => {
    let maxScroll = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        trackConversion.scrollDepth(maxScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();
    
    return () => {
      const timeOnPage = Date.now() - startTime;
      trackConversion.timeOnPage(timeOnPage);
    };
  }, [pathname]);

  // Track performance metrics
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            trackPerformance.pageLoad(navEntry.loadEventEnd - navEntry.loadEventStart);
          }
          
          if (entry.entryType === 'paint') {
            if (entry.name === 'first-contentful-paint') {
              trackPerformance.firstContentfulPaint(entry.startTime);
            }
          }
          
          if (entry.entryType === 'largest-contentful-paint') {
            trackPerformance.largestContentfulPaint(entry.startTime);
          }
        }
      });

      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });

      return () => observer.disconnect();
    }
  }, []);

  // Track user interactions
  const trackClick = useCallback((element: string, location: string) => {
    trackUserBehavior.click(element, location);
  }, []);

  const trackHover = useCallback((element: string, duration: number) => {
    trackUserBehavior.hover(element, duration);
  }, []);

  const trackFocus = useCallback((element: string) => {
    trackUserBehavior.focus(element);
  }, []);

  return {
    trackClick,
    trackHover,
    trackFocus,
  };
}
