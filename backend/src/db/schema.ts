import { pgTable, uuid, text, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";

/**
 * Example Drizzle Schema representing the existing Supabase tables.
 * This provides end-to-end type safety for Postgres instead of relying on manually typed strings.
 */

export const users = pgTable("users", {
    id: uuid("id").primaryKey(),
    email: text("email").notNull(),
    displayName: text("display_name"),
    organisation: text("organisation"),
    tier: text("tier").default("free").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    name: text("name").notNull(),
    cmNumber: text("cm_number"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chats = pgTable("chats", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }),
    title: text("title"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
    id: uuid("id").defaultRandom().primaryKey(),
    chatId: uuid("chat_id").references(() => chats.id, { onDelete: "cascade" }).notNull(),
    role: text("role").notNull(), // 'user' | 'assistant'
    content: text("content"),
    events: jsonb("events"), // If streamed events are saved as JSON
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
