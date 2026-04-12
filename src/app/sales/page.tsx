'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Container, Typography, Button, IconButton, LinearProgress } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  AlertTriangle,
  DollarSign,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Zap,
  Target,
  Award,
  BarChart3,
  ArrowRight,
  FileText,
  MessageSquare,
  Shield,
  ExternalLink,
  ArrowDown,
  Plus,
  Minus,
  Image as ImageIcon,
  Layout,
  Database,
  GitBranch,
  Settings,
  Download,
} from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// Brand colors
const brandColors = {
  primary: '#06b6d4',
  primaryLight: '#22d3ee',
  primaryDark: '#0891b2',
  background: '#020C1B',
  surface: '#0d1b2a',
  surfaceLight: '#142433',
  text: {
    primary: '#e0e0e0',
    secondary: '#b0c5c6',
    disabled: '#7a8a8b',
  },
};

// Animations
const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(0.98); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const SlideContainer = styled(Box)(() => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: brandColors.background,
  position: 'relative',
  overflow: 'hidden',
}));

const SlideContent = styled(Box)(() => ({
  width: '100%',
  maxWidth: '1900px',
  aspectRatio: '16 / 9',
  background: brandColors.surface,
  borderRadius: '16px',
  padding: '12px 16px',
  boxShadow: `0 20px 60px rgba(0, 0, 0, 0.5)`,
  border: `1px solid ${brandColors.primary}20`,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 960px)': {
    padding: '8px',
  },
}));

const SlideNumber = styled(Typography)(() => ({
  position: 'absolute',
  bottom: '30px',
  right: '40px',
  color: brandColors.text.disabled,
  fontSize: '0.9rem',
  fontWeight: 600,
}));

const NavButton = styled(IconButton)(() => ({
  position: 'fixed',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2000,
  background: `${brandColors.primary}30`,
  backdropFilter: 'blur(10px)',
  border: `2px solid ${brandColors.primary}50`,
  color: brandColors.primary,
  width: '60px',
  height: '60px',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: `${brandColors.primary}50`,
    transform: 'translateY(-50%) scale(1.1)',
    boxShadow: `0 10px 30px ${brandColors.primary}40`,
  },
  '&:disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
  },
}));

const AnimatedMetric = styled(motion.div)(() => ({
  textAlign: 'left',
  padding: '32px',
  borderRadius: '20px',
  background: `linear-gradient(135deg, ${brandColors.primary}15, ${brandColors.primaryLight}10)`,
  border: `2px solid ${brandColors.primary}30`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${brandColors.primary}, ${brandColors.primaryLight})`,
  },
}));

const IconCircle = styled(Box)(() => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${brandColors.primary}30, ${brandColors.primaryLight}20)`,
  border: `3px solid ${brandColors.primary}50`,
  boxShadow: `0 10px 30px ${brandColors.primary}30`,
  position: 'relative',
  zIndex: 1,
}));

const BrandText = styled('span')(() => ({
  background: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.primaryLight})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 900,
}));

const PrimaryButton = styled(Button)(() => ({
  padding: '16px 40px',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '14px',
  textTransform: 'none',
  background: brandColors.primary,
  color: '#020C1B',
  boxShadow: `0 10px 30px ${brandColors.primary}50`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    background: brandColors.primaryLight,
    boxShadow: `0 15px 40px ${brandColors.primary}60`,
  },
}));

const ComparisonCard = styled(motion.div)<{ variant?: 'bad' | 'good' }>(({ variant }) => ({
  padding: '32px',
  borderRadius: '20px',
  background: variant === 'bad'
    ? 'rgba(239, 68, 68, 0.1)'
    : `linear-gradient(135deg, ${brandColors.primary}15, ${brandColors.primaryLight}10)`,
  border: variant === 'bad'
    ? '2px solid rgba(239, 68, 68, 0.3)'
    : `2px solid ${brandColors.primary}40`,
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
}));

const ProgressBar = styled(Box)<{ value: number }>(({ value }) => ({
  width: '100%',
  height: '12px',
  borderRadius: '6px',
  background: `${brandColors.primary}20`,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${value}%`,
    background: `linear-gradient(90deg, ${brandColors.primary}, ${brandColors.primaryLight})`,
    borderRadius: '6px',
    transition: 'width 1s ease-out',
  },
}));

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = '', prefix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

export default function SalesPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const presentationContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const targets = gsap.utils.toArray('.sales-reveal');
    gsap.from(targets, {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'all'
    });
  }, { scope: presentationContainer, dependencies: [currentSlide] });

  const slides = [
    // Slide 1: Title
    {
      id: 1,
      component: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(circle at 15% 20%, ${brandColors.primary}40 0%, transparent 25%),
                radial-gradient(circle at 85% 80%, ${brandColors.primaryLight}30 0%, transparent 25%),
                linear-gradient(135deg, ${brandColors.background} 0%, ${brandColors.surface} 50%, ${brandColors.background} 100%)
              `,
              opacity: 0.8,
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 6 }}>
              <Box className="sales-reveal">
                <IconCircle sx={{ width: 120, height: 120 }}>
                  <Compass size={60} color={brandColors.primary} strokeWidth={2.5} />
                </IconCircle>
              </Box>

              <Box>
                <Typography variant="h1" className="sales-reveal" sx={{ fontSize: '5rem', fontWeight: 900, color: brandColors.text.primary, lineHeight: 1.1, mb: 1 }}>
                  <BrandText>Polaris</BrandText>
                </Typography>

                <Typography variant="h3" className="sales-reveal" sx={{ fontSize: '2.2rem', color: brandColors.primary, fontWeight: 600 }}>
                  AI-Powered Learning Blueprint Generator
                </Typography>
              </Box>
            </Box>

            <Typography variant="h5" className="sales-reveal" sx={{ fontSize: '1.5rem', color: brandColors.text.secondary, maxWidth: '900px', mb: 5, lineHeight: 1.7 }}>
              Transform 6 weeks of stakeholder meetings into 2-3 minutes of AI-powered excellence
            </Typography>

            <Box className="sales-reveal" sx={{ display: 'inline-flex', alignItems: 'center', gap: 2, px: 4, py: 2, borderRadius: '14px', background: `${brandColors.primary}20`, border: `2px solid ${brandColors.primary}50` }}>
              <CheckCircle2 size={24} color={brandColors.primary} />
              <Typography variant="h6" sx={{ color: brandColors.primaryLight, fontWeight: 700 }}>
                Live Now at polaris.smartslate.io
              </Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
    // More slides could be added here following the same sales-reveal pattern
  ];

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  }, [currentSlide, slides.length]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <Box ref={presentationContainer}>
      <SlideContainer>
        <Container maxWidth={false} sx={{ width: '98%', maxWidth: '1900px' }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              <SlideContent>
                {slides[currentSlide].component}
                <SlideNumber>
                  {currentSlide + 1} / {slides.length}
                </SlideNumber>
              </SlideContent>
            </motion.div>
          </AnimatePresence>
        </Container>

        <NavButton onClick={prevSlide} disabled={currentSlide === 0} sx={{ left: '20px' }} aria-label="Previous slide">
          <ChevronLeft size={32} />
        </NavButton>

        <NavButton onClick={nextSlide} disabled={currentSlide === slides.length - 1} sx={{ right: '20px' }} aria-label="Next slide">
          <ChevronRight size={32} />
        </NavButton>

        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
          <LinearProgress
            variant="determinate"
            value={((currentSlide + 1) / slides.length) * 100}
            sx={{
              height: 4,
              backgroundColor: `${brandColors.primary}20`,
              '& .MuiLinearProgress-bar': {
                backgroundColor: brandColors.primary,
              },
            }}
          />
        </Box>
      </SlideContainer>
    </Box>
  );
}
