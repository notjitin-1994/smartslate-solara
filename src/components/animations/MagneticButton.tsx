'use client';

import React from 'react';
import { useSpring, animated, config } from 'react-spring';
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
  zIndex: 1,
}));

const AnimatedButton = animated(PremiumButton);

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  variant?: 'contained' | 'outlined' | 'text';
  color?: string;
  [key: string]: any;
}

export const MagneticButton = ({ children, strength = 0.3, ...props }: MagneticButtonProps) => {
  const { shouldOptimize } = useOptimizedAnimations();
  
  // React Spring Physics
  const [springProps, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    boxShadow: '0 10px 30px rgba(167, 218, 219, 0.2)',
    config: { ...config.stiff, precision: 0.001 }
  }));

  if (shouldOptimize) {
    return <PremiumButton {...props}>{children}</PremiumButton>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;
    set.start({ 
      x, y, 
      scale: 1.05,
      boxShadow: '0 20px 40px rgba(167, 218, 219, 0.4)'
    });
  };

  const handleMouseLeave = () => {
    set.start({ x: 0, y: 0, scale: 1, boxShadow: '0 10px 30px rgba(167, 218, 219, 0.2)' });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      <AnimatedButton
        style={{
          transform: springProps.x.to((x, y = springProps.y.get(), s = springProps.scale.get()) => 
            `translate3d(${x}px, ${y}px, 0) scale(${s})`),
          boxShadow: springProps.boxShadow as any,
        }}
        {...props}
      >
        {children}
      </AnimatedButton>
    </div>
  );
};
