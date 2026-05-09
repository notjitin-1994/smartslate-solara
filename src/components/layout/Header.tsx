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
  top: 'var(--nav-top-offset)',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 'var(--z-header)',
  width: 'calc(100vw - 32px)',
  maxWidth: theme.breakpoints.values.lg,
  height: 'var(--nav-height-desktop)',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100vw - 16px)',
    height: 'var(--nav-height-mobile)',
  },
}));

const HeaderBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(9, 21, 33, 0.4)',
  backdropFilter: 'blur(16px) saturate(180%)',
  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
  border: '1px solid var(--primary-accent)',
  borderRadius: 'var(--radius-lg)',
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  '@supports not (backdrop-filter: blur(1px))': {
    backgroundColor: 'rgba(9, 21, 33, 0.85)',
  },
}));

const HeaderContent = styled(Container)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  padding: '0 var(--space-lg)',
  width: '100%',
  maxWidth: 'none !important',
  [theme.breakpoints.down('sm')]: {
    padding: '0 var(--space-md)',
  },
}));

const LogoLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  height: 40,
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    height: 36,
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: 'var(--text-primary)',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: 500,
  position: 'relative',
  padding: '8px 12px',
  borderRadius: '8px',
  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    color: 'var(--primary-accent)',
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
  const { useMagnetic } = useOptimizedAnimations();
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
        initial={{ y: -100, x: '-50%', opacity: 0 }}
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
            style={{ display: 'flex' }}
          >
            <LogoLink href="/">
              <Image 
                src="/logo.png" 
                alt="Smartslate" 
                width={160} 
                height={40} 
                priority 
                style={{ height: 'auto', objectFit: 'contain' }} 
              />
            </LogoLink>
          </motion.div>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
              ))}
            </Box>
            
            <Button
              onClick={() => setMobileMenuOpen(true)}
              sx={{ display: { md: 'none' }, minWidth: 'auto', p: 1, color: 'var(--primary-accent)' }}
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
