#!/usr/bin/env bash
# Generate optimized GIF from the rendered MP4
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEMO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$DEMO_DIR/.." && pwd)"

INPUT="$REPO_ROOT/assets/demo/the-hive-skill-demo.mp4"
OUTPUT="$REPO_ROOT/assets/demo/the-hive-skill-demo.gif"
PALETTE="C:/tmp/the-hive-skill-palette.png"
mkdir -p "C:/tmp"

if [ ! -f "$INPUT" ]; then
  echo "ERROR: No MP4 found at $INPUT. Run 'npm run render:mp4' first."
  exit 1
fi

echo "Generating GIF from MP4..."
echo "  Input:  $INPUT"
echo "  Output: $OUTPUT"

# Generate palette (two-step approach works reliably across platforms)
ffmpeg -y -i "$INPUT" \
  -vf "fps=12,scale=960:-1:flags=lanczos,palettegen=stats_mode=diff" \
  -t 14 \
  "$PALETTE" 2>/dev/null

# Generate GIF with palette
ffmpeg -y -i "$INPUT" -i "$PALETTE" \
  -lavfi "fps=12,scale=960:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5" \
  -t 14 \
  "$OUTPUT" 2>/dev/null

rm -f "$PALETTE"

# Verify
GIF_SIZE=$(stat -c%s "$OUTPUT" 2>/dev/null || stat -f%z "$OUTPUT" 2>/dev/null)
echo "✓ GIF generated: $OUTPUT ($((GIF_SIZE / 1024)) KB)"
