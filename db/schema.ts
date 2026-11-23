import { primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const inquiries = sqliteTable("inquiries", {
  email: text("email").notNull(),
  interest: text("interest", { enum: ["waitlist", "investor"] }).notNull(),
  name: text("name").notNull(),
  company: text("company").notNull(),
  submittedAt: text("submitted_at").notNull(),
}, (table) => [primaryKey({ columns: [table.email, table.interest] })]);
