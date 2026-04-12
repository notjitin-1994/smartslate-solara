'use client';

import { Box, Container, Typography, Button, Grid, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, useTransform } from 'framer-motion';
import {
  Compass,
  ArrowRight,
  Zap,
  Target,
  CheckCircle2,
  Clock,
  Users,
  Shield,
  FileText,
  Sparkles,
  BarChart3,
  Calendar,
  AlertTriangle,
  Server
} from 'lucide-react';
import Link from 'next/link';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';

// Polaris Brand Colors
const polarisColors = {
  primary: '#06b6d4',
  light: '#22d3ee',
  dark: '#0891b2',
};

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

const MagneticButton = ({ children, strength = 0.3, ...props }: any) => {
  const { useMagnetic } = useOptimizedAnimations();
  const { ref, position, handleMouseMove, reset } = useMagnetic(strength);

  return (
    <motion.div
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      onMouseMove={(e: any) => handleMouseMove(e.nativeEvent)}
      onMouseLeave={reset}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
    >
      <PremiumButton {...props}>{children}</PremiumButton>
    </motion.div>
  );
};

const PremiumButton = styled(Button)(() => ({
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '16px',
  textTransform: 'none',
  background: polarisColors.primary,
  color: '#020C1B',
  boxShadow: `0 10px 30px ${polarisColors.primary}30`,
  '&:hover': {
    background: polarisColors.light,
    boxShadow: `0 20px 40px ${polarisColors.primary}50`,
  },
}));

const FeatureCard = styled(motion.div)(() => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(30px)',
  border: '1px solid rgba(6, 182, 212, 0.1)',
  borderRadius: '32px',
  padding: '40px',
  height: '100%',
  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-12px)',
    border: `1px solid ${polarisColors.primary}50`,
    boxShadow: `0 30px 60px ${polarisColors.primary}20`,
  },
}));

const FloatingBackgroundOrb = ({ size, color, delay, duration, x, y }: any) => (
  <motion.div
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color}20 0%, transparent 70%)`,
      left: x,
      top: y,
      filter: 'blur(80px)',
      zIndex: 0,
    }}
    animate={{
      x: [0, 30, -30, 0],
      y: [0, -30, 30, 0],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

export default function PolarisPage() {
  const { getStaggerProps, revealVariants, scrollYProgress, getAnimationProps } = useOptimizedAnimations();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.2]);

  const stats = [
    { icon: Zap, value: '15x', label: 'Faster Requirements' },
    { icon: Target, value: '100%', label: 'Business Alignment' },
    { icon: CheckCircle2, value: 'Zero', label: 'Revision Cycles' },
    { icon: Clock, value: '2 Min', label: 'Avg. Generation Time' },
  ];

  const features = [
    { icon: Sparkles, title: 'AI Requirement Translation', desc: 'Transform messy stakeholder notes into structured blueprints instantly.' },
    { icon: FileText, title: 'Pedagogical Integrity', desc: 'Every blueprint is automatically aligned with Bloom\'s Taxonomy.' },
    { icon: Server, title: 'Enterprise Workspaces', desc: 'Collaborate with your entire team in a secure environment.' },
  ];

  return (
    <Box sx={{ background: '#020C1B', color: '#fff' }}>
      <HeroSection>
        <FloatingBackgroundOrb size="800px" color={polarisColors.primary} x="-10%" y="-20%" delay={0} duration={25} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div {...getStaggerProps(0.1)}>
                <motion.div variants={revealVariants}>
                  <Chip 
                    label="NOW IN PUBLIC BETA" 
                    sx={{ mb: 4, bgcolor: 'rgba(6, 182, 212, 0.1)', color: polarisColors.primary, fontWeight: 800, px: 1 }} 
                  />
                </motion.div>
                <motion.div variants={revealVariants}>
                  <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '3.5rem', md: '5rem' }, lineHeight: 1, mb: 3 }}>
                    The North Star of <span style={{ color: polarisColors.primary }}>Learning Design.</span>
                  </Typography>
                </motion.div>
                <motion.div variants={revealVariants}>
                  <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 6, maxWidth: 600 }}>
                    Polaris automates the most difficult 40% of instructional design—transforming raw requirements into rigorous blueprints in minutes.
                  </Typography>
                </motion.div>
                <motion.div variants={revealVariants}>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <MagneticButton variant="contained">Start Free Trial</MagneticButton>
                    <Button variant="text" sx={{ color: polarisColors.primary, fontWeight: 700 }}>Watch Demo</Button>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div style={{ rotate, scale }}>
                <Box sx={{ 
                  width: 400, 
                  height: 400, 
                  borderRadius: '50%', 
                  border: `2px dashed ${polarisColors.primary}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <Box sx={{ 
                    width: 200, 
                    height: 200, 
                    borderRadius: '50%', 
                    background: `radial-gradient(circle, ${polarisColors.primary} 0%, ${polarisColors.dark} 100%)`,
                    animation: `${starGlow} 4s infinite ease-in-out`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Compass size={100} color="#020C1B" strokeWidth={2.5} />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Box sx={{ py: 15, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <motion.div {...getAnimationProps({ transition: { delay: i * 0.1 } })}>
                  <Box sx={{ textAlign: 'center', p: 4, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
                    <stat.icon size={40} color={polarisColors.primary} style={{ marginBottom: 16 }} />
                    <Typography variant="h2" sx={{ fontWeight: 900, color: polarisColors.primary }}>{stat.value}</Typography>
                    <Typography variant="body2" sx={{ color: '#7a8a8b', fontWeight: 700 }}>{stat.label.toUpperCase()}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Grid */}
      <Box sx={{ py: 15, bgcolor: 'rgba(6, 182, 212, 0.02)' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 10, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>Engineered for Precision.</Typography>
            <Typography variant="h6" sx={{ color: '#b0c5c6', maxWidth: 700, mx: 'auto' }}>
              Polaris isn't just a chatbot—it's a specialized AI engine trained on decades of learning science.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((f, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <FeatureCard {...getAnimationProps({ transition: { delay: i * 0.1 } })}>
                  <Box sx={{ width: 64, height: 64, bgcolor: `${polarisColors.primary}20`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                    <f.icon size={32} color={polarisColors.primary} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>{f.title}</Typography>
                  <Typography variant="body1" sx={{ color: '#b0c5c6', lineHeight: 1.7 }}>{f.desc}</Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box sx={{ py: 20, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <FloatingBackgroundOrb size="600px" color={polarisColors.primary} x="60%" y="10%" delay={0} duration={20} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div {...getAnimationProps()}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 4 }}>Ready to reach the North Star?</Typography>
            <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 8 }}>
              Stop wasting weeks on meetings. Join the future of learning design today.
            </Typography>
            <MagneticButton variant="contained" sx={{ px: 8, py: 2.5, fontSize: '1.2rem' }}>Get Started for Free</MagneticButton>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
