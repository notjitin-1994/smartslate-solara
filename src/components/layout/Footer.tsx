'use client';

import { Box, Container, Typography, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';

const FooterWrapper = styled('footer')(({ theme }) => ({
  backgroundColor: '#020C1B',
  color: '#fff',
  padding: theme.spacing(10, 0, 4, 0),
  borderTop: '1px solid rgba(167, 218, 219, 0.1)',
  position: 'relative',
  overflow: 'hidden',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#7a8a8b',
  textDecoration: 'none',
  fontSize: '0.95rem',
  transition: 'all 0.3s ease',
  display: 'block',
  marginBottom: theme.spacing(1.5),
  '&:hover': {
    color: '#A7DADB',
    transform: 'translateX(4px)',
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  marginBottom: theme.spacing(3),
  color: '#fff',
  fontSize: '1.1rem',
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
}));

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { getAnimationProps } = useOptimizedAnimations();

  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div {...getAnimationProps()}>
              <Link href="https://smartslate.io" style={{ display: 'inline-block', marginBottom: '24px' }}>
                <Image src="/logo.png" alt="Solara Logo" width={160} height={45} style={{ objectFit: 'contain' }} />
              </Link>
              <Typography variant="body1" sx={{ color: '#7a8a8b', lineHeight: 1.8, maxWidth: '320px' }}>
                The world's first AI-native learning ecosystem. Orchestrating the future of how humanity learns, grows, and innovates.
              </Typography>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <SectionTitle>Ecosystem</SectionTitle>
            <FooterLink href="/polaris">Polaris</FooterLink>
            <FooterLink href="/constellation">Constellation</FooterLink>
            <FooterLink href="/nova">Nova</FooterLink>
            <FooterLink href="/orbit">Orbit</FooterLink>
            <FooterLink href="/spectrum">Spectrum</FooterLink>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <SectionTitle>Resources</SectionTitle>
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="https://smartslate.io">Smartslate Main</FooterLink>
            <FooterLink href="https://smartslate.io/difference">Our Mission</FooterLink>
            <FooterLink href="https://smartslate.io/blog">Learning Lab</FooterLink>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <SectionTitle>Company</SectionTitle>
            <FooterLink href="https://smartslate.io/careers">Careers</FooterLink>
            <FooterLink href="https://smartslate.io/contact">Contact</FooterLink>
            <FooterLink href="https://smartslate.io/partner">Partners</FooterLink>
            <FooterLink href="https://smartslate.io/press">Press Kit</FooterLink>
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 2 }}>
            <SectionTitle>Legal</SectionTitle>
            <FooterLink href="https://smartslate.io/legal/privacy">Privacy</FooterLink>
            <FooterLink href="https://smartslate.io/legal/terms">Terms</FooterLink>
            <FooterLink href="https://smartslate.io/cookies">Cookies</FooterLink>
            <FooterLink href="https://smartslate.io/security">Security</FooterLink>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, borderColor: 'rgba(255,255,255,0.05)' }} />

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ color: '#4a5a5b' }}>
            © {currentYear} Smartslate. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Typography variant="body2" sx={{ color: '#4a5a5b' }}>
              Built for the Future of Learning
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
