'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { LeaderboardEntry, LeaderboardSubmission } from '@/types'

const SEED_DATA: LeaderboardEntry[] = [
  { id: '1', name: 'Alice Dev', score: 9850, runtimeSpeed: 12.3, testCasesPassed: 47, submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(), rank: 1 },
  { id: '2', name: 'Bob Builder', score: 9200, runtimeSpeed: 15.7, testCasesPassed: 44, submittedAt: new Date(Date.now() - 86400000).toISOString(), rank: 2 },
  { id: '3', name: 'Charlie Code', score: 8750, runtimeSpeed: 18.2, testCasesPassed: 41, submittedAt: new Date(Date.now() - 3600000 * 5).toISOString(), rank: 3 },
  { id: '4', name: 'Diana Parse', score: 8100, runtimeSpeed: 22.1, testCasesPassed: 39, submittedAt: new Date(Date.now() - 3600000 * 2).toISOString(), rank: 4 },
  { id: '5', name: 'Ethan AST', score: 7600, runtimeSpeed: 25.4, testCasesPassed: 36, submittedAt: new Date(Date.now() - 1800000).toISOString(), rank: 5 },
]

function rankEntries(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries]
    .sort((a, b) => b.score - a.score)
    .map((e, i) => ({ ...e, rank: i + 1 }))
}

export function useLeaderboard() {
  const [stored, setStored] = useLocalStorage<LeaderboardEntry[]>('jsforge-leaderboard', SEED_DATA)
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setEntries(rankEntries(stored))
    setLoading(false)
  }, [stored])

  const submitScore = useCallback((submission: LeaderboardSubmission) => {
    const newEntry: LeaderboardEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      ...submission,
      submittedAt: new Date().toISOString(),
    }
    setStored(prev => rankEntries([...prev, newEntry]))
    return newEntry
  }, [setStored])

  const clearLeaderboard = useCallback(() => {
    setStored(SEED_DATA)
  }, [setStored])

  return { entries, loading, submitScore, clearLeaderboard }
}
