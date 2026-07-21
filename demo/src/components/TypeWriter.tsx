import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS, FONTS } from '../theme';

interface TypeWriterProps {
  text: string;
  startFrame: number;
  style?: React.CSSProperties;
  color?: string;
  letterDelay?: number;
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  startFrame,
  style,
  color = COLORS.text,
  letterDelay = 2,
}) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - startFrame);
  
  const charCount = Math.min(
    text.length,
    Math.floor(localFrame / letterDelay)
  );
  
  const visibleText = text.slice(0, charCount);
  const cursorVisible = charCount < text.length && Math.floor(frame / 20) % 2 === 0;
  
  return (
    <span
      style={{
        fontFamily: FONTS.mono,
        fontSize: 14,
        color,
        whiteSpace: 'pre-wrap',
        lineHeight: 1.6,
        ...style,
      }}
    >
      {visibleText}
      {cursorVisible ? <span style={{ color: COLORS.ember }}>▊</span> : null}
    </span>
  );
};
