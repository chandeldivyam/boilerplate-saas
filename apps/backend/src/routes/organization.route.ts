import { Router } from 'express';
import * as organizationController from '@/controllers/organization.controller.js';
import { validateRequest } from '@/middlewares/validateRequest.js';
import { createOrganizationSchema } from '@/schemas/organization.schema.js';

const router = Router();

// POST /api/organizations - Create a new organization
router.post(
  '/',
  validateRequest(createOrganizationSchema),
  organizationController.createOrganizationHandler
);

// GET /api/organizations - Get all organizations
router.get('/', organizationController.getOrganizationsHandler);

export default router;
