'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';

const HeaderWrapper = styled(motion.header, {
  shouldForwardProp: (prop) => prop !== 'hide'
})<{ hide?: boolean }>(({ theme, hide }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  left: '50%',
  zIndex: 1000,
  width: 'calc(100vw - 32px)',
  maxWidth: theme.breakpoints.values.lg,
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100vw - 16px)',
    top: theme.spacing(1),
  },
}));

const HeaderBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(9, 21, 33, 0.4)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  border: '1px solid rgba(167, 218, 219, 0.3)',
  borderRadius: theme.spacing(2.5),
  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)',
}));

const HeaderContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `${theme.spacing(1.5)} ${theme.spacing(3)}`,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  textDecoration: 'none',
  fontSize: '0.95rem',
  fontWeight: 600,
  position: 'relative',
  padding: '8px 12px',
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    color: '#A7DADB',
    backgroundColor: 'rgba(167, 218, 219, 0.1)',
  },
}));

const MobileMenu = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  width: '100%',
  maxWidth: '400px',
  height: '100vh',
  backgroundColor: 'rgba(9, 21, 33, 0.95)',
  backdropFilter: 'blur(20px)',
  borderLeft: '1px solid rgba(167, 218, 219, 0.2)',
  padding: theme.spacing(4),
  zIndex: 1001,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export default function Header() {
  const [hide, setHide] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { useMagnetic, shouldOptimize } = useOptimizedAnimations();
  const { ref: logoRef, position: logoPos, handleMouseMove: handleLogoMove, reset: resetLogo } = useMagnetic(0.2);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) setHide(true);
      else setHide(false);
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Polaris', href: '/polaris' },
    { label: 'Constellation', href: '/constellation' },
    { label: 'Nova', href: '/nova' },
    { label: 'Orbit', href: '/orbit' },
    { label: 'Spectrum', href: '/spectrum' },
  ];

  return (
    <>
      <HeaderWrapper
        animate={{ 
          y: hide ? -100 : 0,
          x: '-50%',
          opacity: hide ? 0 : 1,
          scale: hide ? 0.95 : 1
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <HeaderBackground />
        <HeaderContent>
          <motion.div
            ref={logoRef}
            animate={{ x: logoPos.x, y: logoPos.y }}
            onMouseMove={(e: any) => handleLogoMove(e.nativeEvent)}
            onMouseLeave={resetLogo}
          >
            <Link href="https://smartslate.io" style={{ display: 'flex' }}>
              <Image src="/logo.png" alt="Solara Logo" width={140} height={40} priority style={{ objectFit: 'contain' }} />
            </Link>
          </motion.div>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
              ))}
            </Box>
            
            <Button
              onClick={() => setMobileMenuOpen(true)}
              sx={{ display: { md: 'none' }, minWidth: 'auto', p: 1, color: '#A7DADB' }}
            >
              <Menu size={24} />
            </Button>
          </Box>
        </HeaderContent>
      </HeaderWrapper>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 1000, backdropFilter: 'blur(4px)' }}
            />
            <MobileMenu
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
                <Button onClick={() => setMobileMenuOpen(false)} sx={{ color: '#fff' }}><X size={32} /></Button>
              </Box>
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, textDecoration: 'none', display: 'block', padding: '16px 0' }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
