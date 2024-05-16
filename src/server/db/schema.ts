import { relations, sql, type InferSelectModel } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `appNesting_${name}`);

export const posts = createTable(
  "post",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (t) => ({
    createdByIdIdx: index("post_createdById_idx").on(t.createdById),
    nameIndex: index("post_name_idx").on(t.name),
  }),
);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  userRoles: many(userRoles),
  invites: many(invites),
}));

export const organizations = createTable(
  "organization",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    createdById: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (t) => ({
    createdByIdIdx: index("organization_createdById_idx").on(t.createdById),
    nameIndex: index("organization_name_idx").on(t.name),
  }),
);
export type Organization = InferSelectModel<typeof organizations>;

export const organizationsRelations = relations(organizations, ({ many }) => ({
  userRoles: many(userRoles),
  invites: many(invites),
}));

export const roles = createTable("role", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
}));

export const userRoles = createTable(
  "userRole",
  {
    userId: varchar("userId", { length: 255 })
      .references(() => users.id)
      .notNull(),
    roleId: varchar("roleId", { length: 255 })
      .references(() => roles.id)
      .notNull(),
    organizationId: varchar("organizationId", { length: 255 })
      .references(() => organizations.id)
      .notNull(),
    inviteId: varchar("id", { length: 16 }).references(() => invites.id),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
    deletedAt: timestamp("deletedAt", { withTimezone: true }),
  },
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.userId, t.roleId, t.organizationId],
    }),
    userIdIdx: index("userRole_userId_idx").on(t.userId),
    organizationIdIdx: index("userRole_organizationId_idx").on(
      t.organizationId,
    ),
  }),
);

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, { fields: [userRoles.userId], references: [users.id] }),
  role: one(roles, { fields: [userRoles.roleId], references: [roles.id] }),
  organization: one(organizations, {
    fields: [userRoles.organizationId],
    references: [organizations.id],
  }),
  invite: one(invites, {
    fields: [userRoles.inviteId],
    references: [invites.id],
  }),
}));

export const invites = createTable(
  "invite",
  {
    id: varchar("id", { length: 16 }).notNull().primaryKey(),
    userLimit: integer("userLimit"),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }),
    createdById: varchar("createdById", { length: 255 })
      .references(() => users.id)
      .notNull(),
    organizationId: varchar("organizationId", { length: 255 })
      .references(() => organizations.id)
      .notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (t) => ({
    createdByIdIdx: index("invite_createdById_idx").on(t.createdById),
    organizationIdIdx: index("invite_organizationId_idx").on(t.organizationId),
  }),
);
export type Invite = InferSelectModel<typeof invites>;

export const invitesRelations = relations(invites, ({ one, many }) => ({
  createdById: one(users, {
    fields: [invites.createdById],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [invites.organizationId],
    references: [organizations.id],
  }),
  userRoles: many(userRoles),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.provider, t.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(t.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
