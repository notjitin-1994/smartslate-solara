'use client';

import { Box, Container, Typography, Button, Card, CardContent, Grid, Chip, LinearProgress } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  ArrowRight,
  TrendingUp,
  Brain,
  Database,
  Shield,
  Zap,
  Target,
  Rocket,
  Eye,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Gauge,
  PlugZap,
    Calendar,
  DollarSign,
  Award,
  Building2,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  MoreVertical,
  Filter,
  Search,
  Plus,
} from 'lucide-react';
import Link from 'next/link';

// Spectrum Brand Colors - Premium Analytics Palette
const spectrumColors = {
  primary: '#8b5cf6',
  light: '#a78bfa',
  lighter: '#c4b5fd',
  lightest: '#ddd6fe',
  dark: '#7c3aed',
  darker: '#6d28d9',
  darkest: '#5b21b6',
  accent: '#06b6d4',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
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

const dataFlow = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
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

const SpectrumButton = styled(Button)(() => ({
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '16px',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  background: spectrumColors.primary,
  color: '#020C1B',
  boxShadow: `0 10px 30px ${spectrumColors.primary}50`,
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
    background: spectrumColors.light,
    boxShadow: `0 20px 40px ${spectrumColors.primary}70`,
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
  borderColor: spectrumColors.primary,
  color: spectrumColors.primary,
  borderWidth: 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    borderWidth: 2,
    backgroundColor: `${spectrumColors.primary}20`,
    borderColor: spectrumColors.light,
    transform: 'translateY(-2px)',
  },
}));

const StatCard = styled(motion.div)(() => ({
  textAlign: 'center',
  padding: '32px',
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${spectrumColors.primary}20`,
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
    background: spectrumColors.primary,
    opacity: 0.8,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 20px 40px ${spectrumColors.primary}30`,
    border: `1px solid ${spectrumColors.primary}50`,
    '&::before': {
      opacity: 1,
    },
  },
}));

const FeatureCard = styled(motion.div)(() => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${spectrumColors.primary}20`,
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
    background: spectrumColors.primary,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    border: `1px solid ${spectrumColors.primary}50`,
    boxShadow: `0 25px 50px ${spectrumColors.primary}30`,
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
  background: `${spectrumColors.primary}20`,
  border: `1px solid ${spectrumColors.primary}30`,
  marginBottom: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
    background: `${spectrumColors.primary}30`,
    border: `1px solid ${spectrumColors.primary}50`,
  },
}));

const DashboardCard = styled(Card)(() => ({
  background: 'rgba(13, 27, 42, 0.6)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${spectrumColors.primary}30`,
  borderRadius: '16px',
  padding: '24px',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: `linear-gradient(90deg, ${spectrumColors.primary}, ${spectrumColors.accent})`,
    opacity: 0.8,
  },
}));

const MetricCard = styled(Box)(() => ({
  background: 'rgba(13, 27, 42, 0.8)',
  border: `1px solid ${spectrumColors.primary}20`,
  borderRadius: '12px',
  padding: '16px',
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    border: `1px solid ${spectrumColors.primary}40`,
    boxShadow: `0 10px 20px ${spectrumColors.primary}20`,
  },
}));

const BrandText = styled('span')(() => ({
  color: spectrumColors.primary,
  display: 'inline-block',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    right: 0,
    height: '3px',
    background: spectrumColors.primary,
    opacity: 0.5,
  },
}));

const FloatingBadge = styled(Chip)(() => ({
  background: `${spectrumColors.primary}20`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${spectrumColors.primary}40`,
  color: spectrumColors.light,
  fontWeight: 600,
  padding: '8px 4px',
  height: 'auto',
  fontSize: '0.875rem',
  '& .MuiChip-icon': {
    color: spectrumColors.light,
  },
}));

export default function SpectrumPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [dashboardRef, dashboardInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [roiRef, roiInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [integrationRef, integrationInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [enterpriseRef, enterpriseInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Key stats for Spectrum
  const stats = [
    { icon: Brain, value: '94%', label: 'Prediction Accuracy' },
    { icon: DollarSign, value: '3.5x', label: 'Average ROI' },
    { icon: Users, value: '50K+', label: 'Learners Analyzed' },
    { icon: Clock, value: '<5min', label: 'Real-Time Insights' },
  ];

  // Dashboard metrics data
  const dashboardMetrics = {
    completion: { current: 87, target: 95, trend: 'up' },
    engagement: { current: 92, target: 90, trend: 'up' },
    skillGrowth: { current: 78, target: 85, trend: 'up' },
    costSavings: { current: 64, target: 70, trend: 'up' },
  };

  // Advanced features
  const features = [
    {
      icon: Brain,
      title: 'Predictive Analytics Engine',
      description: 'Advanced AI algorithms predict learning outcomes, identify at-risk learners, and recommend personalized interventions before performance declines.',
      highlights: ['94% accuracy rate', 'Early intervention alerts', 'Personalized recommendations', 'Risk scoring system'],
    },
    {
      icon: Database,
      title: 'Unified Learning Intelligence',
      description: 'Complete data consolidation across the entire learning lifecycle - from blueprint creation through business impact measurement.',
      highlights: ['Cross-platform integration', 'Real-time data sync', 'Historical trend analysis', 'Custom data models'],
    },
    {
      icon: Gauge,
      title: 'Business Impact Correlation',
      description: 'Direct correlation between learning initiatives and business KPIs including productivity, retention, and revenue impact.',
      highlights: ['ROI calculator', 'KPI correlation mapping', 'Executive dashboards', 'Business outcome tracking'],
    },
    {
      icon: Eye,
      title: 'Advanced Visualization Suite',
      description: 'Interactive dashboards and custom reports with drill-down capabilities for complete insight into learning effectiveness.',
      highlights: ['Custom dashboard builder', 'Interactive visualizations', 'Executive reports', 'Mobile-optimized views'],
    },
    {
      icon: Shield,
      title: 'Enterprise-Grade Security',
      description: 'Military-grade encryption, SOC 2 Type II compliance, and advanced role-based access controls for sensitive data.',
      highlights: ['AES-256 encryption', 'SOC 2 Type II certified', 'Advanced RBAC', 'Audit trails'],
    },
    {
      icon: Zap,
      title: 'Real-Time Processing',
      description: 'Sub-5-minute data latency with real-time alerting and instant insights for immediate decision-making capabilities.',
      highlights: ['<5min data latency', 'Real-time alerting', 'Instant insights', 'Auto-reporting'],
    },
  ];

  // ROI metrics
  const roiMetrics = [
    {
      title: 'Operational Efficiency',
      description: 'Reduce learning operations costs through automation',
      before: '$2.4M',
      after: '$840K',
      savings: '65%',
      icon: DollarSign,
    },
    {
      title: 'Time to Competency',
      description: 'Accelerate skill development and readiness',
      before: '6 months',
      after: '2.5 months',
      savings: '58%',
      icon: Clock,
    },
    {
      title: 'Learning Effectiveness',
      description: 'Improve completion and knowledge retention',
      before: '12% completion',
      after: '82% completion',
      savings: '583%',
      icon: Target,
    },
    {
      title: 'Business Impact',
      description: 'Measurable improvement in business metrics',
      before: '23% productivity gain',
      after: '67% productivity gain',
      savings: '191%',
      icon: TrendingUp,
    },
  ];

  // Enterprise integrations
  const integrations = [
    { name: 'Workday', category: 'HRIS', status: 'connected' },
    { name: 'Salesforce', category: 'CRM', status: 'connected' },
    { name: 'SAP SuccessFactors', category: 'HRIS', status: 'available' },
    { name: 'Microsoft Teams', category: 'Collaboration', status: 'connected' },
    { name: 'Slack', category: 'Collaboration', status: 'connected' },
    { name: 'Tableau', category: 'BI', status: 'available' },
    { name: 'Power BI', category: 'BI', status: 'available' },
    { name: 'Google Analytics', category: 'Analytics', status: 'connected' },
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
                  icon={<BarChart3 size={16} />}
                  label="Spectrum by Solara | Coming Soon | Advanced Learning Analytics"
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
                  <BrandText>Future of Learning</BrandText> Analytics
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
                  Advanced Learning Analytics & Business Intelligence
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
                  Transform learning data into strategic business insights. Spectrum provides advanced analytics and business intelligence to prove learning ROI and optimize outcomes.
                </Typography>

                <Box
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    background: `${spectrumColors.primary}10`,
                    border: `2px solid ${spectrumColors.primary}40`,
                    mb: 4,
                    maxWidth: '600px',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: spectrumColors.light,
                      fontWeight: 700,
                      mb: 1,
                      fontSize: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Rocket size={24} color={spectrumColors.primary} />
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
                    Spectrum is currently under active development with expected launch in 2027. Be among the first to experience advanced learning analytics by reaching out to our team today.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  <SpectrumButton
                    component="a"
                    href="https://www.smartslate.io/contact"
                    variant="contained"
                    endIcon={<Rocket size={20} />}
                  >
                    Reach out to know more
                  </SpectrumButton>
                </Box>

                {/* Trust Indicators */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {[
                    'Expected 2027',
                    '250% ROI improvement',
                    '50% faster optimization',
                    'AI-first platform',
                  ].map((text, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle2 size={16} color={spectrumColors.primary} />
                      <Typography variant="caption" sx={{ color: '#7a8a8b', fontSize: '0.85rem' }}>
                        {text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Right Visual Element - Analytics Dashboard Preview */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Central Analytics Hub */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Box
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: '20px',
                      background: `linear-gradient(135deg, ${spectrumColors.primary}, ${spectrumColors.accent})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      zIndex: 10,
                      boxShadow: `0 0 60px ${spectrumColors.primary}80, 0 0 100px ${spectrumColors.primary}50`,
                      animation: `${pulse} 3s ease-in-out infinite`,
                    }}
                  >
                    <BarChart3 size={80} color="#020C1B" strokeWidth={2.5} />
                  </Box>
                </motion.div>

                {/* Rotating Data Rings */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    border: `2px dashed ${spectrumColors.primary}40`,
                    animation: `${rotate} 20s linear infinite`,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    width: 400,
                    height: 400,
                    borderRadius: '50%',
                    border: `1px solid ${spectrumColors.primary}20`,
                    animation: `${rotate} 30s linear infinite reverse`,
                  }}
                />

                {/* Floating Metrics */}
                {[
                  { label: '94% Accuracy', top: '10%', left: '20%' },
                  { label: 'Real-Time', top: '20%', right: '10%' },
                  { label: '3.5x ROI', bottom: '15%', left: '15%' },
                  { label: '50K+ Users', bottom: '20%', right: '20%' },
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
                        border: `1px solid ${spectrumColors.primary}40`,
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: spectrumColors.light,
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
      <Box ref={statsRef} sx={{ py: 6, backgroundColor: '#020C1B', borderTop: `1px solid ${spectrumColors.primary}20` }}>
        <Container maxWidth="lg">
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
                    <Box sx={{ color: spectrumColors.primary, mb: 2 }}>
                      <Icon size={40} />
                    </Box>
                    <Typography
                      variant="h2"
                      sx={{
                        color: spectrumColors.light,
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

      {/* Coming Soon Features Preview */}
      <Box ref={dashboardRef} sx={{ py: 8, backgroundColor: '#020C1B', borderTop: `1px solid ${spectrumColors.primary}20` }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={dashboardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Chip
                label="COMING 2028"
                size="medium"
                sx={{
                  background: `${spectrumColors.warning}20`,
                  color: spectrumColors.warning,
                  border: `1px solid ${spectrumColors.warning}40`,
                  fontWeight: 700,
                  mb: 2,
                }}
              />
              <Typography
                variant="overline"
                sx={{
                  color: spectrumColors.primary,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  mb: 2,
                  display: 'block',
                }}
              >
                FUTURE CAPABILITIES
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: '#e0e0e0',
                  mb: 2,
                }}
              >
                Revolutionary Analytics on the Horizon
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#b0c5c6',
                  maxWidth: '700px',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  mx: 'auto',
                }}
              >
                Spectrum is currently in development with cutting-edge analytics capabilities that will redefine how organizations measure learning impact
              </Typography>
            </Box>

            {/* Feature Preview Cards */}
            <Grid container spacing={4}>
              {[
                {
                  title: 'Predictive Analytics Engine',
                  description: 'AI-powered predictions for learning outcomes and at-risk learner identification',
                  icon: Brain,
                  status: 'In Development',
                },
                {
                  title: 'Real-Time Dashboards',
                  description: 'Interactive dashboards with sub-5-minute data latency and live insights',
                  icon: Gauge,
                  status: 'Planned',
                },
                {
                  title: 'Business Impact Correlation',
                  description: 'Direct correlation between learning initiatives and business KPIs',
                  icon: TrendingUp,
                  status: 'Research Phase',
                },
                {
                  title: 'Enterprise Integrations',
                  description: 'Seamless connectivity with HRIS, CRM, ERP, and BI platforms',
                  icon: PlugZap,
                  status: 'In Development',
                },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={dashboardInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: '20px',
                          background: 'rgba(13, 27, 42, 0.4)',
                          border: `1px solid ${spectrumColors.primary}20`,
                          height: '100%',
                          position: 'relative',
                          overflow: 'hidden',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            border: `1px solid ${spectrumColors.primary}40`,
                            boxShadow: `0 20px 40px ${spectrumColors.primary}20`,
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <IconWrapper sx={{ mb: 0, width: 48, height: 48 }}>
                            <Icon size={24} color={spectrumColors.primary} />
                          </IconWrapper>
                          <Chip
                            label={feature.status}
                            size="small"
                            sx={{
                              background: `${spectrumColors.primary}20`,
                              color: spectrumColors.light,
                              fontSize: '0.7rem',
                              height: '24px',
                            }}
                          />
                        </Box>

                        <Typography variant="h6" sx={{ color: '#e0e0e0', fontWeight: 600, mb: 2 }}>
                          {feature.title}
                        </Typography>

                        <Typography variant="body2" sx={{ color: '#7a8a8b', lineHeight: 1.5 }}>
                          {feature.description}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography variant="h6" sx={{ color: spectrumColors.warning, fontWeight: 600, mb: 2 }}>
                Be the First to Know
              </Typography>
              <Typography variant="body2" sx={{ color: '#7a8a8b', maxWidth: '600px', mx: 'auto', mb: 4 }}>
                Join our exclusive waitlist to get early access, updates, and special pricing when Spectrum launches.
              </Typography>
              <SpectrumButton
                component="a"
                href="https://smartslate.io/contact"
                variant="contained"
                endIcon={<ArrowRight size={20} />}
              >
                Join Waitlist & Know More
              </SpectrumButton>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Planned Features Section */}
      <Box ref={featuresRef} sx={{ py: 8, backgroundColor: '#020C1B', borderTop: `1px solid ${spectrumColors.primary}20` }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                <Chip
                  label="PLANNED FEATURES"
                  size="small"
                  sx={{
                    background: `${spectrumColors.primary}20`,
                    color: spectrumColors.light,
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label="IN DEVELOPMENT"
                  size="small"
                  sx={{
                    background: `${spectrumColors.warning}20`,
                    color: spectrumColors.warning,
                    fontWeight: 600,
                  }}
                />
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: '#e0e0e0',
                  mb: 2,
                }}
              >
                Planned Spectrum Capabilities
              </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#b0c5c6',
                maxWidth: '700px',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mx: 'auto',
              }}
            >
              These are the groundbreaking features we're currently developing for Spectrum's 2028 launch
            </Typography>
            </Box>

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
                        <Icon size={32} color={spectrumColors.primary} />
                      </IconWrapper>
                      <Typography
                        variant="h6"
                        sx={{
                          color: spectrumColors.light,
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
                            <CheckCircle2 size={16} color={spectrumColors.primary} style={{ flexShrink: 0, marginTop: 2 }} />
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
          </motion.div>
        </Container>
      </Box>

      {/* Projected ROI Section */}
      <Box ref={roiRef} sx={{ py: 8, backgroundColor: '#020C1B', borderTop: `1px solid ${spectrumColors.primary}20` }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={roiInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Chip
                label="PROJECTED OUTCOMES"
                size="small"
                sx={{
                  background: `${spectrumColors.warning}20`,
                  color: spectrumColors.warning,
                  fontWeight: 600,
                  mb: 2,
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: '#e0e0e0',
                  mb: 2,
                }}
              >
                Expected Business Impact
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#b0c5c6',
                  maxWidth: '700px',
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                  mx: 'auto',
                }}
              >
                Based on our research and projected capabilities, here are the transformative outcomes we expect Spectrum to deliver
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {roiMetrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={roiInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: '20px',
                          background: 'rgba(13, 27, 42, 0.4)',
                          border: `1px solid ${spectrumColors.primary}20`,
                          height: '100%',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <IconWrapper sx={{ mb: 0, width: 48, height: 48 }}>
                            <Icon size={24} color={spectrumColors.primary} />
                          </IconWrapper>
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                color: spectrumColors.success,
                                fontWeight: 900,
                                fontSize: '1.5rem',
                                lineHeight: 1,
                              }}
                            >
                              {metric.savings}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#7a8a8b' }}>
                              Improvement
                            </Typography>
                          </Box>
                        </Box>

                        <Typography variant="h6" sx={{ color: '#e0e0e0', fontWeight: 600, mb: 1 }}>
                          {metric.title}
                        </Typography>

                        <Typography variant="body2" sx={{ color: '#7a8a8b', mb: 2, lineHeight: 1.5 }}>
                          {metric.description}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#7a8a8b', display: 'block' }}>
                              Before
                            </Typography>
                            <Typography variant="body2" sx={{ color: spectrumColors.error, fontWeight: 600 }}>
                              {metric.before}
                            </Typography>
                          </Box>
                          <ArrowRight size={16} color="#7a8a8b" />
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="caption" sx={{ color: '#7a8a8b', display: 'block' }}>
                              After
                            </Typography>
                            <Typography variant="body2" sx={{ color: spectrumColors.success, fontWeight: 600 }}>
                              {metric.after}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  </Grid>
                );
              })}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Enterprise Integration Section */}
      <Box ref={integrationRef} sx={{ py: 8, backgroundColor: '#020C1B', borderTop: `1px solid ${spectrumColors.primary}20` }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={integrationInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: spectrumColors.primary,
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
                textAlign: 'center',
              }}
            >
              ENTERPRISE INTEGRATIONS
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: '#e0e0e0',
                mb: 2,
                textAlign: 'center',
              }}
            >
              Seamless Integration with Your Stack
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#b0c5c6',
                mb: 6,
                maxWidth: '700px',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                textAlign: 'center',
                mx: 'auto',
              }}
            >
              Connect Spectrum with your existing enterprise systems for unified data and complete visibility
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              {integrations.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={integrationInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Chip
                    label={integration.name}
                    variant="outlined"
                    size="medium"
                    icon={integration.status === 'connected' ? <CheckCircle2 size={16} /> : <Plus size={16} />}
                    sx={{
                      px: 2,
                      py: 1,
                      borderColor: integration.status === 'connected' ? spectrumColors.success : spectrumColors.primary,
                      color: integration.status === 'connected' ? spectrumColors.success : spectrumColors.light,
                      background: integration.status === 'connected'
                        ? `${spectrumColors.success}20`
                        : `${spectrumColors.primary}20`,
                      fontWeight: 600,
                      '& .MuiChip-icon': {
                        color: integration.status === 'connected' ? spectrumColors.success : spectrumColors.primary,
                      },
                    }}
                  />
                </motion.div>
              ))}
            </Box>

            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography variant="h6" sx={{ color: '#e0e0e0', fontWeight: 600, mb: 2 }}>
                Plus 50+ Enterprise Integrations
              </Typography>
              <Typography variant="body2" sx={{ color: '#7a8a8b', maxWidth: '600px', mx: 'auto' }}>
                HRIS, CRM, ERP, Collaboration Tools, BI Platforms, and more. Custom API development available for enterprise clients.
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box
        sx={{
          py: 8,
          background: '#020C1B',
          borderTop: `1px solid ${spectrumColors.primary}30`,
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
                  <Clock size={32} color={spectrumColors.warning} />
                  <Chip
                    label="COMING 2028"
                    size="small"
                    sx={{
                      background: `${spectrumColors.warning}20`,
                      color: spectrumColors.warning,
                      fontWeight: 600,
                    }}
                  />
                  <Typography
                    variant="overline"
                    sx={{
                      color: spectrumColors.primary,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                    }}
                  >
                    JOIN THE WAITLIST
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
                  Be First to Experience the Future of Learning Analytics
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
                  Join our exclusive waitlist to get early access, development updates, and special founder's pricing when Spectrum launches in 2028.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <SpectrumButton
                    component="a"
                    href="https://smartslate.io/contact"
                    variant="contained"
                    endIcon={<ArrowRight size={20} />}
                  >
                    Know More & Join Waitlist
                  </SpectrumButton>

                  <SecondaryButton
                    component="a"
                    href="https://smartslate.io/contact"
                    variant="outlined"
                    endIcon={<Calendar size={20} />}
                  >
                    Schedule Development Briefing
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
                  Expected launch: 2028 • Priority access for waitlist members • No commitment required
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
                    border: `1px solid ${spectrumColors.primary}40`,
                    boxShadow: `0 10px 30px ${spectrumColors.primary}30`,
                  }}
                >
                  <Typography variant="h6" sx={{ color: spectrumColors.light, fontWeight: 700, mb: 3 }}>
                    Waitlist Benefits:
                  </Typography>
                  {[
                    'Early access before public launch',
                    'Exclusive development updates',
                    'Founder\'s pricing discount',
                    'Influence on feature development',
                    'Priority onboarding support',
                    'Exclusive webinars and demos',
                    'Direct access to product team',
                    'Certificate of early adoption',
                  ].map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Star size={16} color={spectrumColors.warning} />
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
