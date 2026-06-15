import { v4 as uuidv4 } from 'uuid';
import { LeaderboardEntry, LeaderboardSubmission } from '../types';

// ─── In-memory leaderboard store ──────────────────────────────────────────
let leaderboardStore: LeaderboardEntry[] = [
  {
    id: uuidv4(),
    name: 'Alice Dev',
    score: 9850,
    runtimeSpeed: 12.3,
    testCasesPassed: 47,
    submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    rank: 1,
  },
  {
    id: uuidv4(),
    name: 'Bob Builder',
    score: 9200,
    runtimeSpeed: 15.7,
    testCasesPassed: 44,
    submittedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    rank: 2,
  },
  {
    id: uuidv4(),
    name: 'Charlie Code',
    score: 8750,
    runtimeSpeed: 18.2,
    testCasesPassed: 41,
    submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    rank: 3,
  },
  {
    id: uuidv4(),
    name: 'Diana Parse',
    score: 8100,
    runtimeSpeed: 22.1,
    testCasesPassed: 39,
    submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    rank: 4,
  },
  {
    id: uuidv4(),
    name: 'Ethan AST',
    score: 7600,
    runtimeSpeed: 25.4,
    testCasesPassed: 36,
    submittedAt: new Date(Date.now() - 1800000).toISOString(),
    rank: 5,
  },
];

function recalculateRanks(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return entries
    .sort((a, b) => b.score - a.score)
    .map((entry, idx) => ({ ...entry, rank: idx + 1 }));
}

export function getAllEntries(): LeaderboardEntry[] {
  return recalculateRanks(leaderboardStore);
}

export function addEntry(submission: LeaderboardSubmission): LeaderboardEntry {
  const newEntry: LeaderboardEntry = {
    id: uuidv4(),
    ...submission,
    submittedAt: new Date().toISOString(),
  };

  leaderboardStore.push(newEntry);
  leaderboardStore = recalculateRanks(leaderboardStore);

  return leaderboardStore.find(e => e.id === newEntry.id)!;
}

export function getTopEntries(limit = 50): LeaderboardEntry[] {
  return recalculateRanks(leaderboardStore).slice(0, limit);
}
