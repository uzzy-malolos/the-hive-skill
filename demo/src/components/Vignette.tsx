import React from 'react';
import { LAYOUT } from '../theme';

interface VignetteProps {
  strength?: number;
}

export const Vignette: React.FC<VignetteProps> = ({ strength = 0.35 }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: LAYOUT.width,
      height: LAYOUT.height,
      background: `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,${strength}) 100%)`,
      pointerEvents: 'none',
      zIndex: 30,
    }}
  />
);
