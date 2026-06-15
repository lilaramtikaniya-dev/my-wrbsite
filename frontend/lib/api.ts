import { RunResponse, LeaderboardEntry, LeaderboardSubmission } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || `HTTP ${res.status}`)
  }
  return res.json()
}

// ─── Run API ───────────────────────────────────────────────────────────────
export async function runCode(code: string): Promise<RunResponse> {
  return request<RunResponse>('/api/run', {
    method: 'POST',
    body: JSON.stringify({ code }),
  })
}

// ─── Leaderboard API ────────────────────────────────────────────────────────
export async function fetchLeaderboard(): Promise<{ entries: LeaderboardEntry[]; total: number }> {
  return request('/api/leaderboard')
}

export async function submitScore(data: LeaderboardSubmission): Promise<{ entry: LeaderboardEntry }> {
  return request('/api/leaderboard', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// ─── Health check ───────────────────────────────────────────────────────────
export async function checkHealth(): Promise<{ status: string }> {
  return request('/health')
}
