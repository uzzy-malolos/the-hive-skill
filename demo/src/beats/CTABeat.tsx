import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS, BEATS } from '../theme';
import { EmberParticles, FilmGrain, Vignette, Letterbox, TypeWriter } from '../components';

const lines = [
  { text: 'npx the-hive install', delay: 20 },
  { text: '', delay: 40 },
  { text: '# council protocol ready', delay: 60 },
  { text: '# six roles, one command', delay: 80 },
  { text: '', delay: 90 },
  { text: '── Join the Hive ──', delay: 110 },
];

const links = [
  { text: 'github.com/yuzuruu29/the-hive-skill', delay: 140 },
  { text: 'docs: structured autonomy', delay: 160 },
];

export const CTABeat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - BEATS.cta.start);
  
  const fadeIn = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const terminalOpacity = interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  
  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.ground }}>
      <EmberParticles intensity={0.8} />
      <FilmGrain />
      <Vignette strength={0.3} />
      
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fadeIn,
        }}
      >
        {/* Terminal window */}
        <div
          style={{
            width: 600,
            borderRadius: 12,
            overflow: 'hidden',
            opacity: terminalOpacity,
            backdropFilter: 'blur(4px)',
          }}
        >
          {/* Terminal header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              background: '#1a1a2e',
              borderBottom: `1px solid ${COLORS.textMuted}33`,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F56' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27C93F' }} />
            <div style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textMuted, marginLeft: 12, letterSpacing: '1px' }}>
              the-hive-skill — demo
            </div>
          </div>
          {/* Terminal body */}
          <div
            style={{
              padding: '20px 20px',
              background: `${COLORS.ground}ee`,
              border: `1px solid ${COLORS.textMuted}22`,
              borderTop: 'none',
              borderBottomLeftRadius: 12,
              borderBottomRightRadius: 12,
            }}
          >
            {lines.map((line, i) => (
              <TypeWriter
                key={i}
                text={line.text}
                startFrame={BEATS.cta.start + line.delay}
                style={{
                  display: 'block',
                  fontFamily: FONTS.mono,
                  fontSize: 14,
                  lineHeight: 2,
                  color: i === lines.length - 1 ? COLORS.ember : i === 1 || i === 4 ? 'transparent' : COLORS.text,
                  letterSpacing: line.text.startsWith('──') ? '3px' : undefined,
                }}
                color={i === 0 ? COLORS.ember : i === lines.length - 1 ? COLORS.ember : COLORS.text}
                letterDelay={2}
              />
            ))}
            
            {/* Links */}
            {links.map((link, i) => (
              <TypeWriter
                key={`link-${i}`}
                text={link.text}
                startFrame={BEATS.cta.start + link.delay}
                style={{
                  display: 'block',
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  lineHeight: 2,
                  color: COLORS.textMuted,
                }}
                color={COLORS.textMuted}
                letterDelay={2}
              />
            ))}
            
            {/* Blinking cursor */}
            <TypeWriter
              text="_"
              startFrame={BEATS.cta.start + 175}
              style={{
                display: 'block',
                fontFamily: FONTS.mono,
                fontSize: 14,
                color: COLORS.ember,
              }}
              color={COLORS.ember}
              letterDelay={60}
            />
          </div>
        </div>
        
        {/* Bottom credits */}
        <div
          style={{
            fontFamily: FONTS.mono,
            fontSize: 9,
            color: COLORS.textMuted,
            letterSpacing: '2px',
            marginTop: 48,
            textAlign: 'center',
            lineHeight: 2,
          }}
        >
          Built with Remotion · Apache-2.0
          <br />
          The Hive Skill v0.3.0
        </div>
      </div>
      <Letterbox />
    </div>
  );
};
