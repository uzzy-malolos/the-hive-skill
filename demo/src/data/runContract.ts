import type { RunContract } from './types';

export const BUGFIX_CONTRACT: RunContract = {
  goal: 'Fix login form error message display',
  deliverables: ['Error messages visible on invalid credentials', 'Tests for error display behavior'],
  constraints: ['Do not change authentication logic', 'Do not modify API endpoints'],
  exclusions: ['Password reset flow', 'Registration form'],
  successCriteria: [
    'Invalid credentials show error message in the form',
    'Error message disappears on new input',
    'Existing login tests still pass',
  ],
  executionMode: 'standard',
  maximumFixCycles: 2,
  status: 'planning',
};
