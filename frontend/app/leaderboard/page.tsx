'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Plus, X, RefreshCw } from 'lucide-react'
import { LeaderboardTable } from '@/components/LeaderboardTable'
import { useLeaderboard } from '@/hooks/useLeaderboard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface FormData {
  name: string
  score: string
  runtimeSpeed: string
  testCasesPassed: string
}

const INITIAL_FORM: FormData = { name: '', score: '', runtimeSpeed: '', testCasesPassed: '' }

export default function LeaderboardPage() {
  const { entries, loading, submitScore, clearLeaderboard } = useLeaderboard()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const name = form.name.trim()
    const score = parseInt(form.score)
    const runtimeSpeed = parseFloat(form.runtimeSpeed)
    const testCasesPassed = parseInt(form.testCasesPassed)

    if (!name) { setError('Name is required'); return }
    if (isNaN(score) || score < 0) { setError('Enter a valid score (0–10000)'); return }
    if (isNaN(runtimeSpeed) || runtimeSpeed < 0) { setError('Enter a valid runtime speed (ms)'); return }
    if (isNaN(testCasesPassed) || testCasesPassed < 0) { setError('Enter a valid test count'); return }

    submitScore({ name, score, runtimeSpeed, testCasesPassed })
    setSubmitted(true)
    setForm(INITIAL_FORM)
    setTimeout(() => {
      setSubmitted(false)
      setShowForm(false)
    }, 2500)
  }

  return (
    <div className="min-h-screen pt-20 pb-16 page-transition">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag">
            <Trophy className="w-3.5 h-3.5" /> Global Rankings
          </span>
          <h1 className="text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Leaderboard</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Submit your runtime score and see how you rank against other builders.
          </p>
        </div>

        {/* Top 3 podium */}
        {!loading && entries.length >= 3 && (
          <div className="flex items-end justify-center gap-4 mb-12 flex-wrap">
            {[entries[1], entries[0], entries[2]].map((entry, i) => {
              const heights = ['h-28', 'h-36', 'h-24']
              const labels = ['2nd', '1st', '3rd']
              const colors = ['from-slate-400 to-slate-600', 'from-yellow-400 to-amber-600', 'from-amber-600 to-amber-900']
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="text-sm font-bold text-white">{entry.name}</div>
                  <div className="text-xs text-slate-400 font-mono">{entry.score.toLocaleString()} pts</div>
                  <div className={`w-20 ${heights[i]} rounded-t-xl bg-gradient-to-b ${colors[i]} flex items-end justify-center pb-3`}>
                    <span className="text-white font-black text-lg">{labels[i]}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="text-slate-400 text-sm">
            {entries.length} participant{entries.length !== 1 ? 's' : ''} ranked
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm" onClick={clearLeaderboard}>
              <RefreshCw className="w-3.5 h-3.5" /> Reset Demo
            </Button>
            <Button size="sm" onClick={() => setShowForm(f => !f)}>
              {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              {showForm ? 'Cancel' : 'Submit Score'}
            </Button>
          </div>
        </div>

        {/* Submit form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="glass-card p-6 border-neon-blue/20">
                <h3 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-neon-blue" /> Submit Your Score
                </h3>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6"
                  >
                    <div className="text-4xl mb-3">🎉</div>
                    <div className="text-emerald-400 font-semibold text-lg">Score submitted!</div>
                    <div className="text-slate-400 text-sm mt-1">Check the leaderboard for your rank.</div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Your Name *</label>
                      <Input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Dev"
                        maxLength={50}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Score (0–10000) *</label>
                      <Input
                        name="score"
                        type="number"
                        value={form.score}
                        onChange={handleChange}
                        placeholder="e.g. 8750"
                        min={0}
                        max={10000}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Runtime Speed (ms) *</label>
                      <Input
                        name="runtimeSpeed"
                        type="number"
                        value={form.runtimeSpeed}
                        onChange={handleChange}
                        placeholder="e.g. 18.5"
                        step="0.1"
                        min={0}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Test Cases Passed *</label>
                      <Input
                        name="testCasesPassed"
                        type="number"
                        value={form.testCasesPassed}
                        onChange={handleChange}
                        placeholder="e.g. 42"
                        min={0}
                        max={200}
                      />
                    </div>

                    {error && (
                      <div className="sm:col-span-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
                        {error}
                      </div>
                    )}

                    <div className="sm:col-span-2 flex gap-3 justify-end">
                      <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                      <Button type="submit">
                        <Trophy className="w-4 h-4" /> Submit Score
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <LeaderboardTable entries={entries} loading={loading} />

        <p className="text-center text-slate-600 text-xs mt-6">
          Scores are stored locally in your browser via localStorage.
        </p>
      </div>
    </div>
  )
}
