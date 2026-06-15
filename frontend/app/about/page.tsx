import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import { Zap, Target, Users, Map, Github, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About JSForge Runtime — hackathon project, team, goals, and roadmap.',
}

const goals = [
  { icon: '🎓', title: 'Education First', desc: 'Demystify JavaScript engines through a clean, readable C++ implementation.' },
  { icon: '🔍', title: 'Transparency', desc: 'Every part of the runtime is documented and visible — no black boxes.' },
  { icon: '🚀', title: 'Performance', desc: 'Despite being educational, JSForge aims for sub-50ms execution on typical programs.' },
  { icon: '🌐', title: 'Accessibility', desc: 'Run JS in the browser with our playground — no installation needed.' },
]

const team = [
  { name: 'Team Member 1', role: 'Lead Developer — Lexer & Parser', avatar: 'TM', color: 'from-neon-blue to-neon-purple' },
  { name: 'Team Member 2', role: 'Interpreter & Stdlib', avatar: 'TM', color: 'from-neon-purple to-neon-pink' },
  { name: 'Team Member 3', role: 'Web Platform & Design', avatar: 'TM', color: 'from-emerald-400 to-neon-blue' },
]

const roadmap = [
  { q: 'Q3 2024', title: 'Core Runtime', items: ['Lexer', 'Parser', 'Basic AST', 'Arithmetic expressions'], done: true },
  { q: 'Q4 2024', title: 'Full Language', items: ['All statement types', 'Closures', 'Arrays & Objects', 'Standard Library'], done: true },
  { q: 'Q1 2025', title: 'Web Platform', items: ['Monaco playground', 'Documentation', 'Architecture diagrams', 'Leaderboard'], done: true },
  { q: 'Q2 2025', title: 'Optimizations', items: ['Bytecode compiler', 'Basic GC', 'Performance benchmarks', 'Class syntax'], done: false },
  { q: 'Q3 2025', title: 'Advanced JS', items: ['Promises & async/await', 'Generators', 'Proxy & Reflect', 'WeakMap/WeakSet'], done: false },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-16 page-transition">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* Hero */}
        <div className="text-center">
          <span className="section-tag">Hackathon 2024</span>
          <h1 className="text-5xl font-bold text-white mb-6">
            About <span className="gradient-text">JSForge Runtime</span>
          </h1>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            JSForge Runtime is a hackathon project where we built a complete JavaScript interpreter from scratch in C++. The goal: understand exactly how JavaScript engines work — no V8, no Node.js, just pure C++ and determination.
          </p>
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            <Button asChild>
              <Link href="/playground">
                <Zap className="w-4 h-4" /> Try the Runtime
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" /> View on GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
          </div>
        </div>

        {/* Hackathon info */}
        <div className="glass-card p-10 border-neon-blue/20">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                The <span className="gradient-text">Challenge</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                Build a functional JavaScript Runtime in C++ within the hackathon timeframe. The runtime must accept JS code as input and execute it, supporting real language features.
              </p>
              <div className="space-y-3">
                {[
                  'Implement a full lexer and tokenizer',
                  'Write a recursive descent parser',
                  'Build an AST with 30+ node types',
                  'Create a tree-walking interpreter',
                  'Implement the JavaScript standard library',
                  'Build a web playground to showcase it',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full bg-neon-blue/20 border border-neon-blue/40 flex items-center justify-center shrink-0">
                      <span className="text-neon-blue text-xs">✓</span>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Lines of C++', value: '3,000+' },
                { label: 'JS Features', value: '50+' },
                { label: 'Test Cases', value: '120+' },
                { label: 'Build Time', value: '4 Weeks' },
              ].map(({ label, value }) => (
                <div key={label} className="glass-card p-5 text-center border-white/5">
                  <div className="text-3xl font-black gradient-text mb-1">{value}</div>
                  <div className="text-slate-500 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Goals */}
        <div>
          <div className="text-center mb-10">
            <span className="section-tag"><Target className="w-3.5 h-3.5" /> Mission</span>
            <h2 className="text-3xl font-bold text-white">Project <span className="gradient-text">Goals</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {goals.map(({ icon, title, desc }) => (
              <div key={title} className="glass-card p-6 flex gap-5 items-start hover:-translate-y-1 transition-transform duration-200">
                <div className="text-3xl shrink-0">{icon}</div>
                <div>
                  <h3 className="text-white font-semibold mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="text-center mb-10">
            <span className="section-tag"><Users className="w-3.5 h-3.5" /> The Team</span>
            <h2 className="text-3xl font-bold text-white">Meet the <span className="gradient-text">Builders</span></h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {team.map(({ name, role, avatar, color }, i) => (
              <div key={i} className="glass-card p-8 text-center hover:-translate-y-1 transition-transform duration-200">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-2xl font-black mx-auto mb-5`}>
                  {avatar}
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{name}</h3>
                <p className="text-slate-500 text-sm">{role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div id="roadmap">
          <div className="text-center mb-10">
            <span className="section-tag"><Map className="w-3.5 h-3.5" /> Future Plans</span>
            <h2 className="text-3xl font-bold text-white">Development <span className="gradient-text">Roadmap</span></h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-transparent" />
            <div className="space-y-6">
              {roadmap.map(({ q, title, items, done }) => (
                <div key={q} className="relative flex gap-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${done ? 'bg-neon-blue/10 border-neon-blue/30' : 'bg-white/5 border-white/10'}`}>
                    <span className={`text-xs ${done ? 'text-neon-blue' : 'text-slate-500'}`}>{done ? '✓' : '○'}</span>
                  </div>
                  <div className={`glass-card flex-1 p-5 border ${done ? 'border-neon-blue/20' : 'border-white/5 opacity-70'}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${done ? 'text-neon-blue border-neon-blue/30 bg-neon-blue/10' : 'text-slate-500 border-white/10 bg-white/5'}`}>{q}</span>
                      <h3 className="text-white font-semibold">{title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map(item => (
                        <span key={item} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-full text-slate-400">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
