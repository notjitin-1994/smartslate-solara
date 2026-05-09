'use client';

import { Box, Container, Typography, Button, Grid, Chip, useTheme } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, useTransform, useScroll } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
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
}));

const HeroSection = styled(Box)(() => ({
  padding: '120px 0 80px', // Extra top padding for header clearance, consistent bottom
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: BRAND_DARK,
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

const StatValue = styled(Typography)(() => ({
  fontSize: '3.5rem',
  fontWeight: 900,
  color: BRAND_TEAL,
  lineHeight: 1,
  marginBottom: '8px',
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

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { useWorldClassEntrance, getStaggerProps } = useOptimizedAnimations();

  // Reveal entrance for elements
  useWorldClassEntrance(containerRef, '.reveal-item');

  return (
    <Box ref={containerRef} sx={{ background: BRAND_DARK, color: '#fff' }}>
      <SkipToContent />

      {/* Hero Section */}
      <HeroSection role="banner">
        <RetroGrid className="opacity-50" lightLineColor={BRAND_TEAL} darkLineColor={BRAND_TEAL} />
        <FloatingOrb size="80vw" color={BRAND_TEAL} x="-10%" y="-10%" opacity={0.15} />
        <FloatingOrb size="60vw" color={BRAND_INDIGO} x="50%" y="30%" opacity={0.1} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Box className="reveal-item" sx={{ mb: 4 }}>
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 dark:hover:text-neutral-400">
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
                <Typography variant="h1" sx={{ mb: 3, fontSize: { xs: '3.5rem', md: '5.5rem' }, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.04em' }}>
                  The Future of Learning, <SolidAccentText>Orchestrated.</SolidAccentText>
                </Typography>
              </Box>

              <Box className="reveal-item">
                <Typography variant="h5" sx={{ mb: 6, color: '#b0c5c6', lineHeight: 1.5, fontSize: '1.5rem', fontWeight: 500, maxWidth: '650px' }}>
                  Solara is not just a platform—it's a complete ecosystem that reimagines every facet of learning design and delivery with unprecedented intelligence.
                </Typography>
              </Box>

              <Box className="reveal-item" sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <CTAButton component={Link} href="/polaris" variant="contained" endIcon={<ArrowRight size={20} />} strength={0.1}>
                  Experience Solara
                </CTAButton>
                <SecondaryButton component={Link} href="/polaris" variant="outlined" strength={0.1}>
                  Explore Modules
                </SecondaryButton>
              </Box>
            </Grid>

            {/* Visual Element */}
            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box className="visual-reveal" sx={{ position: 'relative' }}>
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  style={{ width: '500px', height: '500px', borderRadius: '50%', border: `1px dashed ${BRAND_TEAL}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Box sx={{ width: 140, height: 140, borderRadius: '50%', background: BRAND_TEAL, animation: `${starGlow} 4s infinite ease-in-out`, boxShadow: `0 0 60px ${BRAND_TEAL}60` }} />
                </motion.div>
                
                {/* Orbiting Icons */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = 250 + Math.cos(rad) * 200 - 30;
                  const y = 250 + Math.sin(rad) * 200 - 30;
                  return (
                    <Box key={i} sx={{ position: 'absolute', left: x, top: y, animation: `${float} ${3 + i}s infinite ease-in-out` }}>
                      <Box sx={{ width: 60, height: 60, borderRadius: '16px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: `1px solid ${BRAND_TEAL}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: BRAND_TEAL }}>
                         {i === 0 && <Compass size={24} />}
                         {i === 1 && <Network size={24} />}
                         {i === 2 && <Sparkles size={24} />}
                         {i === 3 && <OrbitIcon size={24} />}
                         {i === 4 && <Brain size={24} />}
                         {i === 5 && <BarChart3 size={24} />}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Container>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', bottom: 40, left: '50%', translateX: '-50%', color: BRAND_TEAL, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.1em' }}>DISCOVER</Typography>
          <ChevronDown size={20} />
        </motion.div>
      </HeroSection>

      {/* Stats Section */}
      <PageSection>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'left', mb: 10 }} className="reveal-item">
            <Typography variant="overline" sx={{ color: BRAND_TEAL, fontWeight: 900, letterSpacing: '0.3em' }}>BY THE NUMBERS</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>Why Organizations Choose <SolidAccentText>Smartslate</SolidAccentText></Typography>
          </Box>

          <Grid container spacing={4} {...getStaggerProps(0.15)}>
            {businessImpact.map((item, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <GlassCard className="reveal-item" sx={{ textAlign: 'center', py: 6 }}>
                  <item.icon size={32} color={BRAND_TEAL} style={{ marginBottom: 24, opacity: 0.8 }} />
                  <StatValue>{item.metric}</StatValue>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: BRAND_TEAL }}>{item.label}</Typography>
                  <Typography variant="body2" sx={{ color: '#b0c5c6', opacity: 0.8 }}>{item.description}</Typography>
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageSection>

      {/* Solara Platform Section */}
      <PageSection sx={{ background: BRAND_DARK }}>
        <FloatingOrb size="40vw" color={BRAND_INDIGO} x="80%" y="10%" opacity={0.1} />
        <Container maxWidth="lg">
          <Box sx={{ mb: 12 }} className="reveal-item">
            <Chip label="SOLARA PLATFORM" sx={{ mb: 3, background: `${BRAND_TEAL}10`, color: BRAND_TEAL, fontWeight: 800, border: `1px solid ${BRAND_TEAL}30` }} />
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '2.5rem', md: '4rem' } }}>The Complete <SolidAccentText>Learning Platform</SolidAccentText></Typography>
            <Typography variant="h6" sx={{ color: '#b0c5c6', maxWidth: '800px', fontWeight: 400 }}>
              Solara is our flagship platform—a unified ecosystem that covers every stage of the learning lifecycle, from needs analysis to delivery and analytics.
            </Typography>
          </Box>

          <Grid container spacing={4} {...getStaggerProps(0.1)}>
            {modules.map((module) => (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={module.id}>
                <GlassCard className="reveal-item" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Badge label={module.status} variant_type={module.isLive ? 'live' : 'soon'} />
                  <IconBox>
                    <module.icon size={32} />
                  </IconBox>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>{module.name}</Typography>
                  <Typography variant="subtitle2" sx={{ color: BRAND_TEAL, fontWeight: 700, mb: 3, letterSpacing: '0.05em' }}>{module.tagline.toUpperCase()}</Typography>
                  <Typography variant="body1" sx={{ color: '#b0c5c6', mb: 4, lineHeight: 1.7, flexGrow: 1 }}>{module.description}</Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    {module.features.map((feat, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        <CheckCircle2 size={18} color={BRAND_TEAL} style={{ opacity: 0.8 }} />
                        <Typography variant="body2" sx={{ color: '#b0c5c6', opacity: 0.9 }}>{feat}</Typography>
                      </Box>
                    ))}
                  </Box>

                  {module.isLive ? (
                    <Button 
                      component={Link} 
                      href="/polaris" 
                      variant="text" 
                      endIcon={<ArrowRight size={18} />}
                      sx={{ color: BRAND_TEAL, fontWeight: 700, alignSelf: 'flex-start', p: 0, '&:hover': { background: 'transparent', transform: 'translateX(5px)' }, transition: 'all 0.3s' }}
                    >
                      Try it now
                    </Button>
                  ) : (
                    <Typography variant="caption" sx={{ color: 'rgba(167, 218, 219, 0.4)', fontWeight: 600 }}>Feature coming soon</Typography>
                  )}
                </GlassCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageSection>

      {/* Core Capabilities */}
      <PageSection>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'left', mb: 12 }} className="reveal-item">
            <Typography variant="overline" sx={{ color: BRAND_TEAL, fontWeight: 900, letterSpacing: '0.3em' }}>CORE CAPABILITIES</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>Built for <SolidAccentText>Learning Excellence</SolidAccentText></Typography>
          </Box>

          <Grid container spacing={4} {...getStaggerProps(0.1)}>
            {capabilities.map((cap, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
                  <Box className="reveal-item" sx={{ p: 4, borderRadius: '24px', background: 'rgba(255,255,255,0.02)', border: `1px solid ${BRAND_TEAL}15`, height: '100%', transition: 'border 0.3s ease', '&:hover': { borderColor: `${BRAND_TEAL}40` } }}>
                    <Box sx={{ mb: 3, color: BRAND_TEAL }}>
                      <cap.icon size={32} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>{cap.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#b0c5c6', lineHeight: 1.8, opacity: 0.8 }}>{cap.description}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </PageSection>

      {/* CTA Section */}
      <PageSection sx={{ background: BRAND_DARK }}>
        <FloatingOrb size="50vw" color={BRAND_INDIGO} x="70%" y="-10%" opacity={0.1} />
        <Container maxWidth="lg" sx={{ textAlign: 'left', position: 'relative', zIndex: 1 }}>
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 5, repeat: Infinity }}>
            <Star size={64} color={BRAND_TEAL} style={{ marginBottom: 32 }} />
          </motion.div>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 4, fontSize: { xs: '3rem', md: '4.5rem' } }}>Ready to Transform?</Typography>
          <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 8, lineHeight: 1.6, fontWeight: 400, maxWidth: '800px' }}>
            See how Smartslate can help you build a future-ready workforce with intelligent, scalable learning solutions.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'flex-start', flexWrap: 'wrap' }}>
            <CTAButton component={Link} href="/contact" variant="contained" strength={0.1}>
              Schedule a Demo
            </CTAButton>
          </Box>
        </Container>
      </PageSection>
    </Box>
  );
}
