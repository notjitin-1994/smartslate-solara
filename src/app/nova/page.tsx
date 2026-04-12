'use client';

import { Box, Container, Typography, Button, Grid, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Rocket,
  Zap,
  CheckCircle2,
  ArrowRight,
  Brain,
  Edit3,
  Eye,
  Download,
  Clock,
  Award,
  Shield,
  Users
} from 'lucide-react';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { FloatingOrb } from '@/components/animations/FloatingOrb';

const novaColors = {
  primary: '#22c55e',
  light: '#4ade80',
  dark: '#16a34a',
};

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.05); }
`;

const HeroSection = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  background: 'radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.05) 0%, #020C1B 100%)',
}));

const FeatureCard = styled(motion.div)(() => ({
  background: 'rgba(13, 27, 42, 0.4)',
  backdropFilter: 'blur(30px)',
  border: '1px solid rgba(34, 197, 94, 0.1)',
  borderRadius: '32px',
  padding: '40px',
  height: '100%',
  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    transform: 'translateY(-12px)',
    border: `1px solid ${novaColors.primary}50`,
    boxShadow: `0 30px 60px ${novaColors.primary}20`,
  },
}));

export default function NovaPage() {
  const { getStaggerProps, revealVariants, getAnimationProps } = useOptimizedAnimations();

  const features = [
    { icon: Brain, title: 'Pedagogical AI', desc: 'Content that isn\'t just text—it\'s structured for maximum retention and engagement.' },
    { icon: Zap, title: 'Rapid Prototyping', desc: 'Generate first drafts of entire modules in under 5 minutes.' },
    { icon: Sparkles, title: 'Interactive Generation', desc: 'AI that creates quizzes, scenarios, and activities on the fly.' },
  ];

  return (
    <Box sx={{ background: '#020C1B', color: '#fff' }}>
      <HeroSection>
        <FloatingOrb size="700px" color={novaColors.primary} x="70%" y="-10%" delay={0} duration={30} />
        
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
                    icon={<Clock size={14} />}
                    label="COMING Q3 2026" 
                    sx={{ mb: 4, bgcolor: 'rgba(34, 197, 94, 0.1)', color: novaColors.primary, fontWeight: 800, px: 1 }} 
                  />
                </motion.div>
                <motion.div variants={revealVariants}>
                  <Typography variant="h1" sx={{ fontWeight: 900, fontSize: { xs: '3.5rem', md: '5rem' }, lineHeight: 1, mb: 3 }}>
                    Content Creation, <span style={{ color: novaColors.primary }}>Supernova Speed.</span>
                  </Typography>
                </motion.div>
                <motion.div variants={revealVariants}>
                  <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 6, maxWidth: 650 }}>
                    Nova is the world's first AI co-author that understands learning science. Transform raw ideas into pedagogically sound content instantly.
                  </Typography>
                </motion.div>
                <motion.div variants={revealVariants}>
                  <Box sx={{ display: 'flex', gap: 3 }}>
                    <MagneticButton variant="contained" sx={{ bgcolor: novaColors.primary }}>Join Waitlist</MagneticButton>
                    <Button variant="text" sx={{ color: novaColors.primary, fontWeight: 700 }}>Request Early Access</Button>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Box sx={{ 
                  p: 4, 
                  bgcolor: 'rgba(13, 27, 42, 0.6)', 
                  borderRadius: '32px', 
                  border: '1px solid rgba(34, 197, 194, 0.2)',
                  boxShadow: '0 40px 80px rgba(0,0,0,0.4)'
                }}>
                  <Box sx={{ mb: 4, display: 'flex', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
                    <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
                  </Box>
                  
                  <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.2)', borderRadius: '12px', mb: 3 }}>
                    <Typography variant="caption" sx={{ color: '#7a8a8b' }}>Input Goal:</Typography>
                    <Typography variant="body2" sx={{ color: '#fff', mt: 1 }}>"Explain Quantum Computing to 5th graders using space metaphors."</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles size={24} color={novaColors.primary} />
                    </motion.div>
                    <Typography variant="caption" sx={{ color: novaColors.primary, fontWeight: 700 }}>AI generating structure...</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button size="small" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}>Edit</Button>
                    <Button size="small" variant="contained" sx={{ bgcolor: novaColors.primary }}>Export SCORM</Button>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      {/* Benefits Section */}
      <Box sx={{ py: 15 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {features.map((f, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <FeatureCard {...getAnimationProps({ transition: { delay: i * 0.1 } })}>
                  <Box sx={{ width: 64, height: 64, bgcolor: `${novaColors.primary}20`, borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                    <f.icon size={32} color={novaColors.primary} />
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>{f.title}</Typography>
                  <Typography variant="body1" sx={{ color: '#b0c5c6', lineHeight: 1.7 }}>{f.desc}</Typography>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Launch Roadmap */}
      <Box sx={{ py: 15, bgcolor: 'rgba(34, 197, 94, 0.02)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography variant="overline" sx={{ color: novaColors.primary, fontWeight: 900 }}>THE ROADMAP</Typography>
            <Typography variant="h2" sx={{ fontWeight: 900, mt: 2 }}>Nova's Journey to Launch</Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { phase: 'Phase 1', title: 'Core Engine', date: 'Q4 2025', color: '#ffc107' },
              { phase: 'Phase 2', title: 'Private Beta', date: 'Q2 2026', color: novaColors.primary },
              { phase: 'Phase 3', title: 'Public Launch', date: 'Q3 2026', color: '#06b6d4' },
            ].map((p, i) => (
              <Grid size={{ xs: 12, md: 4 }} key={i}>
                <motion.div {...getAnimationProps({ transition: { delay: i * 0.1 } })}>
                  <Box sx={{ p: 4, bgcolor: 'rgba(255,255,255,0.02)', borderRadius: '24px', borderLeft: `4px solid ${p.color}` }}>
                    <Typography variant="caption" sx={{ color: p.color, fontWeight: 800 }}>{p.phase.toUpperCase()}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, my: 1 }}>{p.title}</Typography>
                    <Typography variant="body2" sx={{ color: '#7a8a8b' }}>{p.date}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Early Access CTA */}
      <Box sx={{ py: 20, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <FloatingOrb size="600px" color={novaColors.primary} x="10%" y="40%" delay={0} duration={20} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div {...getAnimationProps()}>
            <Rocket size={48} color={novaColors.primary} style={{ marginBottom: 24 }} />
            <Typography variant="h2" sx={{ fontWeight: 900, mb: 4 }}>Be the first to ignite.</Typography>
            <Typography variant="h5" sx={{ color: '#b0c5c6', mb: 8 }}>
              Join the exclusive group of early adopters shaping the future of AI-assisted content authoring.
            </Typography>
            <MagneticButton variant="contained" sx={{ px: 8, py: 2.5, fontSize: '1.2rem', bgcolor: novaColors.primary }}>Join the Waiting List</MagneticButton>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
}
