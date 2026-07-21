import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { LAYOUT } from '../theme';

interface FilmGrainProps {
  opacity?: number;
}

export const FilmGrain: React.FC<FilmGrainProps> = ({ opacity = 0.035 }) => {
  const frame = useCurrentFrame();
  // Regenerate noise every 4 frames for a subtle flicker
  const noiseSeed = Math.floor(frame / 4);
  
  // Use a stable hash from seed to generate deterministic noise
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = LAYOUT.width;
    canvas.height = LAYOUT.height;
    
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    
    // Simple seeded random based on noiseSeed
    let seed = noiseSeed * 16807;
    for (let i = 0; i < data.length; i += 4) {
      seed = (seed * 16807) % 2147483647;
      const val = Math.floor((seed / 2147483647) * 256);
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = Math.floor(opacity * 255);
    }
    
    ctx.putImageData(imageData, 0, 0);
  }, [noiseSeed, opacity]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: LAYOUT.width,
        height: LAYOUT.height,
        pointerEvents: 'none',
        zIndex: 40,
        mixBlendMode: 'overlay',
      }}
    />
  );
};
