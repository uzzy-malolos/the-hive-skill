import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS, BEATS } from '../theme';
import { FilmGrain, Vignette, Letterbox } from '../components';

const FEATURES = [
  { icon: '⚡', title: 'Token Efficient', desc: 'Context delivered on-demand per role turn, not duplicated' },
  { icon: '🛡️', title: 'Safety Boundaries', desc: 'Bounded repair cycles, evidence requirements, stop conditions' },
  { icon: '🤝', title: 'Structured Handoffs', desc: 'YAML contracts with confidence labels and file scope' },
  { icon: '🧠', title: 'Protocol Autonomy', desc: 'Council loops until stop condition — no babysitting required' },
];

export const WhyItWorksBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - BEATS.whyItWorks.start);
  
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
          padding: '0 80px',
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
            opacity: headingOpacity,
          }}
        >
          Why It Works
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            maxWidth: 1000,
          }}
        >
          {FEATURES.map((feat, i) => {
            const delay = i * 10;
            const s = spring({
              frame: Math.max(0, localFrame - delay),
              fps,
              from: 0,
              to: 1,
              config: { damping: 12, stiffness: 100 },
            });
            const opacity = interpolate(localFrame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp' });

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  padding: '20px 24px',
                  background: `linear-gradient(135deg, ${COLORS.groundLight}cc, ${COLORS.ground}cc)`,
                  border: `1px solid ${COLORS.ember}22`,
                  borderRadius: 12,
                  transform: `translateX(${(1 - s) * -30}px)`,
                  opacity,
                }}
              >
                <span style={{ fontSize: 28, marginTop: 2 }}>{feat.icon}</span>
                <div>
                  <h3
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 16,
                      fontWeight: 700,
                      color: COLORS.ember,
                      margin: 0,
                    }}
                  >
                    {feat.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 13,
                      color: COLORS.textDim,
                      margin: '6px 0 0',
                      lineHeight: 1.5,
                    }}
                  >
                    {feat.desc}
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
