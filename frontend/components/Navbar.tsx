'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Menu, X, Code2, BookOpen, Cpu, Trophy, Info, GitBranch } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home', icon: Zap },
  { href: '/playground', label: 'Playground', icon: Code2 },
  { href: '/docs', label: 'Docs', icon: BookOpen },
  { href: '/architecture', label: 'Architecture', icon: GitBranch },
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { href: '/about', label: 'About', icon: Info },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-dark-bg/80 backdrop-blur-glass border-b border-white/5 shadow-glass'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center group-hover:shadow-neon-blue transition-shadow duration-300">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-300" />
            </div>
            <span className="font-bold text-lg">
              <span className="text-white">JS</span>
              <span className="gradient-text">Forge</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  pathname === href
                    ? 'text-neon-blue bg-neon-blue/10 border border-neon-blue/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                )}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/playground"
              className="btn-cyber text-sm px-5 py-2 rounded-lg font-semibold inline-flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              Try Runtime
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-dark-card/95 backdrop-blur-glass border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    pathname === href
                      ? 'text-neon-blue bg-neon-blue/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/10">
                <Link
                  href="/playground"
                  className="btn-cyber text-sm px-5 py-2 rounded-lg font-semibold inline-flex items-center gap-2 w-full justify-center mt-2"
                >
                  <Code2 className="w-4 h-4" />
                  Try Runtime
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
