import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  const message = err instanceof Error ? err.message : "Internal Server Error";
  const status = (err as any)?.status ?? 500;
  res.status(status).json({ success: false, error: message });
};

export const notFoundHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    const status = (err as any)?.status ?? 500;
    res.status(status).json({ success: false, error: message });
};
