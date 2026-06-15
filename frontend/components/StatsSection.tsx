'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Hash, CheckCircle2 } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

interface StatProps {
  value: number
  suffix: string
  label: string
  description: string
  icon: typeof TrendingUp
  color: string
}

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1500
          const start = Date.now()
          const tick = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCurrent(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <div ref={ref} className="text-5xl font-black gradient-text tabular-nums">{current}{suffix}</div>
}

const stats: StatProps[] = [
  {
    value: 50,
    suffix: 'ms',
    label: 'Runtime Speed',
    description: 'Average execution time for standard JS programs',
    icon: TrendingUp,
    color: 'text-neon-blue',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Supported Features',
    description: 'JS language features including closures, arrays, and more',
    icon: Hash,
    color: 'text-neon-purple',
  },
  {
    value: 120,
    suffix: '+',
    label: 'Test Cases Passed',
    description: 'Automated test suite covering edge cases and core features',
    icon: CheckCircle2,
    color: 'text-emerald-400',
  },
]

export function StatsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-tag">By the numbers</span>
          <h2 className="text-4xl font-bold text-white">
            Built to <span className="gradient-text">Perform</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map(({ value, suffix, label, description, icon: Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card p-8 text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className={`flex justify-center mb-4`}>
                <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
              </div>
              <AnimatedNumber target={value} suffix={suffix} />
              <div className="text-white font-semibold text-lg mt-3 mb-2">{label}</div>
              <div className="text-slate-500 text-sm leading-relaxed">{description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
