'use client';

import { Box, Container, Typography, Grid, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import {
  Compass,
  ArrowRight,
  Zap,
  Target,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  PieChart,
  LayoutTemplate,
  Download,
  Share2
} from 'lucide-react';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { FloatingOrb } from '@/components/animations/FloatingOrb';
import { RetroGrid } from '@/components/ui/retro-grid';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { MagicCard } from '@/components/ui/magic-card';

// Colors
const BRAND_TEAL = '#06b6d4';
const BRAND_DARK = '#020C1B';
const BRAND_INDIGO = '#4F46E5';

const starGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 15px rgba(6, 182, 212, 0.4)); transform: scale(1); }
  50% { filter: drop-shadow(0 0 30px rgba(6, 182, 212, 0.8)); transform: scale(1.05); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const PageSection = styled(Box)(({ theme }) => ({
  padding: '64px 0',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: '48px 0',
  },
}));

const HeroSection = styled(Box)(({ theme }) => ({
  padding: 'calc(var(--header-total-height-mobile) + 1.5rem) 0 4rem',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: BRAND_DARK,
  [theme.breakpoints.up('md')]: {
    padding: 'calc(var(--header-total-height-desktop) + 3rem) 0 6rem',
  },
}));

const SolidAccentText = styled('span')(() => ({
  color: BRAND_TEAL,
  display: 'inline-block',
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
  background: 'rgba(6, 182, 212, 0.1)',
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
    background: 'rgba(6, 182, 212, 0.2)',
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

const features = [
  {
    title: "Intelligent Context Capture",
    description: "Evaluates role, experience, and organizational context to identify precise learning gaps.",
    icon: Target,
  },
  {
    title: "Dynamic Generation",
    description: "Adapts to user input to generate 50-70 highly contextualized, personalized learning pathways.",
    icon: Sparkles,
  },
  {
    title: "Comprehensive Blueprints",
    description: "Outputs executive summaries, SMART objectives, strategies, timelines, and measurable KPIs.",
    icon: FileText,
  },
  {
    title: "Flexible Display Modes",
    description: "Visualize data through infographics, markdown narratives, timelines, and rich charts.",
    icon: PieChart,
  },
  {
    title: "Seamless Export",
    description: "Generate professional PDF, Word, and Markdown documents instantly for stakeholders.",
    icon: Download,
  },
  {
    title: "Collaborative Sharing",
    description: "Share live links with your team for immediate review and iterative refinement.",
    icon: Share2,
  }
];

export default function PolarisPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, useWorldClassEntrance, getStaggerProps } = useOptimizedAnimations();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Premium Entrance Reveal
  useWorldClassEntrance(containerRef, '.reveal-item');

  const stats = [
    { icon: Zap, value: '15x', label: 'Faster Requirements' },
    { icon: Target, value: '100%', label: 'Business Alignment' },
    { icon: CheckCircle2, value: 'Zero', label: 'Revision Cycles' },
    { icon: Clock, value: '2 Min', label: 'Avg. Generation Time' },
  ];

  return (
    <Box ref={containerRef} sx={{ background: BRAND_DARK, color: '#fff', overflowX: 'hidden' }}>
      
      {/* Hero Section */}
      <HeroSection>
        <RetroGrid className="opacity-30" lightLineColor={BRAND_TEAL} darkLineColor={BRAND_TEAL} />
        <FloatingOrb size="80vw" color={BRAND_TEAL} x="-10%" y="-20%" opacity={0.15} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Box className="reveal-item" sx={{ mb: 4 }}>
                <AnimatedShinyText className="inline-flex items-center justify-start px-0 py-1 transition ease-out">
                  <Chip
                    icon={<Sparkles size={16} color={BRAND_TEAL} />}
                    label="NOW IN PUBLIC BETA"
                    sx={{ 
                      background: 'rgba(6, 182, 212, 0.1)', 
                      color: BRAND_TEAL, 
                      fontWeight: 800, 
                      border: `1px solid ${BRAND_TEAL}30`,
                      cursor: 'pointer'
                    }}
                  />
                </AnimatedShinyText>
              </Box>
              <Box className="reveal-item">
                <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '3rem', sm: '4.5rem', md: '5.5rem' }, lineHeight: 1, mb: 3, letterSpacing: '-0.04em' }}>
                  The North Star of <SolidAccentText>Learning Design.</SolidAccentText>
                </Typography>
              </Box>
              <Box className="reveal-item">
                <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 6, maxWidth: 650, lineHeight: 1.5, fontSize: { xs: '1.1rem', md: '1.5rem' }, fontWeight: 400, opacity: 0.9 }}>
                  Polaris automates the most difficult 40% of instructional design—transforming raw requirements into rigorous, implementation-ready learning blueprints in minutes.
                </Typography>
              </Box>
              <Box className="reveal-item" sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <CTAButton variant="contained" strength={0.1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                  Start Free Trial
                </CTAButton>
                <SecondaryButton variant="outlined" strength={0.1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
                  Watch Demo
                </SecondaryButton>
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box className="visual-reveal" sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <motion.div style={{ rotate }}>
                  <Box sx={{ width: 450, height: 450, borderRadius: '50%', border: `1px dashed ${BRAND_TEAL}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ width: 220, height: 220, borderRadius: '50%', background: BRAND_TEAL, animation: `${starGlow} 4s infinite ease-in-out`, boxShadow: `0 0 80px ${BRAND_TEAL}80`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Compass size={110} color={BRAND_DARK} strokeWidth={2} />
                    </Box>
                  </Box>
                </motion.div>
                {/* Orbiting Elements */}
                {[0, 120, 240].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 225 - 24;
                  const y = Math.sin(rad) * 225 - 24;
                  return (
                    <Box key={i} sx={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`, animation: `${float} ${3 + i}s infinite ease-in-out` }}>
                      <Box sx={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', border: `1px solid ${BRAND_TEAL}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: BRAND_TEAL }}>
                         {i === 0 && <LayoutTemplate size={20} />}
                         {i === 1 && <PieChart size={20} />}
                         {i === 2 && <Target size={20} />}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <PageSection sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(2, 12, 27, 0.4)' }}>
        <Container maxWidth="lg">
          <motion.div {...getStaggerProps(0.1)}>
            <Grid container spacing={{ xs: 2, md: 4 }}>
              {stats.map((stat, i) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                  <Box className="reveal-item" sx={{ textAlign: 'center', p: { xs: 3, md: 5 }, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: `1px solid ${BRAND_TEAL}10`, transition: 'all 0.3s ease', '&:hover': { borderColor: `${BRAND_TEAL}40`, transform: 'translateY(-4px)' } }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: '16px', background: `${BRAND_TEAL}15`, color: BRAND_TEAL, mb: 3 }}>
                      <stat.icon size={32} />
                    </Box>
                    <Typography variant="h2" sx={{ fontWeight: 900, color: BRAND_TEAL, fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 1 }}>{stat.value}</Typography>
                    <Typography variant="body2" sx={{ color: '#b0c5c6', fontWeight: 700, letterSpacing: '0.05em' }}>{stat.label.toUpperCase()}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </PageSection>

      {/* Features Grid */}
      <PageSection sx={{ py: { xs: 10, md: 16 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'left', mb: { xs: 8, md: 10 } }} className="reveal-item">
            <Typography variant="overline" sx={{ color: BRAND_TEAL, fontWeight: 900, letterSpacing: '0.3em' }}>INTELLIGENT WORKFLOWS</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 2, mb: 3, fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }, lineHeight: 1.1 }}>Precision in every <SolidAccentText>Blueprint.</SolidAccentText></Typography>
          </Box>

          <motion.div {...getStaggerProps(0.1)}>
            <Grid container spacing={{ xs: 2, md: 4 }}>
              {features.map((feature, idx) => (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={idx}>
                  <Box className="reveal-item" sx={{ height: '100%' }}>
                    <MagicCard className="p-8 w-full h-full flex flex-col justify-start" gradientColor="rgba(6, 182, 212, 0.15)">
                      <Box sx={{ width: 48, height: 48, borderRadius: '12px', background: `${BRAND_TEAL}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4, color: BRAND_TEAL, border: `1px solid ${BRAND_TEAL}40` }}>
                        <feature.icon size={24} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: '#fff' }}>{feature.title}</Typography>
                      <Typography variant="body1" sx={{ color: '#b0c5c6', lineHeight: 1.7 }}>{feature.description}</Typography>
                    </MagicCard>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </PageSection>

      {/* CTA Section */}
      <PageSection sx={{ py: { xs: 12, md: 20 }, background: BRAND_DARK }}>
        <FloatingOrb size="60vw" color={BRAND_TEAL} x="60%" y="10%" opacity={0.1} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Box className="reveal-item" sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '24px', background: `${BRAND_TEAL}20`, color: BRAND_TEAL, mb: 4, border: `1px solid ${BRAND_TEAL}40` }}>
            <Compass size={40} />
          </Box>
          <Box className="reveal-item">
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 4, fontSize: { xs: '2.75rem', sm: '4rem', md: '5rem' }, lineHeight: 1 }}>Ready to reach the <SolidAccentText>North Star?</SolidAccentText></Typography>
          </Box>
          <Box className="reveal-item">
            <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 8, lineHeight: 1.6, fontWeight: 400, fontSize: { xs: '1.1rem', md: '1.5rem' }, opacity: 0.9 }}>
              Stop wasting weeks on meetings and manual analysis. Join the future of learning design today.
            </Typography>
          </Box>
          <Box className="reveal-item" sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <CTAButton variant="contained" strength={0.1} sx={{ px: 6, py: 2, fontSize: '1.1rem', width: { xs: '100%', sm: 'auto' } }}>
              Get Started for Free
            </CTAButton>
          </Box>
        </Container>
      </PageSection>

    </Box>
  );
}
