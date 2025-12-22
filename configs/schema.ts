import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const websitesTable = pgTable("websites", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  websiteId: varchar({ length: 255 }).notNull().unique(),
  domain: varchar({ length: 255 }).notNull().unique(),
  timezone: varchar({ length: 100 }).notNull(),
  enableLocalhostTracking: boolean().default(false),
  userEmail: varchar({ length: 255 }).notNull(),
});

export const pageViewTable = pgTable("pageViews", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  visitorId: varchar({ length: 255 }),
  websiteId: varchar({ length: 255 }).notNull(),
  domain: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 2048 }),
  type: varchar({ length: 50 }).notNull(),
  referrer: varchar({ length: 2048 }),
  entryTime: varchar({ length: 100 }),
  exitTime: varchar({ length: 100 }),
  totalActiveTime: integer(),
  urlParams: varchar(),
  utm_source: varchar({ length: 255 }),
  utm_medium: varchar({ length: 255 }),
  utm_campaign: varchar({ length: 255 }),
  utm_term: varchar({ length: 255 }),
  utm_content: varchar({ length: 255 }),
  device: varchar(),
  os: varchar(),
  browser: varchar(),
  city: varchar(),
  region: varchar(),
  country: varchar(),
  countryCode: varchar(),
  ipAddress: varchar(),
  refParams: varchar(),
});
