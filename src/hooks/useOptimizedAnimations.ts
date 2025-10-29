'use client';

import { useEffect, useRef, useState } from 'react';

export interface UseOptimizedAnimationsOptions {
  reduceMotion?: boolean;
  performanceMode?: 'high' | 'balanced' | 'low';
  intersectionMargin?: string;
}

export function useOptimizedAnimations(options: UseOptimizedAnimationsOptions = {}) {
  const {
    reduceMotion = false,
    performanceMode = 'balanced',
    intersectionMargin = '0px'
  } = options;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Detect low-end device
    const checkLowEndDevice = () => {
      const connection = (navigator as any).connection ||
                        (navigator as any).mozConnection ||
                        (navigator as any).webkitConnection;

      const isLowEnd =
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
        (connection && (connection.effectiveType === 'slow-2g' ||
                       connection.effectiveType === '2g' ||
                       connection.effectiveType === '3g')) ||
        (navigator.deviceMemory && navigator.deviceMemory <= 4);

      setIsLowEndDevice(isLowEnd);
    };

    checkLowEndDevice();

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const shouldOptimize = reduceMotion || prefersReducedMotion ||
                        (isLowEndDevice && performanceMode !== 'high');

  const getAnimationProps = (customProps?: any) => {
    if (shouldOptimize) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0 },
        ...customProps,
      };
    }

    const defaults = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: performanceMode === 'low' ? 0.3 :
                   performanceMode === 'balanced' ? 0.5 : 0.6,
        ease: [0.4, 0, 0.2, 1]
      },
    };

    return { ...defaults, ...customProps };
  };

  const createIntersectionObserver = (
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = { threshold: 0.1 }
  ) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(callback, {
      ...options,
      rootMargin: intersectionMargin,
    });

    return observerRef.current;
  };

  const getPerformanceStyles = () => {
    if (shouldOptimize) {
      return {
        transform: 'translateZ(0)',
        willChange: 'auto',
      };
    }

    return {
      transform: 'translateZ(0)',
      willChange: 'transform, opacity',
      backfaceVisibility: 'hidden' as const,
    };
  };

  return {
    shouldOptimize,
    prefersReducedMotion,
    isLowEndDevice,
    getAnimationProps,
    createIntersectionObserver,
    getPerformanceStyles,
  };
}

export default useOptimizedAnimations;