'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Code2, BookOpen, Play, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AnimatedGradient } from '@/components/AnimatedGradient'
import { useState, useEffect } from 'react'

const CODE_SNIPPETS = [
  `// JSForge Runtime Demo
let message = "Hello, World!";
console.log(message);

const add = (a, b) => a + b;
console.log(add(42, 8)); // 50`,

  `// Array Operations
const nums = [1, 2, 3, 4, 5];
const doubled = nums.map(n => n * 2);
const evens = doubled.filter(n => n % 4 === 0);
console.log(evens); // [4, 8]`,

  `// Closures & HOF
function counter() {
  let count = 0;
  return () => ++count;
}
const tick = counter();
console.log(tick(), tick(), tick());`,
]

function AnimatedCodePreview() {
  const [snippetIdx, setSnippetIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [charIdx, setCharIdx] = useState(0)

  const currentSnippet = CODE_SNIPPETS[snippetIdx]

  useEffect(() => {
    if (charIdx < currentSnippet.length) {
      const t = setTimeout(() => {
        setDisplayed(currentSnippet.slice(0, charIdx + 1))
        setCharIdx(i => i + 1)
      }, 18)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setSnippetIdx(i => (i + 1) % CODE_SNIPPETS.length)
        setDisplayed('')
        setCharIdx(0)
      }, 3000)
      return () => clearTimeout(t)
    }
  }, [charIdx, currentSnippet, snippetIdx])

  return (
    <div className="relative">
      {/* Window chrome */}
      <div className="glass-card overflow-hidden border-neon-blue/20 shadow-neon-blue">
        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <span className="ml-3 text-xs text-slate-500 font-mono">playground.js — JSForge Runtime</span>
        </div>
        <div className="p-5 min-h-[180px] font-mono text-sm leading-6">
          <pre className="text-slate-300 whitespace-pre-wrap">
            {displayed.split('\n').map((line, i) => (
              <div key={i} className="flex">
                <span className="text-slate-600 select-none w-6 text-right mr-4 shrink-0 text-xs leading-6">
                  {i + 1}
                </span>
                <span>
                  {line.split(/(\b(let|const|var|function|return|if|else|for|while|console|log|map|filter|=>)\b|"[^"]*"|'[^']*'|\/\/.*$|\d+)/g)
                    .map((tok, j) => {
                      if (/^(let|const|var|function|return|if|else|for|while)$/.test(tok)) return <span key={j} className="token-keyword">{tok}</span>
                      if (/^".*"$|^'.*'$/.test(tok)) return <span key={j} className="token-string">{tok}</span>
                      if (/^\d+$/.test(tok)) return <span key={j} className="token-number">{tok}</span>
                      if (/^\/\//.test(tok)) return <span key={j} className="token-comment">{tok}</span>
                      if (/^(console|log|map|filter)$/.test(tok)) return <span key={j} className="token-function">{tok}</span>
                      if (tok === '=>') return <span key={j} className="token-operator">{tok}</span>
                      return <span key={j}>{tok}</span>
                    })}
                </span>
              </div>
            ))}
            <span className="inline-block w-0.5 h-4 bg-neon-blue animate-blink ml-0.5" />
          </pre>
        </div>
        <div className="px-5 py-3 bg-white/[0.02] border-t border-white/5 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-slate-500 font-mono">JSForge Runtime v1.0 • Ready</span>
        </div>
      </div>
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <AnimatedGradient />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="section-tag">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
                Hackathon Project 2024
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6"
            >
              Build{' '}
              <span className="gradient-text">JavaScript</span>
              <br />
              From Scratch
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-slate-400 leading-relaxed mb-8 max-w-lg"
            >
              An educational JavaScript Runtime built entirely in C++. Explore every layer — from lexer to interpreter — and test your code live.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/playground">
                  <Play className="w-5 h-5" />
                  Try Runtime
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/docs">
                  <BookOpen className="w-5 h-5" />
                  View Documentation
                </Link>
              </Button>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-white/10"
            >
              {[
                { label: 'Runtime Speed', value: '< 50ms' },
                { label: 'Supported Features', value: '50+' },
                { label: 'Test Cases', value: '120+' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xl font-bold gradient-text">{value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Code preview */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="animate-float"
          >
            <AnimatedCodePreview />

            {/* Decorative badges */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-6 top-12 glass-card px-3 py-2 text-xs font-mono hidden lg:flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
              <span className="text-neon-blue">Lexer</span>
              <span className="text-slate-500">→ 12 tokens</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="absolute -left-6 bottom-12 glass-card px-3 py-2 text-xs font-mono hidden lg:flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400">Output</span>
              <span className="text-slate-500">0.43ms</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
