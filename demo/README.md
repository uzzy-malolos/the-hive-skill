# The Hive Skill — Demo Video

This directory contains the Remotion source for the cinematic demo video.

## Quick start

```bash
# Preview in Remotion Studio (localhost:3000)
npm run dev

# Render MP4 + GIF (to ../assets/demo/)
npm run render
```

## Prerequisites

- Node.js >= 20
- **TypeScript is pinned to ~5.9.3** — do NOT upgrade to 7.x.
  Remotion's esbuild-loader requires `typescript.sys.readFile` which was removed
  in TypeScript 7.x. This is enforced in `package.json`.
- ffmpeg (for GIF export)

## File layout

```
demo/
  package.json       # deps with pinned TypeScript
  tsconfig.json
  src/
    Root.tsx         # registerRoot entry point
    HiveDemo.tsx     # master composition with 7 beats
    theme.ts         # Ember palette, fonts, layout, beat timing
    components/
      Letterbox.tsx  # cinematic letterbox bars
      FilmGrain.tsx  # animated canvas noise overlay
      Vignette.tsx   # edge darkening
      EmberParticles.tsx  # drifting ember particles
      KineticTitle.tsx    # spring-animated title
      TypeWriter.tsx      # terminal typewriter effect
    beats/
      ColdOpen.tsx     # 3s — subtitle, embers
      TitleBeat.tsx    # 4s — "THE HIVE" kinetic type
      ProblemBeat.tsx  # 4s — three problem cards
      SixRolesBeat.tsx # 5.3s — six role cards
      LiveRunBeat.tsx  # 11.6s — council processes bugfix
      WhyItWorksBeat.tsx # 4s — feature pillars
      CTABeat.tsx      # 6s — install command, links
    data/
      types.ts        # types for handoffs, contracts
      roles.ts        # role definitions
      handoffs.ts     # bugfix example handoff data
      runContract.ts  # bugfix run contract
  scripts/
    render-mp4.mjs    # Node script: bundle + renderMedia
    render-gif.sh     # ffmpeg MP4 → optimized GIF

Output lands in: ../assets/demo/the-hive-skill-demo.mp4 and .gif
```

## Composition

| Beat | Frames | Time | Content |
|------|--------|------|---------|
| Cold Open | 0–89 | 3.0s | Subtitle, ember particles, grain |
| Title | 90–209 | 4.0s | "THE HIVE" with bloom, version badge |
| Problem | 210–329 | 4.0s | "No Structure", "Token Waste", "No Stop Rules" |
| Six Roles | 330–489 | 5.3s | Queen, Scout, Architect, Forger, Sentinel, Scribe |
| Live-Run | 490–839 | 11.6s | Council processes login-form bugfix |
| Why It Works | 840–959 | 4.0s | Token efficient, safety, handoffs, autonomy |
| CTA | 960–1139 | 6.0s | Install command, GitHub link |

## Render settings

- **Codec:** h264 (CRF ~18)
- **Resolution:** 1920×1080 (letterboxed)
- **FPS:** 30
- **GIF:** 960px wide, 12fps, optimized palette
