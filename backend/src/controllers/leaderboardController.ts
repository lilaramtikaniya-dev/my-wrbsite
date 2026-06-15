import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { getAllEntries, addEntry } from '../services/leaderboardService';

const SubmitSchema = z.object({
  name: z.string().min(1).max(50).trim(),
  score: z.number().int().min(0).max(10000),
  runtimeSpeed: z.number().min(0).max(10000),
  testCasesPassed: z.number().int().min(0).max(200),
});

export const getLeaderboard = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    const entries = getAllEntries();
    res.json({ entries, total: entries.length });
  } catch (err) {
    next(err);
  }
};

export const submitScore = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const parsed = SubmitSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: 'Validation Error', message: parsed.error.errors[0]?.message });
      return;
    }
    const entry = addEntry(parsed.data);
    res.status(201).json({ entry, message: 'Score submitted successfully!' });
  } catch (err) {
    next(err);
  }
};
