'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useSpring as useFramerSpring, useTransform } from 'framer-motion';
import { useSpring, animated, config } from 'react-spring';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

export interface UseOptimizedAnimationsOptions {
  reduceMotion?: boolean;
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
   * Uses direct fromTo for absolute stability and bypasses potential CSS conflicts.
   */
  const useWorldClassEntrance = (scope: React.RefObject<any>, selector: string = '.reveal-item') => {
    useGSAP(() => {
      if (!scope.current) return;

      if (shouldOptimize) {
        gsap.set(`${selector}, .visual-reveal`, { autoAlpha: 1, y: 0, scale: 1, visibility: 'visible', opacity: 1 });
        return;
      }

      const items = gsap.utils.toArray(selector, scope.current);
      const visuals = gsap.utils.toArray('.visual-reveal', scope.current);

      const tl = gsap.timeline({ 
        defaults: { ease: 'power4.out' },
        delay: 0.1
      });

      if (items.length > 0) {
        tl.fromTo(items, 
          { y: 40, autoAlpha: 0, filter: 'blur(10px)' },
          { 
            autoAlpha: 1, 
            y: 0, 
            filter: 'blur(0px)', 
            duration: 1.2, 
            stagger: 0.08,
            overwrite: 'auto'
          }
        );
      }

      if (visuals.length > 0) {
        tl.fromTo(visuals,
          { autoAlpha: 0, scale: 0.9, rotate: -2 },
          {
            autoAlpha: 1,
            scale: 1,
            rotate: 0,
            duration: 1.8,
            ease: 'expo.out',
            overwrite: 'auto'
          },
          items.length > 0 ? '-=1.0' : 0
        );
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
