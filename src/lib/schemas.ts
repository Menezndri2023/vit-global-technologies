import { z } from "zod";
import { TIME_SLOTS } from "@/lib/timezone";

// Longueurs maximales : bornent la taille des données stockées et des e-mails envoyés.
const name = z.string().trim().min(2).max(120);
const email = z.string().trim().email().max(254);
const phone = z.string().trim().max(40).optional();
const short = z.string().trim().max(200).optional();
const locale = z.enum(["fr", "en", "ar"]).catch("fr").default("fr");
const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .optional()
  .refine((value) => !value || /^https?:\/\//i.test(value), { message: "invalid_url" });

export const contactSchema = z.object({
  name,
  email,
  phone,
  company: short,
  subject: z.string().trim().min(2).max(200),
  message: z.string().trim().min(10).max(5000),
  locale
});

export const quoteSchema = z.object({
  name,
  email,
  phone,
  company: short,
  country: z.string().trim().max(100).optional(),
  service: z.string().trim().min(1).max(200),
  budget: z.string().trim().max(100).optional(),
  timeline: z.string().trim().max(100).optional(),
  description: z.string().trim().min(10).max(5000),
  locale
});


export const appointmentSchema = z.object({
  name,
  email,
  phone,
  company: short,
  topic: z.string().trim().min(1).max(200),
  expert: short,
  mode: z.string().trim().max(100).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlot: z.enum(TIME_SLOTS),
  notes: z.string().trim().max(2000).optional(),
  locale
});

export const jobApplicationSchema = z.object({
  name,
  email,
  phone,
  position: z.string().trim().min(1).max(200),
  portfolioUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  message: z.string().trim().max(5000).optional(),
  locale
});

export const partnerRequestSchema = z.object({
  name,
  email,
  phone,
  company: z.string().trim().min(1).max(200),
  country: z.string().trim().max(100).optional(),
  partnerType: z.string().trim().min(1).max(100),
  message: z.string().trim().min(10).max(5000),
  locale
});

export const chatLeadSchema = z.object({
  name: z.string().trim().max(120).optional(),
  email: z.string().trim().email().max(254).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(5000),
  page: z.string().trim().max(300).optional(),
  locale
});

export const customPricingLineSchema = z.object({
  title: z.string().min(1).max(120),
  amount: z.string().min(1).max(80)
});

export const customPricingSchema = z.array(customPricingLineSchema).max(30);

export type CustomPricingLine = z.infer<typeof customPricingLineSchema>;

export type ContactInput = z.infer<typeof contactSchema>;
export type QuoteInput = z.infer<typeof quoteSchema>;
export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;
export type PartnerRequestInput = z.infer<typeof partnerRequestSchema>;
export type ChatLeadInput = z.infer<typeof chatLeadSchema>;
