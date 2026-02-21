import { integer, serial, timestamp, varchar } from 'drizzle-orm/pg-core';
import { schema } from './schema-name.js';
import { usersTable } from './users.schema.js';

export const refreshTokensTable = schema.table('refresh_tokens', {
  id: serial('id').primaryKey(),
  token: varchar('token', { length: 255 }).notNull(),
  userId: integer('user_id').references(() => usersTable.id),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
