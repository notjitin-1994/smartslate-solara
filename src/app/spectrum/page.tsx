'use client';

import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BarChart3, PieChart, LineChart, Activity, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  background: 'linear-gradient(135deg, #020C1B 0%, #0d1b2a 100%)',
  overflow: 'hidden',
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'rgba(13, 27, 42, 0.6)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(239, 68, 68, 0.2)',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: '#ef4444',
    boxShadow: '0 20px 40px rgba(239, 68, 68, 0.2)',
  },
}));

const IconWrapper = styled(Box)(() => ({
  width: 56,
  height: 56,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(239, 68, 68, 0.2)',
  marginBottom: 16,
  color: '#ef4444',
}));

export default function SpectrumPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: <BarChart3 size={28} />,
      title: 'Comprehensive Analytics',
      description: 'Deep insights into learning progress, engagement metrics, and performance trends across all learners.',
    },
    {
      icon: <PieChart size={28} />,
      title: 'Impact Measurement',
      description: 'Quantify learning outcomes and ROI with detailed analytics on skill development and knowledge gains.',
    },
    {
      icon: <LineChart size={28} />,
      title: 'Predictive Insights',
      description: 'AI-powered predictions identify at-risk learners and recommend interventions before issues arise.',
    },
    {
      icon: <Activity size={28} />,
      title: 'Real-Time Dashboards',
      description: 'Monitor learning activities, progress, and outcomes with interactive, customizable dashboards.',
    },
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
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <BarChart3 size={48} color="#ef4444" />
              </Box>

              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: '#ef4444',
                }}
              >
                Spectrum
              </Typography>

              <Typography variant="h4" sx={{ mb: 4, color: 'text.secondary', fontWeight: 400 }}>
                Comprehensive Analytics & Learning Insights
              </Typography>

              <Typography variant="h6" sx={{ mb: 5, color: 'text.secondary', lineHeight: 1.8 }}>
                Make data-driven decisions with comprehensive analytics. Track progress, measure impact,
                and optimize learning outcomes with powerful insights and predictive intelligence.
              </Typography>

              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={20} />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  },
                }}
              >
                Discover Spectrum
              </Button>
            </Box>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Features Section */}
      <Box ref={featuresRef} sx={{ py: 12, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" sx={{ mb: 2, textAlign: 'center' }}>
              Data-Driven Learning
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 8, textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}
            >
              Transform learning data into actionable insights and measurable outcomes
            </Typography>

            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <FeatureCard>
                      <CardContent sx={{ p: 4 }}>
                        <IconWrapper>{feature.icon}</IconWrapper>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </FeatureCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 8 }}>
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
                  borderColor: '#ef4444',
                  color: '#ef4444',
                  '&:hover': {
                    borderColor: '#dc2626',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  },
                }}
              >
                See Analytics in Action
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
