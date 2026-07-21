import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS } from '../theme';

interface KineticTitleProps {
  text: string;
  startFrame: number;
  fontSize?: number;
  color?: string;
  glowColor?: string;
}

export const KineticTitle: React.FC<KineticTitleProps> = ({
  text,
  startFrame,
  fontSize = 120,
  color = COLORS.ember,
  glowColor = COLORS.emberAccent,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - startFrame);
  
  const scale = spring({
    frame: localFrame,
    fps,
    from: 0,
    to: 1,
    config: { damping: 12, stiffness: 100 },
  });
  
  const opacity = interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  
  return (
    <h1
      style={{
        fontFamily: FONTS.display,
        fontSize,
        fontWeight: 900,
        color,
        margin: 0,
        letterSpacing: '8px',
        textShadow: `0 0 40px ${glowColor}66, 0 0 4px ${glowColor}`,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {text}
    </h1>
  );
};
