'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useOptimizedAnimations } from '@/hooks/useOptimizedAnimations';

// Replicating smartslate-final logic
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

const HeaderBackground = styled(motion.div)(({ theme }) => ({
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

// Mobile Menu Components mirroring smartslate-final
const MobileMenuBackdrop = styled(motion.div)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(8px)',
  zIndex: 1100,
}));

const MobileMenuPanel = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  width: '85%',
  maxWidth: 360,
  height: '100%',
  backgroundColor: 'rgba(13, 27, 42, 0.98)',
  backdropFilter: 'blur(24px)',
  zIndex: 1101,
  padding: theme.spacing(4),
  boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.4)',
  borderLeft: `1px solid var(--primary-accent)`,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const MobileNavLink = styled(Link)(({ theme }) => ({
  color: '#fff',
  textDecoration: 'none',
  fontSize: '1.25rem',
  fontWeight: 700,
  padding: '16px 0',
  borderBottom: '1px solid rgba(255,255,255,0.05)',
  display: 'block',
  transition: 'all 0.2s ease',
  '&:hover': {
    color: 'var(--primary-accent)',
    transform: 'translateX(8px)',
  },
}));

const HamburgerButton = styled(motion.button)(({ theme }) => ({
  display: 'none',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  padding: 8,
  zIndex: 1102,
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
}));

const HamburgerLine = styled(motion.span)(() => ({
  width: 24,
  height: 2,
  backgroundColor: 'var(--primary-accent)',
  borderRadius: 2,
}));

export default function Header() {
  const [hide, setHide] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { useMagnetic } = useOptimizedAnimations();
  const { ref: logoRef, position: logoPos, handleMouseMove: handleLogoMove, reset: resetLogo } = useMagnetic(0.2);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Scrolled state for background animation
      setScrolled(currentScrollY > 20);

      // Hide/Show logic
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
        <HeaderBackground 
          initial={false}
          animate={{ 
            opacity: scrolled ? 1 : 0.2,
            backgroundColor: scrolled ? 'rgba(9, 21, 33, 0.4)' : 'rgba(9, 21, 33, 0)',
            backdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'blur(0px) saturate(100%)',
            border: scrolled ? '1px solid var(--primary-accent)' : '1px solid rgba(167, 218, 219, 0)',
          }}
          transition={{ duration: 0.3 }}
        />
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
                style={{ height: '100%', width: 'auto', objectFit: 'contain' }} 
              />
            </LogoLink>
          </motion.div>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
              ))}
            </Box>
            
            <HamburgerButton onClick={() => setMobileMenuOpen(true)}>
              <HamburgerLine animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} />
              <HamburgerLine animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} />
              <HamburgerLine animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} />
            </HamburgerButton>
          </Box>
        </HeaderContent>
      </HeaderWrapper>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <MobileMenuBackdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <MobileMenuPanel
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <Box sx={{ mb: 6, mt: 2 }}>
                <Image src="/logo.png" alt="Smartslate" width={120} height={30} priority style={{ height: 'auto' }} />
              </Box>
              <nav style={{ display: 'flex', flexDirection: 'column' }}>
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <MobileNavLink href={item.href} onClick={() => setMobileMenuOpen(false)}>
                      {item.label}
                    </MobileNavLink>
                  </motion.div>
                ))}
              </nav>
              <Box sx={{ mt: 'auto' }}>
                <Button 
                  component={Link} 
                  href="/contact" 
                  fullWidth 
                  variant="contained" 
                  sx={{ background: 'var(--secondary-accent)', py: 2, fontWeight: 800, borderRadius: '12px' }}
                >
                  Get Started
                </Button>
              </Box>
            </MobileMenuPanel>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
