'use client';

import { Box, Container, Typography, Button, Grid, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useTransform } from 'framer-motion';
import {
  BarChart3,
  Brain,
  Zap,
  Target,
  Clock,
  Shield,
  TrendingUp,
  ArrowRight,
  Database,
  Gauge
} from 'lucide-react';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { FloatingOrb } from '@/components/animations/FloatingOrb';

const spectrumColors = {
  primary: '#8b5cf6',
  light: '#a78bfa',
  dark: '#7c3aed',
};

const HeroSection = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'radial-gradient(circle at 10% 10%, rgba(139, 92, 246, 0.05) 0%, #020C1B 100%)',
}));

const FeatureCard = styled(motion.div)(() => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(30px)',
  border: '1px solid rgba(139, 92, 246, 0.1)',
  borderRadius: '32px',
  padding: '40px',
  height: '100%',
  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-12px)',
    border: `1px solid ${spectrumColors.primary}50`,
    boxShadow: `0 30px 60px ${spectrumColors.primary}20`,
  },
}));

export default function SpectrumPage() {
  const { getStaggerProps, revealVariants, scrollYProgress, getAnimationProps } = useOptimizedAnimations();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const stats = [
    { icon: Brain, value: '94%', label: 'Prediction Rate' },
    { icon: TrendingUp, value: '250%', label: 'ROI Lift' },
    { icon: Database, value: '100%', label: 'Data Integrity' },
    { icon: Clock, value: '<5min', label: 'Latency' },
  ];

  const features = [
    { icon: Gauge, title: 'Impact Correlation', desc: 'Directly link learning engagement to business KPIs and revenue growth.' },
    { icon: Brain, title: 'Predictive Insights', desc: 'Identify skill gaps and learner drop-off risks before they happen.' },
    { icon: Shield, title: 'Enterprise BI', desc: 'Military-grade encryption for your organization\'s most sensitive data.' },
  ];

  return (
    <Box sx={{ background: '#020C1B', color: '#fff' }}>
      <HeroSection>
        <FloatingOrb size="900px" color={spectrumColors.primary} x="-20%" y="-20%" delay={0} duration={35} />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2
                    }
                  }
                }}
              >
                <motion.div variants={revealVariants}>
                  <Chip 
                    icon={<BarChart3 size={14} />}
                    label="COMING IN 2027" 
                    sx={{ mb: 4, bgcolor: 'rgba(139, 92, 246, 0.1)', color: spectrumColors.primary, fontWeight: 800, px: 1 }} 
                  />
                </motion.div>
                <motion.div variants={revealVariants}>
                  <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '3.5rem', md: '5rem' }, lineHeight: 1, mb: 3 }}>
                    Intelligence in <span style={{ color: spectrumColors.primary }}>High Definition.</span>
                  </Typography>
                </motion.div>
                <motion.div variants={revealVariants}>
                  <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 6, maxWidth: 650 }}>
                    Spectrum is the final frontier of learning analytics. Real-time predictive intelligence that proves the ROI of every learning moment.
                  </Typography>
                </motion.div>
                <motion.div variants={revealVariants}>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <MagneticButton variant="contained" sx={{ bgcolor: spectrumColors.primary }}>Get Briefing</MagneticButton>
                    <Button variant="text" sx={{ color: spectrumColors.primary, fontWeight: 700 }}>Data Roadmap</Button>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div style={{ y: yParallax }}>
                <Box sx={{ 
                  p: 4, 
                  bgcolor: 'rgba(13, 27, 42, 0.6)', 
                  borderRadius: '32px', 
                  border: '1px solid rgba(139, 92, 246, 0.2)',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>ROI Forecast</Typography>
                    <TrendingUp color={spectrumColors.primary} />
                  </Box>
                  
                  {[80, 60, 95, 40].map((h, i) => (
                    <Box key={i} sx={{ display: 'flex', alignItems: 'flex-end', gap: 2, mb: 2 }}>
                      <Box sx={{ width: 40, height: 20, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        style={{ height: 12, background: `linear-gradient(90deg, ${spectrumColors.primary}, ${spectrumColors.light})`, borderRadius: '6px' }}
                      />
                    </Box>
                  ))}
                  
                  <Box sx={{ mt: 4, pt: 4, borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: spectrumColors.primary }}>+250%</Typography>
                    <Typography variant="caption" sx={{ color: '#7a8a8b' }}>Projected Efficiency Gain</Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Stats Section */}
      <Box sx={{ py: 15, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, i) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
                <motion.div {...getAnimationProps({ transition: { delay: i * 0.1 } })}>
                  <Box sx={{ textAlign: 'center', p: 4, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
                    <stat.icon size={40} color={spectrumColors.primary} style={{ marginBottom: 16 }} />
                    <Typography variant="h2" sx={{ fontWeight: 900, color: spectrumColors.primary }}>{stat.value}</Typography>
                    <Typography variant="body2" sx={{ color: '#7a8a8b', fontWeight: 700 }}>{stat.label.toUpperCase()}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Grid */}
      <Box sx={{ py: 15, bgcolor: 'rgba(139, 92, 246, 0.02)' }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 10, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 3 }}>Predictive Intelligence.</Typography>
            <Typography variant="h6" sx={{ color: '#b0c5c6', maxWidth: 700, mx: 'auto' }}>
              Spectrum turns dark data into clear, actionable strategies for growth and optimization.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((f, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <FeatureCard {...getAnimationProps({ transition: { delay: i * 0.1 } })}>
                  <Box sx={{ width: 64, height: 64, bgcolor: `${spectrumColors.primary}20`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                    <f.icon size={32} color={spectrumColors.primary} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>{f.title}</Typography>
                  <Typography variant="body1" sx={{ color: '#b0c5c6', lineHeight: 1.7 }}>{f.desc}</Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA */}
      <Box sx={{ py: 20, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <FloatingOrb size="600px" color={spectrumColors.primary} x="40%" y="10%" delay={0} duration={20} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div {...getAnimationProps()}>
            <BarChart3 size={48} color={spectrumColors.primary} style={{ marginBottom: 24 }} />
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 4 }}>See the spectrum.</Typography>
            <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 8 }}>
              Stop guessing. Start knowing. Join the waitlist for the world's most advanced learning BI.
            </Typography>
            <MagneticButton variant="contained" sx={{ px: 8, py: 2.5, fontSize: '1.2rem', bgcolor: spectrumColors.primary }}>Secure Early Access</MagneticButton>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
