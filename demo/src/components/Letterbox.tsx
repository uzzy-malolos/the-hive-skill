import React from 'react';
import { LAYOUT } from '../theme';

export const Letterbox: React.FC = () => (
  <>
    {/* Top bar */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: LAYOUT.width,
        height: LAYOUT.letterbox,
        background: '#000',
        zIndex: 50,
      }}
    />
    {/* Bottom bar */}
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: LAYOUT.width,
        height: LAYOUT.letterbox,
        background: '#000',
        zIndex: 50,
      }}
    />
  </>
);
