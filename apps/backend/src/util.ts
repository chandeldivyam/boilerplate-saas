import { Request, Response, NextFunction } from 'express';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const endTimestamp = new Date().toISOString();
    const { statusCode } = res;

    // Log end of the request
    console.log(
      `[${endTimestamp}] <-- ${method} ${originalUrl} ${statusCode} (${duration}ms)`
    );
  });

  // Pass control to the next middleware or route handler
  next();
};
