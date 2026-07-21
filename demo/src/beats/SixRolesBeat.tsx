import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS, BEATS } from '../theme';
import { FilmGrain, Vignette, Letterbox } from '../components';
import { ROLES } from '../data/roles';

export const SixRolesBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - BEATS.sixRoles.start);
  
  const headingOpacity = interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  
  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.ground }}>
      <FilmGrain />
      <Vignette />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 60px',
        }}
      >
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 11,
            letterSpacing: '5px',
            color: COLORS.ember,
            textTransform: 'uppercase',
            marginBottom: 36,
            opacity: headingOpacity,
          }}
        >
          Six Roles · One Council
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 16,
            maxWidth: 1100,
          }}
        >
          {ROLES.map((role, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const delay = (row * 3 + col) * 8;
            const s = spring({
              frame: Math.max(0, localFrame - delay),
              fps,
              from: 0,
              to: 1,
              config: { damping: 12, stiffness: 100 },
            });
            const opacity = interpolate(localFrame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp' });
            const sparkOpacity = interpolate(localFrame, [delay + 5, delay + 8], [0.5, 0], { extrapolateRight: 'clamp' });

            return (
              <div
                key={role.id}
                style={{
                  position: 'relative',
                  padding: '22px 24px',
                  background: `linear-gradient(180deg, ${COLORS.groundLight}cc, ${COLORS.ground}cc)`,
                  border: `1px solid ${role.accent}44`,
                  borderRadius: 14,
                  transform: `translateY(${(1 - s) * 40}px) scale(${0.85 + s * 0.15})`,
                  opacity,
                  overflow: 'hidden',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {/* Spark effect */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(ellipse at 50% 50%, ${role.accent}44, transparent 70%)`,
                    opacity: sparkOpacity,
                    transition: 'opacity 0.1s',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, position: 'relative', zIndex: 1 }}>
                  <span style={{ fontSize: 24 }}>{role.emoji}</span>
                  <h3
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 16,
                      fontWeight: 700,
                      color: role.accent,
                      margin: 0,
                    }}
                  >
                    {role.name}
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 12,
                    color: COLORS.textDim,
                    margin: 0,
                    lineHeight: 1.5,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {role.mandate}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <Letterbox />
    </div>
  );
};
