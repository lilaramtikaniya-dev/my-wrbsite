'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { CodeEditor } from '@/components/CodeEditor'
import { OutputConsole } from '@/components/OutputConsole'
import { RunResponse } from '@/types'

// ─── Local JS executor (runs in browser, no backend needed) ───────────────
function executeLocally(code: string): RunResponse {
  const start = performance.now()
  const logs: string[] = []
  let hadError = false
  let errorMsg = ''

  const sandboxConsole = {
    log: (...args: unknown[]) => logs.push(args.map(fmt).join(' ')),
    error: (...args: unknown[]) => logs.push('[ERROR] ' + args.map(fmt).join(' ')),
    warn: (...args: unknown[]) => logs.push('[WARN] ' + args.map(fmt).join(' ')),
    info: (...args: unknown[]) => logs.push('[INFO] ' + args.map(fmt).join(' ')),
  }

  function fmt(v: unknown): string {
    if (v === null) return 'null'
    if (v === undefined) return 'undefined'
    if (typeof v === 'string') return v
    if (typeof v === 'function') return '[Function]'
    if (Array.isArray(v)) return JSON.stringify(v)
    if (typeof v === 'object') return JSON.stringify(v, null, 2)
    return String(v)
  }

  try {
    const fn = new Function(
      'console', 'Math', 'Date', 'JSON', 'Array', 'Object', 'String', 'Number', 'Boolean',
      'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'encodeURIComponent', 'decodeURIComponent',
      code
    )
    fn(
      sandboxConsole, Math, Date, JSON, Array, Object, String, Number, Boolean,
      parseInt, parseFloat, isNaN, isFinite, encodeURIComponent, decodeURIComponent
    )
  } catch (err) {
    hadError = true
    errorMsg = (err as Error).toString()
  }

  const elapsed = performance.now() - start

  return {
    success: !hadError,
    output: logs.length > 0 ? logs.join('\n') : hadError ? '' : '// No output',
    error: errorMsg || undefined,
    executionTime: parseFloat(elapsed.toFixed(3)),
    memoryUsed: 256 + code.length * 0.05,
  }
}

export default function PlaygroundPage() {
  const [result, setResult] = useState<RunResponse | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = useCallback(async (code: string) => {
    if (!code.trim()) return
    setIsRunning(true)
    setResult(null)

    // Short delay for UX feel
    await new Promise(r => setTimeout(r, 300))

    try {
      // Try the backend first, fall back to local execution
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      if (apiUrl) {
        try {
          const res = await fetch(`${apiUrl}/api/run`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code }),
            signal: AbortSignal.timeout(5000),
          })
          if (res.ok) {
            const data = await res.json()
            setResult(data)
            return
          }
        } catch {
          // Fall back to local execution
        }
      }
      // Local execution fallback
      setResult(executeLocally(code))
    } finally {
      setIsRunning(false)
    }
  }, [])

  const handleClear = () => setResult(null)

  return (
    <div className="flex flex-col h-screen pt-16 bg-dark-bg">
      {/* Top bar */}
      <div className="shrink-0 px-6 py-3 border-b border-white/10 bg-dark-card/50 backdrop-blur-sm flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-lg">Runtime Playground</h1>
          <p className="text-slate-500 text-xs">Execute JavaScript in the JSForge Runtime</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Runtime Ready
        </div>
      </div>

      {/* Editor + Console */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        {/* Editor panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 min-h-0 lg:w-[58%] border-b lg:border-b-0 lg:border-r border-white/10"
          style={{ minHeight: '50vh' }}
        >
          <CodeEditor onRun={handleRun} isRunning={isRunning} />
        </motion.div>

        {/* Console panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex-1 min-h-0 lg:w-[42%]"
          style={{ minHeight: '40vh' }}
        >
          <OutputConsole result={result} isRunning={isRunning} onClear={handleClear} />
        </motion.div>
      </div>
    </div>
  )
}
