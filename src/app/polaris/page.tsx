'use client';

import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Compass, Clock, Users, CheckCircle, ArrowRight, Lightbulb, Target } from 'lucide-react';
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
  border: '1px solid rgba(167, 218, 219, 0.2)',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: theme.palette.primary.main,
    boxShadow: '0 20px 40px rgba(167, 218, 219, 0.2)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 56,
  height: 56,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(167, 218, 219, 0.2)',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

export default function PolarisPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: <Clock size={28} />,
      title: '6 Weeks → 1 Week',
      description: 'Transform lengthy stakeholder meetings into rapid, comprehensive needs analysis with AI-powered intelligence.',
    },
    {
      icon: <Users size={28} />,
      title: 'Stakeholder Alignment',
      description: 'Automatically gather, analyze, and synthesize input from all stakeholders into coherent learning blueprints.',
    },
    {
      icon: <Target size={28} />,
      title: 'Precision Targeting',
      description: 'Identify exact learning needs, skill gaps, and performance objectives with laser accuracy.',
    },
    {
      icon: <Lightbulb size={28} />,
      title: 'Smart Recommendations',
      description: 'AI-generated learning pathways, content suggestions, and implementation strategies.',
    },
  ];

  const benefits = [
    'Reduce needs analysis time by 85%',
    'Eliminate bias in requirement gathering',
    'Generate comprehensive learning blueprints automatically',
    'Identify hidden learning needs and opportunities',
    'Create data-driven learning strategies',
    'Align all stakeholders on learning objectives',
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
                <Compass size={48} color="#a7dadb" />
              </Box>

              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: 'primary.main',
                }}
              >
                Polaris
              </Typography>

              <Typography variant="h4" sx={{ mb: 4, color: 'text.secondary', fontWeight: 400 }}>
                AI-Powered Needs Analysis & Learning Blueprints
              </Typography>

              <Typography variant="h6" sx={{ mb: 5, color: 'text.secondary', lineHeight: 1.8 }}>
                Stop wasting 70% of your time on stakeholder meetings. Polaris uses AI to analyze learning needs,
                generate comprehensive blueprints, and align all stakeholders in record time.
              </Typography>

              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={20} />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #4F46E5, #3730A3)',
                }}
              >
                Start with Polaris
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
              How Polaris Works
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 8, textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}
            >
              Intelligent automation meets comprehensive analysis
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
          </motion.div>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box ref={benefitsRef} sx={{ py: 12, backgroundColor: 'background.paper' }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h2" sx={{ mb: 6, textAlign: 'center' }}>
              Transform Your Workflow
            </Typography>

            <Grid container spacing={3}>
              {benefits.map((benefit, index) => (
                <Grid item xs={12} key={index}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={benefitsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <CheckCircle size={24} color="#a7dadb" style={{ flexShrink: 0, marginTop: 4 }} />
                      <Typography variant="h6" color="text.primary">
                        {benefit}
                      </Typography>
                    </Box>
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
                  borderColor: 'primary.main',
                  color: 'primary.main',
                }}
              >
                Schedule a Demo
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
