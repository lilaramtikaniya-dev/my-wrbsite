import type { Metadata } from 'next'
import { ArchitectureFlow } from '@/components/ArchitectureFlow'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Architecture',
  description: 'Interactive architecture diagram showing the JSForge Runtime pipeline: Lexer → Parser → AST → Interpreter.',
}

const details = [
  {
    step: '01',
    title: 'Source Code',
    color: '#64748b',
    desc: 'Developer writes JavaScript code. The runtime receives it as a raw string.',
    facts: ['Any valid JS syntax', 'Multi-line support', 'UTF-8 encoded'],
  },
  {
    step: '02',
    title: 'Lexer',
    color: '#00d4ff',
    desc: 'Scans characters sequentially, recognizing patterns and emitting typed tokens.',
    facts: ['Linear O(n) scan', 'Regex-free, hand-coded', '8 token categories'],
  },
  {
    step: '03',
    title: 'Parser',
    color: '#8b5cf6',
    desc: 'Reads tokens and applies grammar rules to produce a structured AST.',
    facts: ['Recursive descent', 'Pratt for expressions', 'Error recovery'],
  },
  {
    step: '04',
    title: 'AST',
    color: '#f0abfc',
    desc: 'A typed tree where each node represents one language construct.',
    facts: ['30+ node types', 'Fully typed in C++', 'Serializable to JSON'],
  },
  {
    step: '05',
    title: 'Interpreter',
    color: '#34d399',
    desc: 'Tree-walks the AST, evaluating nodes and managing environments.',
    facts: ['Environment chain', 'Closure support', 'Built-in stdlib'],
  },
  {
    step: '06',
    title: 'Output',
    color: '#fbbf24',
    desc: 'Execution results, console output, and any errors returned to the user.',
    facts: ['Structured result', 'Error line info', 'Execution timing'],
  },
]

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen pt-20 pb-16 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-tag">How it works</span>
          <h1 className="text-5xl font-bold text-white mb-4">
            Runtime <span className="gradient-text">Architecture</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            From a raw string of JavaScript to executed output — every step visualized. Click any stage to explore its role.
          </p>
        </div>

        {/* Interactive flow */}
        <div className="glass-card p-8 mb-16">
          <ArchitectureFlow />
        </div>

        {/* Detail cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {details.map(({ step, title, color, desc, facts }) => (
            <div
              key={step}
              className="glass-card p-6 border transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: `${color}30` }}
            >
              <div className="flex items-start justify-between mb-4">
                <span
                  className="text-xs font-mono font-bold px-2 py-1 rounded border"
                  style={{ color, borderColor: `${color}40`, background: `${color}10` }}
                >
                  STEP {step}
                </span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2" style={{ color }}>{title}</h3>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{desc}</p>
              <div className="space-y-1.5">
                {facts.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                    <span style={{ color }}>▸</span> {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Data flow diagram (SVG) */}
        <div className="mt-16 glass-card p-8 border-neon-purple/20">
          <h2 className="text-xl font-bold text-white mb-8 text-center">Data Flow in Memory</h2>
          <div className="overflow-x-auto">
            <svg viewBox="0 0 800 200" className="w-full max-w-3xl mx-auto block" style={{ minWidth: '600px' }}>
              <defs>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
                <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill="#8b5cf6" opacity="0.7" />
                </marker>
              </defs>

              {/* Main flow line */}
              <line x1="60" y1="100" x2="740" y2="100" stroke="url(#flowGrad)" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />

              {/* Boxes */}
              {[
                { x: 20, label: 'Source', color: '#64748b' },
                { x: 160, label: 'Tokens', color: '#00d4ff' },
                { x: 300, label: 'Parse', color: '#8b5cf6' },
                { x: 440, label: 'AST', color: '#f0abfc' },
                { x: 580, label: 'Eval', color: '#34d399' },
                { x: 700, label: 'Output', color: '#fbbf24' },
              ].map(({ x, label, color }, i) => (
                <g key={label}>
                  <rect x={x} y="75" width="80" height="50" rx="8" fill={`${color}15`} stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
                  <text x={x + 40} y="104" textAnchor="middle" fill={color} fontSize="13" fontFamily="monospace" fontWeight="600">
                    {label}
                  </text>
                  {i < 5 && (
                    <line x1={x + 80} y1="100" x2={x + 140} y2="100" stroke={color} strokeWidth="1.5" opacity="0.5" markerEnd="url(#arrowhead)" />
                  )}
                </g>
              ))}

              {/* Labels below */}
              <text x="60" y="155" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">string</text>
              <text x="200" y="155" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">Token[]</text>
              <text x="340" y="155" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">grammar</text>
              <text x="480" y="155" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">ASTNode*</text>
              <text x="620" y="155" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">Value</text>
              <text x="740" y="155" textAnchor="middle" fill="#475569" fontSize="9" fontFamily="monospace">stdout</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
