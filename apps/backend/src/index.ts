import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express'; // Import NextFunction
import { requestLogger } from '@/util.js';

const app = express();

app.use(cors());

if (process.env.NODE_ENV !== 'production') {
  console.log('Development logging enabled.');
  app.use(requestLogger);
}

// --- Your Routes ---
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World!' });
});

// --- Server Start ---
const PORT = process.env.PORT || 8000; // Use environment variable for port if available
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(
    `Current NODE_ENV: ${process.env.NODE_ENV || 'undefined (defaults to non-production logging)'}`
  );
});
