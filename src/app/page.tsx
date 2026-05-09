'use client';

import { Box, Container, Typography, Button, Grid, Chip, useTheme } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import {
  Compass,
  Network,
  Sparkles,
  Orbit as OrbitIcon,
  BarChart3,
  Brain,
  ArrowRight,
  ChevronDown,
  Star,
  CheckCircle2,
  Rocket,
  Zap,
  ShieldCheck,
  LayoutGrid,
  Users,
  Target,
  BarChart,
  Lightbulb
} from 'lucide-react';
import { SkipToContent } from '@/components/accessibility/SkipToContent';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { FloatingOrb } from '@/components/animations/FloatingOrb';
import { RetroGrid } from '@/components/ui/retro-grid';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';

// Colors
const BRAND_TEAL = '#a7dadb';
const BRAND_INDIGO = '#4F46E5';
const BRAND_DARK = '#020C1B';

// Animations
const starGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 15px rgba(167, 218, 219, 0.4)); transform: scale(1); }
  50% { filter: drop-shadow(0 0 35px rgba(167, 218, 219, 0.8)); transform: scale(1.05); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

// Styled Components
const PageSection = styled(Box)(({ theme }) => ({
  padding: '80px 0',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: '60px 0',
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  padding: '120px 0 80px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: BRAND_DARK,
  [theme.breakpoints.down('sm')]: {
    padding: '100px 0 60px',
    minHeight: 'auto',
  },
}));

const SolidAccentText = styled('span')(() => ({
  color: BRAND_TEAL,
  display: 'inline-block',
}));

const GlassCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(30px)',
  border: '1px solid rgba(167, 218, 219, 0.1)',
  borderRadius: '24px',
  padding: '40px',
  height: '100%',
  transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    border: `1px solid ${BRAND_TEAL}40`,
    boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4)`,
    transform: 'translateY(-5px)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '24px',
  },
}));

const IconBox = styled(Box)(() => ({
  width: 60,
  height: 60,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `${BRAND_TEAL}15`,
  border: `1px solid ${BRAND_TEAL}30`,
  marginBottom: '24px',
  color: BRAND_TEAL,
}));

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '3.5rem',
  fontWeight: 900,
  color: BRAND_TEAL,
  lineHeight: 1,
  marginBottom: '8px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2.5rem',
  },
}));

const CTAButton = styled(MagneticButton)(({ theme }) => ({
  background: BRAND_INDIGO,
  color: '#ffffff',
  padding: '12px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '12px',
  textTransform: 'none',
  transition: 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
  '&:hover': {
    background: '#3730A3',
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 24px ${BRAND_INDIGO}40`,
  },
  '&:active': {
    transform: 'scale(0.97)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '14px 24px',
  },
}));

const SecondaryButton = styled(MagneticButton)(({ theme }) => ({
  background: 'rgba(167, 218, 219, 0.1)',
  color: BRAND_TEAL,
  border: `1px solid ${BRAND_TEAL}30`,
  padding: '12px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '12px',
  textTransform: 'none',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
  '&:hover': {
    background: 'rgba(167, 218, 219, 0.2)',
    border: `1px solid ${BRAND_TEAL}50`,
  },
  '&:active': {
    transform: 'scale(0.97)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: '14px 24px',
  },
}));

const Badge = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'variant_type',
})<{ variant_type?: 'live' | 'soon' }>(({ variant_type }) => ({
  position: 'absolute',
  top: 20,
  right: 20,
  fontWeight: 700,
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  ...(variant_type === 'live' ? {
    background: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    border: '1px solid rgba(16, 185, 129, 0.2)',
  } : {
    background: 'rgba(167, 218, 219, 0.05)',
    color: 'rgba(167, 218, 219, 0.6)',
    border: '1px solid rgba(167, 218, 219, 0.1)',
  })
}));

// Data
const modules = [
  { 
    id: 'polaris', 
    icon: Compass, 
    name: 'Solara Polaris', 
    tagline: 'AI Learning Blueprint Generator', 
    description: 'AI-powered needs analysis that translates stakeholder requirements into comprehensive learning experience designs.',
    features: ['Requirement gathering', 'Objective generation', 'Gap analysis', 'Real-time feedback'],
    accentColor: BRAND_TEAL, 
    status: 'Live Now',
    isLive: true
  },
  { 
    id: 'constellation', 
    icon: Network, 
    name: 'Solara Constellation', 
    tagline: 'Content-to-Blueprint Automation', 
    description: 'Intelligently maps existing content, performs instructional design, and identifies content gaps.',
    features: ['Polaris integration', 'Content mapping', 'Automated storyboarding', 'Gap analysis'],
    accentColor: BRAND_TEAL, 
    status: 'Coming Soon' 
  },
  { 
    id: 'nova', 
    icon: Sparkles, 
    name: 'Solara Nova', 
    tagline: 'AI-Assisted Content Authoring', 
    description: 'Next-generation content authoring with AI assistance for creating engaging learning experiences.',
    features: ['AI content generation', 'Interactive elements', 'Multimedia integration', 'Accessibility automation'],
    accentColor: BRAND_TEAL, 
    status: 'Coming Soon' 
  },
  { 
    id: 'orbit', 
    icon: OrbitIcon, 
    name: 'Solara Orbit', 
    tagline: 'Personalized Learning Delivery', 
    description: 'Deliver personalized learning journeys at scale with adaptive pathways and recommendations.',
    features: ['Adaptive paths', 'Progress tracking', 'Personalized delivery', 'Performance insights'],
    accentColor: BRAND_TEAL, 
    status: 'Coming Soon' 
  },
  { 
    id: 'nebula', 
    icon: Brain, 
    name: 'Solara Nebula', 
    tagline: 'Intelligent Learning Assistant', 
    description: 'Personalized tutoring support that adapts to each learner\'s pace and style with real-time guidance.',
    features: ['AI tutoring', 'Adaptive support', 'Real-time guidance', 'Style adaptation'],
    accentColor: BRAND_TEAL, 
    status: 'Coming Soon' 
  },
  { 
    id: 'spectrum', 
    icon: BarChart3, 
    name: 'Solara Spectrum', 
    tagline: 'Advanced Learning Analytics', 
    description: 'Reveal deep insights into learning effectiveness by analyzing complex data with clarity.',
    features: ['Effectiveness analytics', 'Data analysis', 'Insight visualization', 'Pattern recognition'],
    accentColor: BRAND_TEAL, 
    status: 'Coming Soon' 
  },
];

const capabilities = [
  { icon: Target, title: 'AI-Powered Learning Design', description: 'Leverage AI to create pedagogically sound, engaging learning experiences that adapt to learner needs.' },
  { icon: Users, title: 'Collaborative Workflows', description: 'Enable seamless collaboration between SMEs, designers, and stakeholders throughout the design process.' },
  { icon: LayoutGrid, title: 'Modular Content Architecture', description: 'Build reusable learning components that can be mixed and repurposed across multiple programs.' },
  { icon: BarChart, title: 'Data-Driven Insights', description: 'Make informed decisions with comprehensive analytics on learner engagement and outcomes.' },
  { icon: Zap, title: 'Seamless Integration', description: 'Connect with your existing HRMS, LMS, and enterprise tools for a unified learning ecosystem.' },
  { icon: ShieldCheck, title: 'Enterprise-Grade Security', description: 'Protect your intellectual property with industry-leading security standards and compliance.' },
];

const businessImpact = [
  { metric: '70%', label: 'Faster Development', title: 'Accelerated Time-to-Market', description: 'Reduce course development time with AI-assisted design and automation.', icon: Rocket },
  { metric: '60%', label: 'Cost Reduction', title: 'Significant Cost Savings', description: 'Lower development costs while maintaining quality through intelligent automation.', icon: Zap },
  { metric: '85%', label: 'Higher Engagement', title: 'Improved Learning Outcomes', description: 'Deliver measurable improvements in learner engagement and performance.', icon: Lightbulb },
  { metric: '10x', label: 'Scalability', title: 'Scalable Growth', description: 'Scale your learning programs efficiently without proportional increases in resources.', icon: OrbitIcon },
];

const comparisonData = [
  { feature: 'Content Creation', legacy: 'Manual storyboarding & research', solara: 'AI-automated blueprinting & mapping' },
  { feature: 'Personalization', legacy: 'One-size-fits-all static courses', solara: 'Real-time adaptive learning paths' },
  { feature: 'Delivery Speed', legacy: 'Months for a single program', solara: 'Days to hours with AI assistance' },
  { feature: 'Insights', legacy: 'Reactive, basic completion rates', solara: 'Predictive analytics & effectiveness gaps' },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'legacy' | 'solara'>('solara');
  const { useWorldClassEntrance, getStaggerProps } = useOptimizedAnimations();

  // Reveal entrance for elements
  useWorldClassEntrance(containerRef, '.reveal-item');

  return (
    <Box ref={containerRef} sx={{ background: BRAND_DARK, color: '#fff' }}>
      <SkipToContent />

      {/* Hero Section - Pure Typographic focused */}
      <HeroSection role="banner" sx={{ py: { xs: 15, md: 25 }, minHeight: { xs: 'auto', md: '80vh' } }}>
        <RetroGrid className="opacity-30" lightLineColor={BRAND_TEAL} darkLineColor={BRAND_TEAL} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ maxWidth: '900px' }}>
            <Box className="reveal-item" sx={{ mb: 4 }}>
              <AnimatedShinyText className="inline-flex items-center justify-start px-0 py-1 transition ease-out">
                <Chip
                  icon={<Sparkles size={16} color={BRAND_TEAL} />}
                  label="Solara — The Intelligent Learning Universe"
                  sx={{ 
                    background: 'rgba(167, 218, 219, 0.1)', 
                    color: BRAND_TEAL, 
                    fontWeight: 700, 
                    border: `1px solid ${BRAND_TEAL}30`,
                    cursor: 'pointer'
                  }}
                />
              </AnimatedShinyText>
            </Box>

            <Box className="reveal-item">
              <Typography variant="h1" sx={{ mb: 3, fontSize: { xs: '2.75rem', sm: '4.5rem', md: '6.5rem' }, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em' }}>
                The Future of Learning, <SolidAccentText>Orchestrated.</SolidAccentText>
              </Typography>
            </Box>

            <Box className="reveal-item">
              <Typography variant="h5" sx={{ mb: 6, color: '#b0c5c6', lineHeight: 1.5, fontSize: { xs: '1.1rem', md: '1.75rem' }, fontWeight: 400, maxWidth: '750px', opacity: 0.9 }}>
                Solara is not just a platform—it's a complete ecosystem that reimagines every facet of learning design and delivery with unprecedented intelligence.
              </Typography>
            </Box>

            <Box className="reveal-item" sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, flexWrap: 'wrap' }}>
              <CTAButton component={Link} href="/polaris" variant="contained" endIcon={<ArrowRight size={20} />} strength={0.1}>
                Experience Solara
              </CTAButton>
              <SecondaryButton component={Link} href="/polaris" variant="outlined" strength={0.1}>
                Explore Modules
              </SecondaryButton>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <PageSection sx={{ py: { xs: 8, md: 15 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'left', mb: { xs: 6, md: 10 } }} className="reveal-item">
            <Typography variant="overline" sx={{ color: BRAND_TEAL, fontWeight: 900, letterSpacing: '0.3em' }}>BY THE NUMBERS</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, mb: 3, fontSize: { xs: '2.25rem', sm: '3.5rem', md: '4.5rem' }, lineHeight: 1.1 }}>Why Organizations Choose <SolidAccentText>Smartslate</SolidAccentText></Typography>
          </Box>

          <Grid container spacing={{ xs: 2, md: 4 }} {...getStaggerProps(0.1)}>
            {businessImpact.map((item, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <GlassCard className="reveal-item" sx={{ textAlign: 'left', p: { xs: 3, md: 5 } }}>
                  <item.icon size={28} color={BRAND_TEAL} style={{ marginBottom: 20, opacity: 0.8 }} />
                  <StatValue sx={{ fontSize: { xs: '2.75rem', md: '4rem' } }}>{item.metric}</StatValue>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: BRAND_TEAL, fontSize: { xs: '1rem', md: '1.25rem' } }}>{item.label}</Typography>
                  <Typography variant="body2" sx={{ color: '#b0c5c6', opacity: 0.8, lineHeight: 1.6 }}>{item.description}</Typography>
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageSection>

      {/* Comparison Section - Interactive Tabbed Switcher */}
      <PageSection sx={{ background: 'rgba(2, 12, 27, 0.6)', py: { xs: 10, md: 20 } }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: { xs: 6, md: 10 } }} className="reveal-item">
            <Typography variant="overline" sx={{ color: BRAND_TEAL, fontWeight: 900, letterSpacing: '0.3em' }}>SOLARA VS LEGACY</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, mb: 3, fontSize: { xs: '2.25rem', sm: '3.5rem', md: '4rem' } }}>The <SolidAccentText>Evolution</SolidAccentText> of Learning</Typography>
          </Box>

          {/* Platform Switcher (Always visible for interactivity) */}
          <Box sx={{ display: 'flex', mb: 6, background: 'rgba(255,255,255,0.05)', borderRadius: '16px', p: 0.75, maxWidth: '500px' }}>
            <Button 
              fullWidth 
              onClick={() => setActiveTab('legacy')} 
              sx={{ 
                borderRadius: '12px', 
                color: activeTab === 'legacy' ? '#fff' : 'rgba(255,255,255,0.4)', 
                background: activeTab === 'legacy' ? 'rgba(255,255,255,0.1)' : 'transparent',
                fontWeight: 700,
                textTransform: 'none',
                py: 1.5,
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              Legacy Learning
            </Button>
            <Button 
              fullWidth 
              onClick={() => setActiveTab('solara')} 
              sx={{ 
                borderRadius: '12px', 
                color: activeTab === 'solara' ? '#fff' : 'rgba(255,255,255,0.4)', 
                background: activeTab === 'solara' ? BRAND_TEAL + '20' : 'transparent',
                fontWeight: 700,
                textTransform: 'none',
                py: 1.5,
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            >
              Solara AI
            </Button>
          </Box>

          {/* Dynamic Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === 'solara' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: activeTab === 'solara' ? -20 : 20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <Grid container spacing={4}>
                {activeTab === 'legacy' ? (
                  <Grid size={12}>
                    <Box sx={{ p: { xs: 4, md: 6 }, borderRadius: '32px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <Typography variant="h4" sx={{ mb: 6, fontWeight: 800, opacity: 0.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                        Static Learning Infrastructure
                      </Typography>
                      <Grid container spacing={4}>
                        {comparisonData.map((item, i) => (
                          <Grid size={{ xs: 12, md: 6 }} key={i}>
                            <Box sx={{ pb: 3, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                              <Typography variant="caption" sx={{ color: BRAND_TEAL, fontWeight: 800, letterSpacing: '0.1em', display: 'block', mb: 1.5 }}>{item.feature.toUpperCase()}</Typography>
                              <Typography variant="h6" sx={{ fontWeight: 500, opacity: 0.7, fontSize: '1.15rem' }}>{item.legacy}</Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                ) : (
                  <Grid size={12}>
                    <Box sx={{ p: { xs: 4, md: 6 }, borderRadius: '32px', background: `${BRAND_TEAL}10`, border: `1px solid ${BRAND_TEAL}30`, position: 'relative' }}>
                      <Box sx={{ position: 'absolute', top: 30, right: 30, background: BRAND_TEAL, color: BRAND_DARK, px: 2, py: 0.75, borderRadius: '24px', fontSize: '0.75rem', fontWeight: 900 }}>ORCHESTRATED</Box>
                      <Typography variant="h4" sx={{ mb: 6, fontWeight: 800, color: BRAND_TEAL, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Zap size={28} fill={BRAND_TEAL} />
                        Next-Gen Intelligent Universe
                      </Typography>
                      <Grid container spacing={4}>
                        {comparisonData.map((item, i) => (
                          <Grid size={{ xs: 12, md: 6 }} key={i}>
                            <Box sx={{ pb: 3, borderBottom: `1px solid ${BRAND_TEAL}20` }}>
                              <Typography variant="caption" sx={{ color: BRAND_TEAL, fontWeight: 800, letterSpacing: '0.1em', display: 'block', mb: 1.5 }}>{item.feature.toUpperCase()}</Typography>
                              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.25rem' }}>{item.solara}</Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </motion.div>
          </AnimatePresence>
        </Container>
      </PageSection>

      {/* Solara Modules Section */}
      <PageSection sx={{ py: { xs: 10, md: 20 } }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: { xs: 8, md: 12 } }} className="reveal-item">
            <Chip label="SOLARA PLATFORM" sx={{ mb: 3, background: `${BRAND_TEAL}10`, color: BRAND_TEAL, fontWeight: 800, border: `1px solid ${BRAND_TEAL}30` }} />
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '2.25rem', sm: '3.5rem', md: '5rem' }, lineHeight: 1 }}>The Complete <SolidAccentText>Learning Universe</SolidAccentText></Typography>
            <Typography variant="h6" sx={{ color: '#b0c5c6', maxWidth: '800px', fontWeight: 400, fontSize: { xs: '1rem', md: '1.5rem' }, opacity: 0.8 }}>
              Solara is our flagship platform—a unified ecosystem that covers every stage of the learning lifecycle, from needs analysis to delivery and analytics.
            </Typography>
          </Box>

          <Grid container spacing={{ xs: 2.5, md: 4 }} {...getStaggerProps(0.1)}>
            {modules.map((module) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={module.id}>
                <GlassCard className="reveal-item" sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: { xs: 3.5, md: 5 } }}>
                  <Badge label={module.status} variant_type={module.isLive ? 'live' : 'soon'} />
                  <IconBox>
                    <module.icon size={30} />
                  </IconBox>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '1.5rem', md: '2.25rem' } }}>{module.name}</Typography>
                  <Typography variant="subtitle2" sx={{ color: BRAND_TEAL, fontWeight: 700, mb: 3, letterSpacing: '0.05em', fontSize: '0.7rem' }}>{module.tagline.toUpperCase()}</Typography>
                  <Typography variant="body1" sx={{ color: '#b0c5c6', mb: 4, lineHeight: 1.6, flexGrow: 1, fontSize: '0.95rem' }}>{module.description}</Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    {module.features.map((feat, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.25 }}>
                        <CheckCircle2 size={16} color={BRAND_TEAL} style={{ opacity: 0.7 }} />
                        <Typography variant="body2" sx={{ color: '#b0c5c6', opacity: 0.9, fontSize: '0.85rem' }}>{feat}</Typography>
                      </Box>
                    ))}
                  </Box>

                  {module.isLive ? (
                    <Button 
                      component={Link} 
                      href="/polaris" 
                      variant="text" 
                      endIcon={<ArrowRight size={18} />}
                      sx={{ color: BRAND_TEAL, fontWeight: 800, alignSelf: 'flex-start', p: 0, fontSize: '0.95rem', '&:hover': { background: 'transparent', transform: 'translateX(5px)' }, transition: 'all 0.3s' }}
                    >
                      Experience Now
                    </Button>
                  ) : (
                    <Typography variant="caption" sx={{ color: 'rgba(167, 218, 219, 0.3)', fontWeight: 600 }}>In active development</Typography>
                  )}
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageSection>

      {/* Core Capabilities */}
      <PageSection sx={{ py: { xs: 8, md: 15 }, background: 'rgba(2, 12, 27, 0.4)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'left', mb: { xs: 6, md: 10 } }} className="reveal-item">
            <Typography variant="overline" sx={{ color: BRAND_TEAL, fontWeight: 900, letterSpacing: '0.3em' }}>CORE CAPABILITIES</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, mb: 3, fontSize: { xs: '2.25rem', sm: '3.5rem', md: '4.5rem' }, lineHeight: 1.1 }}>Built for <SolidAccentText>Learning Excellence</SolidAccentText></Typography>
          </Box>

          <Grid container spacing={{ xs: 2, md: 4 }} {...getStaggerProps(0.1)}>
            {capabilities.map((cap, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
                  <Box className="reveal-item" sx={{ p: 4, borderRadius: '24px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${BRAND_TEAL}15`, height: '100%', transition: 'border 0.3s ease', '&:hover': { borderColor: `${BRAND_TEAL}40` } }}>
                    <Box sx={{ mb: 3, color: BRAND_TEAL }}>
                      <cap.icon size={28} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, fontSize: '1.1rem' }}>{cap.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#b0c5c6', lineHeight: 1.8, opacity: 0.8, fontSize: '0.9rem' }}>{cap.description}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageSection>

      {/* CTA Section */}
      <PageSection sx={{ py: { xs: 12, md: 25 }, background: BRAND_DARK }}>
        <Container maxWidth="lg" sx={{ textAlign: 'left', position: 'relative', zIndex: 1 }}>
          <Box className="reveal-item">
            <Star size={64} color={BRAND_TEAL} style={{ marginBottom: 32 }} />
          </Box>
          <Box className="reveal-item">
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 4, fontSize: { xs: '2.75rem', sm: '4rem', md: '5.5rem' }, lineHeight: 1 }}>Ready to <SolidAccentText>Transform?</SolidAccentText></Typography>
          </Box>
          <Box className="reveal-item">
            <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 8, lineHeight: 1.6, fontWeight: 400, maxWidth: '800px', fontSize: { xs: '1.1rem', md: '1.75rem' }, opacity: 0.8 }}>
              See how Smartslate can help you build a future-ready workforce with intelligent, scalable learning solutions.
            </Typography>
          </Box>
          <Box className="reveal-item" sx={{ display: 'flex', gap: 3, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <CTAButton component={Link} href="/contact" variant="contained" strength={0.1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
              Schedule a Demo
            </CTAButton>
          </Box>
        </Container>
      </PageSection>
    </Box>
  );
}
