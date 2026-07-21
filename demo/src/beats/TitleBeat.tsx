import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { KineticTitle, EmberParticles, FilmGrain, Vignette, Letterbox } from '../components';
import { COLORS, FONTS, BEATS } from '../theme';

export const TitleBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - BEATS.title.start;
  
  const bloomOpacity = interpolate(localFrame, [0, 40], [0, 0.7], { extrapolateRight: 'clamp' });
  const [peakBloom, setPeakBloom] = React.useState(true);
  const badgeOpacity = interpolate(localFrame, [60, 90], [0, 1], { extrapolateRight: 'clamp' });
  
  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.ground }}>
      <EmberParticles intensity={1.5} />
      <FilmGrain />
      <Vignette strength={0.35} />
      
      {/* Ember bloom glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 250,
          background: `radial-gradient(ellipse, ${COLORS.emberAccent}55, transparent 70%)`,
          opacity: bloomOpacity,
          filter: 'blur(25px)',
        }}
      />
      
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
        <KineticTitle
          text="THE HIVE"
          startFrame={BEATS.title.start}
          fontSize={128}
        />
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 12,
            color: COLORS.textMuted,
            letterSpacing: '3px',
            marginTop: 24,
            opacity: badgeOpacity,
          }}
        >
          v0.3.0 · Apache-2.0
        </div>
      </div>
      <Letterbox />
    </div>
  );
};
