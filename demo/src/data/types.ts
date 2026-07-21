export type RoleId = 'queen' | 'scout' | 'architect' | 'forger' | 'sentinel' | 'scribe';
export type StopStatus = 'complete' | 'partial' | 'blocked' | 'failed';
export type Confidence = 'high' | 'medium' | 'low';

export interface Handoff {
  role: RoleId;
  status: 'complete' | 'blocked' | 'failed' | 'needs_approval';
  summary: string;
  findings: Array<{ statement: string; evidence: string; confidence: Confidence }>;
  filesExamined?: string[];
  filesChanged?: string[];
  commandsRun?: Array<{ command: string; result: string; outputSummary?: string }>;
  verdict?: string;
  risks?: Array<{ description: string; severity: string }>;
}

export interface RunContract {
  goal: string;
  deliverables: string[];
  constraints: string[];
  exclusions: string[];
  successCriteria: string[];
  executionMode: string;
  maximumFixCycles: number;
  status: string;
}
