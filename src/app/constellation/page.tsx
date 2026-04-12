'use client';

import { Box, Container, Typography, Button, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Network,
  Zap,
  Target,
  Clock,
  Brain,
  FileText,
  Layers,
  Shield,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { FloatingOrb } from '@/components/animations/FloatingOrb';

const constellationColors = {
  primary: '#7C69F5',
  light: '#9b8cf8',
  dark: '#5d45dd',
};

const HeroSection = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'radial-gradient(circle at 20% 80%, rgba(124, 105, 245, 0.05) 0%, #020C1B 100%)',
}));

const FeatureCard = styled(motion.div)(() => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(30px)',
  border: '1px solid rgba(124, 105, 245, 0.1)',
  borderRadius: '32px',
  padding: '40px',
  height: '100%',
  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-12px)',
    border: `1px solid ${constellationColors.primary}50`,
    boxShadow: `0 30px 60px ${constellationColors.primary}20`,
  },
}));

export default function ConstellationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getStaggerProps, revealVariants, scrollYProgress, getAnimationProps } = useOptimizedAnimations();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useGSAP(() => {
    const targets = gsap.utils.toArray('.constellation-reveal');
    gsap.set(targets, { opacity: 0, y: 30 });
    
    gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }, { scope: containerRef });

  const stats = [
    { icon: Zap, value: '90%', label: 'Time Reduction' },
    { icon: Target, value: '100%', label: 'Strategic Alignment' },
    { icon: Layers, value: 'Zero', label: 'Manual Architecture' },
    { icon: Clock, value: 'Hours', label: 'Time to Reality' },
  ];

  const features = [
    { icon: Brain, title: 'AI Content Analysis', desc: 'Deep-dive analysis of existing documentation to enrich your blueprints.' },
    { icon: FileText, title: 'Script Automation', desc: 'Automatically generate production-ready scripts for videos and modules.' },
    { icon: Shield, title: 'Compliance Mapping', desc: 'Ensure every piece of content meets your organizational standards.' },
  ];

  return (
    <Box ref={containerRef} sx={{ background: '#020C1B', color: '#fff' }}>
      <HeroSection>
        <FloatingOrb size="800px" color={constellationColors.primary} x="-10%" y="40%" delay={0} duration={25} opacity={0.1} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Box className="constellation-reveal" sx={{ opacity: 0 }}>
                <Chip 
                  icon={<Sparkles size={14} />}
                  label="COMING EARLY 2026" 
                  sx={{ mb: 4, bgcolor: 'rgba(124, 105, 245, 0.1)', color: constellationColors.primary, fontWeight: 800, px: 1 }} 
                />
              </Box>
              <Box className="constellation-reveal" sx={{ opacity: 0 }}>
                <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '3.5rem', md: '5rem' }, lineHeight: 1, mb: 3 }}>
                  The Bridge to <span style={{ color: constellationColors.primary }}>Implementation.</span>
                </Typography>
              </Box>
              <Box className="constellation-reveal" sx={{ opacity: 0 }}>
                <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 6, maxWidth: 650 }}>
                  Constellation transforms strategic blueprints into detailed course architecture. From scripts to storyboards, bridge the gap between plan and reality.
                </Typography>
              </Box>
              <Box className="constellation-reveal" sx={{ display: 'flex', gap: 3, opacity: 0 }}>
                <MagneticButton variant="contained" sx={{ bgcolor: constellationColors.primary }}>Know More</MagneticButton>
                <Button variant="text" sx={{ color: constellationColors.primary, fontWeight: 700 }}>Integration Guide</Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div style={{ rotate }}>
                <Box sx={{ 
                  width: 450, 
                  height: 450, 
                  borderRadius: '50%', 
                  border: `1px dashed ${constellationColors.primary}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3 + i, repeat: Infinity }}
                      style={{
                        position: 'absolute',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: constellationColors.primary,
                        left: `${225 + Math.cos(i * 45 * Math.PI / 180) * 200 - 4}px`,
                        top: `${225 + Math.sin(i * 45 * Math.PI / 180) * 200 - 4}px`,
                        boxShadow: `0 0 15px ${constellationColors.primary}`
                      }}
                    />
                  ))}
                  <Network size={120} color={constellationColors.primary} strokeWidth={1.5} />
                </Box>
              </motion.div>
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
                  <stat.icon size={40} color={constellationColors.primary} style={{ marginBottom: 16 }} />
                  <Typography variant="h2" sx={{ fontWeight: 900, color: constellationColors.primary }}>{stat.value}</Typography>
                  <Typography variant="body2" sx={{ color: '#7a8a8b', fontWeight: 700 }}>{stat.label.toUpperCase()}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 15, bgcolor: 'rgba(124, 105, 245, 0.02)' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 10, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>Architectural Precision.</Typography>
            <Typography variant="h6" sx={{ color: '#b0c5c6', maxWidth: 700, mx: 'auto' }}>
              Constellation ensures every learning objective is matched with the perfect instructional strategy.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((f, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <FeatureCard {...getAnimationProps({ transition: { delay: i * 0.1 } })}>
                  <Box sx={{ width: 64, height: 64, bgcolor: `${constellationColors.primary}20`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                    <f.icon size={32} color={constellationColors.primary} />
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
        <FloatingOrb size="600px" color={constellationColors.primary} x="70%" y="20%" delay={0} duration={20} opacity={0.1} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div {...getAnimationProps()}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 4 }}>Bridge the gap.</Typography>
            <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 8 }}>
              Turn your strategy into high-fidelity course architecture with AI power.
            </Typography>
            <MagneticButton variant="contained" sx={{ px: 8, py: 2.5, fontSize: '1.2rem', bgcolor: constellationColors.primary }}>Get Notification</MagneticButton>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
