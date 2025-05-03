import { z } from 'zod';

export const createOrganizationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Organization name cannot be empty'),
  }),
});

export type CreateOrganizationInput = z.infer<
  typeof createOrganizationSchema
>['body'];
