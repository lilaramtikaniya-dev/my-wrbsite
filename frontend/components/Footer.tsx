import Link from 'next/link'
import { Zap, Github, Twitter, ExternalLink } from 'lucide-react'

const links = {
  product: [
    { label: 'Playground', href: '/playground' },
    { label: 'Documentation', href: '/docs' },
    { label: 'Architecture', href: '/architecture' },
    { label: 'Leaderboard', href: '/leaderboard' },
  ],
  learn: [
    { label: 'Lexer', href: '/docs#lexer' },
    { label: 'Parser', href: '/docs#parser' },
    { label: 'AST', href: '/docs#ast' },
    { label: 'Interpreter', href: '/docs#interpreter' },
  ],
  project: [
    { label: 'About', href: '/about' },
    { label: 'GitHub', href: 'https://github.com', external: true },
    { label: 'Roadmap', href: '/about#roadmap' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-dark-card/30 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-white">JS</span>
                <span className="gradient-text">Forge</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              An educational JavaScript Runtime built from scratch in C++. Built for the hackathon.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-neon-blue/40 hover:bg-neon-blue/5 transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-neon-blue/40 hover:bg-neon-blue/5 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map(({ label, href, external }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="text-slate-500 text-sm hover:text-neon-blue transition-colors duration-200 flex items-center gap-1"
                    >
                      {label}
                      {external && <ExternalLink className="w-3 h-3" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} JSForge Runtime. Built for the hackathon.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Runtime Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
