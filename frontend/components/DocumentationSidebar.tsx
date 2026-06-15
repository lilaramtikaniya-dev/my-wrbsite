'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Search, Hash, Cpu, Code2, GitBranch, Layers, Database, ChevronRight } from 'lucide-react'

export const DOC_SECTIONS = [
  { id: 'overview', label: 'Overview', icon: Layers },
  { id: 'lexer', label: 'Lexer', icon: Hash },
  { id: 'parser', label: 'Parser', icon: GitBranch },
  { id: 'ast', label: 'AST', icon: Code2 },
  { id: 'interpreter', label: 'Interpreter', icon: Cpu },
  { id: 'runtime', label: 'Runtime', icon: Layers },
  { id: 'memory', label: 'Memory Model', icon: Database },
]

interface Props {
  activeSection: string
  onSelect: (id: string) => void
}

export function DocumentationSidebar({ activeSection, onSelect }: Props) {
  const [search, setSearch] = useState('')

  const filtered = DOC_SECTIONS.filter(s =>
    s.label.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="glass-card p-5 sticky top-24 h-fit">
      <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
        <Code2 className="w-4 h-4 text-neon-blue" />
        Documentation
      </h3>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
        <input
          type="text"
          placeholder="Search docs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-neon-blue/40 transition-colors"
        />
      </div>

      {/* Nav */}
      <nav className="space-y-1">
        {filtered.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left',
              activeSection === id
                ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/20'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            )}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
            {activeSection === id && <ChevronRight className="w-3 h-3 ml-auto" />}
          </button>
        ))}
      </nav>

      {filtered.length === 0 && (
        <p className="text-slate-600 text-xs text-center py-4">No results for "{search}"</p>
      )}
    </div>
  )
}
