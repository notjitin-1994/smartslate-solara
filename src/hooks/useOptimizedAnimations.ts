'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useSpring as useFramerSpring, useTransform } from 'framer-motion';
import { useSpring, animated, config } from 'react-spring';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export interface UseOptimizedAnimationsOptions {
  reduceMotion?: boolean;
  performanceMode?: 'high' | 'balanced' | 'low';
}

/**
 * Pro-grade animation hook for Solara (2026 Edition)
 * Combines GSAP (Timeline), React Spring (Physics), and Motion (Orchestration)
 */
export function useOptimizedAnimations(options: UseOptimizedAnimationsOptions = {}) {
  const { reduceMotion = false, performanceMode = 'balanced' } = options;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  const shouldOptimize = reduceMotion || prefersReducedMotion;

  // React Spring physics for high-frequency micro-interactions
  const usePhysicalHover = () => {
    const [styles, api] = useSpring(() => ({
      scale: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      config: config.wobbly,
    }));

    const onMouseEnter = () => api.start({ scale: 1.05, y: -5 });
    const onMouseLeave = () => api.start({ scale: 1, y: 0, rotateX: 0, rotateY: 0 });
    
    const onMouseMove = ({ clientX, clientY, currentTarget }: any) => {
      if (shouldOptimize) return;
      const { left, top, width, height } = currentTarget.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      api.start({
        rotateX: (y - 0.5) * 15,
        rotateY: (x - 0.5) * -15,
      });
    };

    return { styles, onMouseEnter, onMouseLeave, onMouseMove };
  };

  // GSAP for complex entrance timelines
  const useEntranceTimeline = (ref: React.RefObject<any>, delay: number = 0) => {
    useGSAP(() => {
      if (shouldOptimize) {
        gsap.set(ref.current, { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ delay });
      tl.from(ref.current, {
        opacity: 0,
        y: 50,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'expo.out',
      });
    }, { scope: ref });
  };

  // Framer Motion for scroll transforms
  const { scrollYProgress } = useScroll();
  const smoothProgress = useFramerSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const revealVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
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

  return {
    shouldOptimize,
    usePhysicalHover,
    useEntranceTimeline,
    scrollYProgress: smoothProgress,
    revealVariants,
    // Keep compatibility with existing code
    getStaggerProps: (staggerDelay = 0.1) => ({
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, amount: 0.1 },
      variants: {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        }
      }
    }),
    getAnimationProps: (custom: any) => ({
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true },
      variants: revealVariants,
      ...custom
    }),
    useMagnetic: (strength = 0.5) => {
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
    }
  };
}

export default useOptimizedAnimations;
