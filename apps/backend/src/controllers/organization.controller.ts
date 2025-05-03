import { Request, Response, NextFunction } from 'express';
import * as organizationService from '@/services/organization.service.js';
import { CreateOrganizationInput } from '@/schemas/organization.schema.js';

/**
 * Handles the creation of a new organization.
 */
export const createOrganizationHandler = async (
  // Explicitly type req.body using the validated input type
  req: Request<object, object, CreateOrganizationInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const newOrganization = await organizationService.createOrganization(name);
    res.status(201).json(newOrganization);
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};

/**
 * Handles the retrieval of all organizations.
 */
export const getOrganizationsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const organizations = await organizationService.getAllOrganizations();
    res.status(200).json(organizations);
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
};
