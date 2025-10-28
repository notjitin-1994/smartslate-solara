'use client';

import { Box, Container, Typography, Button, Grid, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useState } from 'react';
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

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0% { opacity: 1; }
  25% { opacity: 0.85; }
  50% { opacity: 0.7; }
  75% { opacity: 0.85; }
  100% { opacity: 1; }
`;

const starGlow = keyframes`
  0% {
    box-shadow:
      0 0 20px rgba(167, 218, 219, 0.8),
      0 0 40px rgba(167, 218, 219, 0.6),
      0 0 60px rgba(167, 218, 219, 0.4),
      0 0 80px rgba(167, 218, 219, 0.3),
      0 0 100px rgba(167, 218, 219, 0.2);
    transform: scale(1);
  }
  25% {
    box-shadow:
      0 0 25px rgba(167, 218, 219, 0.9),
      0 0 50px rgba(167, 218, 219, 0.7),
      0 0 75px rgba(167, 218, 219, 0.5),
      0 0 100px rgba(167, 218, 219, 0.4),
      0 0 125px rgba(167, 218, 219, 0.3);
    transform: scale(1.02);
  }
  50% {
    box-shadow:
      0 0 30px rgba(167, 218, 219, 1),
      0 0 60px rgba(167, 218, 219, 0.8),
      0 0 90px rgba(167, 218, 219, 0.6),
      0 0 120px rgba(167, 218, 219, 0.4),
      0 0 150px rgba(167, 218, 219, 0.3);
    transform: scale(1.03);
  }
  75% {
    box-shadow:
      0 0 25px rgba(167, 218, 219, 0.9),
      0 0 50px rgba(167, 218, 219, 0.7),
      0 0 75px rgba(167, 218, 219, 0.5),
      0 0 100px rgba(167, 218, 219, 0.4),
      0 0 125px rgba(167, 218, 219, 0.3);
    transform: scale(1.02);
  }
  100% {
    box-shadow:
      0 0 20px rgba(167, 218, 219, 0.8),
      0 0 40px rgba(167, 218, 219, 0.6),
      0 0 60px rgba(167, 218, 219, 0.4),
      0 0 80px rgba(167, 218, 219, 0.3),
      0 0 100px rgba(167, 218, 219, 0.2);
    transform: scale(1);
  }
`;

const starRotate = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.05); }
  100% { transform: rotate(360deg) scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const flowToCenter = keyframes`
  0% {
    background-position: 100% 0%;
  }
  100% {
    background-position: 0% 0%;
  }
`;

// Styled Components
const HeroSection = styled(Box)(() => ({
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: '#020C1B',
}));

const BrandText = styled('span')(() => ({
  color: '#a7dadb',
  display: 'inline-block',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    right: 0,
    height: '3px',
    background: '#a7dadb',
    opacity: 0.5,
  },
}));

const PremiumButton = styled(Button)(() => ({
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '16px',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  background: '#a7dadb',
  color: '#020C1B',
  boxShadow: '0 10px 30px rgba(167, 218, 219, 0.3)',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    background: '#7bc5c7',
    boxShadow: '0 20px 40px rgba(167, 218, 219, 0.5)',
    '&::before': {
      left: '100%',
    },
  },
}));

const FloatingBadge = styled(Chip)(() => ({
  background: 'rgba(167, 218, 219, 0.15)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(167, 218, 219, 0.3)',
  color: '#a7dadb',
  fontWeight: 600,
  padding: '8px 4px',
  height: 'auto',
  fontSize: '0.875rem',
  '& .MuiChip-icon': {
    color: '#a7dadb',
  },
}));

const StatsCard = styled(motion.div)(() => ({
  textAlign: 'left',
  padding: '32px',
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(167, 218, 219, 0.1)',
  borderRadius: '24px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  height: '100%',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: '#a7dadb',
    opacity: 0.8,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(167, 218, 219, 0.15)',
    border: '1px solid rgba(167, 218, 219, 0.3)',
    '&::before': {
      opacity: 1,
    },
  },
}));

const ModuleCard = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<{ accentColor: string }>(({ accentColor }) => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(167, 218, 219, 0.1)',
  borderRadius: '24px',
  padding: '32px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: `${accentColor}`,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    border: `1px solid ${accentColor}50`,
    boxShadow: `0 25px 50px ${accentColor}20`,
    '&::before': {
      opacity: 0.8,
    },
  },
}));

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})<{ accentColor: string }>(({ accentColor }) => ({
  width: 64,
  height: 64,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `${accentColor}20`,
  border: `1px solid ${accentColor}30`,
  marginBottom: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    background: `${accentColor}30`,
    border: `1px solid ${accentColor}50`,
  },
}));

const FloatingOrb = styled(Box)(() => ({
  position: 'absolute',
  width: '300px',
  height: '300px',
  borderRadius: '50%',
  border: '2px solid rgba(167, 218, 219, 0.15)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '-2px',
    borderRadius: '50%',
    border: '2px solid rgba(167, 218, 219, 0.1)',
    animation: `${rotate} 20s linear infinite`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: '20px',
    borderRadius: '50%',
    border: '1px dashed rgba(167, 218, 219, 0.2)',
    animation: `${rotate} 15s linear infinite reverse`,
  },
}));

// Module data with expandable content
const modules = [
  {
    id: 'polaris',
    icon: Compass,
    name: 'Polaris',
    tagline: 'AI-Powered Learning Blueprint Generator',
    shortDesc: 'Transform 6 weeks of stakeholder meetings into 2-3 days with AI that understands instructional design.',
    status: 'Live Now',
    accentColor: '#06b6d4',
    metrics: [
      { value: '15x', label: 'Faster Requirements Gathering' },
      { value: '100%', label: 'Business Alignment' },
      { value: 'Zero', label: 'Revision Cycles' },
    ],
  },
  {
    id: 'constellation',
    icon: Network,
    name: 'Constellation',
    tagline: 'Content-to-Blueprint Automation',
    shortDesc: 'Unlock hidden learning potential in your existing content—automatically transform documents, videos, and presentations.',
    status: 'Expected 2025',
    accentColor: '#7C69F5',
    metrics: [
      { value: '80%', label: 'Time Reduction' },
      { value: '10x', label: 'Faster Inventory' },
      { value: '$500K+', label: 'Average Savings' },
    ],
  },
  {
    id: 'nova',
    icon: Sparkles,
    name: 'Nova',
    tagline: 'AI-Assisted Content Authoring',
    shortDesc: 'Generate pedagogically sound learning content in minutes with an AI co-author that understands learning science.',
    status: 'Expected 2026',
    accentColor: '#22c55e',
    metrics: [
      { value: '70%', label: 'Faster Development' },
      { value: '5x', label: 'Content per Designer' },
      { value: '90%', label: 'First-Draft Quality' },
    ],
  },
  {
    id: 'orbit',
    icon: OrbitIcon,
    name: 'Orbit',
    tagline: 'Personalized Learning Delivery',
    shortDesc: 'AI-powered learning experience platform that delivers personalized journeys adapted to each learner in real-time.',
    status: 'Expected 2026',
    accentColor: '#f59e0b',
    metrics: [
      { value: '3x', label: 'Higher Completion' },
      { value: '40%', label: 'Faster Competency' },
      { value: '85%', label: 'Fewer Support Tickets' },
    ],
  },
  {
    id: 'nebula',
    icon: Brain,
    name: 'Nebula',
    tagline: 'Intelligent Learning Assistant',
    shortDesc: '24/7 AI tutor providing personalized support, answering questions, and guiding learners through difficult concepts.',
    status: 'Expected 2027',
    accentColor: '#fbbf24',
    metrics: [
      { value: '60%', label: 'Support Reduction' },
      { value: '45%', label: 'Completion Increase' },
      { value: '2.5x', label: 'Knowledge Retention' },
    ],
  },
  {
    id: 'spectrum',
    icon: BarChart3,
    name: 'Spectrum',
    tagline: 'Advanced Learning Analytics',
    shortDesc: 'Transform learning data into strategic intelligence—predict outcomes, identify trends, prove ROI.',
    status: 'Expected 2027',
    accentColor: '#ef4444',
    metrics: [
      { value: '250%', label: 'ROI Improvement' },
      { value: '50%', label: 'Faster Optimization' },
      { value: '85%', label: 'Better Forecasting' },
    ],
  },
];

export default function HomePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [modulesRef, modulesInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  return (
    <>
      {/* Hero Section */}
      <HeroSection ref={heroRef}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 12 } }}>
          <Grid container spacing={6} alignItems="center">
            {/* Left Content */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <FloatingBadge
                  icon={<Sparkles size={16} />}
                  label="Solara Learning Engine | Powered by AI"
                  sx={{ mb: 3 }}
                />

                <Typography
                  variant="h1"
                  sx={{
                    mb: 3,
                    fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                    fontWeight: 900,
                    lineHeight: 1.1,
                    letterSpacing: '-0.02em',
                    color: '#e0e0e0',
                  }}
                >
                  Where AI Meets{' '}
                  <BrandText>
                    Learning Excellence
                  </BrandText>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    color: '#b0c5c6',
                    lineHeight: 1.5,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    fontWeight: 500,
                  }}
                >
                  Transform Your Entire Learning Lifecycle with Intelligence That Never Stops Innovating
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 5,
                    color: '#b0c5c6',
                    lineHeight: 1.7,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    maxWidth: '600px',
                  }}
                >
                  From blueprint to delivery, from engagement to analytics—Solara is the world's first AI-native learning platform that unifies every stage of your learning journey.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  <PremiumButton
                    component={Link}
                    href="/polaris"
                    variant="contained"
                    endIcon={<ArrowRight size={20} />}
                  >
                    Experience Polaris Now
                  </PremiumButton>

                  <Button
                    variant="outlined"
                    size="large"
                    endIcon={<Sparkles size={20} />}
                    sx={{
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '16px',
                      borderColor: '#a7dadb',
                      color: '#a7dadb',
                      borderWidth: 2,
                      textTransform: 'none',
                      '&:hover': {
                        borderWidth: 2,
                        backgroundColor: 'rgba(167, 218, 219, 0.1)',
                        borderColor: '#a7dadb',
                      },
                    }}
                  >
                    Explore All Modules
                  </Button>
                </Box>

                {/* Trust Indicators */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {[
                    'Trusted by 100,000+ learners',
                    'Serving 50+ countries',
                    'Enterprise-grade security',
                    'No credit card required'
                  ].map((text, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle2 size={16} color="#a7dadb" />
                      <Typography variant="caption" sx={{ color: '#7a8a8b', fontSize: '0.85rem' }}>
                        {text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Right Visual Element - Infographic */}
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'relative', height: '500px' }}>
                {/* Central Hub - Glowing Star */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  style={{
                    position: 'absolute',
                    top: '200px',
                    left: '200px',
                  }}
                >
                  {/* Outer Glow Layer */}
                  <Box
                    sx={{
                      width: 140,
                      height: 140,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(167, 218, 219, 0.5) 0%, rgba(167, 218, 219, 0.2) 40%, transparent 70%)',
                      position: 'absolute',
                      top: -20,
                      left: -20,
                      animation: `${pulse} 4s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                      filter: 'blur(20px)',
                    }}
                  />

                  {/* Main Star Container */}
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #a7dadb 0%, #7bc5c7 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 10,
                      animation: `${starGlow} 3s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: -15,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(167, 218, 219, 0.7) 0%, rgba(167, 218, 219, 0.3) 50%, transparent 70%)',
                        animation: `${pulse} 3s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
                        zIndex: -1,
                        filter: 'blur(8px)',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: -30,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(167, 218, 219, 0.5) 0%, rgba(167, 218, 219, 0.2) 50%, transparent 70%)',
                        animation: `${pulse} 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite 0.5s`,
                        zIndex: -2,
                        filter: 'blur(12px)',
                      },
                    }}
                  />
                </motion.div>

                {/* Orbital Ring */}
                <motion.div
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={heroInView ? { opacity: 1, rotate: 0 } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                  style={{
                    position: 'absolute',
                    top: '80px',
                    left: '80px',
                  }}
                >
                  <Box
                    sx={{
                      width: 340,
                      height: 340,
                      borderRadius: '50%',
                      border: '2px dashed #a7dadb',
                      animation: `${rotate} 60s linear infinite`,
                    }}
                  />
                </motion.div>

                {/* Module Icons in Circular Pattern */}
                {modules.map((module, index) => {
                  const Icon = module.icon;
                  const angle = (index * 60 - 90) * (Math.PI / 180); // 60 degrees apart, starting from top
                  const radius = 170;
                  const centerX = 250; // Half of container width (500/2)
                  const centerY = 250; // Half of container height (500/2)
                  const iconSize = 70;
                  const x = centerX + Math.cos(angle) * radius - iconSize / 2;
                  const y = centerY + Math.sin(angle) * radius - iconSize / 2;

                  return (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      style={{
                        position: 'absolute',
                        top: `${y}px`,
                        left: `${x}px`,
                      }}
                    >
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: '16px',
                          background: module.accentColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          boxShadow: `0 4px 12px ${module.accentColor}40`,
                          '&:hover': {
                            transform: 'scale(1.15)',
                            boxShadow: `0 10px 30px ${module.accentColor}60`,
                          },
                        }}
                      >
                        <Icon size={32} color="#020C1B" />

                        {/* Connecting Line to Center */}
                        <Box
                          sx={{
                            position: 'absolute',
                            width: `${radius - 35}px`,
                            height: '2px',
                            top: '50%',
                            left: '50%',
                            transformOrigin: 'left center',
                            transform: `rotate(${angle * (180 / Math.PI) + 180}deg)`,
                            pointerEvents: 'none',
                            zIndex: -1,
                            background: `linear-gradient(
                              90deg,
                              ${module.accentColor}00 0%,
                              ${module.accentColor} 3%,
                              ${module.accentColor} 8%,
                              ${module.accentColor}00 11%,
                              ${module.accentColor}00 15%,
                              ${module.accentColor} 18%,
                              ${module.accentColor} 28%,
                              ${module.accentColor}00 31%,
                              ${module.accentColor}00 37%,
                              ${module.accentColor} 40%,
                              ${module.accentColor} 45%,
                              ${module.accentColor}00 48%,
                              ${module.accentColor}00 55%,
                              ${module.accentColor} 58%,
                              ${module.accentColor} 68%,
                              ${module.accentColor}00 71%,
                              ${module.accentColor}00 76%,
                              ${module.accentColor} 79%,
                              ${module.accentColor} 84%,
                              ${module.accentColor}00 87%,
                              ${module.accentColor}00 100%
                            )`,
                            backgroundSize: '200% 100%',
                            filter: `drop-shadow(0 0 6px ${module.accentColor}CC) drop-shadow(0 0 10px ${module.accentColor}66)`,
                            animation: `${flowToCenter} 10s ease-in-out infinite`,
                            willChange: 'background-position',
                            opacity: 0.9,
                          }}
                        />

                        {/* Module Label */}
                        <Box
                          sx={{
                            position: 'absolute',
                            ...(module.id === 'polaris'
                              ? { top: '-24px' }
                              : { bottom: '-24px' }),
                            left: '50%',
                            transform: 'translateX(-50%)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              color: module.accentColor,
                              fontWeight: 700,
                              fontSize: '0.7rem',
                              textAlign: 'center',
                            }}
                          >
                            {module.name}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  );
                })}

              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Box ref={statsRef} sx={{ py: 10, backgroundColor: '#020C1B', borderTop: '1px solid rgba(167, 218, 219, 0.1)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="stretch">
            {/* Stats Header */}
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={statsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5 }}
                style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: '#a7dadb',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    display: 'block',
                    mb: 1,
                  }}
                >
                  PROVEN RESULTS
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#e0e0e0', mb: 2 }}>
                  Impact at Scale
                </Typography>
                <Typography variant="body1" sx={{ color: '#b0c5c6', lineHeight: 1.7 }}>
                  Real metrics from organizations transforming their learning operations with Solara.
                </Typography>
              </motion.div>
            </Grid>

            {/* Stats Grid */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={3}>
                {[
                  { icon: Zap, value: '15x', label: 'Faster Requirements Gathering', color: '#a7dadb' },
                  { icon: TrendingUp, value: '85%', label: 'Reduction in Development Time', color: '#7C69F5' },
                  { icon: Target, value: '3x', label: 'Higher Completion Rates', color: '#22c55e' },
                ].map((stat, index) => (
                  <Grid size={{ xs: 12, sm: 4 }} key={index}>
                    <StatsCard
                      initial={{ opacity: 0, y: 20 }}
                      animate={statsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Box sx={{ color: stat.color, mb: 2 }}>
                        <stat.icon size={32} />
                      </Box>
                      <Typography
                        variant="h2"
                        sx={{
                          color: stat.color,
                          fontWeight: 900,
                          fontSize: '2.5rem',
                          mb: 1,
                          lineHeight: 1,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#b0c5c6', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {stat.label}
                      </Typography>
                    </StatsCard>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Modules Section */}
      <Box ref={modulesRef} sx={{ py: 10, backgroundColor: '#020C1B' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={modulesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: '#a7dadb',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              COMPLETE AI ECOSYSTEM
            </Typography>
            <Grid container spacing={4} alignItems="flex-end" sx={{ mb: 6 }}>
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '2rem', md: '2.75rem' },
                    color: '#e0e0e0',
                    mb: 2,
                  }}
                >
                  Six Modules. Infinite Possibilities.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#b0c5c6',
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                  }}
                >
                  Each module engineered for excellence at every stage of your learning journey. Click any card to explore in detail.
                </Typography>
              </Grid>
            </Grid>
          </motion.div>

          {/* Modules Grid - Uniform Layout */}
          <Grid container spacing={3}>
            {modules.map((module, index) => {
              const Icon = module.icon;
              const isExpanded = expandedModule === module.id;

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={module.id}>
                  <ModuleCard
                    accentColor={module.accentColor}
                    initial={{ opacity: 0, y: 30 }}
                    animate={modulesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                  >
                    {module.status && (
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.5,
                            px: 1.25,
                            py: 0.5,
                            borderRadius: '12px',
                            fontSize: '0.625rem',
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                            position: 'relative',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            ...(module.status.includes('Live')
                              ? {
                                  background: `linear-gradient(135deg, ${module.accentColor}25, ${module.accentColor}15)`,
                                  border: `1.5px solid ${module.accentColor}`,
                                  color: module.accentColor,
                                  boxShadow: `0 0 20px ${module.accentColor}40`,
                                  animation: `${pulse} 2.5s ease-in-out infinite`,
                                  '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: 0,
                                    left: '-100%',
                                    width: '100%',
                                    height: '100%',
                                    background: `linear-gradient(90deg, transparent, ${module.accentColor}30, transparent)`,
                                    animation: `${shimmer} 3s ease-in-out infinite`,
                                  },
                                }
                              : {
                                  background: 'rgba(255, 255, 255, 0.03)',
                                  border: '1px solid rgba(255, 255, 255, 0.1)',
                                  color: '#9ca3af',
                                  backdropFilter: 'blur(10px)',
                                }),
                          }}
                        >
                          {module.status.includes('Live') ? (
                            <CheckCircle2 size={10} />
                          ) : (
                            <Box
                              sx={{
                                width: 5,
                                height: 5,
                                borderRadius: '50%',
                                bgcolor: '#9ca3af',
                              }}
                            />
                          )}
                          {module.status}
                        </Box>
                      </Box>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                      <IconWrapper accentColor={module.accentColor}>
                        <Icon size={28} color={module.accentColor} />
                      </IconWrapper>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: module.accentColor,
                            fontWeight: 800,
                            fontSize: '1.5rem',
                            mb: 0.5,
                          }}
                        >
                          {module.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#7a8a8b',
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                          }}
                        >
                          {module.tagline}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: '#b0c5c6',
                        lineHeight: 1.6,
                        mb: 3,
                        fontSize: '0.9rem',
                      }}
                    >
                      {module.shortDesc}
                    </Typography>

                    {/* Metrics */}
                    <Grid container spacing={1.5} sx={{ mb: 2 }}>
                      {module.metrics.map((metric, idx) => (
                        <Grid size={{ xs: 12 }} key={idx}>
                          <Box
                            sx={{
                              p: 1.5,
                              borderRadius: '12px',
                              background: 'rgba(13, 27, 42, 0.6)',
                              border: '1px solid rgba(167, 218, 219, 0.08)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                color: module.accentColor,
                                fontWeight: 800,
                                fontSize: '1.1rem',
                              }}
                            >
                              {metric.value}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: '#7a8a8b',
                                fontSize: '0.7rem',
                                textAlign: 'right',
                              }}
                            >
                              {metric.label}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Expand/Collapse */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: module.accentColor,
                        mt: 'auto',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.85rem' }}>
                        {isExpanded ? 'Show Less' : 'Learn More'}
                      </Typography>
                      <ChevronDown
                        size={16}
                        style={{
                          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </Box>

                    {/* Expanded Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <Box
                            sx={{
                              mt: 2,
                              pt: 2,
                              borderTop: `1px solid ${module.accentColor}20`,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#b0c5c6',
                                lineHeight: 1.6,
                                mb: 2,
                                fontSize: '0.85rem',
                              }}
                            >
                              {module.status.includes('Live')
                                ? 'Polaris is live and transforming how teams approach learning design. Start your free trial today.'
                                : `Coming soon. Click below to explore ${module.name}.`}
                            </Typography>
                            <Button
                              component={Link}
                              href={`/${module.id}`}
                              variant="contained"
                              size="small"
                              endIcon={<ArrowRight size={14} />}
                              sx={{
                                background: module.accentColor,
                                color: '#020C1B',
                                fontWeight: 700,
                                textTransform: 'none',
                                fontSize: '0.85rem',
                                '&:hover': {
                                  opacity: 0.9,
                                  transform: 'translateY(-2px)',
                                },
                              }}
                            >
                              Explore {module.name}
                            </Button>
                          </Box>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </ModuleCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box
        sx={{
          py: 10,
          background: '#020C1B',
          borderTop: '1px solid rgba(167, 218, 219, 0.15)',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Star size={32} color="#a7dadb" />
                  <Typography
                    variant="overline"
                    sx={{
                      color: '#a7dadb',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                    }}
                  >
                    GET STARTED TODAY
                  </Typography>
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    mb: 2,
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    color: '#e0e0e0',
                  }}
                >
                  Ready to Transform Learning?
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#b0c5c6',
                    mb: 4,
                    fontSize: '1.1rem',
                    lineHeight: 1.7,
                    maxWidth: '600px',
                  }}
                >
                  Start with Polaris. Transform months into days. Join thousands of learning professionals already revolutionizing their workflows.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <PremiumButton
                    component={Link}
                    href="/polaris"
                    variant="contained"
                    startIcon={<Target size={20} />}
                  >
                    Start Free Trial
                  </PremiumButton>

                  <Button
                    component="a"
                    href="https://smartslate.io/contact"
                    variant="outlined"
                    size="large"
                    startIcon={<TrendingUp size={20} />}
                    sx={{
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '16px',
                      borderColor: '#a7dadb',
                      color: '#a7dadb',
                      borderWidth: 2,
                      textTransform: 'none',
                      '&:hover': {
                        borderWidth: 2,
                        backgroundColor: 'rgba(167, 218, 219, 0.1)',
                      },
                    }}
                  >
                    Schedule Demo
                  </Button>
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    color: '#7a8a8b',
                    mt: 3,
                    display: 'block',
                    fontSize: '0.85rem',
                  }}
                >
                  No credit card required • 14-day trial • Cancel anytime
                </Typography>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: '24px',
                    background: 'rgba(13, 27, 42, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(167, 218, 219, 0.2)',
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#a7dadb', fontWeight: 700, mb: 2 }}>
                    What You Get:
                  </Typography>
                  {[
                    'Full access to Polaris',
                    'Unlimited blueprint generation',
                    'All AI-powered features',
                    'Priority email support',
                    'No commitment required'
                  ].map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <CheckCircle2 size={20} color="#a7dadb" />
                      <Typography variant="body2" sx={{ color: '#b0c5c6' }}>
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
