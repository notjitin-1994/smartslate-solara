'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useSpring, useTransform, MotionValue } from 'framer-motion';

export interface UseOptimizedAnimationsOptions {
  reduceMotion?: boolean;
  performanceMode?: 'high' | 'balanced' | 'low';
  intersectionMargin?: string;
}

/**
 * World-class animation hook for Solara
 * Provides performance-optimized, high-end animation utilities
 */
export function useOptimizedAnimations(options: UseOptimizedAnimationsOptions = {}) {
  const {
    reduceMotion = false,
    performanceMode = 'balanced',
    intersectionMargin = '0px'
  } = options;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialize scroll tracking for parallax effects
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleChange);

      // Detect low-end device based on hardware and connection
      const checkLowEndDevice = () => {
        const nav = navigator as any;
        const connection = nav.connection || nav.mozConnection || nav.webkitConnection;

        const isLowEnd =
          (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) ||
          (connection && (['slow-2g', '2g', '3g'].includes(connection.effectiveType))) ||
          (nav.deviceMemory && nav.deviceMemory <= 4);

        setIsLowEndDevice(isLowEnd);
      };

      checkLowEndDevice();

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, []);

  const shouldOptimize = reduceMotion || prefersReducedMotion ||
                        (isLowEndDevice && performanceMode !== 'high');

  /**
   * Generates standardized animation properties with performance fallback
   */
  const getAnimationProps = useCallback((customProps?: any) => {
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
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-50px' },
      transition: {
        duration: performanceMode === 'high' ? 0.8 : 0.6,
        ease: [0.22, 1, 0.36, 1] // Custom quint ease for high-end feel
      },
    };

    return { ...defaults, ...customProps };
  }, [shouldOptimize, performanceMode]);

  /**
   * Utility for staggered child animations
   */
  const getStaggerProps = useCallback((staggerDelay: number = 0.1) => {
    if (shouldOptimize) return {};

    return {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true },
      variants: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2
          }
        }
      }
    };
  }, [shouldOptimize]);

  /**
   * High-end reveal variant
   */
  const revealVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  /**
   * Performance-optimized styles
   */
  const getPerformanceStyles = useCallback(() => {
    return {
      transform: 'translateZ(0)',
      willChange: shouldOptimize ? 'auto' : 'transform, opacity',
      backfaceVisibility: 'hidden' as const,
      WebkitFontSmoothing: 'antialiased' as const,
    };
  }, [shouldOptimize]);

  /**
   * Magnetic effect utility for buttons/icons
   */
  const useMagnetic = (strength: number = 0.5) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || shouldOptimize) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * strength, y: middleY * strength });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return { ref, position, handleMouseMove, reset };
  };

  return {
    shouldOptimize,
    prefersReducedMotion,
    isLowEndDevice,
    scrollYProgress: smoothProgress,
    getAnimationProps,
    getStaggerProps,
    revealVariants,
    getPerformanceStyles,
    useMagnetic,
  };
}

export default useOptimizedAnimations;
