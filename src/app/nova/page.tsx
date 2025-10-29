'use client';

import { Box, Container, Typography, Button, Grid, Chip, Tab, Tabs, Paper, Avatar, Card, CardContent, Rating } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Sparkles,
  PenTool,
  FileText,
  MessageSquare,
  Rocket,
  Zap,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  Brain,
  Palette,
  Video,
  Image,
  Code,
  Lightbulb,
  Target,
  Award,
  BookOpen,
  TrendingUp,
  Shield,
  Globe,
  Star,
  ChevronRight,
  Play,
  Download,
  Settings,
  Eye,
  Edit3,
  Layers,
  Lock,
  BarChart3,
  Check,
  X,
  AlertCircle,
  ThumbsUp,
  Timer,
  Archive
} from 'lucide-react';
import { SkipToContent } from '@/components/accessibility/SkipToContent';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
  50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.5), 0 0 60px rgba(34, 197, 94, 0.3); }
  100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const rotate = keyframes`
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

const NovaBrandText = styled('span')(() => ({
  color: '#22c55e',
  display: 'inline-block',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    right: 0,
    height: '3px',
    background: '#22c55e',
    opacity: 0.5,
  },
}));

const PremiumButton = styled(Button)(() => ({
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '16px',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  background: '#22c55e',
  color: '#020C1B',
  boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)',
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
    background: '#16a34a',
    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.5)',
    '&::before': {
      left: '100%',
    },
  },
}));

const SecondaryButton = styled(Button)(() => ({
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: '16px',
  textTransform: 'none',
  position: 'relative',
  background: 'transparent',
  color: '#22c55e',
  border: '2px solid #22c55e',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(34, 197, 94, 0.1)',
    transform: 'translateY(-2px)',
    borderColor: '#16a34a',
  },
}));

const FeatureCard = styled(motion.div)<{ accentColor: string }>(({ accentColor }) => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(34, 197, 94, 0.1)',
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
    height: '3px',
    background: accentColor,
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    border: `1px solid ${accentColor}50`,
    boxShadow: `0 25px 50px ${accentColor}20`,
    '&::before': {
      opacity: 1,
    },
  },
}));

const UserPersonaCard = styled(motion.div)<{ accentColor: string }>(({ accentColor }) => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(34, 197, 94, 0.1)',
  borderRadius: '24px',
  padding: '32px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '0',
    right: '0',
    width: '100px',
    height: '100px',
    background: `linear-gradient(135deg, ${accentColor}20, transparent)`,
    borderRadius: '0 0 0 100%',
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    border: `1px solid ${accentColor}30`,
    boxShadow: `0 20px 40px ${accentColor}15`,
  },
}));

const FloatingBadge = styled(Chip)(() => ({
  background: 'rgba(34, 197, 94, 0.15)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(34, 197, 94, 0.3)',
  color: '#22c55e',
  fontWeight: 600,
  padding: '8px 4px',
  height: 'auto',
  fontSize: '0.875rem',
  '& .MuiChip-icon': {
    color: '#22c55e',
  },
}));

const TestimonialCard = styled(motion.div)(() => ({
  background: 'rgba(13, 27, 42, 0.6)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(34, 197, 94, 0.1)',
  borderRadius: '20px',
  padding: '24px',
  position: 'relative',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
    border: '1px solid rgba(34, 197, 94, 0.2)',
  },
}));

const FloatingElement = styled(Box)(() => ({
  position: 'absolute',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)',
  animation: `${float} 6s ease-in-out infinite`,
}));

const TimelineItem = styled(Box)(() => ({
  position: 'relative',
  paddingLeft: '40px',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '9px',
    top: '8px',
    bottom: '-20px',
    width: '2px',
    background: 'linear-gradient(to bottom, #22c55e, transparent)',
  },
  '&:last-child::before': {
    display: 'none',
  },
}));

const TimelineDot = styled(Box)(() => ({
  position: 'absolute',
  left: '0',
  top: '8px',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  background: '#22c55e',
  border: '3px solid #020C1B',
  boxShadow: '0 0 20px rgba(34, 197, 94, 0.5)',
}));

// Data structures
const features = [
  {
    id: 'ai-generation',
    icon: Sparkles,
    title: 'AI-Powered Content Generation',
    description: 'Transform your ideas into engaging learning content with advanced AI that understands instructional design principles.',
    capabilities: [
      'Script writing and explanations',
      'Interactive quiz generation',
      'Scenario creation',
      'Adaptive learning paths'
    ],
    accentColor: '#22c55e'
  },
  {
    id: 'authoring-assistant',
    icon: PenTool,
    title: 'Intelligent Authoring Assistant',
    description: 'Real-time suggestions and guidance that help you create better content, faster.',
    capabilities: [
      'Readability optimization',
      'Instructional design guidance',
      'Learning objective alignment',
      'Content structure recommendations'
    ],
    accentColor: '#16a34a'
  },
  {
    id: 'interactive-elements',
    icon: Layers,
    title: 'Rich Interactive Elements',
    description: 'Create engaging learning experiences with drag-and-drop simplicity and pre-built templates.',
    capabilities: [
      'Drag-and-drop interface',
      'Pre-built interactive templates',
      'Branching scenarios',
      'Gamification elements'
    ],
    accentColor: '#15803d'
  },
  {
    id: 'media-management',
    icon: Archive,
    title: 'Integrated Media Library',
    description: 'Access millions of assets and manage your brand resources in one centralized location.',
    capabilities: [
      'AI-powered image search',
      'Brand asset management',
      'Video integration',
      'Accessibility optimization'
    ],
    accentColor: '#166534'
  },
  {
    id: 'collaboration',
    icon: Users,
    title: 'Real-time Collaboration',
    description: 'Work together seamlessly with subject matter experts and team members.',
    capabilities: [
      'Real-time editing',
      'SME review workflows',
      'Commenting and feedback',
      'Version control'
    ],
    accentColor: '#14532d'
  },
  {
    id: 'publishing',
    icon: Globe,
    title: 'Multi-Format Publishing',
    description: 'Publish your content anywhere with a single click, maintaining quality across all platforms.',
    capabilities: [
      'SCORM compliance',
      'HTML5 export',
      'Mobile optimization',
      'Orbit integration'
    ],
    accentColor: '#052e16'
  }
];

const userPersonas = [
  {
    id: 'instructional-designers',
    icon: Brain,
    title: 'Instructional Designers',
    description: 'Create pedagogically sound content 5x faster with AI that understands learning science.',
    painPoints: [
      'Time-consuming content creation',
      'Balancing quality with quantity',
      'Keeping content engaging',
      'Meeting accessibility standards'
    ],
    benefits: [
      '90% first-draft quality',
      'Built-in instructional design principles',
      'Automatic accessibility compliance',
      'Rapid iteration and testing'
    ],
    accentColor: '#22c55e'
  },
  {
    id: 'subject-matter-experts',
    icon: BookOpen,
    title: 'Subject Matter Experts',
    description: 'Share your expertise without technical barriers - Nova handles the instructional design.',
    painPoints: [
      'Limited instructional design knowledge',
      'Time constraints',
      'Technical tool barriers',
      'Quality consistency issues'
    ],
    benefits: [
      'No technical skills required',
      'Focus on content expertise',
      'Professional output guaranteed',
      'Rapid content deployment'
    ],
    accentColor: '#16a34a'
  },
  {
    id: 'learning-teams',
    icon: Users,
    title: 'L&D Teams',
    description: 'Scale your content production and maintain quality across all learning initiatives.',
    painPoints: [
      'Resource constraints',
      'Inconsistent quality',
      'Slow time-to-market',
      'Tool fragmentation'
    ],
    benefits: [
      '5x content per designer',
      'Consistent brand and quality',
      'Unified platform',
      'Team collaboration tools'
    ],
    accentColor: '#15803d'
  },
  {
    id: 'freelance-developers',
    icon: Rocket,
    title: 'Freelance Developers',
    description: 'Deliver more projects in less time with AI-powered content creation tools.',
    painPoints: [
      'Client deadline pressure',
      'Competitive pricing',
      'Quality expectations',
      'Tool subscription costs'
    ],
    benefits: [
      '70% faster development',
      'Higher profit margins',
      'Premium quality output',
      'All-in-one solution'
    ],
    accentColor: '#166534'
  }
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Director of Learning Innovation',
    company: 'TechCorp Solutions',
    content: 'Nova transformed our content creation process. What used to take weeks now takes hours, and the quality is exceptional.',
    rating: 5,
    avatar: 'SC'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Instructional Designer',
    company: 'Global Learning Partners',
    content: 'The AI understands learning science principles better than some humans I\'ve worked with. It\'s like having an expert co-author.',
    rating: 5,
    avatar: 'MR'
  },
  {
    id: 3,
    name: 'Dr. Emily Watson',
    role: 'Subject Matter Expert',
    company: 'Healthcare Education Institute',
    content: 'I can focus on sharing my expertise while Nova handles the instructional design. Perfect collaboration.',
    rating: 5,
    avatar: 'EW'
  }
];

const workflowSteps = [
  {
    id: 'define',
    title: 'Define Learning Objectives',
    description: 'Input your goals and let Nova suggest optimal learning outcomes.',
    icon: Target,
    time: '2 minutes'
  },
  {
    id: 'generate',
    title: 'AI Content Generation',
    description: 'Watch as Nova creates engaging content tailored to your objectives.',
    icon: Sparkles,
    time: '5-10 minutes'
  },
  {
    id: 'refine',
    title: 'Review & Refine',
    description: 'Make adjustments with intelligent suggestions and real-time preview.',
    icon: Edit3,
    time: '10-15 minutes'
  },
  {
    id: 'publish',
    title: 'Deploy Everywhere',
    description: 'Publish to multiple formats with one click, maintaining quality across platforms.',
    icon: Globe,
    time: '1 minute'
  }
];

export default function NovaPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [personasRef, personasInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [workflowRef, workflowInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const {
    shouldOptimize,
    getAnimationProps,
    createIntersectionObserver,
    getPerformanceStyles,
  } = useOptimizedAnimations({
    performanceMode: 'balanced',
    reduceMotion: false,
  });

  return (
    <>
      {/* Skip to Content Link */}
      <SkipToContent />

      {/* Hero Section */}
      <HeroSection ref={heroRef} role="banner">
        {/* Floating Elements */}
        <FloatingElement
          sx={{
            width: '200px',
            height: '200px',
            top: '10%',
            left: '5%',
            animationDelay: '0s',
          }}
        />
        <FloatingElement
          sx={{
            width: '150px',
            height: '150px',
            top: '60%',
            right: '10%',
            animationDelay: '2s',
          }}
        />
        <FloatingElement
          sx={{
            width: '100px',
            height: '100px',
            bottom: '20%',
            left: '15%',
            animationDelay: '4s',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 12 } }}>
          <Grid container spacing={6} alignItems="center">
            {/* Left Content */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <FloatingBadge
                  icon={<Sparkles size={16} />}
                  label="Nova by Solara | Coming Soon | AI-Assisted Content Authoring"
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
                  Create Learning Content{' '}
                  <NovaBrandText>
                    at the Speed of Thought
                  </NovaBrandText>
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
                  AI-Assisted Content Authoring That Understands Learning Science
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
                  Transform weeks of content development into minutes. Nova generates pedagogically sound learning content with an AI co-author that knows how people learn.
                </Typography>

                <Box
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '2px solid rgba(34, 197, 94, 0.4)',
                    mb: 4,
                    maxWidth: '600px',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#22c55e',
                      fontWeight: 700,
                      mb: 1,
                      fontSize: '1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Rocket size={24} color="#22c55e" />
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
                    Nova is currently under active development with expected launch in Q3 2026. Be among the first to experience AI-assisted content authoring by reaching out to our team today.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  <PremiumButton
                    component="a"
                    href="https://www.smartslate.io/contact"
                    endIcon={<Rocket size={20} />}
                  >
                    Reach out to know more
                  </PremiumButton>
                </Box>

                {/* Trust Indicators */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                  {[
                    'Expected Q3 2026',
                    '70% faster development',
                    '5x content per designer',
                    'AI-first platform',
                  ].map((text, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle2 size={16} color="#22c55e" />
                      <Typography variant="caption" sx={{ color: '#7a8a8b', fontSize: '0.85rem' }}>
                        {text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>

            {/* Right Visual - Interactive Demo Preview */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    background: 'rgba(13, 27, 42, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                    borderRadius: '24px',
                    padding: '32px',
                    boxShadow: '0 25px 50px rgba(34, 197, 94, 0.1)',
                  }}
                >
                  {/* Mock Interface */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ color: '#22c55e', fontWeight: 700, mb: 2 }}>
                      Nova Content Studio
                    </Typography>

                    {/* Input Area */}
                    <Paper
                      sx={{
                        p: 2,
                        background: 'rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                        borderRadius: '12px',
                        mb: 2,
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#7a8a8b', display: 'block', mb: 1 }}>
                        Learning Objective:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                        "Create a module on effective project management..."
                      </Typography>
                    </Paper>

                    {/* AI Processing Animation */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {[0, 1, 2].map((i) => (
                          <Box
                            key={i}
                            sx={{
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: '#22c55e',
                              animation: `${pulse} 1.5s ease-in-out infinite ${i * 0.2}s`,
                            }}
                          />
                        ))}
                      </Box>
                      <Typography variant="caption" sx={{ color: '#22c55e' }}>
                        AI generating content...
                      </Typography>
                    </Box>

                    {/* Generated Content Preview */}
                    <Paper
                      sx={{
                        p: 2,
                        background: 'rgba(34, 197, 94, 0.05)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '12px',
                      }}
                    >
                      <Typography variant="caption" sx={{ color: '#22c55e', display: 'block', mb: 1 }}>
                        Generated Content:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#b0c5c6', lineHeight: 1.6 }}>
                        ✓ Interactive lesson on project phases<br/>
                        ✓ Scenario-based assessments<br/>
                        ✓ Progress tracking metrics<br/>
                        ✓ Mobile-optimized activities
                      </Typography>
                    </Paper>
                  </Box>

                  {/* Action Buttons Mock */}
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      size="small"
                      startIcon={<Edit3 size={16} />}
                      sx={{
                        background: 'rgba(34, 197, 94, 0.2)',
                        color: '#22c55e',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        '&:hover': {
                          background: 'rgba(34, 197, 94, 0.3)',
                        }
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Eye size={16} />}
                      sx={{
                        background: 'rgba(167, 218, 219, 0.2)',
                        color: '#a7dadb',
                        border: '1px solid rgba(167, 218, 219, 0.3)',
                        '&:hover': {
                          background: 'rgba(167, 218, 219, 0.3)',
                        }
                      }}
                    >
                      Preview
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Download size={16} />}
                      sx={{
                        background: 'rgba(34, 197, 94, 0.2)',
                        color: '#22c55e',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        '&:hover': {
                          background: 'rgba(34, 197, 94, 0.3)',
                        }
                      }}
                    >
                      Export
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Development Timeline Section */}
      <Box sx={{ py: 8, backgroundColor: 'rgba(255, 193, 7, 0.05)', borderTop: '1px solid rgba(255, 193, 7, 0.2)', borderBottom: '1px solid rgba(255, 193, 7, 0.2)' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="overline"
                sx={{
                  color: '#ffc107',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  mb: 2,
                  display: 'block',
                }}
              >
                DEVELOPMENT ROADMAP
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, color: '#e0e0e0', mb: 3 }}>
                Nova's Journey to Launch
              </Typography>
              <Typography variant="body1" sx={{ color: '#b0c5c6', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '700px', mx: 'auto' }}>
                We're building Nova with precision and care. Here's our development timeline and what you can expect as we approach launch.
              </Typography>
            </Box>

            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  phase: 'Current Phase',
                  status: '🚧 In Development',
                  timeline: 'Q4 2025 - Q2 2026',
                  description: 'Core AI engine development, content generation algorithms, and instructional design frameworks.',
                  color: '#ffc107',
                  details: ['AI content generation models', 'Learning science integration', 'User interface development', 'Beta testing preparation']
                },
                {
                  phase: 'Next Phase',
                  status: '🔬 Private Beta',
                  timeline: 'Q2 2026',
                  description: 'Limited beta testing with selected enterprise partners and instructional design experts.',
                  color: '#22c55e',
                  details: ['Beta user onboarding', 'Feature validation', 'Performance optimization', 'Feedback integration']
                },
                {
                  phase: 'Launch Phase',
                  status: '🚀 Public Launch',
                  timeline: 'Q3 2026',
                  description: 'Full public release with all core features and enterprise-grade support.',
                  color: '#06b6d4',
                  details: ['General availability', 'Full feature set', 'Documentation and training', '24/7 support']
                }
              ].map((phase, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: '20px',
                        background: 'rgba(13, 27, 42, 0.6)',
                        backdropFilter: 'blur(20px)',
                        border: `2px solid ${phase.color}30`,
                        height: '100%',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '3px',
                          background: phase.color,
                        },
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          color: phase.color,
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          mb: 1,
                          display: 'block',
                        }}
                      >
                        {phase.phase}
                      </Typography>

                      <Typography
                        variant="h6"
                        sx={{
                          color: phase.color,
                          fontWeight: 800,
                          mb: 1,
                          fontSize: '1.1rem',
                        }}
                      >
                        {phase.status}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: '#7a8a8b',
                          fontWeight: 600,
                          mb: 2,
                          fontSize: '0.85rem',
                        }}
                      >
                        {phase.timeline}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: '#b0c5c6',
                          lineHeight: 1.6,
                          mb: 2,
                          fontSize: '0.9rem',
                        }}
                      >
                        {phase.description}
                      </Typography>

                      <Box sx={{ mt: 2 }}>
                        {phase.details.map((detail, idx) => (
                          <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: phase.color }} />
                            <Typography variant="caption" sx={{ color: '#7a8a8b', fontSize: '0.8rem' }}>
                              {detail}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography variant="body2" sx={{ color: '#7a8a8b', fontSize: '0.9rem' }}>
                Want to get early access or participate in our beta program?
              </Typography>
              <Typography variant="body2" sx={{ color: '#ffc107', fontWeight: 600, fontSize: '0.9rem' }}>
                Reach out to learn more about becoming a development partner.
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Problem/Solution Section */}
      <Box sx={{ py: 10, backgroundColor: '#020C1B', borderTop: '1px solid rgba(34, 197, 94, 0.1)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: '#22c55e',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    display: 'block',
                    mb: 2,
                  }}
                >
                  THE CHALLENGE
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 900, color: '#e0e0e0', mb: 3 }}>
                  Content Creation Bottlenecks Are Slowing You Down
                </Typography>

                {[
                  'Weeks spent on content that becomes outdated in months',
                  'Balancing quality with the need for rapid development',
                  'Subject matter experts struggling with instructional design',
                  'Inconsistent quality across different designers and projects'
                ].map((pain, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                    <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
                    <Typography variant="body1" sx={{ color: '#b0c5c6', lineHeight: 1.6 }}>
                      {pain}
                    </Typography>
                  </Box>
                ))}
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Box
                  sx={{
                    p: 4,
                    borderRadius: '24px',
                    background: 'rgba(34, 197, 94, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      color: '#22c55e',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      display: 'block',
                      mb: 2,
                    }}
                  >
                    THE NOVA SOLUTION
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: '#22c55e', mb: 3 }}>
                    AI-Powered Excellence at Scale
                  </Typography>

                  {[
                    'Generate comprehensive learning modules in minutes, not weeks',
                    'Built-in instructional design principles ensure pedagogical quality',
                    'Empower SMEs to create professional content without technical barriers',
                    'Maintain consistent quality and brand standards across all content'
                  ].map((solution, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3 }}>
                      <CheckCircle2 size={20} color="#22c55e" style={{ flexShrink: 0, marginTop: 2 }} />
                      <Typography variant="body1" sx={{ color: '#b0c5c6', lineHeight: 1.6 }}>
                        {solution}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Showcase */}
      <Box ref={featuresRef} sx={{ py: 10, backgroundColor: '#020C1B' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: '#22c55e',
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
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '2.75rem' },
                color: '#e0e0e0',
                mb: 2,
              }}
            >
              Everything You Need to Create Exceptional Learning
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#b0c5c6',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mb: 6,
              }}
            >
              Nova combines AI intelligence with intuitive design tools to accelerate your content creation workflow.
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Grid size={{ xs: 12, md: 6, lg: 4 }} key={feature.id}>
                  <FeatureCard
                    accentColor={feature.accentColor}
                    initial={{ opacity: 0, y: 30 }}
                    animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedFeature(selectedFeature === feature.id ? null : feature.id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: `${feature.accentColor}20`,
                          border: `1px solid ${feature.accentColor}30`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <Icon size={32} color={feature.accentColor} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: feature.accentColor,
                            fontWeight: 800,
                            fontSize: '1.3rem',
                            mb: 1,
                          }}
                        >
                          {feature.title}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: '#b0c5c6',
                        lineHeight: 1.6,
                        mb: 3,
                        fontSize: '0.9rem',
                      }}
                    >
                      {feature.description}
                    </Typography>

                    <Box sx={{ mt: 'auto' }}>
                      {feature.capabilities.slice(0, selectedFeature === feature.id ? undefined : 3).map((capability, idx) => (
                        <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <ChevronRight size={16} color={feature.accentColor} />
                          <Typography variant="caption" sx={{ color: '#b0c5c6', fontSize: '0.85rem' }}>
                            {capability}
                          </Typography>
                        </Box>
                      ))}
                      {feature.capabilities.length > 3 && selectedFeature !== feature.id && (
                        <Typography variant="caption" sx={{ color: feature.accentColor, fontWeight: 600 }}>
                          +{feature.capabilities.length - 3} more capabilities
                        </Typography>
                      )}
                    </Box>
                  </FeatureCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Target User Personas */}
      <Box ref={personasRef} sx={{ py: 10, backgroundColor: '#020C1B', borderTop: '1px solid rgba(34, 197, 94, 0.1)' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={personasInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: '#22c55e',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              DESIGNED FOR EVERYONE
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '2.75rem' },
                color: '#e0e0e0',
                mb: 2,
              }}
            >
              Built for the Way You Work
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#b0c5c6',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mb: 6,
              }}
            >
              Whether you're an instructional designer, subject matter expert, or learning leader, Nova adapts to your needs.
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {userPersonas.map((persona, index) => {
              const Icon = persona.icon;
              const isExpanded = selectedPersona === persona.id;

              return (
                <Grid size={{ xs: 12, md: 6 }} key={persona.id}>
                  <UserPersonaCard
                    accentColor={persona.accentColor}
                    initial={{ opacity: 0, y: 30 }}
                    animate={personasInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 3 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: '16px',
                          background: `${persona.accentColor}20`,
                          border: `1px solid ${persona.accentColor}30`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon size={32} color={persona.accentColor} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h5"
                          sx={{
                            color: persona.accentColor,
                            fontWeight: 800,
                            fontSize: '1.3rem',
                            mb: 1,
                          }}
                        >
                          {persona.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#b0c5c6',
                            lineHeight: 1.6,
                            fontSize: '0.9rem',
                          }}
                        >
                          {persona.description}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Toggle Button */}
                    <Button
                      size="small"
                      onClick={() => setSelectedPersona(isExpanded ? null : persona.id)}
                      sx={{
                        mb: 2,
                        color: persona.accentColor,
                        background: `${persona.accentColor}10`,
                        border: `1px solid ${persona.accentColor}30`,
                        '&:hover': {
                          background: `${persona.accentColor}20`,
                        }
                      }}
                    >
                      {isExpanded ? 'Show Less' : 'View Pain Points & Benefits'}
                    </Button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <Grid container spacing={3}>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <Typography variant="subtitle2" sx={{ color: '#ef4444', fontWeight: 700, mb: 2 }}>
                                Common Challenges
                              </Typography>
                              {persona.painPoints.map((pain, idx) => (
                                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
                                  <X size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: 2 }} />
                                  <Typography variant="caption" sx={{ color: '#b0c5c6', fontSize: '0.8rem' }}>
                                    {pain}
                                  </Typography>
                                </Box>
                              ))}
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                              <Typography variant="subtitle2" sx={{ color: persona.accentColor, fontWeight: 700, mb: 2 }}>
                                Nova Solutions
                              </Typography>
                              {persona.benefits.map((benefit, idx) => (
                                <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
                                  <CheckCircle2 size={16} color={persona.accentColor} style={{ flexShrink: 0, marginTop: 2 }} />
                                  <Typography variant="caption" sx={{ color: '#b0c5c6', fontSize: '0.8rem' }}>
                                    {benefit}
                                  </Typography>
                                </Box>
                              ))}
                            </Grid>
                          </Grid>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </UserPersonaCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Workflow Section */}
      <Box ref={workflowRef} sx={{ py: 10, backgroundColor: '#020C1B', borderTop: '1px solid rgba(34, 197, 94, 0.1)' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={workflowInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: '#22c55e',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              SIMPLIFIED WORKFLOW
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '2.75rem' },
                color: '#e0e0e0',
                mb: 2,
              }}
            >
              From Idea to Deployment in Minutes
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#b0c5c6',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mb: 6,
              }}
            >
              Nova's intelligent workflow eliminates complexity while maintaining professional quality.
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={step.id}>
                  <TimelineItem>
                    <TimelineDot />
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={workflowInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Box
                        sx={{
                          p: 3,
                          borderRadius: '16px',
                          background: 'rgba(13, 27, 42, 0.6)',
                          border: '1px solid rgba(34, 197, 94, 0.1)',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            border: '1px solid rgba(34, 197, 94, 0.3)',
                            transform: 'translateY(-4px)',
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: '12px',
                              background: '#22c55e20',
                              border: '1px solid #22c55e30',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Icon size={24} color="#22c55e" />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                color: '#22c55e',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                              }}
                            >
                              {step.title}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#22c55e' }}>
                              {step.time}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#b0c5c6',
                            lineHeight: 1.5,
                            fontSize: '0.9rem',
                          }}
                        >
                          {step.description}
                        </Typography>
                      </Box>
                    </motion.div>
                  </TimelineItem>
                </Grid>
              );
            })}
          </Grid>

          {/* Total Time Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={workflowInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Box
              sx={{
                mt: 6,
                p: 4,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))',
                border: '1px solid rgba(34, 197, 94, 0.2)',
                textAlign: 'center',
              }}
            >
              <Typography variant="h3" sx={{ color: '#22c55e', fontWeight: 900, mb: 2 }}>
                ~20 Minutes Total
              </Typography>
              <Typography variant="body1" sx={{ color: '#b0c5c6', fontSize: '1.1rem' }}>
                Compare that to the traditional 2-4 weeks for similar quality content
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box ref={testimonialsRef} sx={{ py: 10, backgroundColor: '#020C1B', borderTop: '1px solid rgba(34, 197, 94, 0.1)' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: '#22c55e',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                mb: 2,
                display: 'block',
              }}
            >
              EARLY ADOPTER FEEDBACK
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2rem', md: '2.75rem' },
                color: '#e0e0e0',
                mb: 2,
              }}
            >
              Trusted by Learning Leaders
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#b0c5c6',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                mb: 6,
              }}
            >
              See what early access users are saying about their experience with Nova.
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={testimonial.id}>
                <TestimonialCard
                  initial={{ opacity: 0, y: 30 }}
                  animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 48,
                        height: 48,
                        background: '#22c55e20',
                        border: '1px solid #22c55e30',
                        color: '#22c55e',
                        fontWeight: 700,
                      }}
                    >
                      {testimonial.avatar}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ color: '#e0e0e0', fontWeight: 700 }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7a8a8b' }}>
                        {testimonial.role}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#22c55e', display: 'block' }}>
                        {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>

                  <Rating value={testimonial.rating} readOnly size="small" sx={{ mb: 2, color: '#22c55e' }} />

                  <Typography
                    variant="body2"
                    sx={{
                      color: '#b0c5c6',
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                    }}
                  >
                    "{testimonial.content}"
                  </Typography>
                </TestimonialCard>
              </Grid>
            ))}
          </Grid>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Box
              sx={{
                mt: 6,
                p: 4,
                borderRadius: '20px',
                background: 'rgba(13, 27, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(34, 197, 94, 0.1)',
              }}
            >
              <Grid container spacing={3} alignItems="center">
                <Grid size={{ xs: 12, md: 8 }}>
                  <Typography variant="h6" sx={{ color: '#22c55e', fontWeight: 700, mb: 2 }}>
                    Beta Program Success Metrics
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                    {[
                      { value: '500+', label: 'Beta Testers' },
                      { value: '94%', label: 'Satisfaction Rate' },
                      { value: '12x', label: 'Productivity Increase' },
                      { value: '100%', label: 'Would Recommend' }
                    ].map((metric, index) => (
                      <Box key={index}>
                        <Typography variant="h4" sx={{ color: '#22c55e', fontWeight: 900, lineHeight: 1 }}>
                          {metric.value}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#7a8a8b' }}>
                          {metric.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: '#e0e0e0', fontWeight: 700, mb: 1 }}>
                      Join the Waiting List
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#b0c5c6', mb: 2 }}>
                      Be among the first to access Nova
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#22c55e', fontWeight: 900 }}>
                      2,847
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7a8a8b' }}>
                      Professionals waiting
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box
        id="early-access"
        sx={{
          py: 10,
          background: '#020C1B',
          borderTop: '1px solid rgba(34, 197, 94, 0.15)',
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
                  <Rocket size={32} color="#22c55e" />
                  <Typography
                    variant="overline"
                    sx={{
                      color: '#22c55e',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                    }}
                  >
                    EARLY ACCESS PROGRAM
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
                  Ready to Transform Content Creation?
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
                  Nova is currently in active development with a planned Q3 2026 launch. Connect with our team to learn about development partnerships, beta testing opportunities, and launch notifications.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                  <PremiumButton
                    component="a"
                    href="https://www.smartslate.io/contact"
                  >
                    Reach out to know more
                  </PremiumButton>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {[
                    '🚧 Under active development',
                    '📅 Q3 2026 planned launch',
                    '🔬 Beta testing opportunities',
                    '🤝 Development partnerships available'
                  ].map((benefit, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Clock size={16} color="#ffc107" />
                      <Typography variant="caption" sx={{ color: '#7a8a8b', fontSize: '0.85rem' }}>
                        {benefit}
                      </Typography>
                    </Box>
                  ))}
                </Box>
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
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                  }}
                >
                  <Typography variant="h6" sx={{ color: '#22c55e', fontWeight: 700, mb: 3 }}>
                    Early Access Benefits
                  </Typography>
                  {[
                    {
                      icon: <Zap size={20} />,
                      title: 'First-Mover Advantage',
                      description: 'Get ahead of the competition with AI-powered content creation'
                    },
                    {
                      icon: <Users size={20} />,
                      title: 'Direct Input',
                      description: 'Shape Nova\'s development with your feedback and needs'
                    },
                    {
                      icon: <Award size={20} />,
                      title: 'Exclusive Pricing',
                      description: 'Lock in special early adopter rates for life'
                    },
                    {
                      icon: <Shield size={20} />,
                      title: 'Priority Support',
                      description: 'Dedicated support and onboarding from our team'
                    }
                  ].map((benefit, index) => (
                    <Box key={index} sx={{ display: 'flex', gap: 3, mb: 3, alignItems: 'flex-start' }}>
                      <Box sx={{ color: '#22c55e', mt: 0.5 }}>
                        {benefit.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: '#e0e0e0', fontWeight: 700, mb: 0.5 }}>
                          {benefit.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#b0c5c6', lineHeight: 1.5 }}>
                          {benefit.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}

                  <Typography
                    variant="caption"
                    sx={{
                      color: '#7a8a8b',
                      mt: 2,
                      display: 'block',
                      textAlign: 'center',
                      fontStyle: 'italic'
                    }}
                  >
                    Expected launch: Q3 2026 • Early access begins: Q2 2026
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
