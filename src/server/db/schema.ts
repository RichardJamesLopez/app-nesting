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
  boolean,
  type AnyPgColumn,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `appNesting_${name}`);

export const comments = createTable(
  "comment",
  {
    id: serial("id").primaryKey(),
    content: varchar("content", { length: 10000 }),
    createdById: varchar("createdById", { length: 255 })
      .notNull()
      .references(() => users.id),
    dealId: varchar("dealId", { length: 255 }).notNull(),
    organizationId: varchar("organizationId", { length: 16 })
      .references(() => organizations.id)
      .notNull(),
    parentId: integer("parentId").references((): AnyPgColumn => comments.id),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
    deletedAt: timestamp("deletedAt", { withTimezone: true }),
  },
  (t) => ({
    createdByIdIdx: index("comment_createdById_idx").on(t.createdById),
    dealIdIdx: index("comment_dealId_idx").on(t.dealId),
    organizationIdIdx: index("comment_organizationId_idx").on(t.organizationId),
  }),
);
export type CommentType = InferSelectModel<typeof comments>;

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, { fields: [comments.createdById], references: [users.id] }),
  organization: one(organizations, {
    fields: [comments.organizationId],
    references: [organizations.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: "parentComment",
  }),
  replies: many(comments, {
    relationName: "parentComment",
  }),
  reactions: many(commentReactions),
  notifications: many(notifications),
}));

export const commentReactions = createTable(
  "commentReaction",
  {
    commentId: integer("commentId")
      .notNull()
      .references(() => comments.id),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: boolean("type").notNull(),
  },
  (t) => ({
    compoundKey: primaryKey({ columns: [t.commentId, t.userId] }),
    commentIdIdx: index("commentReaction_commentId_idx").on(t.commentId),
    userIdIdx: index("commentReaction_userId_idx").on(t.userId),
  }),
);

export const commentReactionsRelations = relations(
  commentReactions,
  ({ one }) => ({
    comment: one(comments, {
      fields: [commentReactions.commentId],
      references: [comments.id],
    }),
    user: one(users, {
      fields: [commentReactions.userId],
      references: [users.id],
    }),
  }),
);

export const users = createTable(
  "user",
  {
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
  },
  (t) => ({
    nameIdx: index("name_idx").on(t.name),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  memberships: many(memberships),
  invites: many(invites),
  comments: many(comments),
  notifications: many(notifications),
}));

export const organizations = createTable(
  "organization",
  {
    id: varchar("id", { length: 16 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    ownerId: varchar("ownerId", { length: 255 })
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
    includeHiddenDeals: boolean("includeHiddenDeals"),
  },
  (t) => ({
    nameIndex: index("organization_name_idx").on(t.name),
  }),
);
export type OrganizationType = InferSelectModel<typeof organizations>;

export const organizationsRelations = relations(organizations, ({ many }) => ({
  memberships: many(memberships),
  invites: many(invites),
  comments: many(comments),
}));

export const roles = createTable("role", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  membershipRoles: many(membershipRoles),
}));

export const memberships = createTable(
  "membership",
  {
    userId: varchar("userId", { length: 255 })
      .references(() => users.id)
      .notNull(),
    organizationId: varchar("organizationId", { length: 16 })
      .references(() => organizations.id)
      .notNull(),
    inviteId: varchar("id", { length: 16 }).references(() => invites.id),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    lastSelectedAt: timestamp("lastSelectedAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
    deletedAt: timestamp("deletedAt", { withTimezone: true }),
  },
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.userId, t.organizationId],
    }),
    userIdIdx: index("membership_userId_idx").on(t.userId),
    organizationIdIdx: index("membership_organizationId_idx").on(
      t.organizationId,
    ),
  }),
);

export const membershipsRelations = relations(memberships, ({ one, many }) => ({
  user: one(users, { fields: [memberships.userId], references: [users.id] }),
  organization: one(organizations, {
    fields: [memberships.organizationId],
    references: [organizations.id],
  }),
  membershipRoles: many(membershipRoles),
  invite: one(invites, {
    fields: [memberships.inviteId],
    references: [invites.id],
  }),
}));

export const membershipRoles = createTable(
  "membershipRole",
  {
    userId: varchar("userId", { length: 255 })
      .references(() => users.id)
      .notNull(),
    organizationId: varchar("organizationId", { length: 16 })
      .references(() => organizations.id)
      .notNull(),
    roleId: varchar("roleId", { length: 255 })
      .references(() => roles.id)
      .notNull(),
  },
  (t) => ({
    compoundKey: primaryKey({
      columns: [t.userId, t.organizationId, t.roleId],
    }),
  }),
);

export const membershipRolesRelations = relations(
  membershipRoles,
  ({ one }) => ({
    role: one(roles, {
      fields: [membershipRoles.roleId],
      references: [roles.id],
    }),
    membership: one(memberships, {
      fields: [membershipRoles.userId, membershipRoles.organizationId],
      references: [memberships.userId, memberships.organizationId],
    }),
  }),
);

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
    organizationId: varchar("organizationId", { length: 16 })
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
export type InviteType = InferSelectModel<typeof invites>;

export const invitesRelations = relations(invites, ({ one, many }) => ({
  createdById: one(users, {
    fields: [invites.createdById],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [invites.organizationId],
    references: [organizations.id],
  }),
  memberships: many(memberships),
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

export const notifications = createTable(
  "notification",
  {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    commentId: integer("commentId").references(() => comments.id),
    sourceType: varchar("sourceType", { length: 255 }).notNull(),
    isRead: boolean("isRead").default(false).notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (t) => ({
    userIdIdx: index("notification_userId_idx").on(t.userId),
    commentIdIdx: index("notification_commentId_idx").on(t.commentId),
  }),
);
export type NotificationSourceType = "mention";

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
  comment: one(comments, {
    fields: [notifications.commentId],
    references: [comments.id],
  }),
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
