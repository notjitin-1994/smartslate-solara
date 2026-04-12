# Solara Animation Standards

This document outlines the animation principles and implementation details for the Smartslate Solara ecosystem.

## Core Philosophy
Animations in Solara must feel **premium**, **intentional**, and **physically grounded**. We avoid generic transitions in favor of orchestrated sequences that guide the user's focus.

## Implementation Details

### 1. The `useOptimizedAnimations` Hook
All animations should leverage the `useOptimizedAnimations` hook. This ensures:
- **Performance Optimization**: Automatic fallback for low-end devices and `prefers-reduced-motion` settings.
- **Consistency**: Centralized easing functions (custom Quint ease) and duration standards.
- **Scroll Orchestration**: Built-in smooth scroll tracking for parallax effects.

### 2. Interaction Patterns
- **Magnetic Elements**: Interactive elements (buttons, logos) should use the `MagneticButton` component or the `useMagnetic` utility to provide a high-end tactile feel.
- **Reveal on Scroll**: Use the `revealVariants` for elements as they enter the viewport to create a coordinated "unfolding" effect.
- **Staggered Entrances**: Use `getStaggerProps` for list items or grid cards to prevent overwhelming the user with simultaneous motion.

### 3. Visual Language
- **Floating Orbs**: Large, subtle background gradients should use the `FloatingOrb` component to add depth and "life" to static sections.
- **Glassmorphism**: Combine motion with high-end CSS backdrops (blur, saturate) for a futuristic, layered appearance.

## Performance Mandates
- **Will-Change**: Only apply to properties actually animating (usually `transform` and `opacity`).
- **GPU Acceleration**: Prefer `translateZ(0)` or `translate3d` for smooth performance.
- **Cleanup**: Always ensure event listeners (scroll, mousemove) are properly cleaned up in `useEffect` returns.
