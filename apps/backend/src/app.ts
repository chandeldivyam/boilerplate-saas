import express from 'express';
import config from './config/index.js';
import routes from './routes/index.js';
import { errorHandler } from './errors/errorHandler.js';
import cors from 'cors';
import { requestLogger } from './util.js';
import { Request, Response } from 'express';

const app = express();
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3174';

// Middlewares
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);
app.use(express.json());
if (config.env !== 'production') {
  console.log('Development logging enabled.');
  app.use(requestLogger);
}

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

export const startServer = () => {
  return app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
  });
};
