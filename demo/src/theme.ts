export const COLORS = {
  ember: '#FFB347',
  emberAccent: '#FF6B35',
  emberDark: '#CC5500',
  ground: '#0A0506',
  groundLight: '#1A0D0A',
  text: '#F0F0F5',
  textDim: '#8888A0',
  textMuted: '#555570',
  letterbox: '#000000',
  roles: {
    queen: '#F6A623',
    scout: '#22D3EE',
    architect: '#A78BFA',
    forger: '#FB923C',
    sentinel: '#4ADE80',
    scribe: '#60A5FA',
  },
  stopStatus: {
    complete: '#4ADE80',
    partial: '#F6A623',
    blocked: '#F87171',
    failed: '#EF4444',
  },
};

export const FONTS = {
  display: "'Inter', -apple-system, sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export const LAYOUT = {
  width: 1920,
  height: 1080,
  letterbox: 110,
  get contentHeight() {
    return this.height - this.letterbox * 2;
  },
};

export const BEATS = {
  coldOpen: { start: 0, end: 89 },
  title: { start: 90, end: 209 },
  problem: { start: 210, end: 329 },
  sixRoles: { start: 330, end: 489 },
  liveRun: { start: 490, end: 839 },
  whyItWorks: { start: 840, end: 959 },
  cta: { start: 960, end: 1139 },
};
