'use client'

import dynamic from 'next/dynamic'
import { useRef, useState, useCallback } from 'react'
import { Play, Trash2, Copy, Code2, WrapText, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-[#1e1e1e]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-neon-blue/50 border-t-neon-blue rounded-full animate-spin" />
        <span className="text-slate-500 text-xs font-mono">Loading Monaco Editor...</span>
      </div>
    </div>
  ),
})

const DEFAULT_CODE = `// ⚡ JSForge Runtime Playground
// Try JavaScript code below!

// Variables
let name = "JSForge";
const version = "1.0.0";

// Functions
function greet(n) {
  return "Hello from " + n + " v" + version + "!";
}

console.log(greet(name));

// Array operations
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter(n => n % 2 === 0);
const doubled = evens.map(n => n * 2);
const sum = doubled.reduce((acc, n) => acc + n, 0);

console.log("Even numbers doubled:", doubled);
console.log("Sum:", sum);

// Object
const runtime = {
  name: "JSForge",
  language: "JavaScript",
  builtWith: "C++",
  features: 50
};

console.log("Runtime:", JSON.stringify(runtime, null, 2));

// Arrow function + closure
const counter = (start = 0) => {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count
  };
};

const c = counter(10);
c.increment();
c.increment();
c.increment();
console.log("Counter value:", c.value()); // 13

// Math operations
console.log("Pi:", Math.PI.toFixed(4));
console.log("Sqrt(144):", Math.sqrt(144));
console.log("Max:", Math.max(42, 17, 99, 7));
`

interface Props {
  onRun: (code: string) => void
  isRunning: boolean
}

export function CodeEditor({ onRun, isRunning }: Props) {
  const editorRef = useRef<any>(null)
  const [copied, setCopied] = useState(false)
  const [wordWrap, setWordWrap] = useState(false)

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor
  }

  const getCode = useCallback(() => {
    return editorRef.current?.getValue() || ''
  }, [])

  const handleRun = () => {
    onRun(getCode())
  }

  const handleClear = () => {
    editorRef.current?.setValue('')
  }

  const handleFormat = () => {
    editorRef.current?.getAction('editor.action.formatDocument')?.run()
  }

  const handleCopy = async () => {
    const code = getCode()
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    editorRef.current?.setValue(DEFAULT_CODE)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/10 shrink-0 flex-wrap">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-neon-blue" />
          <span className="text-sm font-medium text-slate-300">Editor</span>
          <span className="text-xs text-slate-600 font-mono">JavaScript</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Secondary actions */}
          <button
            onClick={handleFormat}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded hover:bg-white/5 transition-colors font-mono"
            title="Format code"
          >
            Format
          </button>
          <button
            onClick={() => setWordWrap(w => !w)}
            className={cn(
              'p-1.5 rounded transition-colors',
              wordWrap ? 'text-neon-blue bg-neon-blue/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
            )}
            title="Toggle word wrap"
          >
            <WrapText className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleClear}
            className="p-1.5 rounded text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-colors"
            title="Clear editor"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Run button */}
          <Button
            onClick={handleRun}
            disabled={isRunning}
            size="sm"
            className={cn('gap-1.5 text-xs', isRunning && 'opacity-75')}
          >
            {isRunning ? (
              <>
                <span className="w-3 h-3 border border-white/50 border-t-white rounded-full animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-white" />
                Run
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0">
        <MonacoEditor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={DEFAULT_CODE}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: wordWrap ? 'on' : 'off',
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            tabSize: 2,
            renderLineHighlight: 'line',
            cursorBlinking: 'smooth',
            smoothScrolling: true,
            contextmenu: true,
            formatOnPaste: true,
            suggest: { showWords: false },
          }}
        />
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 px-4 py-2 bg-[#1e1e1e] border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span>JavaScript</span>
          <span>•</span>
          <span>UTF-8</span>
          <span>•</span>
          <span>2 spaces</span>
        </div>
        <button
          onClick={handleReset}
          className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
        >
          Reset to example
        </button>
      </div>
    </div>
  )
}
