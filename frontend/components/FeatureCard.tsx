'use client'

import { motion } from 'framer-motion'
import { Hash, GitBranch, CodeXml, Cpu, Database, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type IconName = 'Hash' | 'GitBranch' | 'CodeXml' | 'Cpu' | 'Database' | 'Zap'

const iconMap: Record<IconName, LucideIcon> = {
  Hash,
  GitBranch,
  CodeXml,
  Cpu,
  Database,
  Zap,
}

interface FeatureCardProps {
  icon: IconName
  title: string
  description: string
  color: 'blue' | 'purple' | 'pink' | 'green' | 'yellow' | 'orange'
  delay?: number
  code?: string
}

const colorMap = {
  blue: {
    icon: 'text-neon-blue',
    bg: 'bg-neon-blue/10',
    border: 'border-neon-blue/20',
    hover: 'hover:border-neon-blue/50 hover:shadow-neon-blue',
    glow: 'rgba(0,212,255,0.15)',
  },
  purple: {
    icon: 'text-neon-purple',
    bg: 'bg-neon-purple/10',
    border: 'border-neon-purple/20',
    hover: 'hover:border-neon-purple/50 hover:shadow-neon-purple',
    glow: 'rgba(139,92,246,0.15)',
  },
  pink: {
    icon: 'text-neon-pink',
    bg: 'bg-neon-pink/10',
    border: 'border-neon-pink/20',
    hover: 'hover:border-neon-pink/50',
    glow: 'rgba(240,171,252,0.15)',
  },
  green: {
    icon: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    hover: 'hover:border-emerald-400/50',
    glow: 'rgba(52,211,153,0.15)',
  },
  yellow: {
    icon: 'text-cyber-yellow',
    bg: 'bg-cyber-yellow/10',
    border: 'border-cyber-yellow/20',
    hover: 'hover:border-cyber-yellow/50',
    glow: 'rgba(251,191,36,0.15)',
  },
  orange: {
    icon: 'text-orange-400',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/20',
    hover: 'hover:border-orange-400/50',
    glow: 'rgba(251,146,60,0.15)',
  },
}

export function FeatureCard({ icon, title, description, color, delay = 0, code }: FeatureCardProps) {
  const c = colorMap[color]
  const Icon = iconMap[icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`glass-card p-6 border ${c.border} ${c.hover} transition-all duration-300 group cursor-default`}
    >
      <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-6 h-6 ${c.icon}`} />
      </div>

      <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>

      {code && (
        <div className="mt-4 p-3 bg-black/30 rounded-lg border border-white/5 font-mono text-xs text-slate-400 overflow-hidden">
          <span className={c.icon}>{code}</span>
        </div>
      )}
    </motion.div>
  )
}
