'use client'

import { motion } from 'framer-motion'

export function AnimatedGradient() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial glows */}
      <motion.div
        className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)',
        }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        }}
        animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(240,171,252,0.08) 0%, transparent 70%)',
        }}
        animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid opacity-40" />
    </div>
  )
}
