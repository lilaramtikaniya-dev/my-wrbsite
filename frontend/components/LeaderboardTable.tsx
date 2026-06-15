'use client'

import { motion } from 'framer-motion'
import { Trophy, Medal, Award, Clock, CheckCircle2, ChevronUp, ChevronDown, Minus } from 'lucide-react'
import { LeaderboardEntry } from '@/types'
import { formatTime, timeAgo } from '@/lib/utils'

interface Props {
  entries: LeaderboardEntry[]
  loading?: boolean
}

const RankBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
      <Trophy className="w-4 h-4 text-white" />
    </div>
  )
  if (rank === 2) return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center">
      <Medal className="w-4 h-4 text-white" />
    </div>
  )
  if (rank === 3) return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-600 to-amber-900 flex items-center justify-center">
      <Award className="w-4 h-4 text-white" />
    </div>
  )
  return (
    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
      <span className="text-slate-400 text-sm font-bold">#{rank}</span>
    </div>
  )
}

const SkeletonRow = () => (
  <tr>
    {[...Array(6)].map((_, i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 rounded shimmer bg-white/5" style={{ width: `${60 + Math.random() * 40}%` }} />
      </td>
    ))}
  </tr>
)

export function LeaderboardTable({ entries, loading = false }: Props) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                <div className="flex items-center justify-end gap-1">
                  <Clock className="w-3 h-3" /> Speed
                </div>
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                <div className="flex items-center justify-end gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Tests
                </div>
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {loading
              ? [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
              : entries.map((entry, i) => (
                <motion.tr
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className={`hover:bg-white/[0.03] transition-colors duration-150 ${
                    entry.rank === 1 ? 'rank-1' :
                    entry.rank === 2 ? 'rank-2' :
                    entry.rank === 3 ? 'rank-3' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <RankBadge rank={entry.rank ?? i + 1} />
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${
                      entry.rank === 1 ? 'text-yellow-400' :
                      entry.rank === 2 ? 'text-slate-300' :
                      entry.rank === 3 ? 'text-amber-600' : 'text-white'
                    }`}>
                      {entry.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-mono font-bold gradient-text text-lg">
                      {entry.score.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right hidden sm:table-cell">
                    <span className="font-mono text-neon-blue text-sm">{entry.runtimeSpeed}ms</span>
                  </td>
                  <td className="px-6 py-4 text-right hidden md:table-cell">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-white/10 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple"
                          style={{ width: `${Math.min((entry.testCasesPassed / 50) * 100, 100)}%` }}
                        />
                      </div>
                      <span className="text-slate-400 text-sm font-mono">{entry.testCasesPassed}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right hidden lg:table-cell">
                    <span className="text-slate-500 text-xs">{timeAgo(entry.submittedAt)}</span>
                  </td>
                </motion.tr>
              ))
            }
          </tbody>
        </table>

        {!loading && entries.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No entries yet. Be the first to submit!</p>
          </div>
        )}
      </div>
    </div>
  )
}
