'use client'

import { FeatureCard } from '@/components/FeatureCard'
import { Hash, GitBranch, Code2, Cpu, Database, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Hash,
    title: 'Lexer & Tokenizer',
    description: 'Scans source code character by character, producing a stream of tokens — keywords, identifiers, operators, and literals.',
    color: 'blue' as const,
    code: 'let x = 42; → [LET, IDENT, EQ, NUM, SEMI]',
  },
  {
    icon: GitBranch,
    title: 'Recursive Descent Parser',
    description: 'Transforms the token stream into an Abstract Syntax Tree (AST) using a hand-written recursive descent parser.',
    color: 'purple' as const,
    code: 'Tokens → AST { type: "VarDecl", ... }',
  },
  {
    icon: Code2,
    title: 'AST Engine',
    description: 'A typed AST with 30+ node types covering declarations, expressions, statements, and control flow.',
    color: 'pink' as const,
    code: 'BinaryExpr | CallExpr | IfStmt | ForLoop',
  },
  {
    icon: Cpu,
    title: 'Tree-Walking Interpreter',
    description: 'Evaluates AST nodes recursively with proper scoping, closures, and dynamic dispatch for all JS constructs.',
    color: 'green' as const,
    code: 'eval(node) → Value | Exception',
  },
  {
    icon: Database,
    title: 'Memory Model',
    description: 'Stack-based scope management with environment chaining. Functions create new scopes that close over their parent.',
    color: 'yellow' as const,
    code: 'Scope { parent, bindings: Map<string, Value> }',
  },
  {
    icon: Zap,
    title: 'Standard Library',
    description: 'Built-in Math, Date, Array (map/filter/reduce/find/every/some), String methods, and console.log support.',
    color: 'orange' as const,
    code: '[1,2,3].map(x => x * 2) → [2,4,6]',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="section-tag">Core Components</span>
          <h2 className="text-4xl font-bold text-white">
            Everything in the <span className="gradient-text">Pipeline</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Every layer of the JavaScript runtime is hand-crafted in C++, from character scanning to program execution.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
