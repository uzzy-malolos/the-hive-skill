import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS, BEATS } from '../theme';
import { FilmGrain, Vignette, Letterbox } from '../components';

const PROBLEMS = [
  { icon: '🌀', title: 'No Structure', desc: 'Ad-hoc prompts lose context at every turn' },
  { icon: '🔥', title: 'Token Waste', desc: 'Full context sent for every new request' },
  { icon: '⛔', title: 'No Stop Rules', desc: 'Agents loop without clear termination' },
];

export const ProblemBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - BEATS.problem.start);
  
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
        }}
      >
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 11,
            letterSpacing: '5px',
            color: COLORS.ember,
            textTransform: 'uppercase',
            marginBottom: 40,
            opacity: interpolate(localFrame, [0, 15], [0, 1]),
          }}
        >
          The Problem
        </div>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
          {PROBLEMS.map((p, i) => {
            const delay = i * 12;
            const cardSpring = spring({
              frame: Math.max(0, localFrame - delay),
              fps,
              from: 0,
              to: 1,
              config: { damping: 14, stiffness: 160 },
            });
            const cardOpacity = interpolate(localFrame, [delay, delay + 8], [0, 1], { extrapolateRight: 'clamp' });
            const flashOpacity = interpolate(localFrame, [delay, delay + 3], [0.6, 0], { extrapolateRight: 'clamp' });

            return (
              <div key={i} style={{ position: 'relative' }}>
                {/* Flash effect */}
                <div
                  style={{
                    position: 'absolute',
                    inset: -4,
                    borderRadius: 20,
                    background: COLORS.emberAccent,
                    opacity: flashOpacity,
                    filter: 'blur(10px)',
                    zIndex: 0,
                    pointerEvents: 'none',
                  }}
                />
                <div
                  style={{
                    width: 280,
                    padding: 36,
                    background: `linear-gradient(180deg, ${COLORS.groundLight}cc, ${COLORS.ground}cc)`,
                    border: `1px solid ${COLORS.ember}33`,
                    borderRadius: 16,
                    textAlign: 'center',
                    transform: `translateY(${(1 - cardSpring) * 60}px) scale(${0.9 + cardSpring * 0.1})`,
                    opacity: cardOpacity,
                    backdropFilter: 'blur(4px)',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <div style={{ fontSize: 44, marginBottom: 12 }}>{p.icon}</div>
                  <h3
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 20,
                      fontWeight: 700,
                      color: COLORS.text,
                      margin: 0,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 13,
                      color: COLORS.textDim,
                      margin: '10px 0 0',
                      lineHeight: 1.5,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Letterbox />
    </div>
  );
};
