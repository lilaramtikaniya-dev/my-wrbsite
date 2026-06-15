import type { Metadata } from 'next'
import { ParticleBackground } from '@/components/ParticleBackground'
import { Hero } from '@/components/Hero'
import { StatsSection } from '@/components/StatsSection'
import { FeatureCard } from '@/components/FeatureCard'
import { Timeline } from '@/components/Timeline'
import { Testimonials } from '@/components/Testimonials'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

export const metadata: Metadata = {
  title: 'JSForge Runtime — JavaScript Runtime Built in C++',
  description: 'An educational JavaScript Runtime built in C++. Explore the internals: lexer, parser, AST, and interpreter.',
}

const features = [
  {
    icon: 'Hash' as const,
    title: 'Lexer & Tokenizer',
    description: 'Scans source code character by character, producing a stream of tokens — keywords, identifiers, operators, and literals.',
    color: 'blue' as const,
    code: 'let x = 42; → [LET, IDENT, EQ, NUM, SEMI]',
  },
  {
    icon: 'GitBranch' as const,
    title: 'Recursive Descent Parser',
    description: 'Transforms the token stream into an Abstract Syntax Tree (AST) using a hand-written recursive descent parser.',
    color: 'purple' as const,
    code: 'Tokens → AST { type: "VarDecl", ... }',
  },
  {
    icon: 'CodeXml' as const,
    title: 'AST Engine',
    description: 'A typed AST with 30+ node types covering declarations, expressions, statements, and control flow.',
    color: 'pink' as const,
    code: 'BinaryExpr | CallExpr | IfStmt | ForLoop',
  },
  {
    icon: 'Cpu' as const,
    title: 'Tree-Walking Interpreter',
    description: 'Evaluates AST nodes recursively with proper scoping, closures, and dynamic dispatch for all JS constructs.',
    color: 'green' as const,
    code: 'eval(node) → Value | Exception',
  },
  {
    icon: 'Database' as const,
    title: 'Memory Model',
    description: 'Stack-based scope management with environment chaining. Functions create new scopes that close over their parent.',
    color: 'yellow' as const,
    code: 'Scope { parent, bindings: Map<string, Value> }',
  },
  {
    icon: 'Zap' as const,
    title: 'Standard Library',
    description: 'Built-in Math, Date, Array (map/filter/reduce/find/every/some), String methods, and console.log support.',
    color: 'orange' as const,
    code: '[1,2,3].map(x => x * 2) → [2,4,6]',
  },
]

export default function HomePage() {
  return (
    <div className="relative">
      <ParticleBackground />

      {/* Hero */}
      <Hero />

      {/* Stats */}
      <StatsSection />

      {/* Features */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="section-tag">Core Components</span>
            <h2 className="text-4xl font-bold text-white">
              Everything in the <span className="gradient-text">Pipeline</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
              Every layer of the JavaScript runtime is hand-crafted in C++, from character scanning to program execution.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <Timeline />

      {/* CTA Banner */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12 border border-neon-blue/20 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 pointer-events-none" />
            <div className="relative z-10">
              <span className="section-tag">Ready to explore?</span>
              <h2 className="text-4xl font-bold text-white mb-4">
                Start Running <span className="gradient-text">JavaScript</span> Now
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Open the playground and execute real JavaScript code in our custom runtime. See the output instantly.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="xl">
                  <Link href="/playground">
                    <Play className="w-5 h-5 fill-white" />
                    Open Playground
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="outline">
                  <Link href="/architecture">View Architecture</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQAccordion />
    </div>
  )
}
