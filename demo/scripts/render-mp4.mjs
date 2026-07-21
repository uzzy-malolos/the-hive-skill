import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..', '..');
const outputFile = path.join(repoRoot, 'assets', 'demo', 'the-hive-skill-demo.mp4');

// Ensure output directory exists
fs.mkdirSync(path.dirname(outputFile), { recursive: true });

console.log('Bundling Remotion composition...');
const bundled = await bundle({
  entryPoint: path.resolve(__dirname, '..', 'src', 'Root.tsx'),
  onProgress: (p) => {
    if (p > 0 && p % 0.25 === 0) {
      process.stdout.write(`  Bundle progress: ${Math.round(p * 100)}%\n`);
    }
  },
});

console.log('Selecting composition...');
const comp = await selectComposition({
  serveUrl: bundled,
  id: 'HiveDemo',
  inputProps: {},
});

console.log(`Rendering to: ${outputFile}`);
console.log(`  Resolution: ${comp.width}x${comp.height}`);
console.log(`  Duration: ${comp.durationInFrames} frames at ${comp.fps}fps (${(comp.durationInFrames / comp.fps).toFixed(1)}s)`);
console.log(`  Codec: h264, CRF: 18`);

await renderMedia({
  composition: comp,
  serveUrl: bundled,
  codec: 'h264',
  outputLocation: outputFile,
  chromiumOptions: {},
  onProgress: (p) => {
    if (p.progress > 0 && (p.progress % 0.1 === 0 || p.progress === 1)) {
      process.stdout.write(`  Render progress: ${Math.round(p.progress * 100)}% (frame ${p.renderedFrames}/${p.encodedFrames ?? '?'})\n`);
    }
  },
});

// Verify
const stats = fs.statSync(outputFile);
console.log(`\n✓ Render complete: ${outputFile}`);
console.log(`  File size: ${(stats.size / 1024 / 1024).toFixed(1)} MB`);
