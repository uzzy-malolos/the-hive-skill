# Export Instructions

This page explains the automated rendering pipeline for the demo video.

**The old manual capture workflow has been replaced by a one-command Remotion pipeline.** No screen recording or OBS is needed.

## Automated render (preferred)

```bash
cd demo
npm run render
```

This will:
1. Bundle the Remotion composition (`demo/src/`)
2. Render `assets/demo/the-hive-skill-demo.mp4` (1920×1080, h264, 30fps, ~38s)
3. Generate `assets/demo/the-hive-skill-demo.gif` (960px wide, 12fps, optimized palette)

### Prerequisites for automated render

- Node.js >= 20 (TypeScript is pinned to ~5.9.3 inside the demo workspace)
- ffmpeg (for GIF export, optional if you skip `npm run render:gif`)

## Manual GIF generation (if you have an existing MP4)

```bash
ffmpeg -i the-hive-skill-demo.mp4 -vf "fps=12,scale=960:-1:flags=lanczos,palettegen=stats_mode=diff" palette.png
ffmpeg -i the-hive-skill-demo.mp4 -i palette.png -lavfi "fps=12,scale=960:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5" the-hive-skill-demo.gif
rm palette.png
```

### Recommended settings

| Output | Resolution | FPS | Notes |
|--------|-----------|-----|-------|
| MP4 | 1920×1080 | 30 | h264, CRF ~18 |
| GIF | 960px wide | 12 | 256-color optimized palette |

## Preview before render

To iterate on the composition without a full render:

```bash
cd demo
npm run dev
```

This starts Remotion Studio at `http://localhost:3000` where you can scrub,
tweak timings, and see changes live.
