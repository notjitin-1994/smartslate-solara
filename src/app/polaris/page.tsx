'use client';

import { Box, Container, Typography, Button, Grid, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
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
  MessageSquare,
  GitBranch,
  Download,
  Lock,
  Server,
  TrendingUp,
  Sparkles,
  BarChart3,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

// Polaris Brand Colors - Monochromatic Cyan Palette
const polarisColors = {
  primary: '#06b6d4',
  light: '#22d3ee',
  lighter: '#67e8f9',
  lightest: '#a5f3fc',
  dark: '#0891b2',
  darker: '#0e7490',
  darkest: '#155e75',
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

const compassSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

const PolarisButton = styled(Button)(() => ({
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '16px',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  background: polarisColors.primary,
  color: '#020C1B',
  boxShadow: `0 10px 30px ${polarisColors.primary}50`,
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
    background: polarisColors.light,
    boxShadow: `0 20px 40px ${polarisColors.primary}70`,
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
  borderColor: polarisColors.primary,
  color: polarisColors.primary,
  borderWidth: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderWidth: 2,
    backgroundColor: `${polarisColors.primary}20`,
    borderColor: polarisColors.light,
    transform: 'translateY(-2px)',
  },
}));

const StatCard = styled(motion.div)(() => ({
  textAlign: 'center',
  padding: '32px',
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${polarisColors.primary}20`,
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
    background: polarisColors.primary,
    opacity: 0.8,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 40px ${polarisColors.primary}30`,
    border: `1px solid ${polarisColors.primary}50`,
    '&::before': {
      opacity: 1,
    },
  },
}));

const FeatureCard = styled(motion.div)(() => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${polarisColors.primary}20`,
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
    background: polarisColors.primary,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    border: `1px solid ${polarisColors.primary}50`,
    boxShadow: `0 25px 50px ${polarisColors.primary}30`,
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
  background: `${polarisColors.primary}20`,
  border: `1px solid ${polarisColors.primary}30`,
  marginBottom: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
    background: `${polarisColors.primary}30`,
    border: `1px solid ${polarisColors.primary}50`,
  },
}));

const BrandText = styled('span')(() => ({
  color: polarisColors.primary,
  display: 'inline-block',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    right: 0,
    height: '3px',
    background: polarisColors.primary,
    opacity: 0.5,
  },
}));

const FloatingBadge = styled(Chip)(() => ({
  background: `${polarisColors.primary}20`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${polarisColors.primary}40`,
  color: polarisColors.light,
  fontWeight: 600,
  padding: '8px 4px',
  height: 'auto',
  fontSize: '0.875rem',
  '& .MuiChip-icon': {
    color: polarisColors.light,
  },
}));

export default function PolarisPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [problemRef, problemInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [usersRef, usersInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [pricingRef, pricingInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Pricing tiers
  const pricingTiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out Polaris',
      features: [
        '2 blueprints per month',
        'AI-powered generation',
        'Export to PDF & DOCX',
        'Basic templates',
        'Email support',
      ],
      cta: 'Start Free',
      featured: false,
    },
    {
      name: 'Professional',
      price: '$49',
      period: '/month',
      description: 'For individual learning professionals',
      features: [
        'Unlimited blueprints',
        'Advanced AI features',
        'All export formats',
        'Custom templates',
        'Version control',
        'Priority support',
        'API access',
      ],
      cta: 'Start 14-Day Trial',
      featured: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For teams and organizations',
      features: [
        'Everything in Professional',
        'Team workspaces',
        'RBAC & SSO',
        'Custom branding',
        'Dedicated support',
        'SLA guarantee',
        'On-premise option',
      ],
      cta: 'Contact Sales',
      featured: false,
    },
  ];

  // Stats data
  const stats = [
    { icon: Zap, value: '15x', label: 'Faster Requirements Gathering' },
    { icon: Target, value: '100%', label: 'Business Alignment' },
    { icon: CheckCircle2, value: 'Zero', label: 'Revision Cycles' },
    { icon: Clock, value: '2-3 Min', label: 'Comprehensive Blueprint Generation' },
  ];

  // Features data
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Requirement Translation',
      description: 'Transform natural language input into professional learning blueprints. Our AI intelligently questions and understands your needs, automatically generating learning objectives aligned with Bloom\'s Taxonomy and appropriate instructional strategies.',
      highlights: ['Natural language input', 'Intelligent questioning', 'Bloom\'s Taxonomy alignment', 'Strategic recommendations'],
    },
    {
      icon: FileText,
      title: 'Comprehensive Blueprint Generation',
      description: 'Generate complete learning blueprints in minutes with all essential components. Every blueprint includes executive summaries, detailed objectives, assessment strategies, and implementation timelines.',
      highlights: ['Executive summary', 'Learning objectives', 'Assessment strategy', 'Success metrics & KPIs', 'Implementation timeline', 'Risk assessment'],
    },
    {
      icon: Users,
      title: 'Collaboration Features',
      description: 'Share blueprints with stakeholders, maintain version control, and collaborate seamlessly. Export in multiple formats to fit any workflow.',
      highlights: ['Share with stakeholders', 'Version control', 'Comments & annotations', 'Export (PDF, DOCX, JSON)'],
    },
    {
      icon: Server,
      title: 'Enterprise Capabilities',
      description: 'Built for teams of any size. Manage workspaces, customize templates, and integrate with existing systems via our robust API.',
      highlights: ['Team workspaces with RBAC', 'Template library', 'Brand customization & white-labeling', 'API access', 'Auto-save'],
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Enterprise-grade security with AES-256 encryption. Your data is never used for AI training, and we\'re fully compliant with GDPR and SOC 2 standards.',
      highlights: ['AES-256 encryption', 'No AI training on your data', 'GDPR & SOC 2 compliant', 'Customizable retention policies'],
    },
  ];

  // Target users
  const targetUsers = [
    {
      icon: Target,
      title: 'Instructional Designers',
      description: 'Transform complex requirements into structured learning blueprints in minutes, not weeks.',
    },
    {
      icon: BarChart3,
      title: 'L&D Managers',
      description: 'Plan and scope learning initiatives with precision and speed, ensuring stakeholder alignment from day one.',
    },
    {
      icon: Users,
      title: 'Learning Consultants',
      description: 'Deliver professional proposals faster and win more projects with comprehensive blueprints.',
    },
    {
      icon: Sparkles,
      title: 'HR Professionals',
      description: 'Launch training programs with confidence, backed by data-driven learning strategies.',
    },
    {
      icon: GitBranch,
      title: 'Training Vendors',
      description: 'Scope projects accurately, reduce revision cycles, and deliver exceptional client value.',
    },
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
                  icon={<Compass size={16} />}
                  label="Polaris by Solara | AI-Powered Blueprint Generation"
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
                  Transform <BrandText>Weeks into Days</BrandText>
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
                  AI-Powered Learning Blueprint Generator
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
                  Stop wasting 6 weeks on stakeholder meetings. Generate comprehensive, professional learning blueprints in 2-3 minutes with AI that understands instructional design.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  <PolarisButton
                    component="a"
                    href="https://polaris.smartslate.io"
                    variant="contained"
                    endIcon={<ArrowRight size={20} />}
                  >
                    Get Started Free
                  </PolarisButton>

                  <SecondaryButton
                    component="a"
                    href="#polaris-advantage"
                    variant="outlined"
                    endIcon={<Sparkles size={20} />}
                  >
                    See How It Works
                  </SecondaryButton>
                </Box>

                {/* Trust Indicators */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {[
                    '2 free blueprints forever',
                    'No credit card required',
                    'Cancel anytime',
                    'Enterprise-grade security',
                  ].map((text, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle2 size={16} color={polarisColors.primary} />
                      <Typography variant="caption" sx={{ color: '#7a8a8b', fontSize: '0.85rem' }}>
                        {text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Right Visual Element - Compass Animation */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Central Compass */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Box
                    sx={{
                      width: 180,
                      height: 180,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${polarisColors.primary} 0%, ${polarisColors.dark} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 10,
                      boxShadow: `0 0 60px ${polarisColors.primary}80, 0 0 100px ${polarisColors.primary}50`,
                      animation: `${pulse} 3s ease-in-out infinite`,
                    }}
                  >
                    <Compass size={80} color="#020C1B" strokeWidth={2.5} />
                  </Box>
                </motion.div>

                {/* Rotating Rings */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: 280,
                    height: 280,
                    borderRadius: '50%',
                    border: `2px dashed ${polarisColors.primary}40`,
                    animation: `${rotate} 20s linear infinite`,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    width: 380,
                    height: 380,
                    borderRadius: '50%',
                    border: `1px solid ${polarisColors.primary}20`,
                    animation: `${rotate} 30s linear infinite reverse`,
                  }}
                />

                {/* Floating Metrics */}
                {[
                  { label: '15x Faster', top: '10%', left: '20%' },
                  { label: 'Zero Revisions', top: '20%', right: '10%' },
                  { label: '2-3 Minutes', bottom: '15%', left: '15%' },
                  { label: '100% Aligned', bottom: '20%', right: '20%' },
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    style={{
                      position: 'absolute',
                      ...metric,
                    }}
                  >
                    <Box
                      sx={{
                        px: 2,
                        py: 1,
                        borderRadius: '12px',
                        background: 'rgba(13, 27, 42, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: `1px solid ${polarisColors.primary}40`,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: polarisColors.light,
                          fontWeight: 700,
                          fontSize: '0.7rem',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {metric.label}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Box id="polaris-advantage" ref={statsRef} sx={{ py: 10, backgroundColor: '#020C1B', borderTop: `1px solid ${polarisColors.primary}20` }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: polarisColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              PROVEN RESULTS
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: '#e0e0e0',
                mb: 6,
              }}
            >
              The Polaris Advantage
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
                    <Box sx={{ color: polarisColors.primary, mb: 2 }}>
                      <Icon size={40} />
                    </Box>
                    <Typography
                      variant="h2"
                      sx={{
                        color: polarisColors.light,
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
                color: polarisColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              THE TRANSFORMATION
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: '#e0e0e0',
                mb: 6,
              }}
            >
              Before & After Polaris
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {/* Before */}
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
                      Traditional Approach
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                      '6 weeks of back-and-forth meetings',
                      '30-40% of project time on discovery',
                      'Misaligned expectations',
                      'Multiple revision cycles',
                      'Frustrated stakeholders',
                      'Delayed project kickoffs',
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

            {/* After */}
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
                    background: `${polarisColors.primary}10`,
                    border: `1px solid ${polarisColors.primary}40`,
                    height: '100%',
                    boxShadow: `0 10px 30px ${polarisColors.primary}20`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Sparkles size={32} color={polarisColors.primary} />
                    <Typography variant="h5" sx={{ color: polarisColors.primary, fontWeight: 700 }}>
                      With Polaris
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                      '2-3 minutes to comprehensive blueprint',
                      'AI-guided requirement gathering',
                      '100% stakeholder alignment from day one',
                      'Zero revision cycles needed',
                      'Delighted stakeholders',
                      'Immediate project kickoff',
                    ].map((item, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <CheckCircle2 size={20} color={polarisColors.primary} style={{ flexShrink: 0 }} />
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

      {/* Features Section */}
      <Box ref={featuresRef} sx={{ py: 10, backgroundColor: '#020C1B', borderTop: `1px solid ${polarisColors.primary}20` }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: polarisColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              POWERFUL FEATURES
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: '#e0e0e0',
                mb: 2,
              }}
            >
              Everything You Need to Succeed
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
              From AI-powered requirement translation to enterprise-grade security, Polaris has everything learning professionals need.
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
                      <Icon size={32} color={polarisColors.primary} />
                    </IconWrapper>
                    <Typography
                      variant="h6"
                      sx={{
                        color: polarisColors.light,
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
                          <CheckCircle2 size={16} color={polarisColors.primary} style={{ flexShrink: 0, marginTop: 2 }} />
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

      {/* Target Users Section */}
      <Box ref={usersRef} sx={{ py: 10, backgroundColor: '#020C1B' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={usersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: polarisColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              WHO IT'S FOR
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: '#e0e0e0',
                mb: 6,
              }}
            >
              Built for Learning Professionals
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {targetUsers.map((user, index) => {
              const Icon = user.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={usersInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: '20px',
                        background: 'rgba(13, 27, 42, 0.4)',
                        border: `1px solid ${polarisColors.primary}20`,
                        transition: 'all 0.3s ease',
                        height: '100%',
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          border: `1px solid ${polarisColors.primary}40`,
                          boxShadow: `0 20px 40px ${polarisColors.primary}20`,
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
                          background: `${polarisColors.primary}20`,
                          border: `1px solid ${polarisColors.primary}30`,
                          mb: 2,
                        }}
                      >
                        <Icon size={28} color={polarisColors.primary} />
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          color: polarisColors.light,
                          fontWeight: 700,
                          mb: 1,
                          fontSize: '1.1rem',
                        }}
                      >
                        {user.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#b0c5c6',
                          lineHeight: 1.6,
                          fontSize: '0.9rem',
                        }}
                      >
                        {user.description}
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
          borderTop: `1px solid ${polarisColors.primary}30`,
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
                  <Compass size={32} color={polarisColors.primary} />
                  <Typography
                    variant="overline"
                    sx={{
                      color: polarisColors.primary,
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
                  Ready to Transform Your Learning Design?
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
                  Join thousands of learning professionals already revolutionizing their workflows. Transform 6 weeks into 2-3 minutes.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <PolarisButton
                    component="a"
                    href="https://polaris.smartslate.io"
                    variant="contained"
                    startIcon={<Sparkles size={20} />}
                  >
                    Get Started Free
                  </PolarisButton>

                  <SecondaryButton
                    component="a"
                    href="https://www.smartslate.io/contact"
                    variant="outlined"
                    startIcon={<Calendar size={20} />}
                  >
                    Schedule Demo
                  </SecondaryButton>
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
                  2 free blueprints forever • No credit card required • Cancel anytime
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
                    border: `1px solid ${polarisColors.primary}40`,
                    boxShadow: `0 10px 30px ${polarisColors.primary}30`,
                  }}
                >
                  <Typography variant="h6" sx={{ color: polarisColors.light, fontWeight: 700, mb: 2 }}>
                    What You Get:
                  </Typography>
                  {[
                    '2 free blueprints to start',
                    'AI-powered generation',
                    'Export to PDF & DOCX',
                    'Bloom\'s Taxonomy alignment',
                    'Version control',
                    'No commitment required',
                  ].map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <CheckCircle2 size={20} color={polarisColors.primary} />
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
