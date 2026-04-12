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
 * World-Class Animation System for Solara (2026)
 * Orchestrates GSAP, React Spring, and Motion for a premium digital experience.
 */
export function useOptimizedAnimations(options: UseOptimizedAnimationsOptions = {}) {
  const { reduceMotion = false } = options;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    }
  }, []);

  const shouldOptimize = reduceMotion || prefersReducedMotion;

  /**
   * Premium Entrance Reveal
   * Uses GSAP .to() with explicit initial states for maximum reliability.
   */
  const useWorldClassEntrance = (scope: React.RefObject<any>, selector: string = '.reveal-item') => {
    useGSAP(() => {
      const targets = gsap.utils.toArray(selector);
      if (!targets.length || shouldOptimize) {
        gsap.set(targets, { opacity: 1, y: 0, visibility: 'visible' });
        return;
      }

      // Ensure hidden initially
      gsap.set(targets, { opacity: 0, y: 40, filter: 'blur(10px)' });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      
      tl.to(targets, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.12,
        clearProps: 'all'
      });

      // Special case for visuals
      const visual = document.querySelector('.visual-reveal');
      if (visual) {
        gsap.set(visual, { opacity: 0, scale: 0.9, rotate: -5 });
        tl.to(visual, {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.5,
          ease: 'expo.out'
        }, '-=0.8');
      }
    }, { scope });
  };

  // React Spring for organic hover physics
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

  // Framer Motion for high-fidelity scroll transforms
  const { scrollYProgress } = useScroll();
  const smoothProgress = useFramerSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return {
    shouldOptimize,
    usePhysicalHover,
    useWorldClassEntrance,
    scrollYProgress: smoothProgress,
    revealVariants,
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
