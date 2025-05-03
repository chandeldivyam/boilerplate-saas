import { db } from '@/db/client.js';
import { organizations } from '@/db/schema.js';
import { ApiError, ErrorType } from '@/errors/ApiError.js';
import { eq } from 'drizzle-orm';

/**
 * Creates a new organization in the database.
 * @param name - The name of the organization.
 * @returns The newly created organization object.
 * @throws {ApiError} If an organization with the same name already exists or if the transaction fails.
 */
export const createOrganization = async (name: string) => {
  return db.transaction(async (tx) => {
    const existingOrganization = await tx
      .select({ organizationId: organizations.organizationId })
      .from(organizations)
      .where(eq(organizations.name, name))
      .limit(1);

    if (existingOrganization.length > 0) {
      throw new ApiError(
        409,
        ErrorType.DUPLICATE_ENTRY,
        `Organization with name "${name}" already exists.`
      );
    }

    const [newOrganization] = await tx
      .insert(organizations)
      .values({ name })
      .returning();

    if (!newOrganization) {
      throw new ApiError(
        500,
        ErrorType.INTERNAL_ERROR,
        'Failed to retrieve organization details after insert.'
      );
    }

    return newOrganization;
  });
};

/**
 * Retrieves all organizations from the database.
 * @returns A list of all organization objects.
 */
export const getAllOrganizations = async () => {
  const allOrganizations = await db.select().from(organizations);
  return allOrganizations;
};
