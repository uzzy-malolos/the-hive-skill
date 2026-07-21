import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS } from '../theme';
import { EmberParticles, FilmGrain, Vignette, Letterbox } from '../components';

export const ColdOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const subtitleOpacity = interpolate(frame, [40, 70], [0, 1], { extrapolateRight: 'clamp' });
  const pulse = interpolate(frame, [0, 60, 120], [0.3, 1, 0.3], { extrapolateRight: 'clamp' });
  const emberIntensity = interpolate(frame, [0, 30], [0.3, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.ground }}>
      <EmberParticles intensity={emberIntensity} />
      <FilmGrain />
      <Vignette strength={0.4} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Ember bloom behind text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            height: 100,
            background: `radial-gradient(ellipse, ${COLORS.emberAccent}33, transparent 70%)`,
            opacity: pulse * 0.5,
            filter: 'blur(30px)',
          }}
        />
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 16,
            letterSpacing: '8px',
            color: COLORS.textDim,
            opacity: subtitleOpacity,
            textTransform: 'uppercase',
          }}
        >
          AUTONOMOUS · MULTI-AGENT · COUNCIL
        </div>
      </div>
      <Letterbox />
    </div>
  );
};
