'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { X, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

const BRAND_TEAL = '#a7dadb';
const BRAND_DARK = '#020C1B';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    background: 'rgba(9, 21, 33, 0.95)',
    backdropFilter: 'blur(20px)',
    border: `1px solid ${BRAND_TEAL}30`,
    borderRadius: '24px',
    color: '#fff',
    maxWidth: '500px',
    width: '100%',
    margin: '16px',
    boxShadow: `0 24px 48px rgba(0, 0, 0, 0.5), 0 0 20px ${BRAND_TEAL}10`,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: '20px',
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
    '& fieldset': {
      borderColor: 'rgba(167, 218, 219, 0.2)',
      transition: 'all 0.3s ease',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(167, 218, 219, 0.4)',
    },
    '&.Mui-focused fieldset': {
      borderColor: BRAND_TEAL,
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(167, 218, 219, 0.6)',
    '&.Mui-focused': {
      color: BRAND_TEAL,
    },
  },
}));

interface BetaRequestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BetaRequestModal({ open, onClose }: BetaRequestModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    organization: '',
    role: '',
    useCase: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: dbError } = await supabase
        .from('beta_requests')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            organization: formData.organization,
            role: formData.role,
            use_case: formData.useCase,
          },
        ]);

      if (dbError) throw dbError;

      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        organization: '',
        role: '',
        useCase: '',
      });
      
      // Auto close after success
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <StyledDialog open={open} onClose={onClose} scroll="body">
        <Box sx={{ position: 'relative', p: 4 }}>
          <IconButton 
            onClick={onClose}
            sx={{ position: 'absolute', top: 16, right: 16, color: 'rgba(255,255,255,0.5)', '&:hover': { color: BRAND_TEAL } }}
          >
            <X size={20} />
          </IconButton>

          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Box sx={{ 
              width: 50, 
              height: 50, 
              borderRadius: '12px', 
              background: `${BRAND_TEAL}15`, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: BRAND_TEAL,
              border: `1px solid ${BRAND_TEAL}30`
            }}>
              <Sparkles size={24} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>Join the Constellation Beta</Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
              Be among the first to experience AI-automated learning structures.
            </Typography>
          </Box>

          {success ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Alert 
                severity="success" 
                sx={{ 
                  borderRadius: '12px', 
                  background: 'rgba(16, 185, 129, 0.1)', 
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  mb: 4
                }}
              >
                Request submitted! We'll reach out soon.
              </Alert>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <StyledTextField
                fullWidth
                label="Full Name"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
              />
              <StyledTextField
                fullWidth
                label="Work Email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <StyledTextField
                fullWidth
                label="Organization"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
              />
              <StyledTextField
                fullWidth
                label="Job Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
              <StyledTextField
                fullWidth
                label="Tell us about your use case"
                name="useCase"
                multiline
                rows={3}
                value={formData.useCase}
                onChange={handleChange}
              />

              {error && (
                <Typography color="error" variant="caption" sx={{ display: 'block', mb: 2 }}>
                  {error}
                </Typography>
              )}

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send size={18} />}
                sx={{ 
                  background: BRAND_TEAL, 
                  color: BRAND_DARK, 
                  fontWeight: 800, 
                  py: 1.5, 
                  borderRadius: '12px',
                  '&:hover': { background: '#fff' }
                }}
              >
                {loading ? 'Submitting...' : 'Request Invitation'}
              </Button>
            </form>
          )}
        </Box>
      </StyledDialog>
    </>
  );
}
