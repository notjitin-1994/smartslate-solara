'use client';

import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Chip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Zap,
  Globe,
  BarChart3,
  CheckCircle2,
  Rocket,
  ArrowUpRight,
  Shield,
  Sparkles,
  Brain,
  Clock,
  TrendingDown,
  Compass,
  Star,
  Wand2,
  Orbit as OrbitIcon,
  MessageSquare,
  Activity,
  AlertCircle,
  FileText,
  Video,
  Cpu,
} from 'lucide-react';

// Brand colors
const brandColors = {
  primary: '#a7dadb',
  primaryLight: '#d0edf0',
  primaryDark: '#7bc5c7',
  secondary: '#4F46E5',
  background: '#020C1B',
  paper: '#0d1b2a',
  surface: '#142433',
  textPrimary: '#e0e0e0',
  textSecondary: '#b0c5c6',
  border: '#2a3a4a',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
};

// Animations
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

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

// Styled Components
const SlideContainer = styled(Box)(() => ({
  width: '100vw',
  height: '100vh',
  background: brandColors.background,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center',
}));

const SlideWrapper = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  maxWidth: '177.78vh',
  maxHeight: '56.25vw',
  aspectRatio: '16 / 9',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
}));

const SlideContent = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '3vh 4vw',
  position: 'relative',
  zIndex: 2,
  width: '100%',
  overflow: 'hidden',
}));

const NavButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1000,
  backgroundColor: `${brandColors.surface}dd`,
  backdropFilter: 'blur(10px)',
  color: brandColors.primary,
  border: `1px solid ${brandColors.border}`,
  width: '3vw',
  minWidth: 36,
  maxWidth: 48,
  height: '3vw',
  minHeight: 36,
  maxHeight: 48,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: brandColors.surface,
    borderColor: brandColors.primary,
    transform: 'translateY(-50%) scale(1.1)',
  },
}));

const SlideCounter = styled(Box)(() => ({
  position: 'absolute',
  bottom: '1.5vh',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1000,
  padding: '0.6vh 1.2vw',
  backgroundColor: `${brandColors.surface}dd`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${brandColors.border}`,
  borderRadius: '20px',
  color: brandColors.textPrimary,
  fontFamily: 'Lato, sans-serif',
  fontWeight: 600,
  fontSize: 'clamp(0.7rem, 1vh, 0.9rem)',
}));

const DataCard = styled(motion.div)(() => ({
  background: `${brandColors.paper}90`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${brandColors.border}`,
  borderRadius: '16px',
  padding: 'clamp(16px, 2vh, 24px) clamp(20px, 2.5vw, 32px)',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    borderColor: brandColors.primary,
    transform: 'translateY(-4px)',
    boxShadow: `0 15px 30px ${brandColors.primary}20`,
  },
}));

const IconBox = styled(Box)(() => ({
  width: 'clamp(40px, 5vh, 56px)',
  height: 'clamp(40px, 5vh, 56px)',
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `${brandColors.primary}20`,
  border: `1px solid ${brandColors.primary}30`,
  marginBottom: '1vh',
}));

const HighlightText = styled('span')(() => ({
  color: brandColors.primary,
  fontWeight: 700,
}));

const GradientText = styled('span')(() => ({
  background: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.secondary})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: 700,
}));

// Sub-slide indicator
const SubSlideIndicator = ({ total, current }: { total: number; current: number }) => (
  <Box
    sx={{
      position: 'absolute',
      top: '2vh',
      right: '2vw',
      display: 'flex',
      gap: '0.5vw',
      zIndex: 100,
    }}
  >
    {Array.from({ length: total }).map((_, idx) => (
      <Box
        key={idx}
        sx={{
          width: 'clamp(6px, 0.8vw, 10px)',
          height: 'clamp(6px, 0.8vw, 10px)',
          borderRadius: '50%',
          background: idx === current ? brandColors.primary : `${brandColors.border}80`,
          transition: 'all 0.3s ease',
        }}
      />
    ))}
  </Box>
);

// Slide components
const CoverSlide = () => (
  <Box sx={{ textAlign: 'center', maxWidth: '85%', width: '100%' }}>
    <motion.div {...fadeInUp}>
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
    </motion.div>
    <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
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
    </motion.div>
    <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
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
    </motion.div>
    <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
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
    </motion.div>
    <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
      <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: '90%', mx: 'auto' }}>
        {[
          { icon: <TrendingUp size={20} />, label: 'Series A Raise', value: '$15-20M' },
          { icon: <Target size={20} />, label: 'Market Opportunity', value: '$200B+' },
          { icon: <Rocket size={20} />, label: 'Target ARR (2028)', value: '$150M' },
        ].map((item, idx) => (
          <Grid item xs={4} key={idx}>
            <DataCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
            >
              <Box sx={{ color: brandColors.primary, mb: 0.8, display: 'flex', justifyContent: 'center' }}>{item.icon}</Box>
              <Typography sx={{ fontSize: 'clamp(1.2rem, 2.2vh, 1.8rem)', fontWeight: 700, color: brandColors.primary, mb: 0.3 }}>
                {item.value}
              </Typography>
              <Typography sx={{ fontSize: 'clamp(0.7rem, 1.1vh, 0.9rem)', color: brandColors.textSecondary }}>{item.label}</Typography>
            </DataCard>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  </Box>
);

const ProblemSlide1 = () => (
  <Box sx={{ maxWidth: '90%', width: '100%' }}>
    <SubSlideIndicator total={2} current={0} />
    <motion.div {...fadeInUp}>
      <Typography
        variant="h2"
        sx={{
          fontSize: 'clamp(1.8rem, 4vh, 3.2rem)',
          fontWeight: 700,
          fontFamily: 'Quicksand, sans-serif',
          mb: 1,
          color: brandColors.textPrimary,
        }}
      >
        The <HighlightText>Fragmentation Crisis</HighlightText>
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: 'clamp(0.85rem, 1.6vh, 1.2rem)',
          color: brandColors.textSecondary,
          mb: 3,
        }}
      >
        Corporate learning is broken. Organizations cobble together 10-15 disconnected tools.
      </Typography>
    </motion.div>

    <Grid container spacing={2}>
      {[
        {
          icon: <TrendingDown size={28} />,
          title: 'Abysmal Completion',
          stat: '3-6%',
          description: 'Industry average course completion in corporate learning',
          source: 'Multiple industry studies',
          color: brandColors.error,
        },
        {
          icon: <Clock size={28} />,
          title: 'Time Wasted',
          stat: '40%',
          description: 'L&D team time on tool administration vs. strategic work',
          source: 'L&D Benchmark 2024',
          color: brandColors.warning,
        },
        {
          icon: <DollarSign size={28} />,
          title: 'Hidden Costs',
          stat: '3-5x',
          description: 'Total cost of ownership vs. initial licensing fees',
          source: 'Enterprise TCO Analysis',
          color: brandColors.error,
        },
      ].map((item, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <DataCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.1 }}
          >
            <Box sx={{ color: item.color, mb: 1.5 }}>{item.icon}</Box>
            <Typography sx={{ fontSize: 'clamp(2rem, 3.5vh, 2.8rem)', fontWeight: 700, color: item.color, mb: 0.8 }}>
              {item.stat}
            </Typography>
            <Typography sx={{ fontSize: 'clamp(0.9rem, 1.5vh, 1.1rem)', fontWeight: 600, color: brandColors.textPrimary, mb: 0.8 }}>
              {item.title}
            </Typography>
            <Typography sx={{ fontSize: 'clamp(0.75rem, 1.2vh, 0.95rem)', color: brandColors.textSecondary, mb: 1.2, lineHeight: 1.5 }}>
              {item.description}
            </Typography>
            <Typography sx={{ fontSize: 'clamp(0.65rem, 1vh, 0.8rem)', color: brandColors.textSecondary, opacity: 0.7, fontStyle: 'italic' }}>
              Source: {item.source}
            </Typography>
          </DataCard>
        </Grid>
      ))}
    </Grid>

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
      <Box
        sx={{
          mt: 2.5,
          p: 2,
          background: `${brandColors.error}15`,
          border: `1px solid ${brandColors.error}40`,
          borderRadius: '16px',
        }}
      >
        <Typography sx={{ fontSize: 'clamp(0.85rem, 1.4vh, 1rem)', color: brandColors.textPrimary, textAlign: 'center', lineHeight: 1.6 }}>
          <strong>The Reality:</strong> Organizations spend $3-8M annually on learning technology, yet achieve minimal ROI due to fragmentation.
        </Typography>
      </Box>
    </motion.div>
  </Box>
);

const ProblemSlide2 = () => (
  <Box sx={{ maxWidth: '90%', width: '100%' }}>
    <SubSlideIndicator total={2} current={1} />
    <motion.div {...fadeInUp}>
      <Typography
        variant="h2"
        sx={{
          fontSize: 'clamp(1.8rem, 4vh, 3.2rem)',
          fontWeight: 700,
          fontFamily: 'Quicksand, sans-serif',
          mb: 1,
          color: brandColors.textPrimary,
        }}
      >
        The <HighlightText>Impact</HighlightText>
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: 'clamp(0.85rem, 1.6vh, 1.2rem)',
          color: brandColors.textSecondary,
          mb: 3,
        }}
      >
        Fragmentation creates cascading failures across learner experience and business outcomes.
      </Typography>
    </motion.div>

    <Grid container spacing={2}>
      {[
        {
          icon: <Users size={28} />,
          title: 'Learner Frustration',
          stat: '68%',
          description: 'Learners frustrated with disconnected learning experiences',
          source: 'Corporate Learner Survey 2024',
          color: brandColors.warning,
        },
        {
          icon: <BarChart3 size={28} />,
          title: 'Data Blindness',
          stat: 'Weeks',
          description: 'Delay in reporting due to manual data aggregation',
          source: 'L&D Technology Survey',
          color: brandColors.error,
        },
        {
          icon: <Zap size={28} />,
          title: 'Skills Crisis',
          stat: '2.5 years',
          description: 'Average skill half-life (down from 10-15 years in 1980s)',
          source: 'World Economic Forum',
          color: brandColors.warning,
        },
      ].map((item, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <DataCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.1 }}
          >
            <Box sx={{ color: item.color, mb: 1.5 }}>{item.icon}</Box>
            <Typography sx={{ fontSize: 'clamp(2rem, 3.5vh, 2.8rem)', fontWeight: 700, color: item.color, mb: 0.8 }}>
              {item.stat}
            </Typography>
            <Typography sx={{ fontSize: 'clamp(0.9rem, 1.5vh, 1.1rem)', fontWeight: 600, color: brandColors.textPrimary, mb: 0.8 }}>
              {item.title}
            </Typography>
            <Typography sx={{ fontSize: 'clamp(0.75rem, 1.2vh, 0.95rem)', color: brandColors.textSecondary, mb: 1.2, lineHeight: 1.5 }}>
              {item.description}
            </Typography>
            <Typography sx={{ fontSize: 'clamp(0.65rem, 1vh, 0.8rem)', color: brandColors.textSecondary, opacity: 0.7, fontStyle: 'italic' }}>
              Source: {item.source}
            </Typography>
          </DataCard>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const MarketSlide = () => (
  <Box sx={{ maxWidth: '90%', width: '100%' }}>
    <motion.div {...fadeInUp}>
      <Typography
        variant="h2"
        sx={{
          fontSize: 'clamp(1.8rem, 4vh, 3.2rem)',
          fontWeight: 700,
          fontFamily: 'Quicksand, sans-serif',
          mb: 1,
          color: brandColors.textPrimary,
        }}
      >
        Market <HighlightText>Opportunity</HighlightText>
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: 'clamp(0.85rem, 1.6vh, 1.2rem)',
          color: brandColors.textSecondary,
          mb: 3,
        }}
      >
        Massive, rapidly growing market at the intersection of AI, corporate learning, and digital transformation.
      </Typography>
    </motion.div>

    <Grid container spacing={2.5}>
      <Grid item xs={12} md={7}>
        <DataCard
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconBox sx={{ mr: 1.5 }}>
              <Globe size={24} style={{ color: brandColors.primary }} />
            </IconBox>
            <Box>
              <Typography sx={{ fontSize: 'clamp(0.75rem, 1.2vh, 0.95rem)', color: brandColors.textSecondary, mb: 0.3 }}>
                Total Addressable Market (TAM)
              </Typography>
              <Typography sx={{ fontSize: 'clamp(2.2rem, 3.5vh, 3rem)', fontWeight: 700, color: brandColors.primary }}>
                $200B+
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ fontSize: 'clamp(0.8rem, 1.3vh, 1rem)', color: brandColors.textSecondary, mb: 2 }}>
            Combined global market by 2030:
          </Typography>
          <Grid container spacing={1.5}>
            {[
              { label: 'Corporate LMS', value: '$13.9B → $50.1B', cagr: '23.8%' },
              { label: 'Learning Experience Platforms', value: '$2.1B → $28.9B', cagr: '33.8%' },
              { label: 'Adaptive Learning', value: '$5.1B → $12.7B', cagr: '19.8%' },
            ].map((item, idx) => (
              <Grid item xs={12} key={idx}>
                <Box sx={{ p: 1.5, background: `${brandColors.surface}60`, borderRadius: '10px', border: `1px solid ${brandColors.border}` }}>
                  <Typography sx={{ fontSize: 'clamp(0.75rem, 1.2vh, 0.9rem)', color: brandColors.primary, fontWeight: 600, mb: 0.3 }}>
                    {item.label}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 'clamp(0.85rem, 1.3vh, 1rem)', color: brandColors.textPrimary, fontWeight: 600 }}>
                      {item.value}
                    </Typography>
                    <Chip label={`${item.cagr} CAGR`} size="small" sx={{ height: 'auto', fontSize: 'clamp(0.65rem, 1vh, 0.8rem)', bgcolor: `${brandColors.success}20`, color: brandColors.success }} />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DataCard>
      </Grid>

      <Grid item xs={12} md={5}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DataCard
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <IconBox sx={{ mr: 1.5, width: 'clamp(36px, 4.5vh, 48px)', height: 'clamp(36px, 4.5vh, 48px)' }}>
                  <Target size={20} style={{ color: brandColors.secondary }} />
                </IconBox>
                <Box>
                  <Typography sx={{ fontSize: 'clamp(0.7rem, 1.1vh, 0.85rem)', color: brandColors.textSecondary, mb: 0.3 }}>
                    SAM (2027)
                  </Typography>
                  <Typography sx={{ fontSize: 'clamp(1.8rem, 2.8vh, 2.3rem)', fontWeight: 700, color: brandColors.secondary }}>
                    $35-50B
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: 'clamp(0.75rem, 1.2vh, 0.9rem)', color: brandColors.textSecondary, lineHeight: 1.5 }}>
                Realistic addressable market targeting enterprises, mid-market, training providers globally
              </Typography>
            </DataCard>
          </Grid>

          <Grid item xs={12}>
            <DataCard
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <IconBox sx={{ mr: 1.5, width: 'clamp(36px, 4.5vh, 48px)', height: 'clamp(36px, 4.5vh, 48px)' }}>
                  <Rocket size={20} style={{ color: brandColors.success }} />
                </IconBox>
                <Box>
                  <Typography sx={{ fontSize: 'clamp(0.7rem, 1.1vh, 0.85rem)', color: brandColors.textSecondary, mb: 0.3 }}>
                    SOM (2027)
                  </Typography>
                  <Typography sx={{ fontSize: 'clamp(1.8rem, 2.8vh, 2.3rem)', fontWeight: 700, color: brandColors.success }}>
                    $525M
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: 'clamp(0.75rem, 1.2vh, 0.9rem)', color: brandColors.textSecondary, mb: 1.5, lineHeight: 1.5 }}>
                Conservative target ARR ({'<'}1% market penetration)
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                <Chip label="5K Enterprise" size="small" sx={{ fontSize: 'clamp(0.65rem, 1vh, 0.75rem)', height: 'auto', bgcolor: `${brandColors.success}20`, color: brandColors.textPrimary }} />
                <Chip label="15K Mid-Market" size="small" sx={{ fontSize: 'clamp(0.65rem, 1vh, 0.75rem)', height: 'auto', bgcolor: `${brandColors.success}20`, color: brandColors.textPrimary }} />
              </Box>
            </DataCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
      <Box
        sx={{
          mt: 2,
          p: 2,
          background: `${brandColors.success}15`,
          border: `1px solid ${brandColors.success}40`,
          borderRadius: '16px',
        }}
      >
        <Typography sx={{ fontSize: 'clamp(0.8rem, 1.3vh, 1rem)', color: brandColors.textPrimary, textAlign: 'center', lineHeight: 1.6 }}>
          <strong>Market Tailwinds:</strong> 73% of businesses increasing L&D tech investment, 71% replacing legacy LMS, AI in education reaching $112B by 2034
        </Typography>
      </Box>
    </motion.div>
  </Box>
);


const SolutionSlide = () => (
  <Box sx={{ maxWidth: '90%', width: '100%' }}>
    <motion.div {...fadeInUp}>
      <Typography variant="h2" sx={{ fontSize: 'clamp(1.8rem, 4vh, 3.2rem)', fontWeight: 700, fontFamily: 'Quicksand, sans-serif', mb: 1, color: brandColors.textPrimary }}>
        The <HighlightText>Solara</HighlightText> Solution
      </Typography>
      <Typography variant="h6" sx={{ fontSize: 'clamp(0.85rem, 1.6vh, 1.2rem)', color: brandColors.textSecondary, mb: 3 }}>
        A unified AI-native platform replacing fragmented tools
      </Typography>
    </motion.div>

    <Grid container spacing={2.5} alignItems="stretch">
      <Grid item xs={12} md={5}>
        <DataCard initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ height: '100%' }}>
          <IconBox sx={{ mb: 2 }}><Sparkles size={28} style={{ color: brandColors.primary }} /></IconBox>
          <Typography sx={{ fontSize: 'clamp(1.3rem, 2.2vh, 1.8rem)', fontWeight: 700, color: brandColors.textPrimary, mb: 1.5, fontFamily: 'Quicksand' }}>
            Unified Platform
          </Typography>
          <Typography sx={{ fontSize: 'clamp(0.8rem, 1.4vh, 1rem)', color: brandColors.textSecondary, lineHeight: 1.7, mb: 2 }}>
            Replace 10-15 fragmented tools with a single AI-powered platform covering the entire learning lifecycle
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {['AI-native architecture', 'Unified data model', 'Seamless workflows', 'Enterprise-grade'].map((item, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle2 size={16} style={{ color: brandColors.success, flexShrink: 0 }} />
                <Typography sx={{ fontSize: 'clamp(0.75rem, 1.2vh, 0.9rem)', color: brandColors.textSecondary }}>{item}</Typography>
              </Box>
            ))}
          </Box>
        </DataCard>
      </Grid>

      <Grid item xs={12} md={7}>
        <Grid container spacing={2}>
          {[
            { icon: <Clock />, title: '70-80%', subtitle: 'Faster Content Development', color: brandColors.primary },
            { icon: <DollarSign />, title: '50-60%', subtitle: 'Lower Total Cost', color: brandColors.success },
            { icon: <TrendingUp />, title: '3-5x', subtitle: 'Higher Completion Rates', color: brandColors.primary },
            { icon: <Shield />, title: '100%', subtitle: 'Learning Visibility & ROI', color: brandColors.success },
          ].map((item, idx) => (
            <Grid item xs={6} key={idx}>
              <DataCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + idx * 0.1 }}>
                <Box sx={{ color: item.color, mb: 1.2 }}>{item.icon}</Box>
                <Typography sx={{ fontSize: 'clamp(1.4rem, 2.5vh, 2rem)', fontWeight: 700, color: item.color, mb: 0.5 }}>{item.title}</Typography>
                <Typography sx={{ fontSize: 'clamp(0.75rem, 1.2vh, 0.9rem)', color: brandColors.textSecondary }}>{item.subtitle}</Typography>
              </DataCard>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

const ProductSlide1 = () => (
  <Box sx={{ maxWidth: '90%', width: '100%' }}>
    <SubSlideIndicator total={2} current={0} />
    <motion.div {...fadeInUp}>
      <Typography variant="h2" sx={{ fontSize: 'clamp(1.8rem, 4vh, 3.2rem)', fontWeight: 700, fontFamily: 'Quicksand, sans-serif', mb: 1, color: brandColors.textPrimary }}>
        Product <HighlightText>Ecosystem</HighlightText>
      </Typography>
      <Typography variant="h6" sx={{ fontSize: 'clamp(0.85rem, 1.6vh, 1.2rem)', color: brandColors.textSecondary, mb: 3 }}>
        Six integrated products covering the entire learning lifecycle
      </Typography>
    </motion.div>

    <Grid container spacing={2}>
      {[
        { name: 'POLARIS', icon: Compass, tagline: 'AI Blueprint Generator', status: 'LIVE NOW', statusColor: brandColors.success, desc: 'Translates business goals into learning blueprints in minutes', arr: '$5M ARR by 2026' },
        { name: 'CONSTELLATION', icon: Wand2, tagline: 'Content-to-Blueprint', status: '2026', statusColor: brandColors.warning, desc: 'Analyzes existing content and generates structured blueprints', arr: '$8M ARR contribution' },
        { name: 'NOVA', icon: FileText, tagline: 'AI Content Authoring', status: '2026', statusColor: brandColors.warning, desc: 'AI-assisted platform for creating interactive learning content', arr: '$15M ARR contribution' },
      ].map((product, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <DataCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + idx * 0.1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <IconBox sx={{ mb: 0 }}><product.icon size={22} style={{ color: brandColors.primary }} /></IconBox>
              <Chip label={product.status} size="small" sx={{ bgcolor: `${product.statusColor}20`, color: product.statusColor, fontWeight: 600, fontSize: 'clamp(0.65rem, 1vh, 0.75rem)' }} />
            </Box>
            <Typography sx={{ fontSize: 'clamp(1.1rem, 1.8vh, 1.4rem)', fontWeight: 700, color: brandColors.primary, mb: 0.5, fontFamily: 'Quicksand' }}>
              {product.name}
            </Typography>
            <Typography sx={{ fontSize: 'clamp(0.85rem, 1.3vh, 1rem)', fontWeight: 600, color: brandColors.textSecondary, mb: 1.5 }}>
              {product.tagline}
            </Typography>
            <Typography sx={{ fontSize: 'clamp(0.75rem, 1.2vh, 0.9rem)', color: brandColors.textSecondary, mb: 1.5, lineHeight: 1.6 }}>
              {product.desc}
            </Typography>
            <Box sx={{ mt: 'auto', pt: 1.5, borderTop: `1px solid ${brandColors.border}` }}>
              <Typography sx={{ fontSize: 'clamp(0.7rem, 1.1vh, 0.85rem)', color: brandColors.primary, fontWeight: 600 }}>{product.arr}</Typography>
            </Box>
          </DataCard>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const ProductSlide2 = () => (
  <Box sx={{ maxWidth: '90%', width: '100%' }}>
    <SubSlideIndicator total={2} current={1} />
    <motion.div {...fadeInUp}>
      <Typography variant="h2" sx={{ fontSize: 'clamp(1.8rem, 4vh, 3.2rem)', fontWeight: 700, fontFamily: 'Quicksand, sans-serif', mb: 1, color: brandColors.textPrimary }}>
        Product <HighlightText>Ecosystem</HighlightText>
      </Typography>
      <Typography variant="h6" sx={{ fontSize: 'clamp(0.85rem, 1.6vh, 1.2rem)', color: brandColors.textSecondary, mb: 3 }}>
        Completing the unified learning infrastructure
      </Typography>
    </motion.div>

    <Grid container spacing={2}>
      {[
        { name: 'ORBIT', icon: OrbitIcon, tagline: 'Personalized Delivery LXP', status: '2027', statusColor: brandColors.warning, desc: 'Next-gen platform with AI personalization and Netflix-level UX', arr: '$60M ARR contribution' },
        { name: 'NEBULA', icon: MessageSquare, tagline: 'Intelligent Tutor', status: '2027', statusColor: brandColors.warning, desc: '24/7 AI-powered tutoring providing personalized learning support', arr: '$12M ARR add-on revenue' },
        { name: 'SPECTRUM', icon: Activity, tagline: 'Advanced Analytics', status: '2028', statusColor: brandColors.warning, desc: 'Predictive analytics providing real-time insights into ROI', arr: '$15M ARR contribution' },
      ].map((product, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <DataCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + idx * 0.1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <IconBox sx={{ mb: 0 }}><product.icon size={22} style={{ color: brandColors.primary }} /></IconBox>
              <Chip label={product.status} size="small" sx={{ bgcolor: `${product.statusColor}20`, color: product.statusColor, fontWeight: 600, fontSize: 'clamp(0.65rem, 1vh, 0.75rem)' }} />
            </Box>
            <Typography sx={{ fontSize: 'clamp(1.1rem, 1.8vh, 1.4rem)', fontWeight: 700, color: brandColors.primary, mb: 0.5, fontFamily: 'Quicksand' }}>
              {product.name}
            </Typography>
            <Typography sx={{ fontSize: 'clamp(0.85rem, 1.3vh, 1rem)', fontWeight: 600, color: brandColors.textSecondary, mb: 1.5 }}>
              {product.tagline}
            </Typography>
            <Typography sx={{ fontSize: 'clamp(0.75rem, 1.2vh, 0.9rem)', color: brandColors.textSecondary, mb: 1.5, lineHeight: 1.6 }}>
              {product.desc}
            </Typography>
            <Box sx={{ mt: 'auto', pt: 1.5, borderTop: `1px solid ${brandColors.border}` }}>
              <Typography sx={{ fontSize: 'clamp(0.7rem, 1.1vh, 0.85rem)', color: brandColors.primary, fontWeight: 600 }}>{product.arr}</Typography>
            </Box>
          </DataCard>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const VisionSlide = () => (
  <Box sx={{ textAlign: 'center', maxWidth: '85%', width: '100%' }}>
    <motion.div {...fadeInUp}>
      <IconBox sx={{ width: 'clamp(60px, 7vh, 80px)', height: 'clamp(60px, 7vh, 80px)', mx: 'auto', mb: 2 }}>
        <Sparkles size={36} style={{ color: brandColors.primary }} />
      </IconBox>
      <Typography variant="h2" sx={{ fontSize: 'clamp(2rem, 4.5vh, 3.5rem)', fontWeight: 700, fontFamily: 'Quicksand, sans-serif', mb: 2, color: brandColors.textPrimary }}>
        The <GradientText>Vision</GradientText>
      </Typography>
    </motion.div>

    <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
      <Typography variant="h5" sx={{ fontSize: 'clamp(1.1rem, 2vh, 1.6rem)', fontWeight: 600, color: brandColors.textSecondary, mb: 4, lineHeight: 1.8, maxWidth: '85%', mx: 'auto' }}>
        "To be the <HighlightText>unified learning infrastructure</HighlightText> that powers the world's most progressive organizations"
      </Typography>
    </motion.div>

    <Grid container spacing={2} sx={{ mb: 3, maxWidth: '95%', mx: 'auto' }}>
      {[
        { year: '2027', vision: 'India Category Leader', desc: 'Dominant platform expanding to SE Asia' },
        { year: '2029', vision: 'Global Scale', desc: '10,000+ enterprises across 50+ countries' },
        { year: '2032', vision: 'Industry Standard', desc: 'The platform for all learning needs' },
      ].map((milestone, idx) => (
        <Grid item xs={12} md={4} key={idx}>
          <DataCard initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + idx * 0.1 }}>
            <Typography sx={{ fontSize: 'clamp(1.8rem, 3vh, 2.5rem)', fontWeight: 700, color: brandColors.primary, mb: 0.8, fontFamily: 'Quicksand' }}>
              {milestone.year}
            </Typography>
            <Typography sx={{ fontSize: 'clamp(1rem, 1.6vh, 1.3rem)', fontWeight: 700, color: brandColors.textPrimary, mb: 1 }}>
              {milestone.vision}
            </Typography>
            <Typography sx={{ fontSize: 'clamp(0.8rem, 1.3vh, 0.95rem)', color: brandColors.textSecondary, lineHeight: 1.6 }}>
              {milestone.desc}
            </Typography>
          </DataCard>
        </Grid>
      ))}
    </Grid>

    <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
      <Box sx={{ p: 3, background: `linear-gradient(135deg, ${brandColors.primary}30, ${brandColors.secondary}30)`, border: `2px solid ${brandColors.primary}`, borderRadius: '20px' }}>
        <Typography sx={{ fontSize: 'clamp(1rem, 1.8vh, 1.3rem)', color: brandColors.textPrimary, lineHeight: 1.8, fontWeight: 600 }}>
          By 2030, when organizations need to train their workforce,<br />they'll choose <GradientText style={{ fontSize: 'clamp(1.1rem, 2vh, 1.4rem)' }}>SOLARA</GradientText>
        </Typography>
      </Box>
    </motion.div>
  </Box>
);

// Continue with more slides...
// Due to length, I'll create the complete file in sections

export default function InvestorPitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const slides = [
    <CoverSlide key="cover" />,
    <ProblemSlide1 key="problem1" />,
    <ProblemSlide2 key="problem2" />,
    <MarketSlide key="market" />,
    <SolutionSlide key="solution" />,
    <ProductSlide1 key="product1" />,
    <ProductSlide2 key="product2" />,
    <VisionSlide key="vision" />,
  ];

  const paginate = (newDirection: number) => {
    setCurrentSlide((prevSlide) => {
      const newSlide = prevSlide + newDirection;
      if (newSlide >= 0 && newSlide < slides.length) {
        setPage([newSlide, newDirection]);
        return newSlide;
      }
      return prevSlide;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        paginate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SlideContainer>
      <Box
        sx={{
          position: 'fixed',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: `radial-gradient(circle at 20% 30%, ${brandColors.primary}15 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${brandColors.secondary}15 0%, transparent 50%)`,
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <SlideWrapper>
        {currentSlide > 0 && (
          <NavButton onClick={() => paginate(-1)} sx={{ left: '1vw' }}>
            <ChevronLeft size={20} />
          </NavButton>
        )}
        {currentSlide < slides.length - 1 && (
          <NavButton onClick={() => paginate(1)} sx={{ right: '1vw' }}>
            <ChevronRight size={20} />
          </NavButton>
        )}

        <SlideCounter>
          {currentSlide + 1} / {slides.length}
        </SlideCounter>

        <SlideContent>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              {slides[currentSlide]}
            </motion.div>
          </AnimatePresence>
        </SlideContent>
      </SlideWrapper>
    </SlideContainer>
  );
}
