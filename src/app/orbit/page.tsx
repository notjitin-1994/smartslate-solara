'use client';

import { Box, Container, Typography, Button, Grid, Chip, Card, CardContent, LinearProgress } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  Orbit as OrbitIcon,
  ArrowRight,
  Zap,
  Target,
  CheckCircle2,
  Clock,
  Users,
  Shield,
  Brain,
  Eye,
  GitBranch,
  Layers,
  Sparkles,
  BarChart3,
  Calendar,
  AlertTriangle,
  PersonStanding,
  BookOpen,
  Award,
  TrendingUp,
  UserCheck,
  Lightbulb,
  PlayCircle,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Lock,
  Settings,
  RefreshCw,
  Star,
  Rocket,
} from 'lucide-react';

// Orbit Brand Colors - Warm Orange/Amber Palette
const orbitColors = {
  primary: '#f59e0b',
  light: '#fbbf24',
  lighter: '#fcd34d',
  lightest: '#fde68a',
  dark: '#d97706',
  darker: '#b45309',
  darkest: '#92400e',
};

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const orbitRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const orbitGlow = keyframes`
  0% {
    box-shadow:
      0 0 20px rgba(245, 158, 11, 0.8),
      0 0 40px rgba(245, 158, 11, 0.6),
      0 0 60px rgba(245, 158, 11, 0.4),
      0 0 80px rgba(245, 158, 11, 0.3),
      0 0 100px rgba(245, 158, 11, 0.2);
    transform: scale(1);
  }
  50% {
    box-shadow:
      0 0 30px rgba(245, 158, 11, 1),
      0 0 60px rgba(245, 158, 11, 0.8),
      0 0 90px rgba(245, 158, 11, 0.6),
      0 0 120px rgba(245, 158, 11, 0.4),
      0 0 150px rgba(245, 158, 11, 0.3);
    transform: scale(1.03);
  }
  100% {
    box-shadow:
      0 0 20px rgba(245, 158, 11, 0.8),
      0 0 40px rgba(245, 158, 11, 0.6),
      0 0 60px rgba(245, 158, 11, 0.4),
      0 0 80px rgba(245, 158, 11, 0.3),
      0 0 100px rgba(245, 158, 11, 0.2);
    transform: scale(1);
  }
`;

const learnerFlow = keyframes`
  0% {
    transform: translateX(0) translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(100px) translateY(-50px);
    opacity: 0;
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

const OrbitButton = styled(Button)(() => ({
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '16px',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  background: orbitColors.primary,
  color: '#020C1B',
  boxShadow: `0 10px 30px ${orbitColors.primary}50`,
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
    background: orbitColors.light,
    boxShadow: `0 20px 40px ${orbitColors.primary}70`,
    '&::before': {
      left: '100%',
    },
  },
}));

const SecondaryButton = styled(Button)(() => ({
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '16px',
  textTransform: 'none',
  borderColor: orbitColors.primary,
  color: orbitColors.primary,
  borderWidth: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderWidth: 2,
    backgroundColor: `${orbitColors.primary}20`,
    borderColor: orbitColors.light,
    transform: 'translateY(-2px)',
  },
}));

const StatCard = styled(motion.div)(() => ({
  textAlign: 'center',
  padding: '32px',
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${orbitColors.primary}20`,
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
    background: orbitColors.primary,
    opacity: 0.8,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 40px ${orbitColors.primary}30`,
    border: `1px solid ${orbitColors.primary}50`,
    '&::before': {
      opacity: 1,
    },
  },
}));

const FeatureCard = styled(motion.div)(() => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${orbitColors.primary}20`,
  borderRadius: '24px',
  padding: '32px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
    background: orbitColors.primary,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    border: `1px solid ${orbitColors.primary}50`,
    boxShadow: `0 25px 50px ${orbitColors.primary}30`,
    '&::before': {
      opacity: 0.8,
    },
  },
}));

const IconWrapper = styled(Box)(() => ({
  width: 64,
  height: 64,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `${orbitColors.primary}20`,
  border: `1px solid ${orbitColors.primary}30`,
  marginBottom: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
    background: `${orbitColors.primary}30`,
    border: `1px solid ${orbitColors.primary}50`,
  },
}));

const BrandText = styled('span')(() => ({
  color: orbitColors.primary,
  display: 'inline-block',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    right: 0,
    height: '3px',
    background: orbitColors.primary,
    opacity: 0.5,
  },
}));

const FloatingBadge = styled(Chip)(() => ({
  background: `${orbitColors.primary}20`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${orbitColors.primary}40`,
  color: orbitColors.light,
  fontWeight: 600,
  padding: '8px 4px',
  height: 'auto',
  fontSize: '0.875rem',
  '& .MuiChip-icon': {
    color: orbitColors.light,
  },
}));

const LearnerAvatar = styled(motion.div)<{ color: string; delay: number }>(({ color, delay }) => ({
  position: 'absolute',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  background: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 4px 12px ${color}60`,
  animation: `${learnerFlow} 8s ease-in-out infinite`,
  animationDelay: `${delay}s`,
}));

const OrbitRing = styled(Box)<{ radius: number; rotationSpeed: number }>(({ radius, rotationSpeed }) => ({
  position: 'absolute',
  width: `${radius * 2}px`,
  height: `${radius * 2}px`,
  borderRadius: '50%',
  border: '2px dashed rgba(245, 158, 11, 0.3)',
  animation: `${orbitRotate} ${rotationSpeed}s linear infinite`,
}));

export default function OrbitPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [problemRef, problemInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [personalizationRef, personalizationInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Stats data
  const stats = [
    { icon: TrendingUp, value: '3x', label: 'Higher Completion Rates' },
    { icon: Zap, value: '40%', label: 'Faster Time to Competency' },
    { icon: Users, value: '85%', label: 'Fewer Support Tickets' },
    { icon: Target, value: '100%', label: 'Personalized Learning Paths' },
  ];

  // Features data
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Personalization Engine',
      description: 'Advanced machine learning algorithms analyze learner behavior, preferences, and performance to create truly personalized learning journeys that adapt in real-time.',
      highlights: ['Collaborative filtering recommendations', 'Behavioral pattern analysis', 'Competency-based progression', 'Adaptive content sequencing'],
    },
    {
      icon: GitBranch,
      title: 'Adaptive Learning Paths',
      description: 'Dynamic learning journeys that branch and adapt based on learner performance, ensuring each individual follows their optimal path to mastery.',
      highlights: ['Multi-path scenario navigation', 'Performance-based routing', 'Prerequisite validation', 'Skill gap remediation'],
    },
    {
      icon: Eye,
      title: 'Intelligent Content Delivery',
      description: 'Smart content delivery system that presents the right content, in the right format, at the right time for maximum learning effectiveness.',
      highlights: ['Multi-format content support', 'Context-aware delivery', 'Engagement optimization', 'Accessibility-first design'],
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics & Insights',
      description: 'Comprehensive analytics dashboard that provides deep insights into learning effectiveness, engagement patterns, and ROI measurements.',
      highlights: ['Real-time progress tracking', 'Predictive analytics', 'Competency mapping', 'Business impact correlation'],
    },
    {
      icon: Users,
      title: 'Social Learning Features',
      description: 'Integrated social learning capabilities that foster collaboration, knowledge sharing, and community-driven learning experiences.',
      highlights: ['Peer learning networks', 'Collaborative projects', 'Discussion forums', 'Expert connections'],
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: 'Robust security infrastructure ensuring data privacy, compliance, and protection for all learner information and organizational content.',
      highlights: ['SOC 2 & GDPR compliant', 'End-to-end encryption', 'Role-based access control', 'Data residency options'],
    },
  ];

  // Personalization features
  const personalizationFeatures = [
    {
      icon: PersonStanding,
      title: 'Individual Learning Styles',
      description: 'Visual, auditory, kinesthetic, and reading/writing preferences automatically detected and accommodated.',
    },
    {
      icon: Clock,
      title: 'Optimal Learning Times',
      description: 'AI identifies when each learner is most receptive and schedules content accordingly.',
    },
    {
      icon: Target,
      title: 'Adaptive Difficulty',
      description: 'Content complexity adjusts based on real-time performance and confidence levels.',
    },
    {
      icon: Lightbulb,
      title: 'Interest-Based Content',
      description: 'Learning material incorporates individual interests and career aspirations for higher engagement.',
    },
  ];

  // Device support
  const deviceSupport = [
    { icon: Smartphone, label: 'Mobile Apps', description: 'Native iOS and Android apps' },
    { icon: Tablet, label: 'Tablet Optimized', description: 'Perfect tablet experience' },
    { icon: Monitor, label: 'Desktop Web', description: 'Full-featured web application' },
    { icon: Globe, label: 'Global Access', description: 'Available worldwide, 24/7' },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection ref={heroRef}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 12 } }}>
          <Grid container spacing={6} alignItems="center">
            {/* Left Content */}
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <FloatingBadge
                  icon={<OrbitIcon size={16} />}
                  label="Orbit by Solara | Coming Soon | AI-Powered Learning Experience Platform"
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
                  Learning That <BrandText>Adapts to You</BrandText>
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
                  Next-Generation Personalized Learning Delivery
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    color: '#b0c5c6',
                    lineHeight: 1.7,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    maxWidth: '600px',
                  }}
                >
                  Experience learning that understands you. Orbit combines AI-powered personalization with enterprise-grade structure, delivering learning journeys that adapt to each individual in real-time.
                </Typography>

                <Box
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    background: `${orbitColors.primary}10`,
                    border: `2px solid ${orbitColors.primary}40`,
                    mb: 4,
                    maxWidth: '600px',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: orbitColors.light,
                      fontWeight: 700,
                      mb: 1,
                      fontSize: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Rocket size={24} color={orbitColors.primary} />
                    Currently in Development
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#b0c5c6',
                      lineHeight: 1.6,
                      fontSize: '0.95rem',
                    }}
                  >
                    Orbit is currently under active development with expected launch in 2026. Be among the first to experience the future of personalized learning by reaching out to our team today.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  <OrbitButton
                    component="a"
                    href="https://www.smartslate.io/contact"
                    variant="contained"
                    endIcon={<Rocket size={20} />}
                  >
                    Reach out to know more
                  </OrbitButton>
                </Box>

                {/* Trust Indicators */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {[
                    'Expected 2026',
                    '3x higher completion',
                    '40% faster competency',
                    'AI-first platform',
                  ].map((text, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle2 size={16} color={orbitColors.primary} />
                      <Typography variant="caption" sx={{ color: '#7a8a8b', fontSize: '0.85rem' }}>
                        {text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Right Visual Element - Orbit Animation */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Central Learner Hub */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${orbitColors.primary} 0%, ${orbitColors.dark} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 10,
                      boxShadow: `0 0 60px ${orbitColors.primary}80, 0 0 100px ${orbitColors.primary}50`,
                      animation: `${orbitGlow} 3s ease-in-out infinite`,
                    }}
                  >
                    <PersonStanding size={50} color="#020C1B" strokeWidth={2.5} />
                  </Box>
                </motion.div>

                {/* Orbit Rings */}
                <OrbitRing radius={100} rotationSpeed={15} />
                <OrbitRing radius={160} rotationSpeed={25} />
                <OrbitRing radius={220} rotationSpeed={35} />

                {/* Learning Nodes on Orbits */}
                {[
                  { icon: BookOpen, angle: 0, radius: 100, color: '#22c55e' },
                  { icon: Award, angle: 72, radius: 100, color: '#3b82f6' },
                  { icon: PlayCircle, angle: 144, radius: 100, color: '#ef4444' },
                  { icon: Users, angle: 216, radius: 100, color: '#8b5cf6' },
                  { icon: Brain, angle: 288, radius: 100, color: '#ec4899' },
                  { icon: Target, angle: 36, radius: 160, color: '#14b8a6' },
                  { icon: TrendingUp, angle: 108, radius: 160, color: '#f97316' },
                  { icon: Lightbulb, angle: 180, radius: 160, color: '#84cc16' },
                  { icon: GitBranch, angle: 252, radius: 160, color: '#06b6d4' },
                  { icon: BarChart3, angle: 324, radius: 160, color: '#6366f1' },
                ].map((node, index) => {
                  const Icon = node.icon;
                  const angleRad = (node.angle - 90) * (Math.PI / 180);
                  const centerX = 250;
                  const centerY = 250;
                  const nodeSize = 50;
                  const x = centerX + Math.cos(angleRad) * node.radius - nodeSize / 2;
                  const y = centerY + Math.sin(angleRad) * node.radius - nodeSize / 2;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                      style={{
                        position: 'absolute',
                        top: `${y}px`,
                        left: `${x}px`,
                        transformOrigin: `${250 - x}px ${250 - y}px`,
                        animation: `${orbitRotate} ${20 + index * 2}s linear infinite`,
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '12px',
                          background: node.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          boxShadow: `0 4px 12px ${node.color}60`,
                          '&:hover': {
                            transform: 'scale(1.15)',
                            boxShadow: `0 10px 30px ${node.color}80`,
                          },
                        }}
                      >
                        <Icon size={24} color="#020C1B" />
                      </Box>
                    </motion.div>
                  );
                })}

                {/* Floating Learner Avatars */}
                {[
                  { color: '#22c55e', delay: 0 },
                  { color: '#3b82f6', delay: 2 },
                  { color: '#ef4444', delay: 4 },
                  { color: '#8b5cf6', delay: 6 },
                ].map((learner, index) => (
                  <LearnerAvatar
                    key={index}
                    color={learner.color}
                    delay={learner.delay}
                    style={{
                      top: '80%',
                      left: '10%',
                    }}
                  >
                    <PersonStanding size={20} color="#020C1B" />
                  </LearnerAvatar>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Box ref={statsRef} sx={{ py: 10, backgroundColor: '#020C1B', borderTop: `1px solid ${orbitColors.primary}20` }} role="region" aria-labelledby="stats-heading">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: orbitColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                display: 'block',
                mb: 2,
              }}
              id="stats-heading"
            >
              PERSONALIZATION IMPACT
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#e0e0e0', mb: 2 }}>
              The Orbit Advantage
            </Typography>
            <Typography variant="body1" sx={{ color: '#b0c5c6', mb: 6, maxWidth: '700px', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Real-world impact metrics from organizations using AI-powered personalized learning platforms.
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <StatCard
                    initial={{ opacity: 0, y: 30 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box sx={{ color: orbitColors.primary, mb: 2 }}>
                      <Icon size={40} />
                    </Box>
                    <Typography
                      variant="h2"
                      sx={{
                        color: orbitColors.light,
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
                  </StatCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Problem/Solution Section */}
      <Box ref={problemRef} sx={{ py: 10, backgroundColor: '#020C1B' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: orbitColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              THE LEARNING CRISIS
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: '#e0e0e0',
                mb: 6,
              }}
            >
              One Size Fits None
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {/* The Problem */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={problemInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: '24px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    height: '100%',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <AlertTriangle size={32} color="#ef4444" />
                    <Typography variant="h5" sx={{ color: '#ef4444', fontWeight: 700 }}>
                      Traditional LMS Limitations
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                      'Same content, same sequence, same pace for everyone',
                      '3-6% completion rates across corporate learning',
                      'One-size-fits-all approach kills engagement',
                      'No adaptation to individual learning styles',
                      'Skills don\'t transfer to real-world performance',
                      'Learners frustrated by irrelevant content',
                    ].map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: '#ef4444',
                            mt: 1,
                            flexShrink: 0,
                          }}
                        />
                        <Typography variant="body1" sx={{ color: '#b0c5c6', lineHeight: 1.6 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            {/* The Solution */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={problemInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: '24px',
                    background: `${orbitColors.primary}10`,
                    border: `1px solid ${orbitColors.primary}40`,
                    height: '100%',
                    boxShadow: `0 10px 30px ${orbitColors.primary}20`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Sparkles size={32} color={orbitColors.primary} />
                    <Typography variant="h5" sx={{ color: orbitColors.primary, fontWeight: 700 }}>
                      The Orbit Revolution
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                      'Every learner gets a unique, personalized journey',
                      'AI adapts content, pace, and format in real-time',
                      'Learning paths branch based on performance and goals',
                      'Content matches individual learning styles and preferences',
                      'Skills transfer through contextual, relevant learning',
                      'Learners engaged by content that speaks to them',
                    ].map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <CheckCircle2 size={20} color={orbitColors.primary} style={{ flexShrink: 0 }} />
                        <Typography variant="body1" sx={{ color: '#b0c5c6', lineHeight: 1.6 }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Personalization Section */}
      <Box id="orbit-personalization" ref={personalizationRef} sx={{ py: 10, backgroundColor: '#020C1B', borderTop: `1px solid ${orbitColors.primary}20` }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={personalizationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: orbitColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              AI-POWERED ADAPTATION
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: '#e0e0e0',
                mb: 2,
              }}
            >
              Learning That Understands You
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#b0c5c6',
                mb: 6,
                maxWidth: '700px',
                fontSize: '1.1rem',
                lineHeight: 1.7,
              }}
            >
              Orbit's AI engine continuously learns from each interaction, creating deeply personal learning experiences that evolve with the learner.
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {personalizationFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={personalizationInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: '20px',
                        background: 'rgba(13, 27, 42, 0.4)',
                        border: `1px solid ${orbitColors.primary}20`,
                        transition: 'all 0.3s ease',
                        height: '100%',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          border: `1px solid ${orbitColors.primary}40`,
                          boxShadow: `0 20px 40px ${orbitColors.primary}20`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `${orbitColors.primary}20`,
                          border: `1px solid ${orbitColors.primary}30`,
                          mb: 2,
                        }}
                      >
                        <Icon size={28} color={orbitColors.primary} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: orbitColors.light,
                          fontWeight: 700,
                          mb: 1,
                          fontSize: '1.1rem',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#b0c5c6',
                          lineHeight: 1.6,
                          fontSize: '0.9rem',
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box ref={featuresRef} sx={{ py: 10, backgroundColor: '#020C1B', borderTop: `1px solid ${orbitColors.primary}20` }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: orbitColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              COMPREHENSIVE PLATFORM
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: '#e0e0e0',
                mb: 2,
              }}
            >
              Everything Needed for Personalized Learning
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#b0c5c6',
                mb: 6,
                maxWidth: '700px',
                fontSize: '1.1rem',
                lineHeight: 1.7,
              }}
            >
              From AI-powered personalization to enterprise-grade security, Orbit delivers a complete learning experience platform.
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
                  <FeatureCard
                    initial={{ opacity: 0, y: 30 }}
                    animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <IconWrapper>
                      <Icon size={32} color={orbitColors.primary} />
                    </IconWrapper>
                    <Typography
                      variant="h6"
                      sx={{
                        color: orbitColors.light,
                        fontWeight: 700,
                        mb: 2,
                        fontSize: '1.25rem',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#b0c5c6',
                        lineHeight: 1.6,
                        mb: 3,
                        fontSize: '0.95rem',
                      }}
                    >
                      {feature.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 'auto' }}>
                      {feature.highlights.map((highlight, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                          <CheckCircle2 size={16} color={orbitColors.primary} style={{ flexShrink: 0, marginTop: 2 }} />
                          <Typography variant="caption" sx={{ color: '#7a8a8b', fontSize: '0.85rem' }}>
                            {highlight}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </FeatureCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Device Support Section */}
      <Box sx={{ py: 10, backgroundColor: '#020C1B', borderTop: `1px solid ${orbitColors.primary}20` }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="overline"
              sx={{
                color: orbitColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              UNIVERSAL ACCESS
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: '#e0e0e0',
                mb: 6,
              }}
            >
              Learn Anywhere, Anytime
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {deviceSupport.map((device, index) => {
              const Icon = device.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: '20px',
                        background: 'rgba(13, 27, 42, 0.4)',
                        border: `1px solid ${orbitColors.primary}20`,
                        transition: 'all 0.3s ease',
                        height: '100%',
                        textAlign: 'center',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          border: `1px solid ${orbitColors.primary}40`,
                          boxShadow: `0 20px 40px ${orbitColors.primary}20`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `${orbitColors.primary}20`,
                          border: `1px solid ${orbitColors.primary}30`,
                          mb: 2,
                          mx: 'auto',
                        }}
                      >
                        <Icon size={32} color={orbitColors.primary} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: orbitColors.light,
                          fontWeight: 700,
                          mb: 1,
                          fontSize: '1.1rem',
                        }}
                      >
                        {device.label}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#b0c5c6',
                          lineHeight: 1.6,
                          fontSize: '0.9rem',
                        }}
                      >
                        {device.description}
                      </Typography>
                    </Box>
                  </motion.div>
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
          borderTop: `1px solid ${orbitColors.primary}30`,
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
                  <Rocket size={32} color={orbitColors.primary} />
                  <Typography
                    variant="overline"
                    sx={{
                      color: orbitColors.primary,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                    }}
                  >
                    SHAPE THE FUTURE
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
                  Ready to Transform Learning Delivery?
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
                  Orbit is currently in development with expected launch in 2026. Reach out to our team to learn more about this revolutionary AI-powered learning platform and be among the first to know when it becomes available.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <OrbitButton
                    component="a"
                    href="https://www.smartslate.io/contact"
                    variant="contained"
                    startIcon={<Star size={20} />}
                  >
                    Reach out to know more
                  </OrbitButton>
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
                  Expected 2026 • AI-powered personalization • Enterprise-ready platform
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
                    border: `1px solid ${orbitColors.primary}40`,
                    boxShadow: `0 10px 30px ${orbitColors.primary}30`,
                  }}
                >
                  <Typography variant="h6" sx={{ color: orbitColors.light, fontWeight: 700, mb: 2 }}>
                    Why Reach Out Now?
                  </Typography>
                  {[
                    'Get development updates and exclusive insights',
                    'Influence platform features with your feedback',
                    'Secure early-adopter advantages when available',
                    'Direct access to our product team',
                    'Be first to know about beta opportunities',
                    'Shape the future of personalized learning',
                  ].map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Star size={20} color={orbitColors.primary} />
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
