import {
  boolean,
  date,
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// ---------- Enums ----------
export const vehicleStatusEnum = pgEnum("vehicle_status", [
  "disponivel",
  "reservado",
  "vendido",
  "preparacao",
]);

export const fuelEnum = pgEnum("vehicle_fuel", [
  "flex",
  "gasolina",
  "diesel",
  "eletrico",
  "hibrido",
]);

export const transmissionEnum = pgEnum("vehicle_transmission", [
  "manual",
  "automatico",
]);

export const leadStatusEnum = pgEnum("lead_status", [
  "novo",
  "contato",
  "test_drive",
  "negociacao",
  "fechado",
  "perdido",
]);

export const leadSourceEnum = pgEnum("lead_source", [
  "site",
  "whatsapp",
  "instagram",
  "indicacao",
  "portal",
  "outro",
]);

export const leadTypeEnum = pgEnum("lead_type", [
  "geral",
  "financiamento",
  "test_drive",
  "avaliacao",
  "veiculo",
]);

export const testDriveStatusEnum = pgEnum("test_drive_status", [
  "agendado",
  "confirmado",
  "realizado",
  "cancelado",
]);

export const evaluationStatusEnum = pgEnum("evaluation_status", [
  "novo",
  "contatado",
  "avaliado",
  "descartado",
]);

export const financingStatusEnum = pgEnum("financing_status", [
  "pendente",
  "pre_aprovado",
  "em_analise",
  "reprovado",
]);

// ---------- Tables ----------
export const vehicles = pgTable("vehicles", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 220 }).notNull().unique(),
  brand: varchar("brand", { length: 80 }).notNull(),
  model: varchar("model", { length: 120 }).notNull(),
  version: varchar("version", { length: 160 }).default(""),
  yearManufacture: integer("year_manufacture").notNull(),
  yearModel: integer("year_model").notNull(),
  km: integer("km").notNull().default(0),
  price: numeric("price", { precision: 12, scale: 2 }).notNull(),
  fuel: fuelEnum("fuel").notNull().default("flex"),
  transmission: transmissionEnum("transmission").notNull().default("manual"),
  color: varchar("color", { length: 60 }).default(""),
  doors: integer("doors").default(4),
  description: text("description").default(""),
  accessories: text("accessories").default(""),
  status: vehicleStatusEnum("status").notNull().default("disponivel"),
  featured: boolean("featured").notNull().default(false),
  views: integer("views").notNull().default(0),
  coverImage: text("cover_image").default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  soldAt: timestamp("sold_at"),
});

export const vehicleImages = pgTable("vehicle_images", {
  id: serial("id").primaryKey(),
  vehicleId: integer("vehicle_id")
    .notNull()
    .references(() => vehicles.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  email: varchar("email", { length: 160 }).default(""),
  source: leadSourceEnum("source").notNull().default("site"),
  type: leadTypeEnum("type").notNull().default("geral"),
  vehicleId: integer("vehicle_id").references(() => vehicles.id, {
    onDelete: "set null",
  }),
  status: leadStatusEnum("status").notNull().default("novo"),
  message: text("message").default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const leadInteractions = pgTable("lead_interactions", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id")
    .notNull()
    .references(() => leads.id, { onDelete: "cascade" }),
  note: text("note").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const testDrives = pgTable("test_drives", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id, {
    onDelete: "set null",
  }),
  vehicleId: integer("vehicle_id")
    .notNull()
    .references(() => vehicles.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  cnh: varchar("cnh", { length: 40 }).default(""),
  preferredDate: date("preferred_date").notNull(),
  preferredTime: varchar("preferred_time", { length: 20 }).notNull(),
  status: testDriveStatusEnum("status").notNull().default("agendado"),
  notes: text("notes").default(""),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const vehicleEvaluations = pgTable("vehicle_evaluations", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id, {
    onDelete: "set null",
  }),
  name: varchar("name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  email: varchar("email", { length: 160 }).default(""),
  brand: varchar("brand", { length: 80 }).notNull(),
  model: varchar("model", { length: 120 }).notNull(),
  year: integer("year").notNull(),
  km: integer("km").notNull().default(0),
  condition: varchar("condition", { length: 40 }).notNull().default("bom"),
  accessories: text("accessories").default(""),
  estimatedMin: numeric("estimated_min", { precision: 12, scale: 2 }),
  estimatedMax: numeric("estimated_max", { precision: 12, scale: 2 }),
  status: evaluationStatusEnum("status").notNull().default("novo"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const financingSimulations = pgTable("financing_simulations", {
  id: serial("id").primaryKey(),
  leadId: integer("lead_id").references(() => leads.id, {
    onDelete: "set null",
  }),
  vehicleId: integer("vehicle_id").references(() => vehicles.id, {
    onDelete: "set null",
  }),
  name: varchar("name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  cpf: varchar("cpf", { length: 20 }).default(""),
  vehiclePrice: numeric("vehicle_price", { precision: 12, scale: 2 }).notNull(),
  downPayment: numeric("down_payment", { precision: 12, scale: 2 }).notNull(),
  installments: integer("installments").notNull(),
  monthlyIncome: numeric("monthly_income", { precision: 12, scale: 2 }),
  monthlyPayment: numeric("monthly_payment", { precision: 12, scale: 2 }).notNull(),
  status: financingStatusEnum("status").notNull().default("pendente"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 220 }).notNull().unique(),
  excerpt: text("excerpt").default(""),
  content: text("content").notNull(),
  coverImage: text("cover_image").default(""),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 160 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
