'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { motion } from 'framer-motion'

const faqs = [
  {
    q: 'What is JSForge Runtime?',
    a: 'JSForge Runtime is an educational JavaScript interpreter built from scratch in C++. It implements a complete pipeline: Lexer → Parser → AST → Interpreter, allowing it to execute real JavaScript code.',
  },
  {
    q: 'How does the Lexer work?',
    a: 'The Lexer (tokenizer) scans your JavaScript source code character by character and groups them into meaningful tokens — keywords (let, const), identifiers (variable names), literals (numbers, strings), and operators. It\'s the very first step in code execution.',
  },
  {
    q: 'What is an Abstract Syntax Tree (AST)?',
    a: 'An AST is a tree representation of your code\'s structure. Each node represents a language construct. For example, `let x = 5` becomes a VariableDeclaration node with an Identifier ("x") and a Literal (5). The interpreter walks this tree to execute your program.',
  },
  {
    q: 'Can I test my own JavaScript code?',
    a: 'Yes! Head to the Playground page. Type or paste your JavaScript code in the Monaco editor on the left, click Run, and see the output instantly on the right. The runtime supports variables, functions, arrays, objects, loops, and more.',
  },
  {
    q: 'What JavaScript features are supported?',
    a: 'The runtime supports: let/const variables, numbers/strings/booleans/null/undefined, arrays, objects, functions, arrow functions, if/else, switch, for/while/do-while loops, arithmetic/logical/comparison operators, array methods (map, filter, reduce, find, every, some), string methods, Math object, and more.',
  },
  {
    q: 'How is this different from Node.js or a browser?',
    a: 'Node.js uses the V8 engine which is an optimizing JIT compiler. JSForge is a tree-walking interpreter built from scratch — it\'s simpler, educational, and transparent. You can literally read every line of C++ to understand how JavaScript executes.',
  },
  {
    q: 'How do I submit my score to the leaderboard?',
    a: 'Go to the Leaderboard page, fill in your name, score, runtime speed, and test cases passed, then click Submit. Scores are stored locally in your browser.',
  },
]

export function FAQAccordion() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="section-tag">FAQ</span>
          <h2 className="text-4xl font-bold text-white">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400 mt-4">Everything you need to know about JSForge Runtime.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card p-2"
        >
          <Accordion type="single" collapsible className="px-4">
            {faqs.map(({ q, a }, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
