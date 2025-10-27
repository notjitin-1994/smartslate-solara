'use client';

import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Orbit as OrbitIcon, RefreshCw, Calendar, TrendingUp, ArrowRight, Clock } from 'lucide-react';
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
  border: '1px solid rgba(245, 158, 11, 0.2)',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: '#f59e0b',
    boxShadow: '0 20px 40px rgba(245, 158, 11, 0.2)',
  },
}));

const IconWrapper = styled(Box)(() => ({
  width: 56,
  height: 56,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(245, 158, 11, 0.2)',
  marginBottom: 16,
  color: '#f59e0b',
}));

export default function OrbitPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: <RefreshCw size={28} />,
      title: 'Continuous Learning Cycles',
      description: 'Automated review systems that ensure knowledge retention through scientifically-optimized spaced repetition.',
    },
    {
      icon: <Calendar size={28} />,
      title: 'Smart Scheduling',
      description: 'AI-powered scheduling that adapts to learner performance and optimizes review timing for maximum retention.',
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'Mastery Tracking',
      description: 'Monitor skill progression and identify areas needing reinforcement with comprehensive mastery metrics.',
    },
    {
      icon: <Clock size={28} />,
      title: 'Long-Term Retention',
      description: 'Combat the forgetting curve with intelligent review cycles that maintain knowledge over extended periods.',
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
                <OrbitIcon size={48} color="#f59e0b" />
              </Box>

              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: '#f59e0b',
                }}
              >
                Orbit
              </Typography>

              <Typography variant="h4" sx={{ mb: 4, color: 'text.secondary', fontWeight: 400 }}>
                Continuous Learning Cycles & Retention
              </Typography>

              <Typography variant="h6" sx={{ mb: 5, color: 'text.secondary', lineHeight: 1.8 }}>
                Keep knowledge fresh with automated review cycles. Orbit ensures long-term retention through
                intelligent spaced repetition and adaptive scheduling tailored to each learner.
              </Typography>

              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={20} />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #d97706, #b45309)',
                  },
                }}
              >
                Explore Orbit
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
              Master Through Repetition
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 8, textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}
            >
              Science-backed learning cycles that ensure lasting knowledge retention
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
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderColor: '#f59e0b',
                  color: '#f59e0b',
                  '&:hover': {
                    borderColor: '#d97706',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                  },
                }}
              >
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
