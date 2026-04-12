'use client';

import { Box, Container, Typography, Button, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Orbit as OrbitIcon,
  TrendingUp,
  Zap,
  Users,
  Target,
  Brain,
  GitBranch,
  Smartphone,
  Rocket
} from 'lucide-react';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { FloatingOrb } from '@/components/animations/FloatingOrb';

const orbitColors = {
  primary: '#f59e0b',
  light: '#fbbf24',
  dark: '#d97706',
};

const HeroSection = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.05) 0%, #020C1B 100%)',
}));

const FeatureCard = styled(motion.div)(() => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(30px)',
  border: '1px solid rgba(245, 158, 11, 0.1)',
  borderRadius: '32px',
  padding: '40px',
  height: '100%',
  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-12px)',
    border: `1px solid ${orbitColors.primary}50`,
    boxShadow: `0 30px 60px ${orbitColors.primary}20`,
  },
}));

export default function OrbitPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getAnimationProps, useWorldClassEntrance, scrollYProgress } = useOptimizedAnimations();
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  // Premium Entrance Reveal
  useWorldClassEntrance(containerRef, '.reveal-item');

  const stats = [
    { icon: TrendingUp, value: '3x', label: 'Completion Rates' },
    { icon: Zap, value: '40%', label: 'Faster Competency' },
    { icon: Users, value: '85%', label: 'Fewer Support Issues' },
    { icon: Target, value: '100%', label: 'Personalization' },
  ];

  const features = [
    { icon: Brain, title: 'Adaptive Engine', desc: 'Advanced ML that learns from every click to optimize individual journeys.' },
    { icon: GitBranch, title: 'Dynamic Branching', desc: 'Real-time pathway adjustments based on performance and confidence.' },
    { icon: Smartphone, title: 'Universal Reach', desc: 'Seamlessly transition between mobile, desktop, and offline modes.' },
  ];

  return (
    <Box ref={containerRef} sx={{ background: '#020C1B', color: '#fff' }}>
      <HeroSection>
        <FloatingOrb size="600px" color={orbitColors.primary} x="20%" y="20%" delay={0} duration={25} opacity={0.1} />
        <FloatingOrb size="400px" color={orbitColors.primary} x="60%" y="60%" delay={5} duration={20} opacity={0.1} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Box className="reveal-item">
                <Chip 
                  icon={<OrbitIcon size={14} />}
                  label="COMING IN 2026" 
                  sx={{ mb: 4, bgcolor: 'rgba(245, 158, 11, 0.1)', color: orbitColors.primary, fontWeight: 800, px: 1 }} 
                />
              </Box>
              <Box className="reveal-item">
                <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '3.5rem', md: '5rem' }, lineHeight: 1, mb: 3 }}>
                  Learning in <span style={{ color: orbitColors.primary }}>Constant Flow.</span>
                </Typography>
              </Box>
              <Box className="reveal-item">
                <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 6, maxWidth: 650 }}>
                  Orbit is the world's most advanced learning delivery system. One platform, millions of personalized trajectories.
                </Typography>
              </Box>
              <Box className="reveal-item" sx={{ display: 'flex', gap: 3 }}>
                <MagneticButton variant="contained" sx={{ bgcolor: orbitColors.primary }}>Join the Mission</MagneticButton>
                <Button variant="text" sx={{ color: orbitColors.primary, fontWeight: 700 }}>Platform Specs</Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box className="visual-reveal">
                <motion.div style={{ rotate: orbitRotate }}>
                  <Box sx={{ 
                    width: 450, 
                    height: 450, 
                    borderRadius: '50%', 
                    border: `2px solid rgba(245, 158, 11, 0.1)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      style={{ position: 'absolute', width: '100%', height: '100%' }}
                    >
                      <Box sx={{ 
                        width: 40, height: 40, borderRadius: '50%', 
                        bgcolor: orbitColors.primary, position: 'absolute', top: 0, left: '50%', 
                        ml: -2.5, boxShadow: `0 0 30px ${orbitColors.primary}`
                      }} />
                    </motion.div>
                    <OrbitIcon size={120} color={orbitColors.primary} strokeWidth={1} />
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
                  <stat.icon size={40} color={orbitColors.primary} style={{ marginBottom: 16 }} />
                  <Typography variant="h2" sx={{ fontWeight: 900, color: orbitColors.primary }}>{stat.value}</Typography>
                  <Typography variant="body2" sx={{ color: '#7a8a8b', fontWeight: 700 }}>{stat.label.toUpperCase()}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 15, bgcolor: 'rgba(245, 158, 11, 0.02)' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 10, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>Frictionless Delivery.</Typography>
            <Typography variant="h6" sx={{ color: '#b0c5c6', maxWidth: 700, mx: 'auto' }}>
              Orbit eliminates the gap between knowing and doing through contextual, adaptive learning experiences.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((f, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <FeatureCard {...getAnimationProps({ transition: { delay: i * 0.1 } })}>
                  <Box sx={{ width: 64, height: 64, bgcolor: `${orbitColors.primary}20`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                    <f.icon size={32} color={orbitColors.primary} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>{f.title}</Typography>
                  <Typography variant="body1" sx={{ color: '#b0c5c6', lineHeight: 1.7 }}>{f.desc}</Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 20, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <FloatingOrb size="600px" color={orbitColors.primary} x="60%" y="10%" delay={0} duration={20} opacity={0.1} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div {...getAnimationProps()}>
            <Rocket size={48} color={orbitColors.primary} style={{ marginBottom: 24 }} />
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 4 }}>Enter the Orbit.</Typography>
            <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 8 }}>
              Reimagine how your organization learns. Join the future of delivery.
            </Typography>
            <MagneticButton variant="contained" sx={{ px: 8, py: 2.5, fontSize: '1.2rem', bgcolor: orbitColors.primary }}>Request Access</MagneticButton>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
