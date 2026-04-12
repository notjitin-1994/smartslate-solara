'use client';

import { Box, Container, Typography, Button, Grid, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, AnimatePresence, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  Compass,
  Network,
  Sparkles,
  Orbit as OrbitIcon,
  BarChart3,
  Brain,
  ArrowRight,
  ChevronDown,
  Star
} from 'lucide-react';
import { SkipToContent } from '@/components/accessibility/SkipToContent';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { FloatingOrb } from '@/components/animations/FloatingOrb';

// Keyframes for GSAP to augment
const starGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 15px rgba(167, 218, 219, 0.4)); transform: scale(1); }
  50% { filter: drop-shadow(0 0 35px rgba(167, 218, 219, 0.8)); transform: scale(1.05); }
`;

const HeroSection = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, #020C1B 0%, #03142B 100%)',
}));

const GradientText = styled('span')(() => ({
  background: 'linear-gradient(90deg, #a7dadb, #7C69F5, #a7dadb)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  display: 'inline-block',
}));

const ModuleCard = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<{ accentColor: string }>(({ accentColor }) => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(30px)',
  border: '1px solid rgba(167, 218, 219, 0.1)',
  borderRadius: '32px',
  padding: '40px',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    border: `1px solid ${accentColor}80`,
    boxShadow: `0 30px 60px ${accentColor}20`,
  },
}));

const modules = [
  { id: 'polaris', icon: Compass, name: 'Polaris', tagline: 'AI Learning Blueprint Generator', shortDesc: 'The intelligent North Star for your learning strategy. Automatically generate rigorous blueprints.', accentColor: '#06b6d4', status: 'Live Now' },
  { id: 'constellation', icon: Network, name: 'Constellation', tagline: 'Content-to-Blueprint Automation', shortDesc: 'Bridge the gap between raw data and instructional integrity.', accentColor: '#7C69F5', status: 'Expected 2025' },
  { id: 'nova', icon: Sparkles, name: 'Nova', tagline: 'AI-Assisted Content Authoring', shortDesc: 'A supernova of creativity and speed. Co-author pedagogically sound content.', accentColor: '#22c55e', status: 'Expected 2026' },
  { id: 'orbit', icon: OrbitIcon, name: 'Orbit', tagline: 'Personalized Learning Delivery', shortDesc: 'Adaptive trajectories for every learner. Real-time personalization.', accentColor: '#f59e0b', status: 'Expected 2026' },
  { id: 'nebula', icon: Brain, name: 'Nebula', tagline: 'Intelligent Learning Assistant', shortDesc: 'Constant support in the cloud. A 24/7 AI tutor guiding learners.', accentColor: '#fbbf24', status: 'Expected 2027' },
  { id: 'spectrum', icon: BarChart3, name: 'Spectrum', tagline: 'Advanced Learning Analytics', shortDesc: 'Strategic intelligence across the board. Predict outcomes and prove ROI.', accentColor: '#ef4444', status: 'Expected 2027' },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, revealVariants } = useOptimizedAnimations();

  // GSAP Entrance Animation
  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from('.hero-reveal', {
      y: 100,
      opacity: 0,
      filter: 'blur(20px)',
      duration: 1.5,
      stagger: 0.2,
      ease: 'expo.out'
    })
    .from('.orbit-visual', {
      scale: 0.5,
      opacity: 0,
      rotate: -180,
      duration: 2,
      ease: 'elastic.out(1, 0.75)'
    }, '-=1');

    // Subtle parallax on mouse move for the hero
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;
      
      gsap.to('.hero-visual-container', {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef });

  // Parallax transforms for scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <Box ref={containerRef} sx={{ background: '#020C1B' }}>
      <SkipToContent />

      {/* Hero Section */}
      <HeroSection ref={heroRef} role="banner">
        <FloatingOrb size="80vw" color="#06b6d4" x="-10%" y="-10%" opacity={0.15} />
        <FloatingOrb size="60vw" color="#7C69F5" x="50%" y="30%" opacity={0.1} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Box className="hero-reveal">
                <Chip
                  icon={<Sparkles size={16} />}
                  label="2026 Innovation Awards Finalist"
                  sx={{ mb: 4, background: 'rgba(167, 218, 219, 0.1)', color: '#a7dadb', fontWeight: 700, border: '1px solid rgba(167, 218, 219, 0.2)' }}
                />
              </Box>

              <Box className="hero-reveal">
                <Typography variant="h1" sx={{ mb: 3, fontSize: { xs: '3.5rem', md: '5.5rem' }, fontWeight: 900, lineHeight: 1, color: '#fff', letterSpacing: '-0.04em' }}>
                  The Future of Learning, <GradientText>Orchestrated.</GradientText>
                </Typography>
              </Box>

              <Box className="hero-reveal">
                <Typography variant="h5" sx={{ mb: 6, color: '#b0c5c6', lineHeight: 1.5, fontSize: '1.5rem', fontWeight: 500, maxWidth: '600px' }}>
                  Solara is the world's first unified AI-native learning ecosystem. One intelligence, six modules, total transformation.
                </Typography>
              </Box>

              <Box className="hero-reveal" sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <MagneticButton component={Link} href="/polaris" variant="contained" endIcon={<ArrowRight size={20} />} strength={0.2} sx={{ background: '#a7dadb', color: '#020C1B' }}>
                  Explore Polaris
                </MagneticButton>
                <Button variant="text" sx={{ color: '#a7dadb', fontWeight: 700, fontSize: '1.1rem', '&:hover': { background: 'rgba(167, 218, 219, 0.05)' } }}>
                  View the Roadmap
                </Button>
              </Box>
            </Grid>

            {/* Interactive Visual Hub */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box className="hero-visual-container">
                <motion.div style={{ y: y1, rotate: rotate }} className="orbit-visual">
                  <Box sx={{ width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(167, 218, 219, 0.15)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Central Star */}
                    <Box sx={{ width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, #a7dadb 0%, #7C69F5 100%)', zIndex: 2, animation: `${starGlow} 4s infinite ease-in-out`, boxShadow: '0 0 60px rgba(124, 105, 245, 0.4)' }} />
                    
                    {/* Orbiting Modules */}
                    {modules.map((m, i) => {
                      const angle = (i * 60) * (Math.PI / 180);
                      return (
                        <Box key={m.id} sx={{ position: 'absolute', left: `${250 + Math.cos(angle) * 200 - 30}px`, top: `${250 + Math.sin(angle) * 200 - 30}px` }}>
                          <motion.div whileHover={{ scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
                            <Box sx={{ width: 64, height: 64, borderRadius: '18px', background: m.accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 10px 25px ${m.accentColor}50` }}>
                              <m.icon size={32} color="#020C1B" />
                            </Box>
                          </motion.div>
                        </Box>
                      );
                    })}
                  </Box>
                </motion.div>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', bottom: 40, left: '50%', translateX: '-50%', color: '#a7dadb', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.1em' }}>DISCOVER</Typography>
          <ChevronDown size={20} />
        </motion.div>
      </HeroSection>

      {/* Modules Section with GSAP ScrollTrigger */}
      <Box sx={{ py: 20, background: '#020C1B' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 12 }}>
            <Typography variant="overline" sx={{ color: '#a7dadb', fontWeight: 900, letterSpacing: '0.3em' }}>THE CORE ECOSYSTEM</Typography>
            <Typography variant="h2" sx={{ color: '#fff', fontWeight: 900, mb: 3, fontSize: '4rem' }}>Six Modules. One Vision.</Typography>
          </Box>

          <Grid container spacing={4}>
            {modules.map((module, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={module.id}>
                <ModuleCard
                  accentColor={module.accentColor}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={revealVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <Box sx={{ width: 80, height: 80, borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${module.accentColor}20`, border: `1px solid ${module.accentColor}30`, mb: 4 }}>
                    <module.icon size={40} color={module.accentColor} />
                  </Box>
                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 900, mb: 1 }}>{module.name}</Typography>
                  <Typography variant="subtitle2" sx={{ color: module.accentColor, fontWeight: 700, mb: 3 }}>{module.tagline.toUpperCase()}</Typography>
                  <Typography variant="body1" sx={{ color: '#b0c5c6', mb: 4, lineHeight: 1.7 }}>{module.shortDesc}</Typography>
                  <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip label={module.status} size="small" sx={{ background: module.status === 'Live Now' ? `${module.accentColor}20` : 'rgba(255,255,255,0.05)', color: module.status === 'Live Now' ? module.accentColor : '#7a8a8b', fontWeight: 700 }} />
                    <ArrowRight size={24} color={module.accentColor} />
                  </Box>
                </ModuleCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 20, background: 'linear-gradient(0deg, #020C1B 0%, #03142B 100%)', position: 'relative', overflow: 'hidden' }}>
        <FloatingOrb size="50vw" color="#7C69F5" x="70%" y="-10%" opacity={0.1} />
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Star size={64} color="#a7dadb" style={{ marginBottom: 32 }} />
          <Typography variant="h2" sx={{ color: '#fff', fontWeight: 900, mb: 4, fontSize: '4.5rem' }}>Start Your Orbit.</Typography>
          <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 8, lineHeight: 1.6 }}>Join the elite organizations building the next generation of learning experiences with Solara.</Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
            <MagneticButton component={Link} href="/polaris" variant="contained" strength={0.1} sx={{ px: 8, py: 2.5, fontSize: '1.2rem', background: '#a7dadb', color: '#020C1B' }}>
              Launch Polaris Now
            </MagneticButton>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
