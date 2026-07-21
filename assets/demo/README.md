# Demo Assets

This directory contains the promotional demo assets for The Hive Skill.

## Contents

- `the-hive-skill-demo.mp4` — The cinematic demo video (rendered via Remotion).
  ~38 seconds, 1920×1080 letterboxed, h264, 30fps.
- `the-hive-skill-demo.gif` — Optimized GIF for README use (960px wide, 12fps).
- `the-hive-skill-demo.html` — Original HTML slideshow (kept as fallback).

## Source

The demo video is **rendered programmatically** from `demo/` in the repo root.
No screen recording or OBS needed.

To re-render:

```bash
cd demo
npm run render
```

See `demo/README.md` for details on the Remotion pipeline.

## Note

The demo is representative of the actual terminal output and council loop
sequence, intended for promotional and illustrative purposes. The live-run beat
sources its handoff text from the protocol documentation
(`examples/bugfix.md`, `references/council-protocol.md`) and is a faithful
visualization of what the protocol produces.
