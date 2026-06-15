import rateLimit from 'express-rate-limit';

export const createRateLimiter = (windowMs: number, max: number) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Too Many Requests',
      message: `Rate limit exceeded. Please wait before making more requests.`,
      retryAfter: Math.ceil(windowMs / 1000),
    },
    skip: (req) => {
      // Skip rate limiting for health checks
      return req.path === '/health';
    },
  });
