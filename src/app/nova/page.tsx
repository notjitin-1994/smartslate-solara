'use client';

import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Wand2, Brain, Zap, ArrowRight, Rocket } from 'lucide-react';
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
  border: '1px solid rgba(34, 197, 94, 0.2)',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: '#22c55e',
    boxShadow: '0 20px 40px rgba(34, 197, 94, 0.2)',
  },
}));

const IconWrapper = styled(Box)(() => ({
  width: 56,
  height: 56,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(34, 197, 94, 0.2)',
  marginBottom: 16,
  color: '#22c55e',
}));

export default function NovaPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: <Wand2 size={28} />,
      title: 'AI Content Generation',
      description: 'Transform ideas into engaging learning materials with intelligent, context-aware content creation.',
    },
    {
      icon: <Brain size={28} />,
      title: 'Adaptive Experiences',
      description: 'Create dynamic learning experiences that adapt to individual learner needs and preferences.',
    },
    {
      icon: <Zap size={28} />,
      title: 'Rapid Development',
      description: 'Reduce content creation time by 80% while maintaining quality and engagement.',
    },
    {
      icon: <Rocket size={28} />,
      title: 'Innovation Engine',
      description: 'Experiment with new learning formats, interactive elements, and engagement strategies.',
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
                <Sparkles size={48} color="#22c55e" />
              </Box>

              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: '#22c55e',
                }}
              >
                Nova
              </Typography>

              <Typography variant="h4" sx={{ mb: 4, color: 'text.secondary', fontWeight: 400 }}>
                Innovative AI-Powered Content Creation
              </Typography>

              <Typography variant="h6" sx={{ mb: 5, color: 'text.secondary', lineHeight: 1.8 }}>
                Unleash creativity with AI-powered content generation. Transform concepts into engaging
                learning experiences faster than ever before, with intelligent adaptation and optimization.
              </Typography>

              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={20} />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  },
                }}
              >
                Discover Nova
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
              Create Without Limits
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 8, textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}
            >
              AI-powered tools that amplify your creativity and accelerate development
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
                  borderColor: '#22c55e',
                  color: '#22c55e',
                  '&:hover': {
                    borderColor: '#16a34a',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
