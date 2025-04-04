import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Document table
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  preview: text("preview").notNull(),
  categoryId: text("category_id").notNull(),
  tags: text("tags").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  userId: integer("user_id").notNull(),
  embedding: text("embedding"),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  embedding: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

// Category table
export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  count: integer("count").default(0).notNull(),
});

export const insertCategorySchema = createInsertSchema(categories);

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  role: text("role").default("user").notNull(),
  avatarUrl: text("avatar_url"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Activity Log
export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // document_added, search, document_updated, document_accessed, system
  userId: integer("user_id"),
  documentId: integer("document_id"),
  details: jsonb("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertActivityLogSchema = createInsertSchema(activityLogs).omit({
  id: true,
  createdAt: true,
});

export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type ActivityLog = typeof activityLogs.$inferSelect;

// Analytics
export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  documentsIndexed: integer("documents_indexed").default(0).notNull(),
  searchesPerformed: integer("searches_performed").default(0).notNull(),
  averageQueryTime: text("average_query_time").default("0s").notNull(),
  topSearchTerms: jsonb("top_search_terms").default([]).notNull(),
  usageOverTime: jsonb("usage_over_time").default([]).notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  updatedAt: true,
});

export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;

// Frontend types for combined data
export type FormattedActivityLog = {
  id: number;
  type: string;
  user?: string;
  document?: string;
  query?: string;
  message?: string;
  time: string;
};

export type DocumentWithRelevance = Document & {
  relevance: number;
};

export type SearchResult = {
  results: DocumentWithRelevance[];
  took: number;
};

export type AnalyticsData = {
  documentsIndexed: number;
  searchesPerformed: number;
  averageQueryTime: string;
  topSearchTerms: Array<{term: string, count: number}>;
  usageOverTime: number[];
};
