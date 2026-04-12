'use client';

import { Box, Container, Typography, Button, Grid, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Compass,
  ArrowRight,
  Zap,
  Target,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { FloatingOrb } from '@/components/animations/FloatingOrb';

const polarisColors = { primary: '#06b6d4', light: '#22d3ee', dark: '#0891b2' };

const starGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 15px rgba(6, 182, 212, 0.4)); transform: scale(1); }
  50% { filter: drop-shadow(0 0 30px rgba(6, 182, 212, 0.8)); transform: scale(1.05); }
`;

const HeroSection = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'radial-gradient(circle at 20% 30%, rgba(6, 182, 212, 0.05) 0%, #020C1B 100%)',
}));

export default function PolarisPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, useWorldClassEntrance } = useOptimizedAnimations();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Premium Entrance Reveal
  useWorldClassEntrance(containerRef, '.reveal-item');

  const stats = [
    { icon: Zap, value: '15x', label: 'Faster Requirements' },
    { icon: Target, value: '100%', label: 'Business Alignment' },
    { icon: CheckCircle2, value: 'Zero', label: 'Revision Cycles' },
    { icon: Clock, value: '2 Min', label: 'Avg. Generation Time' },
  ];

  return (
    <Box ref={containerRef} sx={{ background: '#020C1B', color: '#fff' }}>
      <HeroSection>
        <FloatingOrb size="80vw" color={polarisColors.primary} x="-10%" y="-20%" opacity={0.1} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Box className="reveal-item">
                <Chip label="NOW IN PUBLIC BETA" sx={{ mb: 4, bgcolor: 'rgba(6, 182, 212, 0.1)', color: polarisColors.primary, fontWeight: 800 }} />
              </Box>
              <Box className="reveal-item">
                <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '3.5rem', md: '5rem' }, lineHeight: 1, mb: 3 }}>
                  The North Star of <span style={{ color: polarisColors.primary }}>Learning Design.</span>
                </Typography>
              </Box>
              <Box className="reveal-item">
                <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 6, maxWidth: 600 }}>
                  Polaris automates the most difficult 40% of instructional design—transforming raw requirements into rigorous blueprints in minutes.
                </Typography>
              </Box>
              <Box className="reveal-item" sx={{ display: 'flex', gap: 3 }}>
                <MagneticButton variant="contained" sx={{ bgcolor: polarisColors.primary, color: '#020C1B' }}>Start Free Trial</MagneticButton>
                <Button variant="text" sx={{ color: polarisColors.primary, fontWeight: 700 }}>Watch Demo</Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box className="visual-reveal">
                <motion.div style={{ rotate }}>
                  <Box sx={{ width: 400, height: 400, borderRadius: '50%', border: `2px dashed ${polarisColors.primary}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ width: 200, height: 200, borderRadius: '50%', background: `radial-gradient(circle, ${polarisColors.primary} 0%, ${polarisColors.dark} 100%)`, animation: `${starGlow} 4s infinite ease-in-out`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Compass size={100} color="#020C1B" strokeWidth={2.5} />
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Box sx={{ py: 15, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <Box sx={{ textAlign: 'center', p: 4, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
                  <stat.icon size={40} color={polarisColors.primary} style={{ marginBottom: 16 }} />
                  <Typography variant="h2" sx={{ fontWeight: 900, color: polarisColors.primary }}>{stat.value}</Typography>
                  <Typography variant="body2" sx={{ color: '#7a8a8b', fontWeight: 700 }}>{stat.label.toUpperCase()}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 20, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <FloatingOrb size="60vw" color={polarisColors.primary} x="60%" y="10%" opacity={0.1} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 4 }}>Ready to reach the North Star?</Typography>
          <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 8 }}>Stop wasting weeks on meetings. Join the future of learning design today.</Typography>
          <MagneticButton variant="contained" sx={{ px: 8, py: 2.5, fontSize: '1.2rem', bgcolor: polarisColors.primary, color: '#020C1B' }}>Get Started for Free</MagneticButton>
        </Container>
      </Box>
    </Box>
  );
}
