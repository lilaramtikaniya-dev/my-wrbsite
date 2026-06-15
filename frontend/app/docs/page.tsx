'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { motion } from 'framer-motion'
import { DocumentationSidebar, DOC_SECTIONS } from '@/components/DocumentationSidebar'
import { Badge } from '@/components/ui/badge'

// ─── Doc content data ─────────────────────────────────────────────────────
const DOC_CONTENT: Record<string, { title: string; body: React.ReactNode }> = {
  overview: {
    title: 'Overview',
    body: (
      <div className="space-y-6">
        <p className="text-slate-300 leading-relaxed text-lg">
          JSForge Runtime is a complete JavaScript interpreter built from scratch in C++. It implements all the classic stages of language execution: <strong className="text-neon-blue">Lexing → Parsing → AST → Interpretation</strong>.
        </p>
        <div className="glass-card p-6 border-neon-blue/20">
          <h3 className="text-white font-semibold mb-3">Pipeline</h3>
          <div className="flex flex-wrap gap-2 items-center">
            {['Source Code', '→', 'Lexer', '→', 'Tokens', '→', 'Parser', '→', 'AST', '→', 'Interpreter', '→', 'Output'].map((s, i) => (
              s === '→'
                ? <span key={i} className="text-slate-600">→</span>
                : <Badge key={i} variant={i % 4 === 0 ? 'default' : 'purple'}>{s}</Badge>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold text-xl mb-4">Supported Features</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'let / const / var', 'Numbers, Strings, Booleans',
              'null / undefined', 'Arrays & Objects',
              'Functions & Arrow Functions', 'Closures & Scoping',
              'if / else / switch', 'for / while / do-while',
              'Arithmetic Operators', 'Logical & Comparison Ops',
              'Array: map, filter, reduce', 'Array: find, every, some',
              'String Methods', 'Math Object',
              'Date Object', 'Spread & Rest Operators',
              'Callback Functions', 'console.log',
            ].map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-slate-400">
                <span className="text-emerald-400 text-xs">✓</span> {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  lexer: {
    title: 'Lexer (Tokenizer)',
    body: (
      <div className="space-y-6">
        <p className="text-slate-300 leading-relaxed">
          The Lexer is the first stage of the pipeline. It reads the raw JavaScript source code one character at a time and groups characters into <strong className="text-neon-blue">tokens</strong>.
        </p>
        <div>
          <h3 className="text-white font-semibold mb-3">Token Types</h3>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              ['KEYWORD', 'let, const, var, function, if, else, for, while, return'],
              ['IDENTIFIER', 'Variable names, function names'],
              ['NUMBER', 'Integer and floating-point literals'],
              ['STRING', 'Single-quoted, double-quoted, template literals'],
              ['OPERATOR', '+, -, *, /, =, ==, ===, !=, &&, ||'],
              ['PUNCTUATION', '( ) { } [ ] ; , .'],
              ['COMMENT', '// single-line, /* multi-line */'],
              ['EOF', 'End of file marker'],
            ].map(([type, desc]) => (
              <div key={type} className="glass-card p-3 border-white/5">
                <div className="text-neon-blue font-mono text-xs mb-1">{type}</div>
                <div className="text-slate-500 text-xs">{desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Example</h3>
          <div className="code-block">
            <div className="text-slate-500 mb-2">// Input source code</div>
            <div className="text-emerald-400">let x = 42 + 8;</div>
            <div className="text-slate-500 mt-4 mb-2">// Tokens produced</div>
            <div className="text-neon-blue">{'[KEYWORD "let"] [IDENT "x"] [OP "="] [NUM 42] [OP "+"] [NUM 8] [PUNCT ";"] [EOF]'}</div>
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">C++ Implementation</h3>
          <div className="code-block">
            <div className="text-slate-500">// Lexer.h — Token structure</div>
            {`struct Token {
  TokenType type;
  std::string value;
  int line, col;
};

class Lexer {
  std::string source;
  size_t pos = 0;
  int line = 1, col = 1;
public:
  Lexer(const std::string& src) : source(src) {}
  Token nextToken();
  std::vector<Token> tokenize();
};`}
          </div>
        </div>
      </div>
    ),
  },
  parser: {
    title: 'Parser (Syntax Analysis)',
    body: (
      <div className="space-y-6">
        <p className="text-slate-300 leading-relaxed">
          The Parser reads the token stream from the Lexer and builds an <strong className="text-neon-purple">Abstract Syntax Tree (AST)</strong>. JSForge uses a hand-written recursive descent parser — one of the most readable approaches.
        </p>
        <div>
          <h3 className="text-white font-semibold mb-3">Parsing Strategy: Pratt Parsing for Expressions</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Expressions use Pratt (top-down operator precedence) parsing for correct operator precedence handling. Statements use recursive descent.
          </p>
          <div className="code-block">
            {`// Operator precedence table
LOWEST   = 1  // default
EQUALS   = 2  // ==, ===
LESS_GT  = 3  // <, >, <=, >=
SUM      = 4  // +, -
PRODUCT  = 5  // *, /
PREFIX   = 6  // -x, !x
CALL     = 7  // myFunc(x)
INDEX    = 8  // array[0]`}
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Grammar (simplified)</h3>
          <div className="code-block text-xs leading-7">
            {`Program     → Statement*
Statement   → VarDecl | FnDecl | ExprStmt | IfStmt | ForStmt | ReturnStmt
VarDecl     → ("let"|"const"|"var") IDENT "=" Expr ";"
FnDecl      → "function" IDENT "(" Params ")" Block
IfStmt      → "if" "(" Expr ")" Block ("else" Block)?
ForStmt     → "for" "(" VarDecl Expr ";" Expr ")" Block
Expr        → Literal | IDENT | Unary | Binary | Call | Arrow`}
          </div>
        </div>
      </div>
    ),
  },
  ast: {
    title: 'Abstract Syntax Tree (AST)',
    body: (
      <div className="space-y-6">
        <p className="text-slate-300 leading-relaxed">
          The AST is a tree representation of the program's structure. Each node represents one language construct. The interpreter walks this tree to execute the program.
        </p>
        <div>
          <h3 className="text-white font-semibold mb-3">Node Types</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-xs">
            {[
              'Program', 'VariableDeclaration', 'FunctionDeclaration', 'ArrowFunctionExpression',
              'CallExpression', 'BinaryExpression', 'UnaryExpression', 'AssignmentExpression',
              'IfStatement', 'ForStatement', 'WhileStatement', 'DoWhileStatement',
              'ReturnStatement', 'BlockStatement', 'ExpressionStatement',
              'Identifier', 'Literal', 'ArrayExpression', 'ObjectExpression',
              'MemberExpression', 'SpreadElement', 'SwitchStatement',
            ].map(n => (
              <div key={n} className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded border border-white/10 font-mono text-neon-purple">
                {n}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Example AST</h3>
          <div className="code-block">
            <div className="text-slate-500 mb-2">// Source: const add = (a, b) =&gt; a + b;</div>
            <pre className="text-sm text-slate-300">{JSON.stringify({
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [{
                type: 'VariableDeclarator',
                id: { type: 'Identifier', name: 'add' },
                init: {
                  type: 'ArrowFunctionExpression',
                  params: [{ type: 'Identifier', name: 'a' }, { type: 'Identifier', name: 'b' }],
                  body: {
                    type: 'BinaryExpression',
                    operator: '+',
                    left: { type: 'Identifier', name: 'a' },
                    right: { type: 'Identifier', name: 'b' },
                  }
                }
              }]
            }, null, 2)}</pre>
          </div>
        </div>
      </div>
    ),
  },
  interpreter: {
    title: 'Interpreter',
    body: (
      <div className="space-y-6">
        <p className="text-slate-300 leading-relaxed">
          The interpreter is a tree-walking evaluator. It recursively visits each AST node, computes values, and handles side effects. It maintains an <strong className="text-neon-blue">environment</strong> (scope chain) for variable storage.
        </p>
        <div>
          <h3 className="text-white font-semibold mb-3">Evaluation Flow</h3>
          <div className="code-block">
            {`// C++ pseudocode
Value eval(ASTNode* node, Environment* env) {
  switch (node->type) {
    case BINARY_EXPR:
      return evalBinary(node, env);
    case CALL_EXPR:
      return evalCall(node, env);
    case IF_STMT:
      if (isTruthy(eval(node->condition, env)))
        return eval(node->consequent, env);
      else if (node->alternate)
        return eval(node->alternate, env);
      return undefined;
    // ... 30+ more cases
  }
}`}
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Value System</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ['NumberValue', 'double', 'Floating-point numbers'],
              ['StringValue', 'std::string', 'String literals'],
              ['BoolValue', 'bool', 'true / false'],
              ['NullValue', '—', 'null'],
              ['UndefinedValue', '—', 'undefined'],
              ['ArrayValue', 'vector<Value*>', 'JavaScript arrays'],
              ['ObjectValue', 'map<string, Value*>', 'JS objects'],
              ['FunctionValue', 'ASTNode* + Env*', 'Closures'],
            ].map(([type, ctype, desc]) => (
              <div key={type} className="glass-card p-3 border-white/5">
                <div className="text-neon-blue font-mono text-xs">{type}</div>
                <div className="text-slate-500 text-xs font-mono">{ctype}</div>
                <div className="text-slate-400 text-xs mt-1">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  runtime: {
    title: 'Runtime',
    body: (
      <div className="space-y-6">
        <p className="text-slate-300 leading-relaxed">
          The Runtime ties all components together and provides the built-in global objects and functions available to JavaScript code.
        </p>
        <div>
          <h3 className="text-white font-semibold mb-3">Built-in Globals</h3>
          <div className="space-y-4">
            {[
              { name: 'console', methods: ['log', 'error', 'warn', 'info'] },
              { name: 'Math', methods: ['sqrt', 'abs', 'floor', 'ceil', 'round', 'max', 'min', 'pow', 'random', 'PI', 'E'] },
              { name: 'Date', methods: ['now()', 'getTime()', 'getFullYear()', 'getMonth()'] },
              { name: 'Array', methods: ['map', 'filter', 'reduce', 'find', 'every', 'some', 'forEach', 'push', 'pop', 'slice', 'join'] },
              { name: 'String', methods: ['split', 'trim', 'toUpperCase', 'toLowerCase', 'includes', 'startsWith', 'replace', 'slice'] },
              { name: 'JSON', methods: ['stringify', 'parse'] },
            ].map(({ name, methods }) => (
              <div key={name} className="glass-card p-4 border-white/10">
                <div className="text-neon-purple font-mono font-semibold mb-2">{name}</div>
                <div className="flex flex-wrap gap-2">
                  {methods.map(m => (
                    <span key={m} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs font-mono text-slate-400">{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  memory: {
    title: 'Memory Model',
    body: (
      <div className="space-y-6">
        <p className="text-slate-300 leading-relaxed">
          JSForge uses a <strong className="text-neon-blue">scope chain</strong> model for variable storage. Each function call creates a new environment that holds a reference to its parent (enclosing) scope — this is how closures work.
        </p>
        <div>
          <h3 className="text-white font-semibold mb-3">Environment Chain</h3>
          <div className="code-block">
            {`// C++ Environment class
class Environment {
  std::unordered_map<std::string, Value*> bindings;
  Environment* parent;
public:
  void define(std::string name, Value* val);
  Value* get(std::string name);   // searches up the chain
  void set(std::string name, Value* val); // assigns in the defining scope
};`}
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Closure Example</h3>
          <div className="code-block">
            <div className="text-slate-500 mb-2">// Each arrow creates a new scope, closed over `count`</div>
            {`function counter() {
  let count = 0;      // lives in counter's env
  return () => ++count;  // captures env by reference
}
const tick = counter();
tick(); // 1  — modifies count in counter's closed env
tick(); // 2
tick(); // 3`}
          </div>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Memory Layout</h3>
          <div className="grid gap-2">
            {[
              { label: 'Global Scope', desc: 'Top-level variables and functions', color: 'neon-blue' },
              { label: 'Function Scope', desc: 'Created on each function call, holds params + locals', color: 'neon-purple' },
              { label: 'Block Scope', desc: 'Created for if/for/while blocks (let/const)', color: 'neon-pink' },
            ].map(({ label, desc, color }) => (
              <div key={label} className={`glass-card p-4 border-${color}/20`}>
                <div className={`text-${color} font-mono text-sm font-semibold mb-1`}>{label}</div>
                <div className="text-slate-400 text-sm">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const content = DOC_CONTENT[activeSection]

  return (
    <div className="min-h-screen pt-20 pb-16 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-tag">Reference</span>
          <h1 className="text-4xl font-bold text-white">
            <span className="gradient-text">Documentation</span>
          </h1>
          <p className="text-slate-400 mt-3">Learn how JSForge Runtime works — from source code to output.</p>
        </div>

        <div className="grid lg:grid-cols-[260px,1fr] gap-8 items-start">
          {/* Sidebar */}
          <DocumentationSidebar activeSection={activeSection} onSelect={setActiveSection} />

          {/* Content */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-8 min-h-[600px]"
          >
            <h2 className="text-2xl font-bold text-white mb-6 pb-4 border-b border-white/10">
              {content?.title}
            </h2>
            <div className="prose-custom">{content?.body}</div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
