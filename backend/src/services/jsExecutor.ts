import { RunRequest, RunResponse, TokenInfo } from '../types';

// ─── Mock Lexer ────────────────────────────────────────────────────────────
function tokenize(code: string): TokenInfo[] {
  const tokens: TokenInfo[] = [];
  const lines = code.split('\n');

  const tokenPatterns: Array<{ type: string; pattern: RegExp }> = [
    { type: 'KEYWORD', pattern: /^(let|const|var|function|return|if|else|for|while|do|switch|case|break|continue|class|new|this|typeof|instanceof|null|undefined|true|false|import|export|from|default|arrow)\b/ },
    { type: 'IDENTIFIER', pattern: /^[a-zA-Z_$][a-zA-Z0-9_$]*/ },
    { type: 'NUMBER', pattern: /^[0-9]+(\.[0-9]+)?/ },
    { type: 'STRING', pattern: /^("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`)/ },
    { type: 'OPERATOR', pattern: /^(===|!==|==|!=|<=|>=|=>|&&|\|\||[+\-*/%=<>!&|^~])/ },
    { type: 'PUNCTUATION', pattern: /^[{}()\[\];:,.]/ },
    { type: 'WHITESPACE', pattern: /^\s+/ },
    { type: 'COMMENT', pattern: /^(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/ },
  ];

  lines.forEach((line, lineIdx) => {
    let col = 0;
    let remaining = line;

    while (remaining.length > 0) {
      let matched = false;

      for (const { type, pattern } of tokenPatterns) {
        const match = remaining.match(pattern);
        if (match) {
          if (type !== 'WHITESPACE') {
            tokens.push({ type, value: match[0], line: lineIdx + 1, col });
          }
          col += match[0].length;
          remaining = remaining.slice(match[0].length);
          matched = true;
          break;
        }
      }

      if (!matched) {
        tokens.push({ type: 'UNKNOWN', value: remaining[0], line: lineIdx + 1, col });
        col++;
        remaining = remaining.slice(1);
      }
    }
  });

  return tokens;
}

// ─── Mock JavaScript Executor ──────────────────────────────────────────────
export function executeJavaScript(code: string): RunResponse {
  const startTime = performance.now();

  try {
    const tokens = tokenize(code);
    const output: string[] = [];
    const errors: string[] = [];

    // Safe sandbox execution using Function constructor
    const consoleLogs: string[] = [];

    const sandbox = {
      console: {
        log: (...args: unknown[]) => {
          consoleLogs.push(args.map(a => formatValue(a)).join(' '));
        },
        error: (...args: unknown[]) => {
          consoleLogs.push('[ERROR] ' + args.map(a => formatValue(a)).join(' '));
        },
        warn: (...args: unknown[]) => {
          consoleLogs.push('[WARN] ' + args.map(a => formatValue(a)).join(' '));
        },
        info: (...args: unknown[]) => {
          consoleLogs.push('[INFO] ' + args.map(a => formatValue(a)).join(' '));
        },
      },
      Math,
      Date,
      JSON,
      Array,
      Object,
      String,
      Number,
      Boolean,
      parseInt,
      parseFloat,
      isNaN,
      isFinite,
      setTimeout: undefined,
      setInterval: undefined,
      fetch: undefined,
      require: undefined,
      process: undefined,
      global: undefined,
    };

    const fn = new Function(...Object.keys(sandbox), code);
    fn(...Object.values(sandbox));

    output.push(...consoleLogs);

    const executionTime = performance.now() - startTime;

    if (output.length === 0) {
      output.push('// Code executed successfully (no output)');
    }

    return {
      success: true,
      output: output.join('\n'),
      executionTime: parseFloat(executionTime.toFixed(3)),
      memoryUsed: estimateMemoryUsage(code),
      tokens: tokens.slice(0, 50), // Return first 50 tokens
    };

  } catch (err) {
    const executionTime = performance.now() - startTime;
    const error = err as Error;

    return {
      success: false,
      output: '',
      error: `${error.name}: ${error.message}`,
      executionTime: parseFloat(executionTime.toFixed(3)),
      memoryUsed: 0,
    };
  }
}

function formatValue(val: unknown): string {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (typeof val === 'string') return val;
  if (typeof val === 'function') return '[Function]';
  if (Array.isArray(val)) return JSON.stringify(val);
  if (typeof val === 'object') return JSON.stringify(val, null, 2);
  return String(val);
}

function estimateMemoryUsage(code: string): number {
  // Mock memory usage based on code length
  const base = 256; // KB base
  const perChar = 0.05; // KB per character
  return parseFloat((base + code.length * perChar).toFixed(2));
}
