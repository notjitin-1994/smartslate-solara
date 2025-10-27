'use client';

import { Box, Container, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Network, GitBranch, Share2, Layers, ArrowRight, Link as LinkIcon } from 'lucide-react';
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
  border: '1px solid rgba(124, 105, 245, 0.2)',
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: '#7C69F5',
    boxShadow: '0 20px 40px rgba(124, 105, 245, 0.2)',
  },
}));

const IconWrapper = styled(Box)(() => ({
  width: 56,
  height: 56,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(124, 105, 245, 0.2)',
  marginBottom: 16,
  color: '#7C69F5',
}));

export default function ConstellationPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      icon: <GitBranch size={28} />,
      title: 'Connected Pathways',
      description: 'Create interconnected learning journeys that adapt and branch based on learner progress and preferences.',
    },
    {
      icon: <Share2 size={28} />,
      title: 'Knowledge Mapping',
      description: 'Visualize relationships between concepts, skills, and competencies across your entire learning ecosystem.',
    },
    {
      icon: <Layers size={28} />,
      title: 'Multi-Layered Learning',
      description: 'Build comprehensive knowledge structures with multiple paths, dependencies, and progression routes.',
    },
    {
      icon: <LinkIcon size={28} />,
      title: 'Smart Connections',
      description: 'AI automatically identifies and suggests connections between related learning materials and concepts.',
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
                <Network size={48} color="#7C69F5" />
              </Box>

              <Typography
                variant="h1"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: '#7C69F5',
                }}
              >
                Constellation
              </Typography>

              <Typography variant="h4" sx={{ mb: 4, color: 'text.secondary', fontWeight: 400 }}>
                Connected Learning Pathways & Knowledge Maps
              </Typography>

              <Typography variant="h6" sx={{ mb: 5, color: 'text.secondary', lineHeight: 1.8 }}>
                Build comprehensive learning ecosystems where every concept connects. Create dynamic pathways
                that adapt to learner needs and visualize the relationships across your entire learning network.
              </Typography>

              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={20} />}
                sx={{
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #7C69F5, #6366f1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  },
                }}
              >
                Explore Constellation
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
              Build Learning Networks
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 8, textAlign: 'center', maxWidth: '700px', margin: '0 auto 4rem' }}
            >
              Transform isolated content into interconnected knowledge ecosystems
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
                  borderColor: '#7C69F5',
                  color: '#7C69F5',
                  '&:hover': {
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(124, 105, 245, 0.1)',
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
