import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { COLORS, FONTS, BEATS } from '../theme';
import { FilmGrain, Vignette, Letterbox, TypeWriter } from '../components';
import { ROLES } from '../data/roles';
import { BUGFIX_HANDOFFS } from '../data/handoffs';
import { BUGFIX_CONTRACT } from '../data/runContract';
import { Confidence } from '../data/types';

// ── timing ─────────────────────────────────────────────────────────────────────
const FPS = 30;
const ROLE_STEPS = [
  { roleId: 'queen' as const, dur: 48, lines: 1 },
  { roleId: 'scout' as const, dur: 54, lines: 2 },
  { roleId: 'architect' as const, dur: 54, lines: 2 },
  { roleId: 'forger' as const, dur: 66, lines: 2 },
  { roleId: 'sentinel' as const, dur: 60, lines: 4 },
  { roleId: 'scribe' as const, dur: 36, lines: 1 },
];

function getRoleFrames(): { role: string; start: number; end: number }[] {
  let current = 0;
  return ROLE_STEPS.map((s) => {
    const start = current;
    const end = current + s.dur;
    current = end;
    return { role: s.roleId, start, end };
  });
}

const ROLE_FRAMES = getRoleFrames();
const TOTAL_RUN_FRAMES = ROLE_FRAMES[ROLE_FRAMES.length - 1].end; // ~318
const FINAL_START = TOTAL_RUN_FRAMES; // ~318
const FINAL_DUR = 32; // Total: 350

// ── helpers ─────────────────────────────────────────────────────────────────────
const EMPEROR_COLORS: Record<string, string> = {
  queen: COLORS.roles.queen,
  scout: COLORS.roles.scout,
  architect: COLORS.roles.architect,
  forger: COLORS.roles.forger,
  sentinel: COLORS.roles.sentinel,
  scribe: COLORS.roles.scribe,
};

const CONFIDENCE_COLORS: Record<Confidence, string> = {
  high: '#4ADE80',
  medium: '#F6A623',
  low: '#F87171',
};

function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  return (
    <span
      style={{
        fontFamily: FONTS.mono,
        fontSize: 10,
        color: CONFIDENCE_COLORS[confidence],
        border: `1px solid ${CONFIDENCE_COLORS[confidence]}55`,
        borderRadius: 4,
        padding: '1px 6px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
      }}
    >
      {confidence}
    </span>
  );
}

// ── Council rail ────────────────────────────────────────────────────────────────
function CouncilRail({
  activeRole,
  completedRoles,
  finalComplete,
  localFrame,
}: {
  activeRole: string | null;
  completedRoles: Set<string>;
  finalComplete: boolean;
  localFrame: number;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top: LAYOUT.letterbox,
        left: 0,
        width: '62%',
        height: LAYOUT.contentHeight,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 24px',
        gap: 6,
      }}
    >
      {ROLES.map((role) => {
        const isActive = activeRole === role.id;
        const isComplete = completedRoles.has(role.id);
        const queued = !isActive && !isComplete;
        const activeAnim = spring({
          frame: Math.max(0, localFrame - (ROLE_FRAMES.find((f) => f.role === role.id)?.start ?? 0)),
          fps: FPS,
          from: 0,
          to: 1,
          config: { damping: 12, stiffness: 120 },
        });
        const pulse = isActive ? Math.sin(localFrame * 0.15) * 0.3 + 1 : 0;

        return (
          <div
            key={role.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 16px',
              borderRadius: 10,
              background: isActive
                ? `linear-gradient(135deg, ${role.accent}22, transparent)`
                : isComplete
                ? `${COLORS.groundLight}99`
                : 'transparent',
              border: `1px solid ${
                isActive ? role.accent : isComplete ? `${role.accent}55` : `${COLORS.textMuted}22`
              }`,
              opacity: isComplete ? 0.9 : queued ? 0.35 : 1,
              boxShadow: isActive ? `0 0 20px ${role.accent}33` : 'none',
              transition: 'opacity 0.3s, border-color 0.3s, box-shadow 0.3s',
            }}
          >
            <span style={{ fontSize: 20 }}>{role.emoji}</span>
            <span
              style={{
                fontFamily: FONTS.display,
                fontSize: 13,
                fontWeight: 600,
                color: role.accent,
                flex: 1,
                letterSpacing: '1px',
              }}
            >
              {role.name}
            </span>
            {isActive && (
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: role.accent,
                  boxShadow: `0 0 8px ${role.accent}`,
                  opacity: pulse,
                }}
              />
            )}
            {isComplete && (
              <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: role.accent, letterSpacing: '1px' }}>
                ✓ DONE
              </span>
            )}
          </div>
        );
      })}

      {/* Final COMPLETE row */}
      {finalComplete && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: '12px 16px',
            borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.stopStatus.complete}22, transparent)`,
            border: `1px solid ${COLORS.stopStatus.complete}66`,
            marginTop: 8,
          }}
        >
          <span style={{ fontFamily: FONTS.display, fontSize: 15, fontWeight: 700, color: COLORS.stopStatus.complete, letterSpacing: '2px' }}>
            COMPLETE
          </span>
          <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: COLORS.textDim }}>
            All success criteria satisfied
          </span>
        </div>
      )}
    </div>
  );
}

// ── Evidence pane ──────────────────────────────────────────────────────────────
interface EvidencePaneProps {
  handoffIndex: number;
  localFrame: number;
  finalComplete: boolean;
}

interface Line {
  text: string;
  delay: number;
  color?: string;
}

const getLinesForRole = (index: number, roleId: string): Line[] => {
  const handoff = BUGFIX_HANDOFFS[index];
  if (!handoff) return [];

  const lines: Line[] = [];
  const stepStart = ROLE_FRAMES[index]?.start ?? 0;

  // Summary line
  lines.push({
    text: `→ ${handoff.summary}`,
    delay: stepStart + 8,
    color: EMPEROR_COLORS[roleId] ?? COLORS.text,
  });

  // Findings
  handoff.findings.forEach((f, fi) => {
    lines.push({
      text: `${f.statement}`,
      delay: stepStart + 20 + fi * 12,
    });
    lines.push({
      text: `  [${f.confidence.toUpperCase()}] ${f.evidence}`,
      delay: stepStart + 24 + fi * 12,
      color: CONFIDENCE_COLORS[f.confidence],
    });
  });

  // Commands for forger
  if (handoff.commandsRun) {
    handoff.commandsRun.forEach((cmd) => {
      lines.push({
        text: `$ ${cmd.command}`,
        delay: stepStart + 36,
        color: COLORS.ember,
      });
      lines.push({
        text: `→ ${cmd.result}: ${cmd.outputSummary ?? ''}`,
        delay: stepStart + 40,
        color: cmd.result === 'passed' ? CONFIDENCE_COLORS.high : CONFIDENCE_COLORS.low,
      });
    });
  }

  // Verdict for sentinel
  if (handoff.verdict) {
    lines.push({
      text: `Verdict: ${handoff.verdict}`,
      delay: stepStart + 36,
      color: handoff.verdict === 'PASS' ? CONFIDENCE_COLORS.high : CONFIDENCE_COLORS.low,
    });
  }

  return lines;
};

const EvidencePane: React.FC<EvidencePaneProps> = ({ handoffIndex, localFrame, finalComplete }) => {
  const allLines: Line[] = [];
  for (let i = 0; i <= handoffIndex; i++) {
    const roleId = ROLE_STEPS[i]?.roleId ?? 'queen';
    allLines.push(...getLinesForRole(i, roleId));
  }

  // Final COMPLETE message
  if (finalComplete) {
    allLines.push({ text: '', delay: FINAL_START + 4 });
    allLines.push({
      text: '══════════════════════════════',
      delay: FINAL_START + 8,
      color: COLORS.stopStatus.complete,
    });
    allLines.push({
      text: '  COUNCIL COMPLETE — COMPLETE  ',
      delay: FINAL_START + 14,
      color: COLORS.stopStatus.complete,
    });
    allLines.push({
      text: '  All success criteria satisfied with evidence.',
      delay: FINAL_START + 22,
      color: COLORS.textDim,
    });
    allLines.push({
      text: '══════════════════════════════',
      delay: FINAL_START + 28,
      color: COLORS.stopStatus.complete,
    });
  }

  // Compute visible lines
  const visibleLines: { text: string; color?: string; visibleChars: number }[] = [];
  for (const line of allLines) {
    const since = Math.max(0, localFrame - line.delay);
    if (since <= 0) continue;
    // Typewriter effect: ~3 frames per character
    const visibleChars = Math.min(line.text.length, Math.floor(since / 3));
    if (visibleChars > 0) {
      visibleLines.push({ text: line.text, color: line.color, visibleChars });
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: LAYOUT.letterbox,
        right: 0,
        width: '38%',
        height: LAYOUT.contentHeight,
        padding: '20px 16px',
        fontFamily: FONTS.mono,
        fontSize: 11,
        lineHeight: 1.7,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      {/* Evidence pane header */}
      <div
        style={{
          fontFamily: FONTS.mono,
          fontSize: 9,
          letterSpacing: '2px',
          color: COLORS.textMuted,
          textTransform: 'uppercase',
          marginBottom: 12,
          borderBottom: `1px solid ${COLORS.ember}22`,
          paddingBottom: 6,
        }}
      >
        EVIDENCE LEDGER
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        {visibleLines.map((line, i) => {
          const charCount = line.visibleChars;
          const color = line.color ?? COLORS.textDim;
          const text = line.text.slice(0, charCount);
          const cursor = i === visibleLines.length - 1 && charCount < line.text.length;

          return (
            <div key={i} style={{ color, whiteSpace: 'pre-wrap', fontFamily: FONTS.mono }}>
              {text}
              {cursor && <span style={{ color: COLORS.ember }}>▊</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── LiveRun beat ───────────────────────────────────────────────────────────────
import { LAYOUT } from '../theme';

export const LiveRunBeat: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - BEATS.liveRun.start);

  // Determine which role is active
  let activeRole: string | null = null;
  const completedRoles = new Set<string>();
  let handoffIndex = -1;

  for (let i = 0; i < ROLE_FRAMES.length; i++) {
    const rf = ROLE_FRAMES[i];
    if (localFrame >= rf.start && localFrame < rf.end) {
      activeRole = rf.role;
      handoffIndex = i;
    }
    if (localFrame >= rf.end) {
      completedRoles.add(rf.role);
    }
  }

  const finalComplete = localFrame >= FINAL_START;

  // If we're in the final phase, mark all complete
  if (finalComplete) {
    ROLE_FRAMES.forEach((rf) => completedRoles.add(rf.role));
  }

  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.ground }}>
      <FilmGrain />
      <Vignette strength={0.25} />
      {/* Divider line */}
      <div
        style={{
          position: 'absolute',
          top: LAYOUT.letterbox,
          left: '62%',
          width: 1,
          height: LAYOUT.contentHeight,
          background: `linear-gradient(180deg, transparent, ${COLORS.ember}44, transparent)`,
          zIndex: 10,
        }}
      />
      <CouncilRail
        activeRole={activeRole}
        completedRoles={completedRoles}
        finalComplete={finalComplete}
        localFrame={localFrame}
      />
      <EvidencePane
        handoffIndex={handoffIndex}
        localFrame={localFrame}
        finalComplete={finalComplete}
      />
      <Letterbox />
    </div>
  );
};
