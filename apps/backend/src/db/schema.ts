import { pgTable, text, boolean, timestamp, uuid } from 'drizzle-orm/pg-core';

export const organizations = pgTable('organization', {
  organizationId: uuid('organization_id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
