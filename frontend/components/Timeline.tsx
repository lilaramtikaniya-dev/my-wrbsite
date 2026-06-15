'use client'

import { motion } from 'framer-motion'

const events = [
  {
    phase: 'Phase 1',
    title: 'Lexer Implementation',
    desc: 'Built the tokenizer that breaks JS source code into tokens. Supports all JS token types: keywords, identifiers, operators, literals.',
    date: 'Week 1',
    status: 'done',
    color: 'neon-blue',
  },
  {
    phase: 'Phase 2',
    title: 'Parser & AST',
    desc: 'Recursive descent parser that transforms tokens into an Abstract Syntax Tree (AST). Handles expressions, statements, and declarations.',
    date: 'Week 2',
    status: 'done',
    color: 'neon-purple',
  },
  {
    phase: 'Phase 3',
    title: 'Tree-Walking Interpreter',
    desc: 'AST interpreter that evaluates nodes recursively. Implements scoping, closures, function calls, and control flow.',
    date: 'Week 3',
    status: 'done',
    color: 'neon-pink',
  },
  {
    phase: 'Phase 4',
    title: 'Standard Library',
    desc: 'Built-in Math, Date, Array methods (map, filter, reduce), String methods, and console.log support.',
    date: 'Week 4',
    status: 'done',
    color: 'emerald-400',
  },
  {
    phase: 'Phase 5',
    title: 'Web Playground',
    desc: 'This website — a live playground powered by the runtime, with documentation, architecture diagrams, and a leaderboard.',
    date: 'Hackathon',
    status: 'current',
    color: 'cyber-yellow',
  },
  {
    phase: 'Phase 6',
    title: 'Optimizations',
    desc: 'Planned: bytecode compilation, garbage collection, and performance benchmarking against V8.',
    date: 'Future',
    status: 'upcoming',
    color: 'slate-500',
  },
]

export function Timeline() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">Development Journey</span>
          <h2 className="text-4xl font-bold text-white">
            From Zero to <span className="gradient-text">Runtime</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-transparent" />

          <div className="space-y-8">
            {events.map(({ phase, title, desc, date, status, color }, i) => (
              <motion.div
                key={phase}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex gap-8"
              >
                {/* Dot */}
                <div className="relative flex-shrink-0">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${
                    status === 'done' ? 'bg-neon-blue/10 border-neon-blue/30' :
                    status === 'current' ? 'bg-cyber-yellow/10 border-cyber-yellow/30 animate-pulse-glow' :
                    'bg-white/5 border-white/10'
                  }`}>
                    <span className={`text-xs font-bold ${
                      status === 'done' ? 'text-neon-blue' :
                      status === 'current' ? 'text-cyber-yellow' : 'text-slate-500'
                    }`}>
                      {status === 'done' ? '✓' : status === 'current' ? '▶' : '○'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={`glass-card flex-1 p-6 ${
                  status === 'current' ? 'border-cyber-yellow/30' :
                  status === 'done' ? 'border-neon-blue/20' : 'border-white/5 opacity-60'
                } mb-2`}>
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
                    <div>
                      <span className="text-xs text-slate-500 font-mono">{phase}</span>
                      <h3 className="text-white font-semibold text-lg">{title}</h3>
                    </div>
                    <span className={`text-xs font-mono px-3 py-1 rounded-full ${
                      status === 'done' ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20' :
                      status === 'current' ? 'bg-cyber-yellow/10 text-cyber-yellow border border-cyber-yellow/20' :
                      'bg-white/5 text-slate-500 border border-white/10'
                    }`}>{date}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
