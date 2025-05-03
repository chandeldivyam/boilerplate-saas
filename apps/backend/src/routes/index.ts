import { Router } from 'express';
import organizationRouter from './organization.route.js';

const router = Router();

// Mount organization routes
router.use('/organizations', organizationRouter);

export default router;
