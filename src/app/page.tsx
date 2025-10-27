'use client';

import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import {
  Compass,
  Network,
  Sparkles,
  Orbit as OrbitIcon,
  BarChart3,
  ArrowRight,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #020C1B 0%, #0d1b2a 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '20%',
    right: '10%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(167, 218, 219, 0.15) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '10%',
    left: '5%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'rgba(13, 27, 42, 0.6)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(167, 218, 219, 0.2)',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: theme.palette.primary.main,
    boxShadow: '0 20px 40px rgba(167, 218, 219, 0.2)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(167, 218, 219, 0.2), rgba(79, 70, 229, 0.2))',
  marginBottom: theme.spacing(2),
}));

const CTASection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(167, 218, 219, 0.05) 100%)',
  borderTop: '1px solid rgba(167, 218, 219, 0.2)',
  borderBottom: '1px solid rgba(167, 218, 219, 0.2)',
}));

const StatsBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(3),
}));

export default function HomePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: <Compass size={32} />,
      title: 'Polaris',
      description: 'AI-powered needs analysis that transforms 6 weeks of stakeholder meetings into 1 week. Generate comprehensive learning blueprints automatically.',
      link: '/polaris',
      color: '#a7dadb',
    },
    {
      icon: <Network size={32} />,
      title: 'Constellation',
      description: 'Connect learning pathways and create interconnected knowledge maps. Build comprehensive learning ecosystems that adapt to learner needs.',
      link: '/constellation',
      color: '#7C69F5',
    },
    {
      icon: <Sparkles size={32} />,
      title: 'Nova',
      description: 'Innovative content creation powered by AI. Transform ideas into engaging learning experiences with intelligent content generation.',
      link: '/nova',
      color: '#22c55e',
    },
    {
      icon: <OrbitIcon size={32} />,
      title: 'Orbit',
      description: 'Continuous learning cycles that keep knowledge fresh. Automated review systems that ensure long-term retention and mastery.',
      link: '/orbit',
      color: '#f59e0b',
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Spectrum',
      description: 'Comprehensive analytics and insights. Track progress, measure impact, and make data-driven decisions to optimize learning outcomes.',
      link: '/spectrum',
      color: '#ef4444',
    },
  ];

  const stats = [
    { value: '10x', label: 'Faster Needs Analysis' },
    { value: '85%', label: 'Time Saved' },
    { value: '100%', label: 'Learning Coverage' },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection ref={heroRef}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Box sx={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  mb: 2,
                  display: 'block',
                }}
              >
                INTRODUCING SOLARA
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #a7dadb 0%, #d0edf0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                AI-Powered Learning Engine
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                Transform your educational technology with intelligent needs analysis,
                connected learning pathways, and comprehensive analytics.
                From concept to mastery in record time.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  href="/polaris"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowRight size={20} />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #4F46E5, #3730A3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #3730A3, #312e81)',
                    },
                  }}
                >
                  Explore Polaris
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  endIcon={<Zap size={20} />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.light',
                      backgroundColor: 'rgba(167, 218, 219, 0.1)',
                    },
                  }}
                >
                  See All Features
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Box ref={statsRef} sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <StatsBox>
                    <Typography
                      variant="h2"
                      sx={{
                        color: 'primary.main',
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </StatsBox>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box ref={featuresRef} sx={{ py: 12, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant="h2" sx={{ mb: 2 }}>
                Complete Learning Ecosystem
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '700px', margin: '0 auto' }}>
                Five powerful modules working together to revolutionize your educational technology
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={feature.link} style={{ textDecoration: 'none' }}>
                      <FeatureCard>
                        <CardContent sx={{ p: 4 }}>
                          <IconWrapper sx={{ color: feature.color }}>
                            {feature.icon}
                          </IconWrapper>
                          <Typography variant="h4" sx={{ mb: 2, color: feature.color }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                            {feature.description}
                          </Typography>
                          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', color: feature.color }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
                              Learn more
                            </Typography>
                            <ArrowRight size={16} />
                          </Box>
                        </CardContent>
                      </FeatureCard>
                    </Link>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* CTA Section */}
      <CTASection>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              Ready to Transform Learning?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Start with Polaris and experience the power of AI-driven needs analysis.
              Join thousands of educators revolutionizing learning experiences.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                href="/polaris"
                variant="contained"
                size="large"
                startIcon={<Target size={20} />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #4F46E5, #3730A3)',
                }}
              >
                Get Started with Polaris
              </Button>
              <Button
                component={Link}
                href="https://smartslate.io/contact"
                variant="outlined"
                size="large"
                startIcon={<TrendingUp size={20} />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                }}
              >
                Schedule a Demo
              </Button>
            </Box>
          </Box>
        </Container>
      </CTASection>
    </>
  );
}
