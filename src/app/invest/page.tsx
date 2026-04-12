'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Chip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Rocket, 
  ChevronLeft, 
  ChevronRight, 
  Shield, 
  Zap, 
  BarChart3, 
  Users, 
  Globe, 
  Award,
  ArrowRight
} from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// Brand colors
const brandColors = {
  primary: '#a7dadb',
  secondary: '#7C69F5',
  background: '#020C1B',
  surface: '#0d1b2a',
  textPrimary: '#ffffff',
  textSecondary: '#b0c5c6',
};

const SlideContainer = styled(Box)(() => ({
  width: '100vw',
  height: '100vh',
  background: brandColors.background,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
}));

const SlideWrapper = styled(Box)(() => ({
  width: '90%',
  maxWidth: '1400px',
  height: '80%',
  position: 'relative',
}));

const SlideContent = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '40px',
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  borderRadius: '32px',
  border: '1px solid rgba(167, 218, 219, 0.1)',
}));

const GradientText = styled('span')(() => ({
  background: `linear-gradient(90deg, ${brandColors.primary}, ${brandColors.secondary})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

const HighlightText = styled('span')(() => ({
  color: brandColors.primary,
  fontWeight: 700,
}));

// Slide components
const CoverSlide = () => {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    gsap.from('.invest-reveal', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }, { scope: container });

  return (
    <Box ref={container} sx={{ textAlign: 'center', maxWidth: '85%', width: '100%' }}>
      <Box className="invest-reveal">
        <Chip
          label="INVESTOR PITCH DECK"
          sx={{
            mb: 1.5,
            backgroundColor: `${brandColors.primary}20`,
            color: brandColors.primary,
            border: `1px solid ${brandColors.primary}40`,
            fontWeight: 600,
            fontSize: 'clamp(0.65rem, 1vh, 0.85rem)',
            letterSpacing: '0.15em',
          }}
        />
      </Box>
      <Box className="invest-reveal">
        <Typography
          variant="h1"
          sx={{
            fontSize: 'clamp(2.5rem, 5.5vh, 4.5rem)',
            fontWeight: 700,
            fontFamily: 'Quicksand, sans-serif',
            mb: 1.5,
            color: brandColors.textPrimary,
            lineHeight: 1.1,
          }}
        >
          SMARTSLATE <GradientText>SOLARA</GradientText>
        </Typography>
      </Box>
      <Box className="invest-reveal">
        <Typography
          variant="h4"
          sx={{
            fontSize: 'clamp(1.1rem, 2.2vh, 1.8rem)',
            fontWeight: 600,
            color: brandColors.textSecondary,
            mb: 2.5,
            fontFamily: 'Lato, sans-serif',
          }}
        >
          The Future of Corporate Learning Technology
        </Typography>
      </Box>
      <Box className="invest-reveal">
        <Typography
          variant="h6"
          sx={{
            fontSize: 'clamp(0.85rem, 1.6vh, 1.1rem)',
            color: brandColors.textSecondary,
            mb: 3,
            lineHeight: 1.7,
            maxWidth: '75%',
            mx: 'auto',
          }}
        >
          An <HighlightText>AI-native</HighlightText>, unified learning platform replacing fragmented tool ecosystems
        </Typography>
      </Box>
      <Box className="invest-reveal">
        <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: '90%', mx: 'auto' }}>
          {[
            { icon: <TrendingUp size={20} />, label: 'Series A Raise', value: '$15-20M' },
            { icon: <Target size={20} />, label: 'Market Opportunity', value: '$200B+' },
            { icon: <Rocket size={20} />, label: 'Target ARR (2028)', value: '$150M' },
          ].map((item, idx) => (
            <Grid item xs={4} key={idx}>
              <Box sx={{ p: 2, borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <Box sx={{ color: brandColors.primary, mb: 1, display: 'flex', justifyContent: 'center' }}>{item.icon}</Box>
                <Typography variant="body2" sx={{ color: brandColors.textSecondary, fontSize: '0.75rem', mb: 0.5 }}>{item.label}</Typography>
                <Typography variant="h6" sx={{ color: brandColors.textPrimary, fontWeight: 700, fontSize: '1.1rem' }}>{item.value}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const ProblemSlide = () => (
  <Box sx={{ width: '100%', maxWidth: '90%' }}>
    <Typography variant="h3" sx={{ color: brandColors.primary, fontWeight: 700, mb: 4 }}>
      The Problem: Fragmented Ecosystems
    </Typography>
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <Box sx={{ p: 4, borderRadius: '24px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <Typography variant="h5" sx={{ color: '#ef4444', fontWeight: 700, mb: 3 }}>Inefficiency</Typography>
          <Typography variant="body1" sx={{ color: brandColors.textSecondary, mb: 2 }}>
            Average enterprise uses <HighlightText>12+ disconnected tools</HighlightText> for learning development and delivery.
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {['Siloed data across platforms', 'Broken learner experiences', 'Massive manual overhead', 'Zero ROI visibility'].map((text, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
                <Typography variant="body2" sx={{ color: brandColors.textSecondary }}>{text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ p: 4, borderRadius: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Typography variant="h2" sx={{ color: '#ef4444', fontWeight: 900, mb: 1 }}>$300B+</Typography>
          <Typography variant="h6" sx={{ color: brandColors.textPrimary, mb: 3 }}>Annual Corporate Training Spend</Typography>
          <Typography variant="body1" sx={{ color: brandColors.textSecondary }}>
            Yet <HighlightText>70% of employees</HighlightText> report they don't have the skills needed to do their jobs. The ROI gap is widening.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

const SolutionSlide = () => (
  <Box sx={{ width: '100%', maxWidth: '90%' }}>
    <Typography variant="h3" sx={{ color: brandColors.primary, fontWeight: 700, mb: 4 }}>
      The Solution: Solara Ecosystem
    </Typography>
    <Grid container spacing={3}>
      {[
        { name: 'Polaris', desc: 'AI Needs Analysis & Blueprinting', icon: <Zap /> },
        { name: 'Constellation', desc: 'Automated Content Architecture', icon: <Globe /> },
        { name: 'Nova', desc: 'AI-Coauthored High-Fidelity Content', icon: <Rocket /> },
        { name: 'Orbit', desc: 'Adaptive Learning Delivery', icon: <Users /> },
        { name: 'Nebula', desc: 'Intelligent Learning Assistance', icon: <Shield /> },
        { name: 'Spectrum', desc: 'Predictive Learning Analytics', icon: <BarChart3 /> },
      ].map((module, i) => (
        <Grid item xs={4} key={i}>
          <Box sx={{ p: 3, borderRadius: '20px', background: 'rgba(167, 218, 219, 0.05)', border: '1px solid rgba(167, 218, 219, 0.1)', height: '100%' }}>
            <Box sx={{ color: brandColors.primary, mb: 2 }}>{module.icon}</Box>
            <Typography variant="h6" sx={{ color: brandColors.textPrimary, fontWeight: 700, mb: 1 }}>{module.name}</Typography>
            <Typography variant="body2" sx={{ color: brandColors.textSecondary, lineHeight: 1.5 }}>{module.desc}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const TractionSlide = () => (
  <Box sx={{ width: '100%', maxWidth: '90%' }}>
    <Typography variant="h3" sx={{ color: brandColors.primary, fontWeight: 700, mb: 4 }}>
      Market Traction & Roadmap
    </Typography>
    <Grid container spacing={4}>
      <Grid item xs={7}>
        <Box sx={{ p: 4, borderRadius: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <Typography variant="h6" sx={{ color: brandColors.primary, mb: 3, fontWeight: 700 }}>Key Milestones</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[
              { date: 'Q4 2025', event: 'Polaris Beta Launch (150+ Companies Waitlisted)' },
              { date: 'Q2 2026', event: 'Constellation & Nova Integration' },
              { date: 'Q4 2026', event: 'Orbit Global Rollout' },
              { date: '2027', event: 'Spectrum Analytics & Nebula AI Tutor' },
            ].map((item, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 2 }}>
                <Typography sx={{ color: brandColors.primary, fontWeight: 800, minWidth: '80px' }}>{item.date}</Typography>
                <Typography sx={{ color: brandColors.textSecondary }}>{item.event}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box sx={{ p: 4, borderRadius: '24px', background: `${brandColors.secondary}15`, border: `1px solid ${brandColors.secondary}30` }}>
          <Typography variant="h2" sx={{ color: brandColors.secondary, fontWeight: 900, mb: 1 }}>15x</Typography>
          <Typography variant="h6" sx={{ color: brandColors.textPrimary, mb: 2 }}>Efficiency Gain</Typography>
          <Typography variant="body2" sx={{ color: brandColors.textSecondary }}>
            Our pilot data shows Polaris reduces the discovery-to-blueprint phase from <HighlightText>6 weeks to 3 minutes</HighlightText>.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default function InvestPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    <CoverSlide />,
    <ProblemSlide />,
    <SolutionSlide />,
    <TractionSlide />,
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <SlideContainer>
      <Box sx={{ position: 'fixed', top: 40, left: 40, zIndex: 10 }}>
        <Typography variant="h6" sx={{ color: brandColors.primary, fontWeight: 900, letterSpacing: '0.1em' }}>
          SOLARA
        </Typography>
      </Box>

      <SlideWrapper>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -50 : 50, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <SlideContent>
              {slides[currentSlide]}
            </SlideContent>
          </motion.div>
        </AnimatePresence>
      </SlideWrapper>

      <Box sx={{ position: 'fixed', bottom: 40, right: 40, display: 'flex', gap: 2, zIndex: 10 }}>
        <IconButton 
          onClick={handlePrev} 
          disabled={currentSlide === 0}
          sx={{ color: brandColors.primary, border: `1px solid ${brandColors.primary}40` }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton 
          onClick={handleNext} 
          disabled={currentSlide === slides.length - 1}
          sx={{ color: brandColors.primary, border: `1px solid ${brandColors.primary}40` }}
        >
          <ChevronRight />
        </IconButton>
      </Box>

      <Box sx={{ position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
          {currentSlide + 1} / {slides.length}
        </Typography>
      </Box>
    </SlideContainer>
  );
}
