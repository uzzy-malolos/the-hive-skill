import type { RoleId } from './types';

export interface RoleInfo {
  id: RoleId;
  name: string;
  emoji: string;
  accent: string;
  mandate: string;
  order: number;
}

export const ROLES: RoleInfo[] = [
  { id: 'queen', name: 'Queen', emoji: '👑', accent: '#F6A623', mandate: 'Orchestrates the council, classifies tasks, manages progress', order: 0 },
  { id: 'scout', name: 'Scout', emoji: '🔍', accent: '#22D3EE', mandate: 'Maps repository, analyzes change impact, detects contradictions', order: 1 },
  { id: 'architect', name: 'Architect', emoji: '📐', accent: '#A78BFA', mandate: 'Creates executable plans, classifies risk, assigns scope', order: 2 },
  { id: 'forger', name: 'Forger', emoji: '⚒️', accent: '#FB923C', mandate: 'Implements within scope, runs incremental checks', order: 3 },
  { id: 'sentinel', name: 'Sentinel', emoji: '🛡️', accent: '#4ADE80', mandate: 'Validates across layers, verifies claims, returns verdict', order: 4 },
  { id: 'scribe', name: 'Scribe', emoji: '📜', accent: '#60A5FA', mandate: 'Synchronizes documentation, prepares release evidence', order: 5 },
];
