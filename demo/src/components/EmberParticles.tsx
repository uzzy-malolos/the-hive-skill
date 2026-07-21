import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { LAYOUT, COLORS } from '../theme';

interface EmberParticlesProps {
  intensity?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  swayAmp: number;
  swayFreq: number;
  phase: number;
  opacity: number;
}

const PARTICLE_COUNT = 40;

export const EmberParticles: React.FC<EmberParticlesProps> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  
  const particles = useMemo<Particle[]>(() => {
    const result: Particle[] = [];
    const seed = 1337;
    let s = seed;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      s = (s * 16807) % 2147483647;
      result.push({
        x: (s / 2147483647) * 100,
        y: 70 + (s / 2147483647) * 40,
        size: 1.5 + (s / 2147483647) * 3,
        speed: 0.15 + (s / 2147483647) * 0.35,
        swayAmp: 3 + (s / 2147483647) * 8,
        swayFreq: 0.005 + (s / 2147483647) * 0.015,
        phase: (s / 2147483647) * Math.PI * 2,
        opacity: 0.15 + (s / 2147483647) * 0.4,
      });
    }
    return result;
  }, []);
  
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }}>
      {particles.map((p, i) => {
        const y = p.y - (frame * p.speed) % 100;
        const sway = Math.sin(frame * p.swayFreq + p.phase) * p.swayAmp;
        // Fade in/out at top and bottom edges
        const fadeBottom = interpolate(y, [50, 70], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const fadeTop = interpolate(y, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const lifeOpacity = Math.min(fadeBottom, fadeTop) * p.opacity * intensity;
        
        // Ember glow
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x + sway}%`,
              top: `${y}%`,
              width: p.size * 2,
              height: p.size * 2,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${COLORS.ember}44, ${COLORS.emberAccent}22, transparent)`,
              opacity: lifeOpacity,
              filter: `blur(${p.size * 0.5}px)`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </div>
  );
};
