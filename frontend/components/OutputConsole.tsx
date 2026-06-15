'use client'

import { useRef } from 'react'
import { cn, formatTime, formatMemory } from '@/lib/utils'
import { Terminal, CheckCircle2, XCircle, Clock, Cpu, Copy, Trash2 } from 'lucide-react'
import { RunResponse } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  result: RunResponse | null
  isRunning: boolean
  onClear: () => void
}

export function OutputConsole({ result, isRunning, onClear }: Props) {
  const handleCopy = () => {
    if (result?.output) navigator.clipboard.writeText(result.output)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Console header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-neon-blue" />
          <span className="text-sm font-medium text-slate-300">Output Console</span>
        </div>
        <div className="flex items-center gap-2">
          {result && (
            <button
              onClick={handleCopy}
              className="p-1.5 rounded text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors"
              title="Copy output"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={onClear}
            className="p-1.5 rounded text-slate-500 hover:text-red-400 hover:bg-red-400/5 transition-colors"
            title="Clear output"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Output area */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm bg-[#000d1a] min-h-0">
        <AnimatePresence mode="wait">
          {isRunning && (
            <motion.div
              key="running"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 text-neon-blue"
            >
              <span className="flex gap-1">
                {[0, 1, 2].map(i => (
                  <span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-neon-blue"
                    style={{ animation: `pulse 0.8s ease-in-out ${i * 0.2}s infinite` }}
                  />
                ))}
              </span>
              <span className="text-xs">Executing...</span>
            </motion.div>
          )}

          {!isRunning && !result && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-slate-600 text-xs"
            >
              <span className="text-slate-700">$</span> Run your code to see output here...
            </motion.div>
          )}

          {!isRunning && result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Prompt line */}
              <div className="text-slate-600 mb-2 text-xs">
                <span className="text-neon-blue">❯</span> jsforge run playground.js
              </div>

              {result.success ? (
                <pre className="text-emerald-400 whitespace-pre-wrap break-words leading-6">
                  {result.output}
                </pre>
              ) : (
                <div>
                  <div className="text-red-400 font-semibold mb-1 flex items-center gap-2">
                    <XCircle className="w-3.5 h-3.5" /> Runtime Error
                  </div>
                  <pre className="text-red-300 whitespace-pre-wrap break-words leading-6 text-xs">
                    {result.error}
                  </pre>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats bar */}
      <div className="shrink-0 px-4 py-2.5 bg-[#000d1a] border-t border-white/5 flex items-center gap-6">
        {result ? (
          <>
            <div className={cn(
              'flex items-center gap-1.5 text-xs',
              result.success ? 'text-emerald-400' : 'text-red-400'
            )}>
              {result.success
                ? <CheckCircle2 className="w-3 h-3" />
                : <XCircle className="w-3 h-3" />}
              {result.success ? 'Success' : 'Error'}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3 h-3" />
              {result.executionTime}ms
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Cpu className="w-3 h-3" />
              {formatMemory(result.memoryUsed)}
            </div>
          </>
        ) : (
          <span className="text-xs text-slate-700 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            Ready
          </span>
        )}
      </div>
    </div>
  )
}
