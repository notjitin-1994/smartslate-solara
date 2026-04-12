'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';

const PremiumButton = styled(Button)(({ theme }) => ({
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '16px',
  textTransform: 'none',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  zIndex: 1,
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  variant?: 'contained' | 'outlined' | 'text';
  color?: string;
  [key: string]: any;
}

export const MagneticButton = ({ children, strength = 0.3, ...props }: MagneticButtonProps) => {
  const { useMagnetic, shouldOptimize } = useOptimizedAnimations();
  const { ref, position, handleMouseMove, reset } = useMagnetic(strength);

  if (shouldOptimize) {
    return <PremiumButton {...props}>{children}</PremiumButton>;
  }

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      onMouseMove={(e: any) => handleMouseMove(e.nativeEvent)}
      onMouseLeave={reset}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: 'inline-block' }}
    >
      <PremiumButton {...props}>{children}</PremiumButton>
    </motion.div>
  );
};
