'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';

interface FloatingOrbProps {
  size: string | number;
  color: string;
  delay?: number;
  duration?: number;
  x?: string | number;
  y?: string | number;
  opacity?: number;
  blur?: string;
}

export const FloatingOrb = ({ 
  size, 
  color, 
  delay = 0, 
  duration = 20, 
  x = '50%', 
  y = '50%', 
  opacity = 0.2,
  blur = '80px'
}: FloatingOrbProps) => {
  const { shouldOptimize } = useOptimizedAnimations();

  if (shouldOptimize) return null;

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        left: x,
        top: y,
        opacity: opacity,
        filter: `blur(${blur})`,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      animate={{
        x: [0, 40, -40, 0],
        y: [0, -40, 40, 0],
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};
