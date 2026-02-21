import { serial, varchar, timestamp } from 'drizzle-orm/pg-core';
import { schema } from './schema-name.js';

export const usersTable = schema.table('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  hashedPassword: varchar('hashed_password', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }).notNull().default('user'),
  status: varchar('status', { length: 255 }).notNull().default('active'),
  lastLogin: timestamp('last_login', { withTimezone: true }),
  lastLoginIP: varchar('last_login_ip', { length: 255 }),
  lastLoginUserAgent: varchar('last_login_user_agent', { length: 255 }),
  lastLoginLocation: varchar('last_login_location', { length: 255 }),
  lastLoginDevice: varchar('last_login_device', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
