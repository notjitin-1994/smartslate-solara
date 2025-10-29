'use client';

import { Box, Container, Typography, Button, Grid, Chip, Card, CardContent } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  Network,
  ArrowRight,
  Zap,
  Target,
  CheckCircle2,
  Clock,
  FileText,
  Upload,
  Brain,
  Eye,
  GitBranch,
  Rocket,
  Layers,
  Sparkles,
  BarChart3,
  Calendar,
  AlertTriangle,
  Folder,
  Video,
  Image,
  File,
  Link as LinkIcon,
  Download,
  Shield,
  Users,
  TrendingUp,
} from 'lucide-react';

// Constellation Brand Colors - Purple Palette
const constellationColors = {
  primary: '#7C69F5',
  light: '#9b8cf8',
  lighter: '#b9aff9',
  lightest: '#d8d1fb',
  dark: '#6c57e8',
  darker: '#5d45dd',
  darkest: '#4e33d2',
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

const networkPulse = keyframes`
  0% {
    box-shadow:
      0 0 20px rgba(124, 105, 245, 0.8),
      0 0 40px rgba(124, 105, 245, 0.6),
      0 0 60px rgba(124, 105, 245, 0.4),
      0 0 80px rgba(124, 105, 245, 0.3),
      0 0 100px rgba(124, 105, 245, 0.2);
    transform: scale(1);
  }
  50% {
    box-shadow:
      0 0 30px rgba(124, 105, 245, 1),
      0 0 60px rgba(124, 105, 245, 0.8),
      0 0 90px rgba(124, 105, 245, 0.6),
      0 0 120px rgba(124, 105, 245, 0.4),
      0 0 150px rgba(124, 105, 245, 0.3);
    transform: scale(1.03);
  }
  100% {
    box-shadow:
      0 0 20px rgba(124, 105, 245, 0.8),
      0 0 40px rgba(124, 105, 245, 0.6),
      0 0 60px rgba(124, 105, 245, 0.4),
      0 0 80px rgba(124, 105, 245, 0.3),
      0 0 100px rgba(124, 105, 245, 0.2);
    transform: scale(1);
  }
`;

const connectFlow = keyframes`
  0% {
    background-position: 0% 0%;
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    background-position: 100% 0%;
    opacity: 0.3;
  }
`;

const constellationRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const constellationGlow = keyframes`
  0% {
    box-shadow:
      0 0 30px rgba(124, 105, 245, 0.8),
      0 0 60px rgba(124, 105, 245, 0.6),
      0 0 90px rgba(124, 105, 245, 0.4),
      0 0 120px rgba(124, 105, 245, 0.3);
    transform: scale(1);
  }
  50% {
    box-shadow:
      0 0 40px rgba(124, 105, 245, 1),
      0 0 80px rgba(124, 105, 245, 0.8),
      0 0 120px rgba(124, 105, 245, 0.6),
      0 0 160px rgba(124, 105, 245, 0.4);
    transform: scale(1.05);
  }
  100% {
    box-shadow:
      0 0 30px rgba(124, 105, 245, 0.8),
      0 0 60px rgba(124, 105, 245, 0.6),
      0 0 90px rgba(124, 105, 245, 0.4),
      0 0 120px rgba(124, 105, 245, 0.3);
    transform: scale(1);
  }
`;

const dataFlow = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
`;

const nodeFloat = keyframes`
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-5px) scale(1.05); }
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

const ConstellationButton = styled(Button)(() => ({
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '16px',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  background: constellationColors.primary,
  color: '#020C1B',
  boxShadow: `0 10px 30px ${constellationColors.primary}50`,
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
    background: constellationColors.light,
    boxShadow: `0 20px 40px ${constellationColors.primary}70`,
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
  borderColor: constellationColors.primary,
  color: constellationColors.primary,
  borderWidth: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderWidth: 2,
    backgroundColor: `${constellationColors.primary}20`,
    borderColor: constellationColors.light,
    transform: 'translateY(-2px)',
  },
}));

const StatCard = styled(motion.div)(() => ({
  textAlign: 'center',
  padding: '32px',
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${constellationColors.primary}20`,
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
    background: constellationColors.primary,
    opacity: 0.8,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 40px ${constellationColors.primary}30`,
    border: `1px solid ${constellationColors.primary}50`,
    '&::before': {
      opacity: 1,
    },
  },
}));

const FeatureCard = styled(motion.div)(() => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${constellationColors.primary}20`,
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
    background: constellationColors.primary,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    border: `1px solid ${constellationColors.primary}50`,
    boxShadow: `0 25px 50px ${constellationColors.primary}30`,
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
  background: `${constellationColors.primary}20`,
  border: `1px solid ${constellationColors.primary}30`,
  marginBottom: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
    background: `${constellationColors.primary}30`,
    border: `1px solid ${constellationColors.primary}50`,
  },
}));

const BrandText = styled('span')(() => ({
  color: constellationColors.primary,
  display: 'inline-block',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    right: 0,
    height: '3px',
    background: constellationColors.primary,
    opacity: 0.5,
  },
}));

const FloatingBadge = styled(Chip)(() => ({
  background: `${constellationColors.primary}20`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${constellationColors.primary}40`,
  color: constellationColors.light,
  fontWeight: 600,
  padding: '8px 4px',
  height: 'auto',
  fontSize: '0.875rem',
  '& .MuiChip-icon': {
    color: constellationColors.light,
  },
}));

const ContentNode = styled(motion.div)<{ color: string; position: { top: string; left: string } }>(({ color, position }) => ({
  position: 'absolute',
  ...position,
  width: '80px',
  height: '80px',
  borderRadius: '20px',
  background: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 4px 12px ${color}60`,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.15)',
    boxShadow: `0 10px 30px ${color}80`,
  },
}));

const ConstellationRing = styled(Box)<{ radius: number; rotationSpeed: number }>(({ radius, rotationSpeed }) => ({
  position: 'absolute',
  width: `${radius * 2}px`,
  height: `${radius * 2}px`,
  borderRadius: '50%',
  border: '2px dashed rgba(124, 105, 245, 0.3)',
  animation: `${constellationRotate} ${rotationSpeed}s linear infinite`,
}));

export default function ConstellationPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [problemRef, problemInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [processRef, processInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Stats data
  const stats = [
    { icon: Zap, value: '90%', label: 'Reduction in Course Development Time' },
    { icon: Target, value: '100%', label: 'Production-Ready Documentation' },
    { icon: CheckCircle2, value: 'Zero', label: 'Manual Content Creation Tasks' },
    { icon: Clock, value: 'Hours', label: 'From Blueprint to Complete Course Architecture' },
  ];

  // Features data
  const features = [
    {
      icon: Brain,
      title: 'Blueprint Analysis & Enhancement',
      description: 'Receives strategic blueprints from Polaris and analyzes all available content to enrich and detail the learning architecture.',
      highlights: ['Blueprint integration from Polaris', 'Content gap analysis', 'Learning objective expansion', 'Resource mapping', 'Prerequisite identification'],
    },
    {
      icon: FileText,
      title: 'Script & Content Generation',
      description: 'Automatically generates comprehensive scripts, voiceovers, and narrative content based on blueprint requirements and available source materials.',
      highlights: ['Video scripts & voiceovers', 'Interactive content scripts', 'Assessment content', 'Narrative flow design', 'Tone & style adaptation'],
    },
    {
      icon: Eye,
      title: 'Storyboard & Visual Design',
      description: 'Creates detailed storyboards, visual layouts, and design specifications for every learning interaction and assessment.',
      highlights: ['Visual storyboards', 'UI/UX specifications', 'Interaction design', 'Asset requirements', 'Brand alignment'],
    },
    {
      icon: GitBranch,
      title: 'Branching Scenario Architecture',
      description: 'Designs complex branching scenarios, adaptive learning paths, and personalized learning journeys based on learner performance and preferences.',
      highlights: ['Decision tree design', 'Adaptive pathways', 'Personalization logic', 'Performance-based routing', 'Competency mapping'],
    },
    {
      icon: Layers,
      title: 'Course Structure & Outline',
      description: 'Generates complete course structures, module outlines, and detailed curriculum maps ready for development in Nova or manual implementation.',
      highlights: ['Module breakdown', 'Learning sequence design', 'Assessment integration', 'Timeline planning', 'Resource allocation'],
    },
    {
      icon: Shield,
      title: 'Production-Ready Documentation',
      description: 'Delivers comprehensive documentation packages that development teams can immediately implement without additional interpretation or design work.',
      highlights: ['Technical specifications', 'Development guidelines', 'Quality assurance checklists', 'Implementation roadmaps', 'Stakeholder documentation'],
    },
  ];

  // Documentation outputs
  const documentationOutputs = [
    { icon: FileText, label: 'Scripts', formats: 'Video, Audio, Interactive' },
    { icon: Eye, label: 'Storyboards', formats: 'Visual, Layout, Flow' },
    { icon: GitBranch, label: 'Scenarios', formats: 'Branching, Adaptive, Decision Trees' },
    { icon: Layers, label: 'Structure', formats: 'Course, Module, Lesson' },
    { icon: Shield, label: 'Specifications', formats: 'Technical, Implementation, QA' },
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
                  icon={<Network size={16} />}
                  label="Constellation by Solara | Coming Soon | AI-Powered Content-to-Blueprint Automation"
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
                  From <BrandText>Blueprint to Reality</BrandText>
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
                  AI-Powered Content Analysis & Documentation Generation
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
                  Receives strategic blueprints from Polaris and transforms them into comprehensive course architecture—scripts, storyboards, branching scenarios, and every detail needed to bring learning experiences to life.
                </Typography>

                <Box
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    background: `${constellationColors.primary}10`,
                    border: `2px solid ${constellationColors.primary}40`,
                    mb: 4,
                    maxWidth: '600px',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: constellationColors.light,
                      fontWeight: 700,
                      mb: 1,
                      fontSize: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Rocket size={24} color={constellationColors.primary} />
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
                    Constellation is currently under active development with expected launch in early 2026. Be among the first to experience AI-powered content-to-blueprint automation by reaching out to our team today.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  <ConstellationButton
                    component="a"
                    href="https://www.smartslate.io/contact"
                    variant="contained"
                    endIcon={<Rocket size={20} />}
                  >
                    Reach out to know more
                  </ConstellationButton>
                </Box>

                {/* Trust Indicators */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {[
                    'Expected Early 2026',
                    '10x faster blueprinting',
                    '80% time reduction',
                    'AI-first platform',
                  ].map((text, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle2 size={16} color={constellationColors.primary} />
                      <Typography variant="caption" sx={{ color: '#7a8a8b', fontSize: '0.85rem' }}>
                        {text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Right Visual Element - Enhanced Constellation Animation */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Enhanced Central Constellation Hub */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {/* Outer Glow Layer */}
                  <Box
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(124, 105, 245, 0.3) 0%, rgba(124, 105, 245, 0.1) 40%, transparent 70%)',
                      position: 'absolute',
                      top: -20,
                      left: -20,
                      animation: `${constellationGlow} 4s ease-in-out infinite`,
                      filter: 'blur(20px)',
                      zIndex: 8,
                    }}
                  />

                  {/* Ethereal Constellation Core - No visible circle, just glow effects */}
                  <Box
                    sx={{
                      width: 1,
                      height: 1,
                      position: 'relative',
                      zIndex: 10,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: -80,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(124, 105, 245, 0.7) 0%, rgba(124, 105, 245, 0.3) 50%, transparent 70%)',
                        animation: `${networkPulse} 3s ease-in-out infinite`,
                        zIndex: -1,
                        filter: 'blur(12px)',
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: -40,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(124, 105, 245, 0.9) 0%, rgba(124, 105, 245, 0.5) 30%, transparent 60%)',
                        animation: `${constellationGlow} 3s ease-in-out infinite`,
                        zIndex: -1,
                        filter: 'blur(6px)',
                      },
                    }}
                  />
                </motion.div>

                {/* Constellation Rings */}
                <ConstellationRing radius={100} rotationSpeed={15} />
                <ConstellationRing radius={170} rotationSpeed={25} />
                <ConstellationRing radius={240} rotationSpeed={35} />

                {/* Enhanced Documentation Nodes */}
                {[
                  { icon: FileText, angle: 0, radius: 100, color: '#22c55e', size: 55 },
                  { icon: Brain, angle: 72, radius: 100, color: '#3b82f6', size: 55 },
                  { icon: Target, angle: 144, radius: 100, color: '#ef4444', size: 55 },
                  { icon: Users, angle: 216, radius: 100, color: '#8b5cf6', size: 55 },
                  { icon: GitBranch, angle: 288, radius: 100, color: '#ec4899', size: 55 },
                  { icon: Upload, angle: 36, radius: 170, color: '#14b8a6', size: 50 },
                  { icon: Eye, angle: 108, radius: 170, color: '#f97316', size: 50 },
                  { icon: BarChart3, angle: 180, radius: 170, color: '#84cc16', size: 50 },
                  { icon: Sparkles, angle: 252, radius: 170, color: '#06b6d4', size: 50 },
                  { icon: Zap, angle: 324, radius: 170, color: '#6366f1', size: 50 },
                ].map((node, index) => {
                  const Icon = node.icon;
                  const angleRad = (node.angle - 90) * (Math.PI / 180);
                  const centerX = 250;
                  const centerY = 250;
                  const nodeSize = node.size;
                  const x = centerX + Math.cos(angleRad) * node.radius - nodeSize / 2;
                  const y = centerY + Math.sin(angleRad) * node.radius - nodeSize / 2;

                  return (
                    <motion.div
                      key={index}
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
                          width: nodeSize,
                          height: nodeSize,
                          borderRadius: '14px',
                          background: node.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          boxShadow: `0 4px 12px ${node.color}60`,
                          animation: `${nodeFloat} 6s ease-in-out infinite`,
                          animationDelay: `${index * 0.5}s`,
                          '&:hover': {
                            transform: 'scale(1.15) translateY(-5px)',
                            boxShadow: `0 15px 35px ${node.color}80`,
                          },
                        }}
                      >
                        <Icon size={nodeSize * 0.55} color="#020C1B" />

                        {/* Enhanced Connection Line to Center */}
                        <Box
                          sx={{
                            position: 'absolute',
                            width: `${node.radius - nodeSize/2}px`,
                            height: '2px',
                            top: '50%',
                            left: '50%',
                            transformOrigin: 'left center',
                            transform: `rotate(${angleRad * (180 / Math.PI) + 180}deg)`,
                            pointerEvents: 'none',
                            zIndex: -1,
                            background: `linear-gradient(
                              90deg,
                              ${node.color}00 0%,
                              ${node.color} 5%,
                              ${node.color} 15%,
                              ${node.color}00 20%,
                              ${node.color}00 35%,
                              ${node.color} 40%,
                              ${node.color} 60%,
                              ${node.color}00 65%,
                              ${node.color}00 80%,
                              ${node.color} 85%,
                              ${node.color}00 100%
                            )`,
                            backgroundSize: '200% 100%',
                            filter: `drop-shadow(0 0 4px ${node.color})`,
                            animation: `${dataFlow} 3s ease-in-out infinite`,
                            willChange: 'background-position',
                            opacity: 0.8,
                          }}
                        />
                      </Box>
                    </motion.div>
                  );
                })}

                {/* Data Flow Particles */}
                {[...Array(6)].map((_, index) => (
                  <motion.div
                    key={`particle-${index}`}
                    initial={{ opacity: 0 }}
                    animate={heroInView ? { opacity: [0.3, 1, 0.3] } : {}}
                    transition={{
                      duration: 2,
                      delay: index * 0.3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                    style={{
                      position: 'absolute',
                      width: '3px',
                      height: '3px',
                      borderRadius: '50%',
                      background: constellationColors.primary,
                      top: '20%',
                      left: `${15 + index * 12}%`,
                      animation: `${nodeFloat} 4s ease-in-out infinite`,
                      animationDelay: `${index * 0.7}s`,
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Box sx={{ py: 10, backgroundColor: '#020C1B', borderTop: `1px solid ${constellationColors.primary}20` }} role="region" aria-labelledby="stats-heading">
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: constellationColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                display: 'block',
                mb: 2,
              }}
              id="stats-heading"
            >
              TRANSFORMATION METRICS
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#e0e0e0', mb: 2 }}>
              The Constellation Impact
            </Typography>
            <Typography variant="body1" sx={{ color: '#b0c5c6', mb: 6, maxWidth: '700px', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Transform strategic blueprints into production-ready course architecture with comprehensive documentation.
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
                    <Box sx={{ color: constellationColors.primary, mb: 2 }}>
                      <Icon size={40} />
                    </Box>
                    <Typography
                      variant="h2"
                      sx={{
                        color: constellationColors.light,
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
                color: constellationColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              THE CONTENT CHALLENGE
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: '#e0e0e0',
                mb: 6,
              }}
            >
              The Blueprint-to-Reality Gap
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
                      The Development Gap
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                      'Polaris creates strategic blueprints, but course development still takes months',
                      'Teams struggle to transform blueprints into detailed, production-ready content',
                      'Creating scripts, storyboards, and branching scenarios requires specialized expertise',
                      'Inconsistent documentation quality across development teams',
                      'Manual content creation creates bottlenecks and delays',
                      'Translation from blueprint to reality loses strategic intent',
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
                    background: `${constellationColors.primary}10`,
                    border: `1px solid ${constellationColors.primary}40`,
                    height: '100%',
                    boxShadow: `0 10px 30px ${constellationColors.primary}20`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Sparkles size={32} color={constellationColors.primary} />
                    <Typography variant="h5" sx={{ color: constellationColors.primary, fontWeight: 700 }}>
                      With Constellation Bridge
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                      'Receives Polaris blueprints and transforms them into detailed course architecture',
                      'Automatically generates scripts, storyboards, and branching scenarios',
                      'Creates production-ready documentation for Nova or manual development',
                      'Analyzes existing content to enrich and personalize learning experiences',
                      'Maintains strategic intent while adding tactical detail',
                      'Reduces development time from months to hours',
                    ].map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <CheckCircle2 size={20} color={constellationColors.primary} style={{ flexShrink: 0 }} />
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

      {/* Process Section */}
      <Box id="constellation-process" ref={processRef} sx={{ py: 10, backgroundColor: '#020C1B', borderTop: `1px solid ${constellationColors.primary}20` }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: constellationColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              HOW IT WORKS
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: '#e0e0e0',
                mb: 2,
              }}
            >
              From Blueprint to Reality in Four Steps
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
              Constellation bridges the gap between strategic planning and tactical execution, creating comprehensive course architecture ready for development.
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {[
              {
                step: '01',
                title: 'Blueprint Integration',
                description: 'Receives strategic blueprints from Polaris and analyzes all available content to enrich the learning architecture.',
                icon: Brain,
              },
              {
                step: '02',
                title: 'Content Architecture',
                description: 'Generates comprehensive scripts, storyboards, branching scenarios, and all content documentation needed for development.',
                icon: FileText,
              },
              {
                step: '03',
                title: 'Course Structure Design',
                description: 'Creates detailed course outlines, module structures, assessment frameworks, and implementation specifications.',
                icon: Layers,
              },
              {
                step: '04',
                title: 'Production Package',
                description: 'Delivers complete documentation packages ready for Nova development or manual implementation by learning teams.',
                icon: Eye,
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={processInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: '20px',
                        background: 'rgba(13, 27, 42, 0.4)',
                        border: `1px solid ${constellationColors.primary}20`,
                        transition: 'all 0.3s ease',
                        height: '100%',
                        position: 'relative',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          border: `1px solid ${constellationColors.primary}40`,
                          boxShadow: `0 20px 40px ${constellationColors.primary}20`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '-10px',
                          left: '20px',
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          background: constellationColors.primary,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          color: '#020C1B',
                        }}
                      >
                        {step.step}
                      </Box>

                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: `${constellationColors.primary}20`,
                          border: `1px solid ${constellationColors.primary}30`,
                          mb: 3,
                          mt: 2,
                        }}
                      >
                        <Icon size={28} color={constellationColors.primary} />
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          color: constellationColors.light,
                          fontWeight: 700,
                          mb: 2,
                          fontSize: '1.1rem',
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#b0c5c6',
                          lineHeight: 1.6,
                          fontSize: '0.9rem',
                        }}
                      >
                        {step.description}
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
      <Box ref={featuresRef} sx={{ py: 10, backgroundColor: '#020C1B', borderTop: `1px solid ${constellationColors.primary}20` }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: constellationColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              POWERFUL CAPABILITIES
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: '#e0e0e0',
                mb: 2,
              }}
            >
              Everything You Need to Transform Content
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
              From blueprint integration to production-ready documentation, Constellation handles every aspect of course architecture creation.
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
                      <Icon size={32} color={constellationColors.primary} />
                    </IconWrapper>
                    <Typography
                      variant="h6"
                      sx={{
                        color: constellationColors.light,
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
                          <CheckCircle2 size={16} color={constellationColors.primary} style={{ flexShrink: 0, marginTop: 2 }} />
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

      {/* Final CTA Section */}
      <Box
        sx={{
          py: 10,
          background: '#020C1B',
          borderTop: `1px solid ${constellationColors.primary}30`,
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
                  <Network size={32} color={constellationColors.primary} />
                  <Typography
                    variant="overline"
                    sx={{
                      color: constellationColors.primary,
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
                  Ready to Unlock Your Content's Potential?
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
                  Bridge the gap between strategic blueprints and tactical execution. Get notified when Constellation launches in early 2026.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <ConstellationButton
                    component="a"
                    href="https://smartslate.io/contact"
                    variant="contained"
                    startIcon={<Target size={20} />}
                  >
                    Reach Out to Know More
                  </ConstellationButton>
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
                  Coming Early 2026 • Bridge between Polaris and Nova • Production-ready course architecture
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
                    border: `1px solid ${constellationColors.primary}40`,
                    boxShadow: `0 10px 30px ${constellationColors.primary}30`,
                  }}
                >
                  <Typography variant="h6" sx={{ color: constellationColors.light, fontWeight: 700, mb: 2 }}>
                    What Constellation Delivers:
                  </Typography>
                  {[
                    'Complete course architecture documentation',
                    'Production-ready scripts and storyboards',
                    'Branching scenario designs',
                    'Integration with Polaris blueprints',
                    'Implementation specifications for Nova',
                    'Detailed consultation on capabilities',
                  ].map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <CheckCircle2 size={20} color={constellationColors.primary} />
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
