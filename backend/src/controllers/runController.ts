import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { executeJavaScript } from '../services/jsExecutor';

const RunSchema = z.object({
  code: z.string().min(1, 'Code is required').max(50000, 'Code too long (max 50KB)'),
});

// Patterns blocked for safety
const BLOCKED = [
  /require\s*\(/, /child_process/, /fs\./, /process\.env/,
  /process\.exit/, /__proto__/, /constructor\s*\[/,
];

export const runCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = RunSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: 'Validation Error', message: parsed.error.errors[0]?.message });
      return;
    }

    const { code } = parsed.data;

    for (const pattern of BLOCKED) {
      if (pattern.test(code)) {
        res.status(403).json({ error: 'Forbidden', message: 'Code contains restricted patterns.' });
        return;
      }
    }

    const result = executeJavaScript(code);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
