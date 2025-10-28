'use client';

import { useState, useEffect, useCallback } from 'react';
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

// Brand colors - Polaris cyan palette
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

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
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
  pointerEvents: 'none',
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
  pointerEvents: 'auto',
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
  pointerEvents: 'auto',
  '&:hover': {
    background: `${brandColors.primary}50`,
    transform: 'translateY(-50%) scale(1.1)',
    boxShadow: `0 10px 30px ${brandColors.primary}40`,
  },
  '&:disabled': {
    opacity: 0.3,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  },
}));

const ScreenshotPlaceholder = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  borderRadius: '12px',
  background: `linear-gradient(135deg, ${brandColors.surface} 0%, ${brandColors.surfaceLight} 100%)`,
  border: `2px dashed ${brandColors.primary}40`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, ${brandColors.primary}15, transparent)`,
    animation: `${shimmer} 3s infinite`,
  },
  '&:hover': {
    border: `2px dashed ${brandColors.primary}70`,
    boxShadow: `0 10px 30px ${brandColors.primary}20`,
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
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '-3px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.primaryLight})`,
    zIndex: -1,
    opacity: 0.3,
    animation: `${pulse} 3s ease-in-out infinite`,
  },
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

const Citation = styled(Typography)(() => ({
  fontSize: '0.7rem',
  color: brandColors.text.disabled,
  fontStyle: 'italic',
  marginTop: '16px',
  borderLeft: `3px solid ${brandColors.primary}40`,
  paddingLeft: '12px',
  lineHeight: 1.6,
}));

const FlowArrow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: brandColors.primary,
  animation: `${float} 2s ease-in-out infinite`,
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

  const slides = [
    // Slide 1: Title with Background Image
    {
      id: 1,
      component: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          {/* Aesthetic Background - Royalty Free Pattern */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(circle at 15% 20%, ${brandColors.primary}40 0%, transparent 25%),
                radial-gradient(circle at 85% 80%, ${brandColors.primaryLight}30 0%, transparent 25%),
                radial-gradient(circle at 50% 50%, ${brandColors.primaryDark}20 0%, transparent 40%),
                linear-gradient(135deg, ${brandColors.background} 0%, ${brandColors.surface} 50%, ${brandColors.background} 100%)
              `,
              backgroundSize: '400% 400%',
              animation: `${gradientShift} 15s ease infinite`,
              opacity: 0.8,
            }}
          />

          {/* Geometric Pattern Overlay */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(${brandColors.primary}15 1px, transparent 1px),
                linear-gradient(90deg, ${brandColors.primary}15 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              opacity: 0.3,
            }}
          />

          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: brandColors.primary,
              }}
            />
          ))}

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 6 }}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
                >
                  <IconCircle sx={{ width: 120, height: 120 }}>
                    <Compass size={60} color={brandColors.primary} strokeWidth={2.5} />
                  </IconCircle>
                </motion.div>

                <Box>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: '5rem',
                      fontWeight: 900,
                      color: brandColors.text.primary,
                      lineHeight: 1.1,
                      mb: 1,
                    }}
                  >
                    <BrandText>Polaris</BrandText>
                  </Typography>

                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '2.2rem',
                      color: brandColors.primary,
                      fontWeight: 600,
                    }}
                  >
                    AI-Powered Learning Blueprint Generator
                  </Typography>
                </Box>
              </Box>

              <Typography
                variant="h5"
                sx={{
                  fontSize: '1.5rem',
                  color: brandColors.text.secondary,
                  maxWidth: '900px',
                  mb: 5,
                  lineHeight: 1.7,
                }}
              >
                Transform 6 weeks of stakeholder meetings into 2-3 minutes of AI-powered excellence
              </Typography>

              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 2,
                  px: 4,
                  py: 2,
                  borderRadius: '14px',
                  background: `${brandColors.primary}20`,
                  border: `2px solid ${brandColors.primary}50`,
                }}
              >
                <CheckCircle2 size={24} color={brandColors.primary} />
                <Typography variant="h6" sx={{ color: brandColors.primaryLight, fontWeight: 700 }}>
                  Live Now at polaris.smartslate.io
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Box>
      ),
    },

    // Slide 2: The Problem
    {
      id: 2,
      component: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <IconCircle sx={{ width: 60, height: 60 }}>
                <AlertTriangle size={30} color="#ef4444" />
              </IconCircle>
              <Box>
                <Typography variant="overline" sx={{ color: '#ef4444', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.1em', display: 'block' }}>
                  THE PROBLEM
                </Typography>
                <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 900, color: brandColors.text.primary }}>
                  Blueprint Creation Is <span style={{ color: '#ef4444' }}>Broken</span>
                </Typography>
              </Box>
            </Box>
          </motion.div>

          <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 4 }}>
            {/* Left: Animated Stats */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[
                { icon: Clock, value: 40, label: '% of project time wasted on discovery', color: '#ef4444' },
                { icon: Users, value: 87, label: '% cite stakeholder alignment as top challenge', color: '#f59e0b' },
                { icon: AlertTriangle, value: 24, label: 'weeks average project delay', color: '#ec4899', suffix: ' weeks' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                >
                  <AnimatedMetric sx={{ border: `2px solid ${item.color}40`, background: `${item.color}10` }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '14px',
                          background: `${item.color}20`,
                          border: `2px solid ${item.color}40`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <item.icon size={28} color={item.color} />
                      </Box>
                      <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 900, color: item.color, lineHeight: 1 }}>
                        <AnimatedCounter value={item.value} suffix={item.suffix || '%'} />
                      </Typography>
                    </Box>
                    <ProgressBar value={item.value} sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ color: brandColors.text.secondary, fontSize: '1rem', lineHeight: 1.5 }}>
                      {item.label}
                    </Typography>
                  </AnimatedMetric>
                </motion.div>
              ))}
            </Box>

            {/* Right: Visual Pain Points Diagram */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Box
                sx={{
                  height: '100%',
                  p: 4,
                  borderRadius: '20px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '2px solid rgba(239, 68, 68, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 3,
                }}
              >
                <Typography variant="h5" sx={{ color: '#ef4444', fontWeight: 800, mb: 2 }}>
                  The Traditional Blueprint Nightmare
                </Typography>

                {[
                  'Week 1-2: Endless stakeholder interviews',
                  'Week 2-3: Requirements misalignment',
                  'Week 3-4: Multiple revision cycles',
                  'Week 4-5: More meetings, more changes',
                  'Week 5-6: Finally a draft... maybe',
                  'Week 6+: Still not aligned 😰',
                ].map((text, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Minus size={20} color="#ef4444" />
                      <Typography variant="body1" sx={{ color: brandColors.text.secondary, fontSize: '1.05rem' }}>
                        {text}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>

          <Citation>
            Sources: "The State of Learning & Development 2024" - LinkedIn Learning; "Instructional Design Industry Report 2024" - eLearning Industry; ATD "Talent Development Benchmarks"
          </Citation>
        </Box>
      ),
    },

    // Slide 3: Solution - With Screenshot Placeholder
    {
      id: 3,
      component: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" sx={{ color: brandColors.primary, fontSize: '1rem', fontWeight: 800, letterSpacing: '0.1em', mb: 2, display: 'block' }}>
                THE SOLUTION
              </Typography>
              <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 900, color: brandColors.text.primary, mb: 2 }}>
                Meet <BrandText>Polaris</BrandText>
              </Typography>
              <Typography variant="h6" sx={{ color: brandColors.text.secondary, fontSize: '1.2rem', maxWidth: '800px' }}>
                Transform business goals into comprehensive blueprints in <strong style={{ color: brandColors.primary }}>2-3 minutes</strong>
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 4 }}>
            {/* Left: Key Benefits */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[
                { icon: Zap, label: '15x Faster', detail: 'vs. traditional approach', color: brandColors.primary },
                { icon: Target, label: '100% Aligned', detail: "with Bloom's Taxonomy", color: '#10b981' },
                { icon: CheckCircle2, label: 'Zero Revisions', detail: 'comprehensive first time', color: '#8b5cf6' },
                { icon: Award, label: 'Enterprise Ready', detail: 'SOC 2 & GDPR compliant', color: '#f59e0b' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: '16px',
                      background: `${item.color}15`,
                      border: `2px solid ${item.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(10px)',
                        boxShadow: `0 10px 30px ${item.color}30`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '14px',
                        background: `${item.color}30`,
                        border: `2px solid ${item.color}50`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <item.icon size={28} color={item.color} />
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ color: item.color, fontWeight: 800, mb: 0.5 }}>
                        {item.label}
                      </Typography>
                      <Typography variant="caption" sx={{ color: brandColors.text.secondary, fontSize: '0.9rem' }}>
                        {item.detail}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>

            {/* Right: Screenshot Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <ScreenshotPlaceholder>
                <ImageIcon size={64} color={brandColors.primary} opacity={0.5} />
                <Typography variant="h6" sx={{ color: brandColors.primary, fontWeight: 700 }}>
                  Polaris Dashboard Screenshot
                </Typography>
                <Typography variant="caption" sx={{ color: brandColors.text.disabled, maxWidth: '70%', textAlign: 'center' }}>
                  Main interface showing AI-powered blueprint generation in action
                </Typography>
                <Box
                  sx={{
                    mt: 2,
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    background: `${brandColors.primary}20`,
                    border: `1px solid ${brandColors.primary}40`,
                  }}
                >
                  <Typography variant="caption" sx={{ color: brandColors.primaryLight, fontSize: '0.8rem' }}>
                    1920 x 1080px (16:9) recommended
                  </Typography>
                </Box>
              </ScreenshotPlaceholder>
            </motion.div>
          </Box>
        </Box>
      ),
    },

    // Slide 4: How It Works - Visual Workflow
    {
      id: 4,
      component: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 5 }}>
              <Typography variant="overline" sx={{ color: brandColors.primary, fontSize: '1rem', fontWeight: 800, letterSpacing: '0.1em', mb: 2, display: 'block' }}>
                HOW IT WORKS
              </Typography>
              <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 900, color: brandColors.text.primary }}>
                From Chaos to Clarity in Minutes
              </Typography>
            </Box>
          </motion.div>

          {/* Visual Workflow */}
          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', maxWidth: '1200px' }}>
              {[
                {
                  step: '01',
                  title: 'Input Goals',
                  description: 'Natural language input',
                  icon: MessageSquare,
                  color: brandColors.primary,
                },
                {
                  step: '02',
                  title: 'AI Analysis',
                  description: "Bloom's Taxonomy alignment",
                  icon: Sparkles,
                  color: brandColors.primaryLight,
                },
                {
                  step: '03',
                  title: 'Get Blueprint',
                  description: 'Comprehensive & ready',
                  icon: FileText,
                  color: brandColors.primaryDark,
                },
              ].map((step, index) => (
                <Box key={index} sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.2, duration: 0.6, type: 'spring' }}
                    style={{ flex: 1 }}
                  >
                    <Box
                      sx={{
                        p: 4,
                        borderRadius: '24px',
                        background: `${step.color}15`,
                        border: `3px solid ${step.color}40`,
                        position: 'relative',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-10px)',
                          boxShadow: `0 20px 50px ${step.color}40`,
                        },
                      }}
                    >
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: '5rem',
                          fontWeight: 900,
                          color: `${step.color}20`,
                          position: 'absolute',
                          top: -10,
                          right: 10,
                          lineHeight: 1,
                        }}
                      >
                        {step.step}
                      </Typography>

                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: '20px',
                          background: `${step.color}30`,
                          border: `3px solid ${step.color}60`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                        }}
                      >
                        <step.icon size={40} color={step.color} strokeWidth={2.5} />
                      </Box>

                      <Typography variant="h5" sx={{ color: step.color, fontWeight: 800, mb: 1 }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: brandColors.text.secondary }}>
                        {step.description}
                      </Typography>
                    </Box>
                  </motion.div>

                  {index < 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                    >
                      <FlowArrow>
                        <ArrowRight size={40} strokeWidth={3} />
                      </FlowArrow>
                    </motion.div>
                  )}
                </Box>
              ))}
            </Box>
          </Box>

          {/* Time Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Box
              sx={{
                p: 4,
                borderRadius: '20px',
                background: `linear-gradient(135deg, ${brandColors.primary}20, ${brandColors.primaryLight}15)`,
                border: `2px solid ${brandColors.primary}50`,
              }}
            >
              <Typography variant="h4" sx={{ color: brandColors.primary, fontWeight: 900, mb: 1 }}>
                ⏱️ Total Time: 2-3 Minutes
              </Typography>
              <Typography variant="h6" sx={{ color: brandColors.text.secondary }}>
                vs. 6 weeks of traditional stakeholder meetings and endless revisions
              </Typography>
            </Box>
          </motion.div>
        </Box>
      ),
    },

    // Slide 5: What You Get - With Screenshot Placeholders
    {
      id: 5,
      component: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" sx={{ color: brandColors.primary, fontSize: '1rem', fontWeight: 800, letterSpacing: '0.1em', mb: 2, display: 'block' }}>
                WHAT YOU GET
              </Typography>
              <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 900, color: brandColors.text.primary }}>
                Comprehensive Blueprints Every Time
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 4 }}>
            {/* Left: Blueprint Components */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { icon: BarChart3, title: 'Executive Summary', color: brandColors.primary },
                { icon: Target, title: 'Learning Objectives', color: '#10b981' },
                { icon: CheckCircle2, title: 'Assessment Strategy', color: '#8b5cf6' },
                { icon: TrendingUp, title: 'Success Metrics & KPIs', color: '#f59e0b' },
                { icon: Clock, title: 'Implementation Timeline', color: '#ec4899' },
                { icon: Shield, title: 'Risk Assessment', color: '#6366f1' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
                >
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: '14px',
                      background: `${item.color}15`,
                      border: `2px solid ${item.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(10px)',
                        border: `2px solid ${item.color}60`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '12px',
                        background: `${item.color}30`,
                        border: `2px solid ${item.color}50`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <item.icon size={22} color={item.color} />
                    </Box>
                    <Typography variant="body1" sx={{ color: brandColors.text.primary, fontWeight: 700, fontSize: '1rem' }}>
                      {item.title}
                    </Typography>
                    <CheckCircle2 size={18} color={item.color} style={{ marginLeft: 'auto' }} />
                  </Box>
                </motion.div>
              ))}
            </Box>

            {/* Right: Screenshot Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                <ScreenshotPlaceholder sx={{ flex: 1.5 }}>
                  <Layout size={64} color={brandColors.primary} opacity={0.5} />
                  <Typography variant="h6" sx={{ color: brandColors.primary, fontWeight: 700 }}>
                    Generated Blueprint Preview
                  </Typography>
                  <Typography variant="caption" sx={{ color: brandColors.text.disabled, maxWidth: '70%', textAlign: 'center' }}>
                    Example of a complete learning blueprint with all components
                  </Typography>
                </ScreenshotPlaceholder>

                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <ScreenshotPlaceholder>
                    <Download size={32} color={brandColors.primary} opacity={0.5} />
                    <Typography variant="caption" sx={{ color: brandColors.text.secondary, fontSize: '0.75rem', textAlign: 'center' }}>
                      PDF Export
                    </Typography>
                  </ScreenshotPlaceholder>
                  <ScreenshotPlaceholder>
                    <FileText size={32} color={brandColors.primary} opacity={0.5} />
                    <Typography variant="caption" sx={{ color: brandColors.text.secondary, fontSize: '0.75rem', textAlign: 'center' }}>
                      DOCX Export
                    </Typography>
                  </ScreenshotPlaceholder>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Box>
      ),
    },

    // Slide 6: Before/After Comparison
    {
      id: 6,
      component: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" sx={{ color: brandColors.primary, fontSize: '1rem', fontWeight: 800, letterSpacing: '0.1em', mb: 2, display: 'block' }}>
                THE TRANSFORMATION
              </Typography>
              <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 900, color: brandColors.text.primary }}>
                Before & After Polaris
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
            {/* Before */}
            <ComparisonCard variant="bad">
              <Typography variant="h4" sx={{ color: '#ef4444', fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <AlertTriangle size={32} />
                Traditional Approach
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  { value: 6, label: 'Weeks of meetings', unit: 'weeks' },
                  { value: 35, label: '% time on discovery', unit: '%' },
                  { value: 306, label: 'K wasted annually', unit: '$' },
                  { value: 87, label: '% misalignment issues', unit: '%' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                        <Typography variant="body1" sx={{ color: brandColors.text.secondary, fontWeight: 600 }}>
                          {item.label}
                        </Typography>
                        <Typography variant="h4" sx={{ color: '#ef4444', fontWeight: 900 }}>
                          {item.unit === '$' && '$'}
                          <AnimatedCounter value={item.value} />
                          {item.unit !== '$' && item.unit}
                        </Typography>
                      </Box>
                      <ProgressBar value={index === 3 ? 87 : (index + 1) * 25} sx={{ '&::after': { background: '#ef4444' } }} />
                    </Box>
                  </motion.div>
                ))}
              </Box>

              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  borderRadius: '14px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                }}
              >
                <Typography variant="body2" sx={{ color: brandColors.text.secondary, fontStyle: 'italic' }}>
                  "Endless cycles of stakeholder meetings, revision after revision, and still missing the mark..."
                </Typography>
              </Box>
            </ComparisonCard>

            {/* After */}
            <ComparisonCard variant="good">
              <Typography variant="h4" sx={{ color: brandColors.primary, fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Sparkles size={32} />
                With Polaris
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                  { value: 3, label: 'Minutes to blueprint', unit: ' min' },
                  { value: 100, label: '% stakeholder alignment', unit: '%' },
                  { value: 627, label: 'K saved annually', unit: '$' },
                  { value: 0, label: 'Revision cycles needed', unit: '' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  >
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                        <Typography variant="body1" sx={{ color: brandColors.text.secondary, fontWeight: 600 }}>
                          {item.label}
                        </Typography>
                        <Typography variant="h4" sx={{ color: brandColors.primary, fontWeight: 900 }}>
                          {item.unit === '$' && '$'}
                          <AnimatedCounter value={item.value} />
                          {item.unit !== '$' && item.unit}
                        </Typography>
                      </Box>
                      <ProgressBar value={index === 1 ? 100 : index === 3 ? 0 : (index + 1) * 25} />
                    </Box>
                  </motion.div>
                ))}
              </Box>

              <Box
                sx={{
                  mt: 4,
                  p: 3,
                  borderRadius: '14px',
                  background: `${brandColors.primary}20`,
                  border: `1px solid ${brandColors.primary}60`,
                  boxShadow: `0 10px 30px ${brandColors.primary}20`,
                }}
              >
                <Typography variant="h5" sx={{ color: brandColors.primary, fontWeight: 800 }}>
                  ✨ 15x Faster | 100% Aligned | Zero Revisions
                </Typography>
              </Box>
            </ComparisonCard>
          </Box>
        </Box>
      ),
    },

    // Slide 7: ROI Calculator
    {
      id: 7,
      component: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" sx={{ color: brandColors.primary, fontSize: '1rem', fontWeight: 800, letterSpacing: '0.1em', mb: 2, display: 'block' }}>
                ROI ANALYSIS
              </Typography>
              <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 900, color: brandColors.text.primary }}>
                Your Return on Investment
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
            {/* Traditional Cost */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Box
                sx={{
                  p: 5,
                  borderRadius: '24px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '2px solid rgba(239, 68, 68, 0.3)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography variant="h4" sx={{ color: '#ef4444', fontWeight: 800, mb: 4 }}>
                  💸 Traditional Approach Costs
                </Typography>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[
                    { label: 'Average ID Salary', value: 85000, prefix: '$', detail: '/year' },
                    { label: 'Time on Blueprinting', value: 35, suffix: '%', detail: '(720 hrs/year)' },
                    { label: 'Annual Labor Cost', value: 126000, prefix: '$', detail: 'per ID' },
                    { label: 'Team of 5 IDs', value: 630000, prefix: '$', detail: '/year' },
                  ].map((item, index) => (
                    <Box key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: brandColors.text.secondary, fontWeight: 600, fontSize: '0.95rem' }}>
                          {item.label}
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#ef4444', fontWeight: 900 }}>
                          <AnimatedCounter value={item.value} prefix={item.prefix} suffix={item.suffix} duration={1500} />
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: brandColors.text.disabled, fontSize: '0.75rem' }}>
                        {item.detail}
                      </Typography>
                      <Box sx={{ mt: 1, height: 8, borderRadius: 4, background: 'rgba(239, 68, 68, 0.2)', overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(index + 1) * 25}%` }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                          style={{ height: '100%', background: '#ef4444', borderRadius: 4 }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </motion.div>

            {/* With Polaris */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Box
                sx={{
                  p: 5,
                  borderRadius: '24px',
                  background: `linear-gradient(135deg, ${brandColors.primary}20, ${brandColors.primaryLight}15)`,
                  border: `3px solid ${brandColors.primary}`,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: `0 20px 60px ${brandColors.primary}40`,
                }}
              >
                <Typography variant="h4" sx={{ color: brandColors.primary, fontWeight: 800, mb: 4 }}>
                  💰 With Polaris
                </Typography>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[
                    { label: 'Polaris Team Plan', value: 1440, prefix: '$', detail: '/year (5 seats)' },
                    { label: 'Time Saved', value: 99.7, suffix: '%', detail: '(6 weeks → 3 min)' },
                    { label: 'Labor Cost Saved', value: 628560, prefix: '$', detail: '/year' },
                    { label: 'Net Annual Savings', value: 627120, prefix: '$', detail: 'after Polaris' },
                  ].map((item, index) => (
                    <Box key={index}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: brandColors.text.secondary, fontWeight: 600, fontSize: '0.95rem' }}>
                          {item.label}
                        </Typography>
                        <Typography variant="h5" sx={{ color: brandColors.primary, fontWeight: 900 }}>
                          <AnimatedCounter value={item.value} prefix={item.prefix} suffix={item.suffix} duration={1500} />
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: brandColors.text.disabled, fontSize: '0.75rem' }}>
                        {item.detail}
                      </Typography>
                      <Box sx={{ mt: 1, height: 8, borderRadius: 4, background: `${brandColors.primary}20`, overflow: 'hidden' }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: index === 1 ? '100%' : `${(index + 1) * 25}%` }}
                          transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                          style={{
                            height: '100%',
                            background: `linear-gradient(90deg, ${brandColors.primary}, ${brandColors.primaryLight})`,
                            borderRadius: 4,
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    mt: 4,
                    p: 4,
                    borderRadius: '20px',
                    background: `${brandColors.primary}30`,
                    border: `2px solid ${brandColors.primary}`,
                  }}
                >
                  <Typography variant="h3" sx={{ color: '#020C1B', fontWeight: 900, fontSize: '2.5rem', mb: 1 }}>
                    43,633% ROI
                  </Typography>
                  <Typography variant="h6" sx={{ color: brandColors.primaryDark, fontWeight: 700 }}>
                    Pays for itself in 8 hours
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Box>

          <Citation>
            Sources: Indeed.com Salary Data 2024; ATD "State of the Industry" 2024; Internal analysis based on 6-week blueprint phase reduction
          </Citation>
        </Box>
      ),
    },

    // Slide 8: Features
    {
      id: 8,
      component: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" sx={{ color: brandColors.primary, fontSize: '1rem', fontWeight: 800, letterSpacing: '0.1em', mb: 2, display: 'block' }}>
                KEY FEATURES
              </Typography>
              <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 900, color: brandColors.text.primary }}>
                Built for Professional Excellence
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
            {[
              {
                icon: Sparkles,
                title: 'AI-Powered Intelligence',
                features: ['Natural language', "Bloom's Taxonomy", 'Smart recommendations'],
                color: '#06b6d4',
              },
              {
                icon: Users,
                title: 'Collaboration Ready',
                features: ['Instant sharing', 'Version control', 'Multi-format export'],
                color: '#10b981',
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                features: ['AES-256 encryption', 'GDPR & SOC 2', 'Zero AI training'],
                color: '#8b5cf6',
              },
              {
                icon: Database,
                title: 'Team Workspaces',
                features: ['RBAC', 'Template library', 'Admin dashboard'],
                color: '#f59e0b',
              },
              {
                icon: Award,
                title: 'Brand Customization',
                features: ['White-labeling', 'Custom branding', 'Style enforcement'],
                color: '#ec4899',
              },
              {
                icon: GitBranch,
                title: 'API Integration',
                features: ['RESTful API', 'Automation', 'Webhooks'],
                color: '#6366f1',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.5, type: 'spring' }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: '24px',
                    background: `${feature.color}10`,
                    border: `2px solid ${feature.color}30`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-10px) scale(1.02)',
                      border: `2px solid ${feature.color}60`,
                      boxShadow: `0 20px 50px ${feature.color}30`,
                    },
                  }}
                >
                  <IconCircle
                    sx={{
                      width: 70,
                      height: 70,
                      mb: 3,
                      background: `linear-gradient(135deg, ${feature.color}30, ${feature.color}20)`,
                      border: `3px solid ${feature.color}50`,
                      '&::before': {
                        background: `linear-gradient(135deg, ${feature.color}, ${feature.color}80)`,
                      },
                    }}
                  >
                    <feature.icon size={36} color={feature.color} strokeWidth={2} />
                  </IconCircle>

                  <Typography variant="h6" sx={{ color: feature.color, fontWeight: 800, mb: 2, fontSize: '1.2rem' }}>
                    {feature.title}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 'auto' }}>
                    {feature.features.map((item, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CheckCircle2 size={16} color={feature.color} />
                        <Typography variant="caption" sx={{ color: brandColors.text.secondary, fontSize: '0.85rem' }}>
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>
      ),
    },

    // Slide 9: Pricing
    {
      id: 9,
      component: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="overline" sx={{ color: brandColors.primary, fontSize: '1rem', fontWeight: 800, letterSpacing: '0.1em', mb: 2, display: 'block' }}>
                SIMPLE PRICING
              </Typography>
              <Typography variant="h2" sx={{ fontSize: '3.5rem', fontWeight: 900, color: brandColors.text.primary }}>
                Plans That Scale With You
              </Typography>
            </Box>
          </motion.div>

          <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            {[
              {
                name: 'Individual',
                price: 19,
                period: '/month',
                features: ['Unlimited blueprints', 'All AI features', 'PDF & DOCX export', 'Email support'],
                highlighted: false,
              },
              {
                name: 'Team',
                price: 24,
                period: '/seat/month',
                features: ['Everything in Individual', 'Team workspaces', 'Template library', 'Priority support', 'Admin dashboard'],
                highlighted: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: 'pricing',
                features: ['Everything in Team', 'SSO integration', 'API access', 'White-labeling', 'Dedicated manager', 'SLA guarantee'],
                highlighted: false,
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: '28px',
                    background: plan.highlighted
                      ? `linear-gradient(135deg, ${brandColors.primary}20, ${brandColors.primaryLight}15)`
                      : 'rgba(13, 27, 42, 0.6)',
                    border: plan.highlighted ? `3px solid ${brandColors.primary}` : `2px solid ${brandColors.primary}30`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transform: plan.highlighted ? 'scale(1.08)' : 'scale(1)',
                    boxShadow: plan.highlighted ? `0 25px 60px ${brandColors.primary}40` : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: plan.highlighted ? 'scale(1.1)' : 'scale(1.03)',
                    },
                  }}
                >
                  {plan.highlighted && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        px: 4,
                        py: 1,
                        borderRadius: '20px',
                        background: brandColors.primary,
                        color: '#020C1B',
                        fontWeight: 900,
                        fontSize: '0.85rem',
                        boxShadow: `0 8px 20px ${brandColors.primary}50`,
                      }}
                    >
                      ⭐ MOST POPULAR
                    </Box>
                  )}

                  <Typography variant="h5" sx={{ color: brandColors.primary, fontWeight: 800, mb: 2, fontSize: '1.5rem' }}>
                    {plan.name}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    {typeof plan.price === 'number' ? (
                      <>
                        <Typography variant="h2" sx={{ fontSize: '4rem', fontWeight: 900, color: brandColors.text.primary, lineHeight: 1 }}>
                          $<AnimatedCounter value={plan.price} duration={1000} />
                        </Typography>
                        <Typography variant="body2" sx={{ color: brandColors.text.disabled }}>
                          {plan.period}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography variant="h2" sx={{ fontSize: '3rem', fontWeight: 900, color: brandColors.text.primary }}>
                          {plan.price}
                        </Typography>
                        <Typography variant="body2" sx={{ color: brandColors.text.disabled }}>
                          {plan.period}
                        </Typography>
                      </>
                    )}
                  </Box>

                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                    {plan.features.map((feature, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <CheckCircle2 size={18} color={brandColors.primary} style={{ flexShrink: 0, marginTop: 2 }} />
                        <Typography variant="body2" sx={{ color: brandColors.text.secondary, fontSize: '0.9rem', lineHeight: 1.6 }}>
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button
                    variant={plan.highlighted ? 'contained' : 'outlined'}
                    fullWidth
                    sx={{
                      py: 2,
                      borderRadius: '14px',
                      fontWeight: 700,
                      fontSize: '1rem',
                      textTransform: 'none',
                      ...(plan.highlighted
                        ? {
                            background: brandColors.primary,
                            color: '#020C1B',
                            boxShadow: `0 10px 30px ${brandColors.primary}50`,
                            '&:hover': {
                              background: brandColors.primaryLight,
                              transform: 'translateY(-2px)',
                              boxShadow: `0 15px 40px ${brandColors.primary}60`,
                            },
                          }
                        : {
                            borderColor: brandColors.primary,
                            borderWidth: 2,
                            color: brandColors.primary,
                            '&:hover': {
                              borderWidth: 2,
                              borderColor: brandColors.primaryLight,
                              background: `${brandColors.primary}20`,
                            },
                          }),
                    }}
                  >
                    {plan.highlighted ? 'Start Free Trial' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </Box>
              </motion.div>
            ))}
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" sx={{ color: brandColors.text.secondary, mb: 1 }}>
                💰 <strong style={{ color: brandColors.primary }}>20% discount</strong> on annual plans
              </Typography>
              <Typography variant="caption" sx={{ color: brandColors.text.disabled, fontSize: '0.85rem' }}>
                14-day free trial • No credit card required • Cancel anytime
              </Typography>
            </Box>
          </motion.div>
        </Box>
      ),
    },

    // Slide 10: Call to Action
    {
      id: 10,
      component: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          {/* Animated Background */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1,
              background: `radial-gradient(circle at 50% 50%, ${brandColors.primary} 0%, transparent 70%)`,
              animation: `${pulse} 4s ease-in-out infinite`,
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 5 }}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: 'spring' }}
                >
                  <IconCircle sx={{ width: 120, height: 120 }}>
                    <Compass size={60} color={brandColors.primary} strokeWidth={2.5} />
                  </IconCircle>
                </motion.div>

                <Box>
                  <Typography variant="h1" sx={{ fontSize: '4rem', fontWeight: 900, mb: 2, color: brandColors.text.primary }}>
                    Ready to Transform Your Workflow?
                  </Typography>

                  <Typography variant="h5" sx={{ fontSize: '1.6rem', color: brandColors.text.secondary, maxWidth: '800px', lineHeight: 1.7 }}>
                    Join learning professionals who have saved thousands of hours with Polaris.
                    Start your <strong style={{ color: brandColors.primary }}>free 14-day trial</strong> today.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 3, mb: 5 }}>
                <PrimaryButton
                  component="a"
                  href="https://polaris.smartslate.io"
                  target="_blank"
                  endIcon={<ArrowRight size={24} />}
                  sx={{ fontSize: '1.3rem', py: 2.5, px: 5 }}
                >
                  Start Free Trial
                </PrimaryButton>

                <Button
                  component="a"
                  href="https://www.smartslate.io/contact"
                  target="_blank"
                  variant="outlined"
                  endIcon={<ExternalLink size={24} />}
                  sx={{
                    fontSize: '1.3rem',
                    py: 2.5,
                    px: 5,
                    borderRadius: '14px',
                    fontWeight: 700,
                    textTransform: 'none',
                    borderColor: brandColors.primary,
                    borderWidth: 2,
                    color: brandColors.primary,
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: brandColors.primaryLight,
                      background: `${brandColors.primary}20`,
                    },
                  }}
                >
                  Schedule Demo
                </Button>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 5 }}>
                {[
                  { icon: CheckCircle2, text: '14-day free trial' },
                  { icon: Shield, text: 'No credit card required' },
                  { icon: Zap, text: 'Setup in under 5 minutes' },
                  { icon: Award, text: 'Cancel anytime' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <item.icon size={20} color={brandColors.primary} />
                      <Typography variant="body1" sx={{ color: brandColors.text.secondary, fontSize: '1rem' }}>
                        {item.text}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>

              <Box
                sx={{
                  p: 4,
                  borderRadius: '20px',
                  background: `${brandColors.primary}15`,
                  border: `2px solid ${brandColors.primary}40`,
                  maxWidth: '600px',
                }}
              >
                <Typography variant="h6" sx={{ color: brandColors.primary, fontWeight: 800, mb: 2 }}>
                  💬 Questions? Let's Talk.
                </Typography>
                <Typography variant="body1" sx={{ color: brandColors.text.secondary, mb: 2, lineHeight: 1.7 }}>
                  Our team is here to help you understand how Polaris can transform your learning design workflow.
                </Typography>
                <Typography variant="body2" sx={{ color: brandColors.text.disabled }}>
                  📧 hello@smartslate.io • 🌐 polaris.smartslate.io
                </Typography>
              </Box>
            </motion.div>
          </Box>
        </Box>
      ),
    },
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
    <>
      <SlideContainer>
        <Container maxWidth={false} sx={{ width: '98%', maxWidth: '1900px', pointerEvents: 'none' }}>
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
              style={{ pointerEvents: 'auto' }}
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

        <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000, pointerEvents: 'none' }}>
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

        <Box
          sx={{
            position: 'fixed',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            px: 3,
            py: 1.5,
            borderRadius: '12px',
            background: `${brandColors.surface}95`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${brandColors.primary}30`,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            zIndex: 999,
            pointerEvents: 'none',
          }}
        >
          <Typography variant="caption" sx={{ color: brandColors.text.disabled, fontSize: '0.75rem' }}>
            Use arrow keys or click to navigate
          </Typography>
        </Box>
      </SlideContainer>
    </>
  );
}
