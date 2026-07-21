import type { Handoff } from './types';

export const BUGFIX_HANDOFFS: Handoff[] = [
  {
    role: 'queen',
    status: 'complete',
    summary: 'Established run contract, activated standard preset',
    findings: [
      { statement: 'Task classified as bugfix — standard preset selected', evidence: 'Council protocol run contract', confidence: 'high' },
      { statement: 'Maximum fix cycles set to 2', evidence: 'Constraint match', confidence: 'high' },
    ],
  },
  {
    role: 'scout',
    status: 'complete',
    summary: 'Examined login component, identified root cause',
    findings: [
      { statement: 'Error state exists but is not rendered in the JSX', evidence: 'Code inspection of LoginForm.tsx', confidence: 'high' },
      { statement: 'Related test file found with partial coverage', evidence: 'LoginForm.test.tsx exists', confidence: 'medium' },
    ],
    filesExamined: ['src/components/LoginForm.tsx', 'src/components/LoginForm.test.tsx'],
  },
  {
    role: 'architect',
    status: 'complete',
    summary: 'Designed minimal fix with low-risk plan',
    findings: [
      { statement: 'Add error message JSX block to login form component', evidence: 'Design decision for minimal diff', confidence: 'high' },
      { statement: 'Update test assertions for error display and dismissal', evidence: 'Existing test pattern', confidence: 'medium' },
    ],
    risks: [{ description: 'UI-only change — no auth logic touched', severity: 'low' }],
  },
  {
    role: 'forger',
    status: 'complete',
    summary: 'Implemented fix — 2 files changed, all tests pass',
    findings: [
      { statement: 'Error message rendering with conditional visibility', evidence: 'npm test -- LoginForm → passed', confidence: 'high' },
      { statement: 'Test for error display and dismissal', evidence: 'npm test -- LoginForm → passed', confidence: 'high' },
    ],
    filesChanged: ['src/components/LoginForm.tsx', 'src/components/LoginForm.test.tsx'],
    commandsRun: [{ command: 'npm test -- LoginForm', result: 'passed', outputSummary: 'All assertions pass' }],
  },
  {
    role: 'sentinel',
    status: 'complete',
    summary: 'Multi-layer validation — PASS verdict',
    findings: [
      { statement: 'No lint or type errors', evidence: 'Static analysis', confidence: 'high' },
      { statement: 'npm test — 15 passed, 0 failed', evidence: 'Full test suite', confidence: 'high' },
      { statement: 'Renders error, dismisses on input, no regression', evidence: 'Behavioral verification', confidence: 'high' },
      { statement: 'No secrets, no scope violations', evidence: 'Safety check', confidence: 'high' },
    ],
    verdict: 'PASS',
  },
  {
    role: 'scribe',
    status: 'complete',
    summary: 'Fix documented — no README or changelog update needed',
    findings: [
      { statement: 'Change is internal UI fix — no API or config surface affected', evidence: 'Architect scope definition', confidence: 'high' },
    ],
  },
];
