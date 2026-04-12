'use client';

import { Box, Container, Typography, Button, Grid, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, AnimatePresence, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Network,
  Sparkles,
  Orbit as OrbitIcon,
  BarChart3,
  Brain,
  ArrowRight,
  Zap,
  Target,
  CheckCircle2,
  TrendingUp,
  ChevronDown,
  Star
} from 'lucide-react';
import { SkipToContent } from '@/components/accessibility/SkipToContent';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';

// Advanced Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
`;

const starGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 10px rgba(167, 218, 219, 0.4));
    transform: scale(1);
  }
  50% {
    filter: drop-shadow(0 0 25px rgba(167, 218, 219, 0.8));
    transform: scale(1.05);
  }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled Components
const HeroSection = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, #020C1B 0%, #03142B 100%)',
}));

const GradientText = styled(motion.span)(() => ({
  background: 'linear-gradient(90deg, #a7dadb, #7C69F5, #a7dadb)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${shimmer} 5s linear infinite`,
  display: 'inline-block',
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
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
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
  position: 'relative',
  background: '#a7dadb',
  color: '#020C1B',
  boxShadow: '0 10px 30px rgba(167, 218, 219, 0.2)',
  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  zIndex: 1,
  '&:hover': {
    background: '#7bc5c7',
    boxShadow: '0 20px 40px rgba(167, 218, 219, 0.4)',
    transform: 'scale(1.02)',
  },
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
  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    border: `1px solid ${accentColor}80`,
    boxShadow: `0 30px 60px ${accentColor}20`,
  },
}));

const IconContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<{ accentColor: string }>(({ accentColor }) => ({
  width: 80,
  height: 80,
  borderRadius: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${accentColor}20, ${accentColor}10)`,
  border: `1px solid ${accentColor}30`,
  marginBottom: '24px',
  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'rotate(10deg) scale(1.1)',
    background: `linear-gradient(135deg, ${accentColor}40, ${accentColor}20)`,
  },
}));

const FloatingBackgroundOrb = ({ size, color, delay, duration, x, y }: any) => (
  <motion.div
    style={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: `radial-gradient(circle, ${color}30 0%, transparent 70%)`,
      left: x,
      top: y,
      zIndex: 0,
      filter: 'blur(60px)',
    }}
    animate={{
      x: [0, 50, -50, 0],
      y: [0, -50, 50, 0],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

const modules = [
  {
    id: 'polaris',
    icon: Compass,
    name: 'Polaris',
    tagline: 'AI Learning Blueprint Generator',
    shortDesc: 'The intelligent North Star for your learning strategy. Automatically generate rigorous blueprints that align with business outcomes.',
    status: 'Live Now',
    accentColor: '#06b6d4',
    metrics: [{ value: '15x', label: 'Faster Gathering' }, { value: 'Zero', label: 'Revision Cycles' }],
  },
  {
    id: 'constellation',
    icon: Network,
    name: 'Constellation',
    tagline: 'Content-to-Blueprint Automation',
    shortDesc: 'Bridge the gap between raw data and instructional integrity. Transform content inventory into strategic learning assets.',
    status: 'Expected 2025',
    accentColor: '#7C69F5',
    metrics: [{ value: '80%', label: 'Time Reduction' }, { value: '$500K+', label: 'Avg. Savings' }],
  },
  {
    id: 'nova',
    icon: Sparkles,
    name: 'Nova',
    tagline: 'AI-Assisted Content Authoring',
    shortDesc: 'A supernova of creativity and speed. Co-author pedagogically sound content with AI that understands learning science.',
    status: 'Expected 2026',
    accentColor: '#22c55e',
    metrics: [{ value: '70%', label: 'Faster Dev' }, { value: '90%', label: '1st Draft Quality' }],
  },
  {
    id: 'orbit',
    icon: OrbitIcon,
    name: 'Orbit',
    tagline: 'Personalized Learning Delivery',
    shortDesc: 'Adaptive trajectories for every learner. Real-time personalization that adjusts to competency and preference.',
    status: 'Expected 2026',
    accentColor: '#f59e0b',
    metrics: [{ value: '3x', label: 'Higher Completion' }, { value: '40%', label: 'Faster Competency' }],
  },
  {
    id: 'nebula',
    icon: Brain,
    name: 'Nebula',
    tagline: 'Intelligent Learning Assistant',
    shortDesc: 'Constant support in the cloud. A 24/7 AI tutor guiding learners through complexity with precision.',
    status: 'Expected 2027',
    accentColor: '#fbbf24',
    metrics: [{ value: '60%', label: 'Support Drop' }, { value: '2.5x', label: 'Retention' }],
  },
  {
    id: 'spectrum',
    icon: BarChart3,
    name: 'Spectrum',
    tagline: 'Advanced Learning Analytics',
    shortDesc: 'Strategic intelligence across the board. Predict outcomes and prove ROI with multi-dimensional analytics.',
    status: 'Expected 2027',
    accentColor: '#ef4444',
    metrics: [{ value: '250%', label: 'ROI Lift' }, { value: '85%', label: 'Forecast Accuracy' }],
  },
];

export default function HomePage() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const {
    getAnimationProps,
    getStaggerProps,
    revealVariants,
    getPerformanceStyles,
    scrollYProgress
  } = useOptimizedAnimations();

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <>
      <SkipToContent />

      {/* Hero Section */}
      <HeroSection role="banner">
        {/* Background Decorative Elements */}
        <FloatingBackgroundOrb size="600px" color="#06b6d4" x="-10%" y="-10%" delay={0} duration={30} />
        <FloatingBackgroundOrb size="400px" color="#7C69F5" x="70%" y="40%" delay={5} duration={25} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 15 } }}>
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2
                    }
                  }
                }}
              >
                <motion.div variants={revealVariants}>
                  <Chip
                    icon={<Sparkles size={16} />}
                    label="2026 Innovation Awards Finalist"
                    sx={{
                      mb: 4,
                      background: 'rgba(167, 218, 219, 0.1)',
                      color: '#a7dadb',
                      fontWeight: 700,
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(167, 218, 219, 0.2)',
                    }}
                  />
                </motion.div>

                <motion.div variants={revealVariants}>
                  <Typography
                    variant="h1"
                    sx={{
                      mb: 3,
                      fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                      color: '#fff',
                    }}
                  >
                    The Future of Learning,{' '}
                    <GradientText>Orchestrated.</GradientText>
                  </Typography>
                </motion.div>

                <motion.div variants={revealVariants}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 6,
                      color: '#b0c5c6',
                      lineHeight: 1.5,
                      fontSize: { xs: '1.2rem', md: '1.5rem' },
                      fontWeight: 500,
                      maxWidth: '650px',
                    }}
                  >
                    Solara is the world's first unified AI-native learning ecosystem. One intelligence, six modules, total transformation.
                  </Typography>
                </motion.div>

                <motion.div variants={revealVariants}>
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                    <MagneticButton
                      component={Link}
                      href="/polaris"
                      variant="contained"
                      endIcon={<ArrowRight size={20} />}
                      strength={0.2}
                    >
                      Explore Polaris
                    </MagneticButton>

                    <Button
                      variant="text"
                      sx={{
                        color: '#a7dadb',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        '&:hover': { background: 'rgba(167, 218, 219, 0.05)' }
                      }}
                    >
                      View the Roadmap
                    </Button>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Interactive Visual Hub */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div style={{ y: y1, rotate: rotate, position: 'relative' }}>
                <Box
                  sx={{
                    width: 450,
                    height: 450,
                    borderRadius: '50%',
                    border: '1px solid rgba(167, 218, 219, 0.2)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'radial-gradient(circle, rgba(167, 218, 219, 0.05) 0%, transparent 70%)',
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', inset: -20, borderRadius: '50%', border: '1px dashed rgba(167, 218, 219, 0.1)' }}
                  />

                  {/* Central Star */}
                  <motion.div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #a7dadb 0%, #7C69F5 100%)',
                      zIndex: 2,
                      animation: `${starGlow} 4s infinite ease-in-out`,
                      boxShadow: '0 0 50px rgba(124, 105, 245, 0.3)',
                    }}
                  />

                  {/* Modules in Orbit */}
                  {modules.map((m, i) => {
                    const angle = (i * 60) * (Math.PI / 180);
                    return (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        style={{
                          position: 'absolute',
                          left: `${225 + Math.cos(angle) * 180 - 30}px`,
                          top: `${225 + Math.sin(angle) * 180 - 30}px`,
                        }}
                      >
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '16px',
                            background: m.accentColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: `0 10px 20px ${m.accentColor}40`,
                            animation: `${float} ${5 + i}s infinite ease-in-out`,
                          }}
                        >
                          <m.icon size={28} color="#020C1B" />
                        </Box>
                      </motion.div>
                    );
                  })}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            translateX: '-50%',
            color: '#a7dadb',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.1em' }}>SCROLL</Typography>
          <ChevronDown size={20} />
        </motion.div>
      </HeroSection>

      {/* Modules Section */}
      <Box sx={{ py: 15, background: '#020C1B' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', marginBottom: 80 }}
          >
            <Typography variant="overline" sx={{ color: '#a7dadb', fontWeight: 900, letterSpacing: '0.2em' }}>
              THE CORE ECOSYSTEM
            </Typography>
            <Typography variant="h2" sx={{ color: '#fff', fontWeight: 900, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              Six Modules. One Vision.
            </Typography>
            <Typography variant="h6" sx={{ color: '#b0c5c6', maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
              A multi-dimensional approach to learning technology, powered by the industry's most advanced AI models.
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {modules.map((module, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={module.id}>
                <ModuleCard
                  accentColor={module.accentColor}
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                >
                  <IconContainer accentColor={module.accentColor}>
                    <module.icon size={40} color={module.accentColor} />
                  </IconContainer>

                  <Typography variant="h4" sx={{ color: '#fff', fontWeight: 900, mb: 1 }}>
                    {module.name}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: module.accentColor, fontWeight: 700, mb: 3, letterSpacing: '0.05em' }}>
                    {module.tagline.toUpperCase()}
                  </Typography>

                  <Typography variant="body1" sx={{ color: '#b0c5c6', mb: 4, lineHeight: 1.7, fontSize: '1.05rem' }}>
                    {module.shortDesc}
                  </Typography>

                  <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={module.status}
                      size="small"
                      sx={{
                        background: module.status === 'Live Now' ? `${module.accentColor}20` : 'rgba(255,255,255,0.05)',
                        color: module.status === 'Live Now' ? module.accentColor : '#7a8a8b',
                        fontWeight: 700,
                        border: `1px solid ${module.status === 'Live Now' ? module.accentColor + '40' : 'transparent'}`,
                      }}
                    />
                    <ArrowRight size={24} color={module.accentColor} />
                  </Box>
                </ModuleCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 15, background: 'linear-gradient(0deg, #020C1B 0%, #03142B 100%)', position: 'relative', overflow: 'hidden' }}>
        <FloatingBackgroundOrb size="500px" color="#7C69F5" x="80%" y="-10%" delay={2} duration={20} />

        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: 'spring' }}
          >
            <Star size={48} color="#a7dadb" style={{ marginBottom: 24 }} />
            <Typography variant="h2" sx={{ color: '#fff', fontWeight: 900, mb: 4, fontSize: { xs: '2.5rem', md: '4rem' } }}>
              Start Your Orbit.
            </Typography>
            <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 8, lineHeight: 1.6 }}>
              Join the elite organizations building the next generation of learning experiences with Solara.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticButton
                strength={0.1}
                component={Link}
                href="/polaris"
                variant="contained"
                sx={{ px: 6, py: 2.5, fontSize: '1.2rem' }}
              >
                Launch Polaris Now
              </MagneticButton>
              <Button
                variant="outlined"
                sx={{
                  px: 6,
                  py: 2.5,
                  fontSize: '1.2rem',
                  borderRadius: '16px',
                  borderColor: 'rgba(167, 218, 219, 0.3)',
                  color: '#a7dadb',
                  '&:hover': { borderColor: '#a7dadb', background: 'rgba(167, 218, 219, 0.05)' }
                }}
              >
                Talk to Sales
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
