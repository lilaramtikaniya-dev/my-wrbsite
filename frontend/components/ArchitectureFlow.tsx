'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const STAGES = [
  {
    id: 'source',
    label: 'Source Code',
    sublabel: 'JavaScript',
    color: '#64748b',
    glow: 'rgba(100,116,139,0.3)',
    icon: '{ }',
    desc: 'Raw JavaScript source code written by the developer',
    example: 'let x = 5 + 3;',
  },
  {
    id: 'lexer',
    label: 'Lexer',
    sublabel: 'Tokenizer',
    color: '#00d4ff',
    glow: 'rgba(0,212,255,0.3)',
    icon: '⚡',
    desc: 'Breaks source code into tokens: keywords, identifiers, operators, literals',
    example: '[LET] [IDENT "x"] [EQ] [NUM 5] [PLUS] [NUM 3] [SEMI]',
  },
  {
    id: 'parser',
    label: 'Parser',
    sublabel: 'Syntax Analysis',
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.3)',
    icon: '🔍',
    desc: 'Transforms token stream into grammatical structures using recursive descent',
    example: 'VarDecl → BinExpr → [Literal(5), Literal(3)]',
  },
  {
    id: 'ast',
    label: 'AST',
    sublabel: 'Abstract Syntax Tree',
    color: '#f0abfc',
    glow: 'rgba(240,171,252,0.3)',
    icon: '🌲',
    desc: 'Tree representation of the program structure — each node is a language construct',
    example: '{ type: "VarDecl", id: "x", init: { type: "BinExpr", op: "+", left: 5, right: 3 } }',
  },
  {
    id: 'interpreter',
    label: 'Interpreter',
    sublabel: 'Tree Walker',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.3)',
    icon: '▶',
    desc: 'Recursively evaluates AST nodes, maintaining scope and executing statements',
    example: 'eval(BinExpr) → 5 + 3 = 8 → store in env["x"]',
  },
  {
    id: 'output',
    label: 'Output',
    sublabel: 'Result',
    color: '#fbbf24',
    glow: 'rgba(251,191,36,0.3)',
    icon: '✓',
    desc: 'Final execution result returned to the user',
    example: 'x = 8\n> 8',
  },
]

export function ArchitectureFlow() {
  const [activeStage, setActiveStage] = useState<string | null>(null)

  const active = STAGES.find(s => s.id === activeStage)

  return (
    <div className="space-y-12">
      {/* Flow diagram */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-0 flex-wrap lg:flex-nowrap">
        {STAGES.map((stage, i) => (
          <div key={stage.id} className="flex flex-col lg:flex-row items-center">
            {/* Stage box */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)}
              className="relative flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border transition-all duration-300 cursor-pointer min-w-[110px]"
              style={{
                borderColor: activeStage === stage.id ? stage.color : 'rgba(255,255,255,0.1)',
                background: activeStage === stage.id
                  ? `${stage.glow.replace('0.3', '0.08')}`
                  : 'rgba(255,255,255,0.03)',
                boxShadow: activeStage === stage.id ? `0 0 24px ${stage.glow}` : 'none',
              }}
            >
              <div
                className="text-2xl font-mono w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${stage.glow}`, color: stage.color }}
              >
                {stage.icon}
              </div>
              <div>
                <div className="text-white text-xs font-bold text-center">{stage.label}</div>
                <div className="text-slate-500 text-[10px] text-center">{stage.sublabel}</div>
              </div>

              {/* Animated dot */}
              {activeStage === stage.id && (
                <motion.div
                  layoutId="active-dot"
                  className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full"
                  style={{ background: stage.color }}
                />
              )}
            </motion.button>

            {/* Arrow */}
            {i < STAGES.length - 1 && (
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                className="flex items-center justify-center mx-1 lg:mx-2 my-3 lg:my-0"
              >
                {/* Animated arrow */}
                <svg width="40" height="20" viewBox="0 0 40 20" className="lg:block hidden">
                  <defs>
                    <linearGradient id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={STAGES[i].color} stopOpacity="0.6" />
                      <stop offset="100%" stopColor={STAGES[i + 1].color} stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="10" x2="32" y2="10" stroke={`url(#grad-${i})`} strokeWidth="1.5" />
                  <polygon points="32,6 40,10 32,14" fill={STAGES[i + 1].color} opacity="0.6" />
                  {/* Animated dot on line */}
                  <circle r="3" fill={STAGES[i].color}>
                    <animateMotion dur="1.5s" repeatCount="indefinite" path="M0,10 L32,10" />
                  </circle>
                </svg>
                {/* Mobile: down arrow */}
                <svg width="20" height="40" viewBox="0 0 20 40" className="lg:hidden block">
                  <line x1="10" y1="0" x2="10" y2="32" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.5" />
                  <polygon points="6,32 10,40 14,32" fill="#8b5cf6" opacity="0.5" />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0, height: active ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 border"
            style={{ borderColor: `${active.color}40` }}
          >
            <div className="flex items-start gap-5 flex-wrap">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                style={{ background: active.glow.replace('0.3', '0.12'), color: active.color }}
              >
                {active.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-xl mb-1">{active.label}</h3>
                <p className="text-slate-400 mb-4">{active.desc}</p>
                <div className="code-block text-xs">{active.example}</div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {!activeStage && (
        <p className="text-center text-slate-500 text-sm">
          Click on any stage above to explore what it does
        </p>
      )}
    </div>
  )
}
