'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const HeaderWrapper = styled('header', {
  shouldForwardProp: (prop) => prop !== 'hide'
})<{ hide?: boolean }>(({ theme, hide }) => ({
  position: 'fixed',
  top: theme.spacing(2),
  left: '50%',
  transform: hide
    ? 'translateX(-50%) translateY(-20px) scale(0.95)'
    : 'translateX(-50%) translateY(0) scale(1)',
  zIndex: 1000,
  width: 'calc(100vw - 32px)',
  maxWidth: theme.breakpoints.values.lg,
  opacity: hide ? 0 : 1,
  visibility: hide ? 'hidden' : 'visible',
  transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100vw - 16px)',
    top: theme.spacing(1),
  },
}));

const HeaderBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  backgroundColor: 'rgba(9, 21, 33, 0.4)',
  backdropFilter: 'blur(16px) saturate(180%)',
  WebkitBackdropFilter: 'blur(16px) saturate(180%)',
  border: '1px solid #A7DADB',
  borderRadius: theme.spacing(2),
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
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(0.75)} ${theme.spacing(2)}`,
  },
}));

const LogoLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  height: 48,
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('sm')]: {
    height: 44,
  },
}));

const NavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(4),
}));

const DesktopNav = styled('nav')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: 500,
  position: 'relative',
  transition: 'color 0.2s ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -4,
    left: 0,
    width: 0,
    height: '2px',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease',
  },
  '&:hover::after': {
    width: '100%',
  },
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const MobileMenuButton = styled(Button)(({ theme }) => ({
  display: 'none',
  minWidth: 'auto',
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
  [theme.breakpoints.down('md')]: {
    display: 'flex',
  },
}));

const MobileMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open'
})<{ open: boolean }>(({ theme, open }) => ({
  position: 'fixed',
  top: 0,
  right: open ? 0 : '-100%',
  width: '80%',
  maxWidth: '400px',
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
  borderLeft: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(4),
  transition: 'right 0.3s ease-in-out',
  zIndex: 1001,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  overflowY: 'auto',
}));

const MobileNavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  fontSize: '1.1rem',
  fontWeight: 500,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(167, 218, 219, 0.1)',
    color: theme.palette.primary.main,
  },
}));

const Overlay = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open'
})<{ open: boolean }>(({ open }) => ({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  opacity: open ? 1 : 0,
  visibility: open ? 'visible' : 'hidden',
  transition: 'opacity 0.3s ease, visibility 0.3s ease',
  zIndex: 1000,
}));

export default function Header() {
  const [hide, setHide] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY < lastScrollY || currentScrollY <= 50) {
            setHide(false);
          } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setHide(true);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
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
      <HeaderWrapper hide={hide}>
        <HeaderBackground />
        <HeaderContent>
          <LogoLink href="/">
            <Image
              src="/logo.png"
              alt="Smartslate Solara"
              width={160}
              height={40}
              priority
              style={{ height: 'auto' }}
            />
          </LogoLink>

          <NavContainer>
            <DesktopNav>
              {navItems.map((item) => (
                <NavLink key={item.label} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </DesktopNav>

            <MobileMenuButton
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </MobileMenuButton>
          </NavContainer>
        </HeaderContent>
      </HeaderWrapper>

      <Overlay open={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />
      <MobileMenu open={mobileMenuOpen}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => setMobileMenuOpen(false)}
            sx={{ minWidth: 'auto', p: 1 }}
            aria-label="Close menu"
          >
            <X size={24} />
          </Button>
        </Box>
        {navItems.map((item) => (
          <MobileNavLink
            key={item.label}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </MobileNavLink>
        ))}
      </MobileMenu>
    </>
  );
}
