'use client';

import { Box, Link as MuiLink } from '@mui/material';
import { styled } from '@mui/material/styles';

const SkipLink = styled(MuiLink)(({ theme }) => ({
  position: 'absolute',
  top: '-40px',
  left: 6,
  background: '#a7dadb',
  color: '#020C1B',
  padding: '8px 16px',
  textDecoration: 'none',
  borderRadius: '8px',
  fontWeight: 600,
  fontSize: '14px',
  zIndex: 10000,
  transition: 'top 0.3s ease',
  '&:focus': {
    top: '6px',
  },
  '&:hover': {
    background: '#7bc5c7',
  },
}));

export function SkipToContent() {
  return (
    <SkipLink href="#main-content"
      className="skip-to-main-content"
      aria-label="Skip to main content"
    >
      Skip to main content
    </SkipLink>
  );
}