'use client';

import { Box, Container, Typography, Button, Card, CardContent, Grid, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Compass,
  Network,
  Sparkles,
  Orbit as OrbitIcon,
  BarChart3,
  ArrowRight,
  Zap,
  Target,
  CheckCircle2,
  Star,
  TrendingUp,
  Layers,
  Sparkle
} from 'lucide-react';

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, #020C1B 0%, #0d1b2a 50%, #142433 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(167, 218, 219, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    animation: `${float} 8s ease-in-out infinite`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-10%',
    left: '-5%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    animation: `${float} 10s ease-in-out infinite`,
    animationDelay: '1s',
  },
}));

const GradientText = styled(Typography)(() => ({
  background: 'linear-gradient(135deg, #a7dadb 0%, #7C69F5 50%, #a7dadb 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  animation: `${shimmer} 3s linear infinite`,
}));

const FeatureCard = styled(motion.div)(({ theme }) => ({
  height: '100%',
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(167, 218, 219, 0.1)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, transparent, rgba(167, 218, 219, 0.5), transparent)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    border: '1px solid rgba(167, 218, 219, 0.3)',
    boxShadow: '0 30px 60px rgba(167, 218, 219, 0.15)',
    '&::before': {
      opacity: 1,
    },
  },
}));

const BentoCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'featured'
})<{ featured?: boolean }>(({ theme, featured }) => ({
  height: '100%',
  minHeight: featured ? '400px' : '300px',
  background: featured
    ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(167, 218, 219, 0.1) 100%)'
    : 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: `1px solid ${featured ? 'rgba(167, 218, 219, 0.3)' : 'rgba(167, 218, 219, 0.1)'}`,
  borderRadius: '32px',
  padding: theme.spacing(featured ? 5 : 4),
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 25px 50px rgba(167, 218, 219, 0.2)',
    border: `1px solid rgba(167, 218, 219, 0.4)`,
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 72,
  height: 72,
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.2), rgba(79, 70, 229, 0.15))',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(167, 218, 219, 0.2)',
  marginBottom: theme.spacing(3),
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -2,
    borderRadius: '20px',
    background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.5), rgba(79, 70, 229, 0.3))',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

const StatsCard = styled(motion.div)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5, 3),
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(167, 218, 219, 0.1)',
  borderRadius: '24px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #4F46E5, #a7dadb, #7C69F5)',
    backgroundSize: '200% auto',
    animation: `${shimmer} 3s linear infinite`,
  },
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(167, 218, 219, 0.15)',
    border: '1px solid rgba(167, 218, 219, 0.3)',
  },
}));

const FloatingBadge = styled(Chip)(({ theme }) => ({
  background: 'rgba(167, 218, 219, 0.15)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(167, 218, 219, 0.3)',
  color: theme.palette.primary.main,
  fontWeight: 600,
  padding: theme.spacing(2, 1),
  height: 'auto',
  '& .MuiChip-icon': {
    color: theme.palette.primary.main,
  },
}));

const PremiumButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 5),
  fontSize: '1.1rem',
  fontWeight: 700,
  borderRadius: '16px',
  textTransform: 'none',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #4F46E5 0%, #7C69F5 100%)',
  boxShadow: '0 10px 30px rgba(79, 70, 229, 0.3)',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px rgba(79, 70, 229, 0.4)',
    '&::before': {
      left: '100%',
    },
  },
}));

// Animated Counter Component
function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function HomePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [bentoRef, bentoInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const features = [
    {
      icon: <Compass size={36} />,
      title: 'Polaris',
      description: 'AI-powered needs analysis that transforms 6 weeks of stakeholder meetings into 1 week.',
      link: '/polaris',
      color: '#a7dadb',
      badge: 'Most Popular',
    },
    {
      icon: <Network size={36} />,
      title: 'Constellation',
      description: 'Connect learning pathways and create interconnected knowledge ecosystems.',
      link: '/constellation',
      color: '#7C69F5',
    },
    {
      icon: <Sparkles size={36} />,
      title: 'Nova',
      description: 'Innovative AI-powered content creation for engaging learning experiences.',
      link: '/nova',
      color: '#22c55e',
      badge: 'New',
    },
    {
      icon: <OrbitIcon size={36} />,
      title: 'Orbit',
      description: 'Continuous learning cycles ensuring long-term retention and mastery.',
      link: '/orbit',
      color: '#f59e0b',
    },
    {
      icon: <BarChart3 size={36} />,
      title: 'Spectrum',
      description: 'Comprehensive analytics for data-driven learning optimization.',
      link: '/spectrum',
      color: '#ef4444',
    },
  ];

  const stats = [
    { value: 10, suffix: 'x', label: 'Faster Analysis', icon: <Zap size={24} /> },
    { value: 85, suffix: '%', label: 'Time Saved', icon: <TrendingUp size={24} /> },
    { value: 100, suffix: '%', label: 'Coverage', icon: <Target size={24} /> },
    { value: 5, suffix: '', label: 'AI Modules', icon: <Layers size={24} /> },
  ];

  const benefits = [
    'Enterprise-grade AI technology',
    'Seamless integration with existing systems',
    'Real-time collaboration tools',
    'Advanced analytics dashboard',
    'Dedicated success manager',
    '24/7 priority support',
  ];

  return (
    <>
      {/* Hero Section - Split Layout */}
      <HeroSection ref={heroRef}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 12 } }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            style={{ opacity, scale }}
          >
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={heroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <FloatingBadge
                    icon={<Sparkle size={16} />}
                    label="Introducing Solara Learning Engine"
                    sx={{ mb: 3 }}
                  />

                  <Typography
                    variant="h1"
                    sx={{
                      mb: 3,
                      fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                      fontWeight: 800,
                      lineHeight: 1.1,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Transform Learning with{' '}
                    <GradientText component="span" variant="h1">
                      AI Intelligence
                    </GradientText>
                  </Typography>

                  <Typography
                    variant="h5"
                    sx={{
                      mb: 5,
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      fontWeight: 400,
                      maxWidth: '600px',
                    }}
                  >
                    From intelligent needs analysis to comprehensive analytics.
                    Five powerful AI modules working together to revolutionize educational technology.
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <PremiumButton
                      component={Link}
                      href="/polaris"
                      variant="contained"
                      endIcon={<ArrowRight size={20} />}
                    >
                      Start with Polaris
                    </PremiumButton>

                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<Sparkles size={20} />}
                      sx={{
                        px: 4,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: '16px',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          borderColor: 'primary.light',
                          backgroundColor: 'rgba(167, 218, 219, 0.1)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      Explore Features
                    </Button>
                  </Box>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={heroInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: { xs: '400px', md: '500px' },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* Floating feature cards preview */}
                    {features.slice(0, 3).map((feature, index) => (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 50 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                        style={{
                          position: 'absolute',
                          top: `${index * 25}%`,
                          left: `${index * 15}%`,
                        }}
                      >
                        <Box
                          sx={{
                            background: 'rgba(13, 27, 42, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(167, 218, 219, 0.2)',
                            borderRadius: '20px',
                            p: 3,
                            minWidth: '250px',
                            animation: `${float} ${5 + index}s ease-in-out infinite`,
                            animationDelay: `${index * 0.5}s`,
                          }}
                        >
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: '12px',
                              background: `linear-gradient(135deg, ${feature.color}33, ${feature.color}22)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: feature.color,
                              mb: 2,
                            }}
                          >
                            {feature.icon}
                          </Box>
                          <Typography variant="h6" sx={{ color: feature.color, mb: 1 }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                            {feature.description.slice(0, 50)}...
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Stats Section - Modern Grid */}
      <Box ref={statsRef} sx={{ py: 10, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="overline"
              sx={{
                color: 'primary.main',
                fontSize: '0.875rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                display: 'block',
                textAlign: 'center',
                mb: 2,
              }}
            >
              TRUSTED BY LEADING ORGANIZATIONS
            </Typography>
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 8 }}>
              Results That Speak For Themselves
            </Typography>

            <Grid container spacing={3}>
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <StatsCard
                    initial={{ opacity: 0, y: 30 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box sx={{ color: 'primary.main', mb: 2, display: 'flex', justifyContent: 'center' }}>
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h2"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 800,
                        mb: 1,
                        fontSize: { xs: '2.5rem', md: '3rem' },
                      }}
                    >
                      <AnimatedCounter end={stat.value} />
                      {stat.suffix}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </StatsCard>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Bento Grid Features Section */}
      <Box ref={bentoRef} sx={{ py: 12, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={bentoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 8, maxWidth: '800px', margin: '0 auto 4rem' }}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                Complete AI-Powered Ecosystem
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Five integrated modules designed to transform every aspect of your learning experience
              </Typography>
            </Box>

            {/* Bento Grid Layout */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(6, 1fr)' },
                gap: 3,
                gridAutoRows: 'minmax(300px, auto)',
              }}
            >
              {/* Polaris - Featured Large Card */}
              <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 3' }, gridRow: { md: 'span 2' } }}>
                <Link href="/polaris" style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
                  <BentoCard featured>
                    <Box>
                      {features[0].badge && (
                        <FloatingBadge
                          label={features[0].badge}
                          size="small"
                          sx={{ mb: 3 }}
                        />
                      )}
                      <IconWrapper sx={{ color: features[0].color }}>
                        {features[0].icon}
                      </IconWrapper>
                      <Typography variant="h3" sx={{ mb: 2, color: features[0].color }}>
                        {features[0].title}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7, mb: 3 }}>
                        {features[0].description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: features[0].color }}>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          Explore Polaris
                        </Typography>
                        <ArrowRight size={20} />
                      </Box>
                    </Box>
                  </BentoCard>
                </Link>
              </Box>

              {/* Constellation - Medium Card */}
              <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 3' } }}>
                <Link href="/constellation" style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
                  <BentoCard>
                    <Box>
                      <IconWrapper sx={{ color: features[1].color }}>
                        {features[1].icon}
                      </IconWrapper>
                      <Typography variant="h4" sx={{ mb: 2, color: features[1].color }}>
                        {features[1].title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {features[1].description}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: features[1].color, mt: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Learn more
                      </Typography>
                      <ArrowRight size={16} />
                    </Box>
                  </BentoCard>
                </Link>
              </Box>

              {/* Nova - Medium Card with Badge */}
              <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 3' } }}>
                <Link href="/nova" style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
                  <BentoCard>
                    <Box>
                      {features[2].badge && (
                        <FloatingBadge
                          label={features[2].badge}
                          size="small"
                          sx={{ mb: 2, bgcolor: 'rgba(34, 197, 94, 0.15)', borderColor: 'rgba(34, 197, 94, 0.3)', color: features[2].color }}
                        />
                      )}
                      <IconWrapper sx={{ color: features[2].color }}>
                        {features[2].icon}
                      </IconWrapper>
                      <Typography variant="h4" sx={{ mb: 2, color: features[2].color }}>
                        {features[2].title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        {features[2].description}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: features[2].color, mt: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        Learn more
                      </Typography>
                      <ArrowRight size={16} />
                    </Box>
                  </BentoCard>
                </Link>
              </Box>

              {/* Orbit - Small Card */}
              <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
                <Link href="/orbit" style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
                  <BentoCard>
                    <Box>
                      <IconWrapper sx={{ color: features[3].color, width: 56, height: 56 }}>
                        {features[3].icon}
                      </IconWrapper>
                      <Typography variant="h5" sx={{ mb: 1.5, color: features[3].color }}>
                        {features[3].title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {features[3].description}
                      </Typography>
                    </Box>
                    <ArrowRight size={18} color={features[3].color} />
                  </BentoCard>
                </Link>
              </Box>

              {/* Spectrum - Small Card */}
              <Box sx={{ gridColumn: { xs: 'span 1', md: 'span 2' } }}>
                <Link href="/spectrum" style={{ textDecoration: 'none', height: '100%', display: 'block' }}>
                  <BentoCard>
                    <Box>
                      <IconWrapper sx={{ color: features[4].color, width: 56, height: 56 }}>
                        {features[4].icon}
                      </IconWrapper>
                      <Typography variant="h5" sx={{ mb: 1.5, color: features[4].color }}>
                        {features[4].title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {features[4].description}
                      </Typography>
                    </Box>
                    <ArrowRight size={18} color={features[4].color} />
                  </BentoCard>
                </Link>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 12, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  mb: 2,
                  display: 'block',
                }}
              >
                ENTERPRISE READY
              </Typography>
              <Typography variant="h2" sx={{ mb: 3 }}>
                Built for Scale, Designed for Success
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ lineHeight: 1.7, mb: 4 }}>
                Everything you need to transform learning experiences at any scale.
                From startups to Fortune 500 companies.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '10px',
                          background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.2), rgba(79, 70, 229, 0.1))',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <CheckCircle2 size={20} color="#a7dadb" />
                      </Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {benefit}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(167, 218, 219, 0.05))',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(167, 218, 219, 0.2)',
                  borderRadius: '32px',
                  p: 5,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-20%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(167, 218, 219, 0.2) 0%, transparent 70%)',
                    borderRadius: '50%',
                    filter: 'blur(60px)',
                  }}
                />

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Star size={40} color="#a7dadb" style={{ marginBottom: 16 }} />
                  <Typography variant="h4" sx={{ mb: 3 }}>
                    Join Industry Leaders
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 4 }}>
                    "Solara has transformed how we approach learning design. What used to take
                    weeks now takes days, and the quality has never been better."
                  </Typography>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                      Sarah Johnson
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Chief Learning Officer, Fortune 500 Company
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Premium CTA Section */}
      <Box
        sx={{
          py: 12,
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(167, 218, 219, 0.1) 100%)',
          borderTop: '1px solid rgba(167, 218, 219, 0.2)',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  mb: 2,
                  display: 'block',
                }}
              >
                GET STARTED TODAY
              </Typography>
              <Typography variant="h2" sx={{ mb: 3 }}>
                Ready to Transform Learning?
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 5, lineHeight: 1.7 }}>
                Start with Polaris and experience the power of AI-driven needs analysis.
                Transform months of work into days.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <PremiumButton
                  component={Link}
                  href="/polaris"
                  variant="contained"
                  startIcon={<Target size={20} />}
                >
                  Start Free Trial
                </PremiumButton>

                <Button
                  component={Link}
                  href="https://smartslate.io/contact"
                  variant="outlined"
                  size="large"
                  startIcon={<TrendingUp size={20} />}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '16px',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: 'rgba(167, 218, 219, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Schedule Demo
                </Button>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
                No credit card required • 14-day free trial • Cancel anytime
              </Typography>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
